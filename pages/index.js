import { useState } from 'react'

export default function Home() {
  const [selectedParcel, setSelectedParcel] = useState(null)

  const parcels = [
    { id: 1, status: 'Occupied', holder: 'American Celestial Research Ltd.' },
    { id: 2, status: 'Available', holder: 'Unassigned' },
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
    <div style={{ padding: '20px' }}>
      <h1>Reserve Your Place on the Moon</h1>
      <p>Humanity is returning to the Moon. Legal frameworks will evolve. Secure a speculative pre-emptive position today.</p>

      <h2>Select a Lunar Parcel</h2>
      <ul>
        {parcels.map(parcel => (
          <li key={parcel.id} style={{ margin: '10px 0' }}>
            <button
              style={{ backgroundColor: selectedParcel?.id === parcel.id ? '#3c649e' : '#4f83cc' }}
              onClick={() => setSelectedParcel(parcel)}
            >
              Parcel #{parcel.id} - {parcel.status} ({parcel.holder})
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handlePurchase} style={{ marginTop: '20px' }}>Acquire Pre-Emptive Right</button>

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
