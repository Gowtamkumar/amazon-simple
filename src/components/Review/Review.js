import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Reviewitem from '../ReviewItem/Reviewitem';
import './Review.css';
import happyimg from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()
    const HandelProceedCheckout = () => {
        history.push('/shipment/')
        // setCart([])
        // setOrderPlaced(true)
        // processOrder()
    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProduct = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product;
        });
        setCart(cartProduct)
    }, [])

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyimg} alt="" />
    }
    const removeProduct = (productkey) => {
        console.log("Remove Click", productkey);
        const newCart = cart.filter(pd => pd.key !== productkey)
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    return (
        <div className="review-container">
            {/* <h2>{cart.length}Review page</h2> */}
            <div className="product-container">
                {
                    cart.map(pd => <Reviewitem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}> </Reviewitem>)
                }
                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={HandelProceedCheckout}>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;