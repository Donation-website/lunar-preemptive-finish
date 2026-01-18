// components/ASZFDropdown.js
import { useState } from 'react';

export default function ASZFDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Terms & Conditions
      </button>
      {open && (
        <div style={{
          marginTop: '5px',
          maxWidth: '300px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}>
          <p>
            By purchasing lunar parcels you understand that this is a speculative service.
            No legal ownership is granted. Future laws may apply.
          </p>
        </div>
      )}
    </div>
  )
}
