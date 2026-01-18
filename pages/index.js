import { useState } from "react";

const TOTAL = 180;

function generateParcels() {
  const parcels = [];
  const cols = 18;
  const rows = 10;
  let id = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (id > TOTAL) break;

      parcels.push({
        id,
        x: 6 + c * 5 + (r % 2 ? 2.5 : 0),
        y: 6 + r * 6,
        sold: id % 7 === 0, // demo foglaltság
        price: id % 3 === 0 ? 250 : 500,
      });

      id++;
    }
  }
  return parcels;
}

export default function Home() {
  const [selected, setSelected] = useState(null);
  const parcels = generateParcels();

  async function buy() {
    if (!selected) return alert("Select a parcel first");

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parcelId: selected.id,
        price: selected.price,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Reserve Your Place on the Moon</h1>

      <p>
        Humanity is returning to the Moon. Laws will follow.  
        This platform offers a documented, speculative pre-emptive position
        tied to lunar coordinates.
      </p>

      <div style={{ position: "relative", maxWidth: 900 }}>
        <img
          src="/moon/moon-map.jpg"
          style={{ width: "100%", borderRadius: 8 }}
        />

        <svg
          viewBox="0 0 100 50"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {parcels.map((p) => (
            <polygon
              key={p.id}
              points="1,0 3,0 4,2 3,4 1,4 0,2"
              transform={`translate(${p.x},${p.y}) scale(1.2)`}
              fill={p.sold ? "#b22222" : "#2ecc71"}
              stroke="black"
              strokeWidth="0.3"
              opacity="0.85"
              onClick={() => !p.sold && setSelected(p)}
            />
          ))}
        </svg>
      </div>

      {selected && (
        <div style={{ marginTop: 20 }}>
          <strong>Parcel #{selected.id}</strong> — ${selected.price}
          <br />
          <button onClick={buy}>Acquire Pre-Emptive Right</button>
        </div>
      )}

      <details style={{ marginTop: 30 }}>
        <summary>Terms & Legal Notice</summary>
        <p>
          No ownership or territorial rights are granted.  
          Subject to international law, including the Outer Space Treaty (1967).
        </p>
      </details>

      <footer style={{ marginTop: 40 }}>
        <a href="https://facebook.com">Facebook</a>{" "}
        <a href="https://instagram.com">Instagram</a>{" "}
        <a href="https://x.com">X</a>
        <p>© 2026 Lunar Pre-Emptive Rights</p>
      </footer>
    </div>
  );
}
