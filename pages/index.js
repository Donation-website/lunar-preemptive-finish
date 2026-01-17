import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const TOTAL_PARCELS = 90;
const HEX_SIZE = 50; // px

// 90 parcel előre definiálva
const generateParcels = () => {
  return Array.from({ length: TOTAL_PARCELS }, (_, i) => ({
    id: i + 1,
    status: Math.random() < 0.3 ? "occupied" : "available",
    holder: Math.random() < 0.3 ? "American Celestial Research Ltd." : null,
    price: Math.floor(Math.random() * 5000) + 1000,
  }));
};

export default function Home() {
  const [parcels, setParcels] = useState(generateParcels());
  const [selected, setSelected] = useState(null);

  const handleParcelClick = (p) => {
    if (p.status === "occupied") return;
    setSelected(p);
  };

  // Grid layout: 10 hex per sor, 9 sor
  const hexesPerRow = 10;

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
      </Head>
      <main style={{ textAlign: "center", paddingBottom: "50px" }}>
        <h1>Reserve Your Place on the Moon</h1>
        <p>Secure a documented speculative position today. No ownership granted.</p>

        <div style={{ position: "relative", width: 1000, margin: "auto" }}>
          <Image
            src="/moon/moon-map.jpg"
            alt="Moon Map"
            width={1000}
            height={500}
            style={{ objectFit: "cover" }}
          />

          {parcels.map((p, idx) => {
            const row = Math.floor(idx / hexesPerRow);
            const col = idx % hexesPerRow;
            const xOffset = HEX_SIZE * 0.75 * col;
            const yOffset = HEX_SIZE * Math.sqrt(3)/2 * row;

            return (
              <div
                key={p.id}
                onClick={() => handleParcelClick(p)}
                title={`Parcel #${p.id} - $${p.price}`}
                style={{
                  position: "absolute",
                  width: HEX_SIZE,
                  height: HEX_SIZE,
                  left: xOffset,
                  top: yOffset,
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  backgroundColor:
                    p.status === "occupied"
                      ? "red"
                      : selected?.id === p.id
                      ? "blue"
                      : "green",
                  cursor: p.status === "occupied" ? "not-allowed" : "pointer",
                  border: "2px solid #fff",
                }}
              />
            );
          })}
        </div>

        {selected && (
          <div style={{ marginTop: 20 }}>
            <h3>Selected Parcel #{selected.id}</h3>
            <p>Price: ${selected.price}</p>
            <button
              onClick={() =>
                alert(`Proceed to checkout for parcel #${selected.id}`)
              }
            >
              Acquire Pre-Emptive Right
            </button>
          </div>
        )}
      </main>
    </>
  );
}
