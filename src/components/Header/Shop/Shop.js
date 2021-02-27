import React, { useState } from 'react';
import fakeData from '../../../fakeData';
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
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(Pd => <Product
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