import React from 'react';

const Reviewitem = (props) => {
    console.log(props.product.key)
    const { name, quantity, price } = props.product;

    const reviewItemStyle = {
        border: '5px solid green'
    }
    return (

        <div className={reviewItemStyle}>
            <h2>{name}Review Items</h2>
            <p>Quantity: {quantity}</p>
            <p><smaill>{price}</smaill></p>
            <button onClick={() => props.removeProduct(props.product.key)}>Remove</button>
            <br />
        </div>
    );
};

export default Reviewitem;