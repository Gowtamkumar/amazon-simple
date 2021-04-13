import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51Ie7s7Luh80SIttKpDJ2lCPGMkKIKza09lKoNOYz2M2XfLi9ITI9O06kCagZV3w8B48WR9enWQYsp0zGASspPAUO0086889qtd');
const PaymentProcess = ({handelpayment}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
               <SimpleCardForm handelpayment={handelpayment} ></SimpleCardForm>
            </Elements>
        </div>
    );
};

export default PaymentProcess;