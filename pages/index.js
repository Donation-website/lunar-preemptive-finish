import { useState } from "react";

export default function Home() {
  const parcels = [
    { id: "001", status: "Occupied", holder: "American Celestial Research Ltd." },
    { id: "002", status: "Available", holder: "Unassigned" },
  ];

  const [selectedParcel, setSelectedParcel] = useState(null);

  const handleParcelClick = (parcelId) => {
    const parcel = parcels.find((p) => p.id === parcelId);
    setSelectedParcel(parcel);
  };

  const handlePayment = async () => {
    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parcelId: selectedParcel.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Payment initialization failed.");
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed. Check your API key!");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
      <h1>Reserve Your Place on the Moon 🌕</h1>
      <p>Secure a speculative pre-emptive position today.</p>

      <h2>Lunar Surface Map</h2>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img src="/moon/moon-map.jpg" alt="Lunar Map" style={{ width: "600px", borderRadius: "10px" }} />
        {parcels.map((parcel) => {
          const positions = { "001": { top: 100, left: 150 }, "002": { top: 200, left: 400 } };
          return (
            <div
              key={parcel.id}
              onClick={() => handleParcelClick(parcel.id)}
              style={{
                position: "absolute",
                top: positions[parcel.id].top,
                left: positions[parcel.id].left,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: parcel.status === "Available" ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)",
                border: selectedParcel?.id === parcel.id ? "3px solid gold" : "none",
                cursor: "pointer",
              }}
              title={`Parcel ${parcel.id} - ${parcel.status}`}
            ></div>
          );
        })}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Selected Parcel:</h3>
        {selectedParcel ? (
          <p>{selectedParcel.id} - {selectedParcel.status} - {selectedParcel.holder}</p>
        ) : (
          <p>None</p>
        )}
      </div>

      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Acquire Pre-Emptive Right
      </button>

      <footer style={{ marginTop: "50px", fontSize: "14px" }}>
        <div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>Instagram</a>
        </div>
        <p>© 2026 Lunar Pre-Emptive Rights. Conceptual initiative.</p>
      </footer>
    </div>
  );
}
