import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Product = (props) => {
    console.log(props)
    return (
        <div className="Product">
            <div className="product-img">
                <img src={props.product.img} alt="" srcset="" />
            </div>
            <div className="product-details">
                <h4>{props.product.name}</h4>
                <br/>
                <p><small>By: {props.product.seller}</small></p>
                <p><small>${props.product.price}</small></p>
                <p><small>Only {props.product.stock} left in stock - Order Soon</small></p>
                <button className="shop-button" onClick={()=> props.HeandlerAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Card</button>
            </div>

        </div>
    );
};

export default Product;