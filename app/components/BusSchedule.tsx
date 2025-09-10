// app/components/BusSchedule.tsx

import React from 'react';

type BusStop = {
  id: number;
  name: string;
  estimated_arrival: string;
  is_next_stop: boolean; // This is the key property for highlighting
};

type BusScheduleProps = {
  busStops: BusStop[];
};

export default function BusSchedule({ busStops }: BusScheduleProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Bus Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Stop
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Time of Arrival
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {busStops.map((stop) => (
              <tr 
                key={stop.id} 
                className={stop.is_next_stop ? 'bg-orange-200 font-semibold' : 'hover:bg-gray-100'}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stop.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stop.estimated_arrival}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}