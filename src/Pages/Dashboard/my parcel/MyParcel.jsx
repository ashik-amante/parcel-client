import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyParcel = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [],refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/parcels/${user?.email}`)
            return data
        }
    })
    // Delete parcel with SweetAlert confirmation
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);
                console.log(res.data);
                Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
                refetch(); // refresh the parcel list
            } catch (error) {
                Swal.fire("Error!", "Failed to delete parcel.",error);
            }
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <h1>Total parcels : {parcels.length}</h1>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Type</th>
                        <th>Receiver</th>
                        <th>Created at</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        parcels.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-4">
                                    No parcels found in this category.
                                </td>
                            </tr>
                        ) : (
                            parcels.map(parcel => <tr>

                                <td>{parcel.title}</td>
                                <td className='capitalize'>{parcel.type}</td>
                                <td>{parcel.receiver_name}</td>
                                <td>{parcel.creation_date}</td>
                                <td>$ {parcel.cost}</td>
                                <td className={`${parcel.payment_status === 'unpaid' && 'text-orange-400'}
                                ${parcel.payment_status === 'paid' && 'text-green-500'} capitalize font-bold
                                `}>
                                    {parcel.payment_status}
                                </td>
                                <td className='flex gap-2 items-center justify-center'>
                                    <button className='btn btn-sm'>View</button>
                                    <button disabled={parcel.payment_status === 'paid'} className='btn btn-sm bg-green-400'>Pay</button>
                                    <button onClick={()=> handleDelete(parcel._id)} className='btn btn-sm bg-red-600'>Delete</button>


                                </td>

                            </tr>)
                        )
                    }


                </tbody>
            </table>
        </div>
    );
};

export default MyParcel;