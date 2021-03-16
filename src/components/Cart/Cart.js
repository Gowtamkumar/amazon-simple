import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
       
    }
    let shipping = 0;
    if (total > 15) {
        shipping = 4;
    }
    else if (total > 0) {
        shipping = 12;
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    // NUmber Format
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Items Order:{cart.length} </h3>
            <p><small>Product Price: ${formatNumber(total)}</small></p>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <p><small>Tax: ${tax}</small></p>
            <p>Total Price: ${grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;