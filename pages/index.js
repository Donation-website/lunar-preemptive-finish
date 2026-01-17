import { useState } from 'react';
import ParcelMap from '../components/ParcelMap';
import Footer from '../components/Footer';

export default function Home() {
  const [selectedParcel, setSelectedParcel] = useState(null);

  return (
    <div className="container">
      <header>
        <h1>Reserve Your Place on the Moon</h1>
        <p>
          Humanity is returning to the Moon. Secure a documented speculative position today.
          Laws will evolve; this platform allows you to pre-emptively claim a parcel.
        </p>
      </header>

      <h2>Select a Lunar Parcel</h2>
      <ParcelMap selectedParcel={selectedParcel} setSelectedParcel={setSelectedParcel} />

      {selectedParcel && selectedParcel.status === 'available' && (
        <button
          style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
          onClick={() => window.location.href = `/api/checkout?parcelId=${selectedParcel.id}`}
        >
          Acquire Pre-Emptive Right for Parcel #{selectedParcel.id}
        </button>
      )}

      <div className="dropdown">
        <details>
          <summary>Terms & Conditions</summary>
          <p>
            By purchasing, you acknowledge no property rights exist under current international law (Outer Space Treaty, 1967).
            This service is speculative and for demonstration purposes.
          </p>
        </details>
      </div>

      <Footer />
    </div>
  );
}
