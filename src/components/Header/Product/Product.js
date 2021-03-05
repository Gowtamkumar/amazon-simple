import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Product = (props) => {
    console.log(props)
    const { name, img, seller, price, stock,key } = props.product
    return (
        <div className="Product">
            <div className="product-img">
                <img src={img} alt="" srcset="" />
                
            </div>
            <div className="product-details">
                <h4><Link to={'/product/'+key}>{name}</Link></h4>
                <br />
                <p><small>By: {seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>Only {stock} left in stock - Order Soon</small></p>
                { props.showAddToCart && <button className="shop-button" onClick={() => props.HeandlerAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>}
            </div>

        </div>
    );
};

export default Product;