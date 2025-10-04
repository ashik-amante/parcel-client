import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useTrackingLogger from '../../../Hooks/useTrackingLogger';

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [err, setErr] = useState('')
    const { parcelId } = useParams()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { logTracking } = useTrackingLogger()
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

                // save parcel data to db 
                const paymentdata = {
                    parcelId: parcelId,
                    email: user?.email,
                    amount: cost,
                    trxId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    paidAt: new Date()
                }
                const response = await axiosSecure.post('/payments', paymentdata)
                console.log(response.data.insertedId)
                if (response.data.insertedId) {
                    // Show detailed SweetAlert2
                    Swal.fire({
                        title: 'Payment Successful ',
                        html: `
              <p><strong>Total Paid:</strong> $${cost}</p>
              <p><strong>Payment Type:</strong> ${result.paymentIntent.payment_method_types}</p>
              <p><strong>Transaction ID:</strong> ${result.paymentIntent.id}</p>
             
            `,
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });
                }
                await logTracking({
                    tracking_id: parcel.tracking_id,
                    status: "payment_done ",
                    details: `Payment by ${user?.displayName}`,
                    updated_by: user?.email,
                })
                navigate('/dashboard/paymentHistory')

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