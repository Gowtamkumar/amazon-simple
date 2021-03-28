import React from 'react';

const Inventery = () => {
    const handleAddProduct=()=>{
        const product = {}
        fetch('https://peaceful-inlet-79182.herokuapp.com/addProduct', {
            method:'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body:JSON.stringify(product)
        })
    }
    return (
        <div>
            <h2>Inventery Comeings Soon...</h2>
            <form action="">
                <p><span></span>Name<input type="text"/></p>
                <p><span></span>Price: <input type="text"/></p>
                <p><span></span>Quantity: <input type="text"/></p>
                <p><span></span>Product Image<input type="file"/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventery;