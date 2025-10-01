import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);

  // Fetch riders
  const { data: riders = [], isLoading, isError } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data.filter((r) => r.status === "pending");
    },
  });

  const handleStatusChange = async (riderId, status,email) => {
    const actionText = status === "approved" ? "Approve" : "Reject";

    const confirm = await Swal.fire({
      title: `${actionText} this rider?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} this rider?`,
      icon: status === "approved" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonText: actionText,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${riderId}`, {status,email});
      Swal.fire("Success", `Rider ${actionText.toLowerCase()}d.`, "success");
      queryClient.invalidateQueries(["riders"]); // refresh data
      setSelected(null);
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to update status", "error");
    }
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to fetch data</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Region</th>
              <th className="p-2 border">District</th>
              <th className="p-2 border">Applied At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No pending riders.
                </td>
              </tr>
            ) : (
              riders.map((rider, idx) => (
                <tr key={rider._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{rider.name}</td>
                  <td className="p-2 border">{rider.email}</td>
                  <td className="p-2 border">{rider.phone}</td>
                  <td className="p-2 border">{rider.region}</td>
                  <td className="p-2 border">{rider.district}</td>
                  <td className="p-2 border">
                    {rider.appliedAt
                      ? new Date(rider.appliedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-2 border flex flex-col sm:flex-row gap-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => setSelected(rider)}
                    >
                      View
                    </button>
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleStatusChange(rider._id, "approved",rider.email)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleStatusChange(rider._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-5 w-11/12 md:w-2/3 lg:w-1/2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Rider Details</h3>
              <button
                onClick={() => setSelected(null)}
                className="btn btn-sm btn-outline"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selected.name}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Age:</strong> {selected.age}
              </p>
              <p>
                <strong>Region:</strong> {selected.region}
              </p>
              <p>
                <strong>District:</strong> {selected.district}
              </p>
              <p>
                <strong>NID:</strong> {selected.nid}
              </p>
              <p>
                <strong>Bike Brand:</strong> {selected.bikeBrand}
              </p>
              <p>
                <strong>Bike Reg No:</strong> {selected.bikeRegNo}
              </p>
              <p>
                <strong>Status:</strong> {selected.status}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
