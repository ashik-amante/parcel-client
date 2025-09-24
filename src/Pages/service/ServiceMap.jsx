import React, { useEffect, useState,  } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

// Marker আইকন ঠিক করার জন্য (Leaflet এর default icon fix)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// const districts = [
//   { district: 'Dhaka', latitude: 23.8103, longitude: 90.4125 },
//   { district: 'Chattogram', latitude: 22.3569, longitude: 91.8123 },
//   { district: 'Sylhet', latitude: 24.8949, longitude: 91.8662 },
//   { district: 'Khulna', latitude: 22.8456, longitude: 89.5672 },
//   { district: 'Rajshahi', latitude: 24.3745, longitude: 88.6087 },
//   { district: 'Barisal', latitude: 22.7, longitude: 90.3667 },
//   { district: 'Rangpur', latitude: 25.746, longitude: 89.2752 },
//   { district: 'Mymensingh', latitude: 24.7539, longitude: 90.3987 },
// ];


function FlyToDistrict({ position }) {
  const map = useMap();
  if (position) map.flyTo(position, 12, { duration: 1.5 });
  return null;
}

const ServiceMap = () => {
  const [search, setSearch] = useState('');
  const [selectedPos, setSelectedPos] = useState(null);
  const districts = useLoaderData()

 

  const handleSearch = () => {
    const match = districts.find(
      (d) => d.district.toLowerCase() === search.toLowerCase()
    );
    if (match) {
      setSelectedPos([match.latitude, match.longitude]);
    } else {
      alert('District not found');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 className="text-2xl font-bold mb-4">We are available in 64 districts</h2>
      <div className="flex justify-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={6}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {districts.map((d, i) => (
          <Marker key={i} position={[d.latitude, d.longitude]}>
            <Popup>{d.district}</Popup>
          </Marker>
        ))}
        <FlyToDistrict position={selectedPos} />
      </MapContainer>
    </div>
  );
};

export default ServiceMap;
