import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
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

    const removeProduct = (productkey) => {
        console.log("Remove Click",productkey);
        const newCart = cart.filter(pd=> pd.key !== productkey)
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    return (
        <div>
            <h2>{cart.length}Review page</h2>
            {
                cart.map(pd => <Reviewitem
                    key={pd.key}
                    removeProduct={removeProduct}
                    product={pd}> </Reviewitem>)
            }

        </div>
    );
};

export default Review;