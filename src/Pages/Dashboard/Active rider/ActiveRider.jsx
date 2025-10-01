import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch active riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/riders/approved");
      return data;
    },
  });
  console.log(riders);

  const handleDeactivate = async (rider) => {
    if (!rider._id) return;

    Swal.fire({
      title: "Deactivate rider?",
      text: `Are you sure you want to deactivate ${rider.name || "this rider"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await axiosSecure.patch(`/riders/${rider._id}`, { status: "deactivate" });
        Swal.fire(
          "Deactivated",
          `${rider.name || "Rider"} has been deactivated.`,
          "success"
        );
        refetch(); // reload riders list
      } catch (err) {
        Swal.fire(
          "Error",
          err?.response?.data?.message || "Failed to update rider.",
          "error"
        );
      }
    });
  };

  if (isLoading) {
    return <p className="text-center py-6">Loading active riders...</p>;
  }

  // Filter riders by name or phone (case-insensitive)
 const filteredRiders = riders.filter((rider) => {
  const name = rider.name?.toLowerCase() || "";
  const phone = rider.phone?.toLowerCase() || "";
  return (
    name.includes(search.toLowerCase()) ||
    phone.includes(search.toLowerCase())
  );
});


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* Search bar */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-72"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone || "N/A"}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  {rider.bikeBrand} ({rider.bikeRegNo})
                </td>
                <td>
                  <span className="badge badge-success">{rider.status}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleDeactivate(rider)}
                    className="btn btn-error btn-sm"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
