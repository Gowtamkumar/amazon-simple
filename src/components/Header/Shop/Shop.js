import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';

import Cart from '../../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const firstTenData = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTenData);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const prrviousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            console.log(existingKey, savedCart[existingKey])
            return product;
        })
        setCart(prrviousCart);
    }, [])

    const HeandlerAddProduct = (product) => {
        const toBeAddedkey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedkey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            sameProduct.quantity = sameProduct.quantity + 1;
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newCart = { ...others, sameProduct }
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }


        setCart(newCart);

        addToDatabaseCart(product.key, count)


    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>

                    {

                        products.map(Pd => <Product
                            key={Pd.key}
                            showAddToCart={true}
                            HeandlerAddProduct={HeandlerAddProduct}
                            product={Pd}>
                        </Product>)

                    }
                </ul>

            </div>
            <div className="cart-container">
                
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="btn btn-success">Review Order</button>
                    </Link>
                </Cart>

            </div>
        </div>
    );
};

export default Shop;