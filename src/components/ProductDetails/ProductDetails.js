import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Header/Product/Product';

const ProductDetails = () => {

    const { productkey } = useParams();
    const [product, setproduct] = useState({})
    useEffect(() => {
        fetch('http://localhost:5000/product/' + productkey)
            .then(res => res.json())
            .then(data=>setproduct(data))
    }, [productkey])
    // const product  = fakeData.find(pd=>pd.key===productkey)

    return (
        <div>

            <h2>{productkey} Details is Comming Soon...</h2>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;