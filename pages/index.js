import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [selected, setSelected] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      setMessage("Payment successful. Confirmation will be sent by email.");
    }
    if (params.get("canceled")) {
      setMessage("Payment canceled.");
    }
  }, []);

  async function buy() {
    if (!selected) {
      alert("Please select a parcel on the map first.");
      return;
    }

    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Payment initialization failed.");
    }
  }

  const shareUrl =
    "https://lunar-preemptive-demo-clean.vercel.app"; // majd a végleges domainre cserélheted

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
        <meta
          name="description"
          content="Secure a speculative pre-emptive position on the Moon. Conceptual, forward-looking initiative anticipating future legal frameworks."
        />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top, #111, #000)",
          color: "#fff",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "42px" }}>Reserve Your Place on the Moon</h1>

        <p style={{ maxWidth: "700px", lineHeight: 1.6 }}>
          Humanity is returning to the Moon. Legal frameworks will evolve.
          This platform allows individuals to secure a documented, speculative
          pre-emptive position tied to conceptual lunar coordinates.
        </p>

        <h2>Select a Lunar Parcel</h2>

        <img
          src="/moon.jpg"
          alt="Lunar map"
          style={{
            width: "100%",
            maxWidth: "600px",
            marginTop: "20px",
            border: selected ? "3px solid #4da3ff" : "3px solid #333",
            cursor: "pointer",
          }}
          onClick={() => setSelected(true)}
        />

        {selected && (
          <p style={{ color: "#4da3ff", marginTop: "10px" }}>
            Parcel selected
          </p>
        )}

        <button
          onClick={buy}
          style={{
            marginTop: "30px",
            padding: "16px 30px",
            fontSize: "16px",
            background: "#4da3ff",
            color: "#000",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Acquire Pre-Emptive Right
        </button>

        {message && (
          <p style={{ marginTop: "20px", color: "#6aff6a" }}>{message}</p>
        )}

        {/* SHARE */}
        <div style={{ marginTop: "50px" }}>
          <p>Share this initiative:</p>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
          >
            Facebook
          </a>{" "}
          |{" "}
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
          >
            X
          </a>{" "}
          |{" "}
          <a
            href={`https://www.instagram.com/`}
            target="_blank"
          >
            Instagram
          </a>
        </div>

        <footer
          style={{
            marginTop: "80px",
            fontSize: "13px",
            opacity: 0.7,
          }}
        >
          <p>
            No ownership or property rights are granted under current
            international law (Outer Space Treaty, 1967).
          </p>
          <p>© 2026 Lunar Pre-Emptive Rights · Conceptual initiative</p>
        </footer>
      </main>
    </>
  );
}
