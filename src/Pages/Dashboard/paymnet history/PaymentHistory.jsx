import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch all parcels/payments for this user
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user?.email}`);
            return data;
        },
    });
    console.log(payments);

    if (isLoading)
        return <p className="text-center mt-10">Loading payment history...</p>;

   

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payment History</h1>

            <div className="overflow-x-auto">
                <table className="table w-full ">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Parcel id</th>
                            <th>Payment Time</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No payment history found.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr
                                    key={payment._id || index}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td>{index + 1}</td>
                                    <td>{payment.trxId || payment.payment_intent_id || "-"}</td>
                                    <td>{payment.created_by || user.email}</td>
                                    <td>৳{payment.amount}</td>
                                    <td>{payment.parcelId|| "Card"}</td>
                                    <td>
                                        {new Date(payment.paidAt).toLocaleString()}
                                    </td>
                                   
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
