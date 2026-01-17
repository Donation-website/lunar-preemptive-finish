import { useEffect, useState } from 'react';

const hexagonsData = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  x: Math.random() * 1280 + 100, // pozíció X, random a hold térképen
  y: Math.random() * 500 + 50,   // pozíció Y
  status: Math.random() < 0.3 ? 'occupied' : 'available', // 30% piros
}));

export default function ParcelMap({ selectedParcel, setSelectedParcel }) {
  const [hexagons, setHexagons] = useState([]);

  useEffect(() => {
    setHexagons(hexagonsData);
  }, []);

  return (
    <div className="parcel-map">
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className={`hex ${hex.status}`}
          style={{ left: hex.x, top: hex.y }}
          onClick={() => {
            if (hex.status === 'available') setSelectedParcel(hex);
          }}
        >
          {hex.id}
        </div>
      ))}
    </div>
  );
}
