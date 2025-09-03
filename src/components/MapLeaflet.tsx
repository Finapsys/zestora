"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  coords: LatLngExpression;
}

export default function MapLeaflet({ coords }: MapProps) {
  return (
    <MapContainer
      center={coords}
      zoom={5}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={coords} icon={defaultIcon} />
    </MapContainer>
  );
}
