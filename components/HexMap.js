import { useState, useEffect } from 'react';

export default function HexMap({ selectedParcel, setSelectedParcel }) {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    // Generate 180 parcels with random positions on the map
    const tempParcels = [];
    for(let i=1;i<=180;i++){
      tempParcels.push({
        id: i,
        x: Math.random()*8192, // image width
        y: Math.random()*4096, // image height
        available: Math.random() > 0.3, // ~70% available
        price: Math.floor(Math.random()*5000 + 1000) // 1000-6000 USD
      });
    }
    setParcels(tempParcels);
  }, []);

  const handleClick = (parcel) => {
    if(parcel.available) setSelectedParcel(parcel);
  }

  return (
    <div style={{ position: 'relative', width: '819px', height: '409px', background: `url('/moon/moon-map.jpg') no-repeat center/contain` }}>
      {parcels.map(p => (
        <div
          key={p.id}
          onClick={() => handleClick(p)}
          style={{
            position: 'absolute',
            left: `${p.x/10}px`,
            top: `${p.y/10}px`,
            width: '20px',
            height: '20px',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            backgroundColor: p.available ? 'green' : 'red',
            cursor: p.available ? 'pointer' : 'not-allowed',
            border: selectedParcel && selectedParcel.id===p.id ? '3px solid yellow' : '1px solid black'
          }}
        />
      ))}
    </div>
  )
}
