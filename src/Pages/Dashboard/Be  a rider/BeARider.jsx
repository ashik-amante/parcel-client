
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const allRegion = useLoaderData()

    const { register, handleSubmit, reset, watch } = useForm();
    const selectedRegion = watch('region')

    const uniqueRegion = [... new Set(allRegion.map((w) => w.region))]

    const getAllDestrict = (region) => allRegion.filter((w) => w.region === region).map((w) => w.district)


    const onSubmit = async (formData) => {
        const riderApplication = {
            name: user?.displayName,
            email: user?.email,
            age: formData.age,
            phone: formData.phone,
            region: formData.region,
            district: formData.district,
            nid: formData.nid,
            bikeBrand: formData.bikeBrand,
            bikeRegNo: formData.bikeRegNo,
            status: "pending", // default
            appliedAt: new Date(),
        };

        
        Swal.fire({
            title: "Review Your Application",
            html: `
      <p><strong>Name:</strong> ${riderApplication.name}</p>
      <p><strong>Email:</strong> ${riderApplication.email}</p>
      <p><strong>Age:</strong> ${riderApplication.age}</p>
      <p><strong>Phone:</strong> ${riderApplication.phone}</p>
      <p><strong>Region:</strong> ${riderApplication.region}</p>
      <p><strong>District:</strong> ${riderApplication.district}</p>
      <p><strong>NID:</strong> ${riderApplication.nid}</p>
      <p><strong>Bike Brand:</strong> ${riderApplication.bikeBrand}</p>
      <p><strong>Bike Reg. No:</strong> ${riderApplication.bikeRegNo}</p>
    `,
            showCancelButton: true,
            confirmButtonText: "Confirm & Submit",
            cancelButtonText: "Cancel",
            icon: "info"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.post("/riders", riderApplication);
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Application Submitted",
                            text: "Your rider application is under review.",
                        });
                        reset();
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to submit application.",
                    });
                }
            }
        });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Become a Rider</h2>
            <p className="mb-6">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Name */}
                <div className="form-control">
                    <label className="label">Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered"
                    />
                </div>

                {/* Email */}
                <div className="form-control">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered"
                    />
                </div>

                {/* Phone */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input
                        type="number"
                        {...register("phone", { required: true })}
                        className="input input-bordered "
                        placeholder="Enter your phone"
                    />
                </div>
                {/* Age */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Your Age</span>
                    </label>
                    <input
                        type="number"
                        {...register("age", { required: true })}
                        className="input input-bordered"
                        placeholder="Enter your age"
                    />
                </div>

                {/* Region */}
                <div className="form-control">
                    <label className="label">Region</label>
                    <select
                        {...register("region", { required: true })}

                        className="select select-bordered"
                    >
                        <option value="">Select Region</option>
                        {uniqueRegion.map((region, i) => (
                            <option key={i} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>

                {/* District */}
                <div className="form-control">
                    <label className="label">District</label>
                    <select {...register("district", { required: true })} className="select select-bordered">
                        <option value="">Select District</option>
                        {getAllDestrict(selectedRegion).map((district, i) => (
                            <option key={i} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                {/* NID */}
                <div className="form-control">
                    <label className="label">National ID Card Number</label>
                    <input
                        type="text"
                        {...register("nid", { required: true })}
                        className="input input-bordered"
                        placeholder="Enter your NID"
                    />
                </div>

                {/* Bike Brand */}
                <div className="form-control">
                    <label className="label">Bike Brand</label>
                    <input
                        type="text"
                        {...register("bikeBrand", { required: true })}
                        className="input input-bordered"
                        placeholder="Enter bike brand"
                    />
                </div>

                {/* Bike Registration Number */}
                <div className="form-control">
                    <label className="label">Bike Registration Number</label>
                    <input
                        type="text"
                        {...register("bikeRegNo", { required: true })}
                        className="input input-bordered"
                        placeholder="Enter registration number"
                    />
                </div>

                {/* Submit */}
                <div className="form-control md:col-span-2 mt-4">
                    <button type="submit" className="btn btn-primary w-full">
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BeARider;
