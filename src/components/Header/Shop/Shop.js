import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';

import Cart from '../../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    // const firstTenData = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setcart] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setcart(data))
    }, [])

    const HeandlerAddProduct = (product) => {
        const toBeAddedkey = product.key;
        console.log("Cart", cart, toBeAddedkey)
        const sameProduct = cart.find(pd => pd.key === toBeAddedkey);
        console.log("sameProduct for cart find", sameProduct, toBeAddedkey)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            sameProduct.quantity = sameProduct.quantity + 1;
            console.log("same product quantity", count)
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newCart = [ ...others, sameProduct ]
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }


        setcart(newCart);

        addToDatabaseCart(product.key, count)


    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.length === 0 && <p>Lodding.....</p>
                }
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