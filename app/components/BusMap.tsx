'use client';

import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import Image from 'next/image';

const busIcon = new Icon({
  iconUrl: '/bus-icon.png',
  iconSize: [40, 40],
});

const stopIcon = new Icon({
  iconUrl: '/pin-icon.png',
  iconSize: [25, 41],
});

type BusMapProps = {
  busStops: any[];
  currentLocation: { latitude: number; longitude: number };
  busName: string;
  capacity: number;
  nextStopName: string;
};

export default function BusMap({ busStops, currentLocation, busName, capacity, nextStopName }: BusMapProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!currentLocation || busStops.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-gray-200 rounded-lg">
        <p className="text-gray-500">Select a bus to view its route.</p>
      </div>
    );
  }

  const center: LatLngExpression = [currentLocation.latitude, currentLocation.longitude];
  const route: LatLngExpression[] = busStops.map((stop) => [stop.latitude, stop.longitude]);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {busStops.map((stop) => (
          <Marker key={stop.id} position={[stop.latitude, stop.longitude]} icon={stopIcon}>
            <Popup>
              <h3 className="font-bold text-lg">{stop.name}</h3>
              {stop.estimated_arrival && (
                <p>
                  Next Bus Arrival Time:{' '}
                  <span className="font-medium">{stop.estimated_arrival}</span>
                </p>
              )}
            </Popup>
          </Marker>
        ))}

        <Marker position={[currentLocation.latitude, currentLocation.longitude]} icon={busIcon}>
          <Popup className="bus-popup">
            <h3 className="font-bold text-lg">{busName}</h3>
            <p>Status: Active</p>
            <p>Capacity: {capacity}%</p>
            <p>Next Stop: {nextStopName}</p>
          </Popup>
        </Marker>
        <Polyline positions={route} color="blue" />
      </MapContainer>
    </div>
  );
}