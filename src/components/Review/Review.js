import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import Reviewitem from '../ReviewItem/Reviewitem';

const Review = () => {
    const [cart, setCart] = useState([])

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
    return (
        <div>
            <h2>{cart.length}Review page</h2>
            {
                cart.map(pd =><Reviewitem 
                    key={pd.key}
                    product={pd}></Reviewitem>)
            }
            
        </div>
    );
};

export default Review;