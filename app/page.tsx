'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from './components/Header';
import BusButtons from './components/BusButtons';
import BusDetails from './components/BusDetails';
import BusSchedule from './components/BusSchedule';
import Footer from './components/Footer';
import data from './bus_data.json';

type Bus = {
  id: number;
  current_location: { latitude: number; longitude: number };
  bus_stops: any[];
  [key: string]: any;
};

const DynamicBusMap = dynamic(() => import('./components/BusMap'), {
  ssr: false,
  loading: () => <p className="text-center text-gray-500">Loading map...</p>,
});

export default function Home() {
  const [selectedBusId, setSelectedBusId] = useState<number | null>(data.bus_lines[0].id);
  const [selectedBusData, setSelectedBusData] = useState<Bus | null>(data.bus_lines[0] as Bus);

  useEffect(() => {
    const updateBusLocation = () => {
      if (selectedBusId === null) return;
      const currentBus = data.bus_lines.find((bus) => bus.id === selectedBusId);
      if (currentBus) {
        setSelectedBusData(currentBus as Bus);
      }
    };
    const intervalId = setInterval(updateBusLocation, 10000);
    return () => clearInterval(intervalId);
  }, [selectedBusId]);

  const handleBusSelect = (id: number) => {
    setSelectedBusId(id);
    const bus = data.bus_lines.find((b) => b.id === id);
    setSelectedBusData(bus as Bus);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto p-4">
        {/* Top green banner */}
        <div className="bg-green-500 text-white py-8 px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Amana Transportation</h1>
          <p className="text-lg">Proudly Servicing Malaysian Bus Riders Since 2019!</p>
        </div>

        {/* Yellow 'Active Bus Map' banner */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-inner mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Active Bus Map</h2>
        </div>

        {/* TOP SECTION: Bus Buttons and Map */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <BusButtons
            buses={data.bus_lines}
            selectedBusId={selectedBusId}
            onBusSelect={handleBusSelect}
          />
          {selectedBusData && (
            <>
              <BusDetails bus={selectedBusData} />
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Bus Route</h2>
                <DynamicBusMap
                  busStops={selectedBusData.bus_stops}
                  currentLocation={selectedBusData.current_location}
                  busName={selectedBusData.name}
                  capacity={selectedBusData.passengers.utilization_percentage}
                  nextStopName={selectedBusData.bus_stops.find(s => s.is_next_stop)?.name || 'N/A'}
                />
              </div>
            </>
          )}
        </div>

        {/* BOTTOM SECTION: Bus Buttons and Schedule */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-inner mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Bus Schedule</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <BusButtons
            buses={data.bus_lines}
            selectedBusId={selectedBusId}
            onBusSelect={handleBusSelect}
          />
          {selectedBusData && (
            <BusSchedule busStops={selectedBusData.bus_stops} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}