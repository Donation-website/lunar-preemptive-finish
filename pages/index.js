import { useEffect, useState } from 'react';
import ParcelMap from '../components/ParcelMap';
import Footer from '../components/Footer';

export default function Home() {
  const [parcels, setParcels] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/parcels').then(r => r.json()).then(setParcels);
  }, []);

  const handleSelect = (parcel) => setSelected(parcel);

  const handleCheckout = async () => {
    if (!selected) return alert('Select a parcel first');
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ parcel: selected })
    });
    const data = await res.json();
    if (data.url) window.location = data.url;
  }

  return (
    <>
      <header>
        <h1>Reserve Your Place on the Moon</h1>
        <p>Humanity is returning to the Moon. Secure your position today.</p>
      </header>

      <ParcelMap parcels={parcels} onSelect={handleSelect} />

      <div style={{ textAlign: 'center', margin: '2rem' }}>
        <button onClick={handleCheckout} disabled={!selected}>Acquire Pre-Emptive Right</button>
      </div>

      <Footer />
    </>
  )
}
