import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBKEY)
const Payment = () => {

    return (
       <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
       </Elements>
    );
};

export default Payment;