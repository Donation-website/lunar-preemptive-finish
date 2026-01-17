import { useState } from 'react'

export default function Home() {
  const [selectedParcel, setSelectedParcel] = useState(null)

  // Példa parcellák a Hold térképen
  const parcels = [
    { id: 1, top: '20%', left: '30%', status: 'Occupied', holder: 'American Celestial Research Ltd.' },
    { id: 2, top: '50%', left: '60%', status: 'Available', holder: 'Unassigned' },
  ]

  const handlePurchase = async () => {
    if (!selectedParcel) {
      alert('Please select a parcel first.')
      return
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parcelId: selectedParcel.id })
    })

    const data = await res.json()
    if (data.url) window.location.href = data.url
    else alert('Payment initialization failed. Check your API key!')
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Reserve Your Place on the Moon</h1>
      <p>Humanity is returning to the Moon. Legal frameworks will evolve. Secure a speculative pre-emptive position today.</p>

      <h2>Lunar Surface Map</h2>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img src="/moon.jpg" alt="Moon Map" style={{ width: '600px', height: '600px', borderRadius: '8px' }} />
        {parcels.map(parcel => (
          <div
            key={parcel.id}
            onClick={() => setSelectedParcel(parcel)}
            style={{
              position: 'absolute',
              top: parcel.top,
              left: parcel.left,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: selectedParcel?.id === parcel.id ? 'lime' : parcel.status === 'Available' ? 'yellow' : 'red',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              border: '2px solid white'
            }}
            title={`Parcel #${parcel.id} - ${parcel.status} (${parcel.holder})`}
          />
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePurchase}>Acquire Pre-Emptive Right</button>
      </div>

      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        No ownership is granted under current international law (Outer Space Treaty, 1967).
      </p>

      <div className="footer">
        <p>Share: 
          <a href="https://www.facebook.com" target="_blank" style={{ margin: '0 5px' }}>Facebook</a> | 
          <a href="https://www.instagram.com" target="_blank" style={{ margin: '0 5px' }}>Instagram</a> | 
          <a href="https://twitter.com" target="_blank" style={{ margin: '0 5px' }}>X</a>
        </p>
        <p>© 2026 Lunar Pre-Emptive Rights. Conceptual initiative.</p>
      </div>
    </div>
  )
}
