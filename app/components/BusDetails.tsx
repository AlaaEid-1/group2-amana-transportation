import React from 'react';

type BusDetailsProps = {
  bus: any; // Use a more specific type if you want, like a Bus object
};

export default function BusDetails({ bus }: BusDetailsProps) {
  if (!bus) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{bus.name}</h2>
      <p className="text-base text-gray-600">
        <span className="font-semibold">Route Number:</span> {bus.route_number || 'N/A'}
      </p>
      <p className="text-base text-gray-600">
        <span className="font-semibold">Status:</span> 
        <span className={`${bus.status === 'Maintenance' ? 'text-red-500' : 'text-green-600'} font-semibold ml-1`}>
          {bus.status || 'Active'}
        </span>
      </p>
      {bus.status === 'Maintenance' && (
        <p className="text-sm text-red-500 font-semibold mt-2 p-2 bg-red-50 rounded-lg">
          This bus is currently in maintenance. The route is unavailable.
        </p>
      )}
      
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-2">Vehicle and Driver Info</h3>
        <p className="text-gray-700">
          <span className="font-semibold">Driver:</span> {bus.driver?.name || 'N/A'}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">License Plate:</span> {bus.vehicle_info?.license_plate || 'N/A'}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Model:</span> {bus.vehicle_info?.model || 'N/A'}
        </p>
      </div>
    </div>
  );
}