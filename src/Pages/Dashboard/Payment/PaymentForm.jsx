import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [err, setErr] = useState('')
    const { parcelId } = useParams()
    const axiosSecure = useAxiosSecure()
    console.log(parcelId);

    const { data: parcel = {} } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/parcels/payment/${parcelId}`)
            return data
        }
    })
    const { cost } = parcel
    const amountInCents = cost * 100;
    console.log(parcel);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (!card) return

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setErr(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErr('')
        }
        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', { amount: amountInCents })
        console.log(res.data.clientSecret);

        const clientSecret = res.data.clientSecret

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Ashik'
                }
            }
        })
        if (result.error) {
            setErr(result.error.message)
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('payment success');
                setErr('')
                // ✅ Show SweetAlert success
                Swal.fire({
                    title: 'Payment Successful 🎉',
                    text: `You have successfully paid $${cost}`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
            }
        }


    }
    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
                <CardElement className="p-2 border rounded" />
                <button
                    type="submit"
                    disabled={!stripe}
                    className="btn btn-success w-full"
                >
                    Pay $ {cost}
                </button>
                {err && <p className="text-red-500">{err}</p>}
                {/* {success && <p className="text-green-500">{success}</p>} */}
            </form>
        </div>
    );
};

export default PaymentForm;