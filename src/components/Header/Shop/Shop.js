import React, { useState } from 'react';
import fakeData from '../../../fakeData';
import { addToDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const firstTenData = fakeData.slice(0, 10);

    const [products, setProducts] = useState(firstTenData);
    const [cart, setCart] = useState([]);

    const HeandlerAddProduct = (product) => {
        console.log('Clicked one', product)
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
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
                <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;