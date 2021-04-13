import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import PaymentProcess from '../PaymentProcess/PaymentProcess';
import './Shipment.css'
const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shipingData, setShippingData] = useState(null);

  const onSubmit = data => {
    setShippingData(data)

  };

  const processPaymentsuccee = paymentId => {
    const savedCart = getDatabaseCart()
    const orderDetails = {
      ...LoggedInUser,
      products: savedCart,
      Shipment: shipingData,
      paymentId,
      OrderTime: new Date()
    }
    fetch('https://peaceful-inlet-79182.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder()
          alert("Order Complete")
        }
      })
  }


  return (
    <div className="container">
      <div className="row">
        <div style={{ display: shipingData ? 'none' : 'block' }} className="col-md-6">
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={LoggedInUser.name} ref={register({ required: true })} placeholder="Your name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={LoggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span className="error">Phone Number is required</span>}
            <input type="submit" />
          </form>
        </div>
        <div style={{ display: shipingData ? 'block' : 'none' }} className="col-md-6">
          <h1>Please pay for me</h1>
          <PaymentProcess handelpayment={processPaymentsuccee}></PaymentProcess>
        </div>
      </div>
    </div>
  );
};

export default Shipment;