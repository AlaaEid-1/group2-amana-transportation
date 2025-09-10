import React from 'react';

type Bus = {
  id: number;
  name: string;
  status: string;
};

type BusButtonsProps = {
  buses: Bus[];
  selectedBusId: number | null;
  onBusSelect: (id: number) => void;
};

export default function BusButtons({ buses, selectedBusId, onBusSelect }: BusButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {buses.map((bus) => (
        <button
          key={bus.id}
          onClick={() => onBusSelect(bus.id)}
          className={`py-2 rounded-lg font-medium transition-colors 
            ${selectedBusId === bus.id ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Bus {bus.id}
        </button>
      ))}
    </div>
  );
}