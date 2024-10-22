import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons issue in React with Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ hostels }) => {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      {hostels.map((hostel, index) => (
        <Marker key={index} position={[hostel.latitude, hostel.longitude]}>
          <Popup>
            <strong>{hostel.name}</strong><br />
            {hostel.city}, {hostel.locality}<br />
            Price: ₹{hostel.price}/month
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
