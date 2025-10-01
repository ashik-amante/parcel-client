import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackParcel = () => {
  const { trackingId: paramId } = useParams(); 
  const [trackingId, setTrackingId] = useState(paramId || "");
  const [trackingData, setTrackingData] = useState(null);

  const handleSearch = async () => {
    if (!trackingId) return;
    try {
      const { data } = await axios.get(`/trackings/${trackingId}`);
      setTrackingData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Track Your Parcel</h2>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      {/* Tracking Result */}
      {trackingData ? (
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="font-semibold">Tracking ID: {trackingData.trackingId}</h3>
          <p>Status: {trackingData.status}</p>
          <p>Last Updated: {new Date(trackingData.lastUpdated).toLocaleString()}</p>
          
          <h4 className="mt-4 font-bold">Updates:</h4>
          <ul className="list-disc ml-6">
            {trackingData.updates?.map((u, i) => (
              <li key={i}>
                <span className="font-semibold">{new Date(u.time).toLocaleString()}</span> - {u.location} → {u.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No tracking info yet.</p>
      )}
    </div>
  );
};

export default TrackParcel;
