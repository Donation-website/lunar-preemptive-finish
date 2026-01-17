import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState(null);

  async function buy() {
    if (!selected) {
      alert("Please select a parcel on the map first.");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parcel: selected })
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || "Payment failed");
  }

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
        <meta
          name="description"
          content="A speculative pre-emptive registration platform anticipating future lunar legal frameworks."
        />
        <meta
          name="keywords"
          content="moon land, lunar land, space law, future ownership, preemptive rights, Elon Musk space"
        />
      </Head>

      <main className="container">
        <section className="hero">
          <h1>Reserve Your Place on the Moon</h1>
          <p className="lead">
            Humanity is returning to the Moon. Laws will follow.
            Secure a documented speculative position today.
          </p>
        </section>

        <section className="map">
          <h2>Select a Lunar Parcel</h2>
          <img
            src="/moon.jpg"
            alt="Lunar map"
            onClick={() => setSelected("Parcel-002")}
            className={selected ? "map selected" : "map"}
          />
          {selected && <p className="selected">Selected: {selected}</p>}
        </section>

        <section className="purchase">
          <button onClick={buy}>Acquire Pre-Emptive Right</button>
        </section>

        <footer>
          <p>
            No ownership is granted. This service is speculative and subject to
            future international legal frameworks (Outer Space Treaty, 1967).
          </p>

          <div className="socials">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://lunar-preemptive-rights.vercel.app" target="_blank">Facebook</a>
            <a href="https://twitter.com/intent/tweet?text=The%20future%20of%20the%20Moon%20starts%20now" target="_blank">X</a>
            <a href="https://www.instagram.com/" target="_blank">Instagram</a>
          </div>

          <p className="copy">© 2026 Lunar Pre-Emptive Rights</p>
        </footer>
      </main>
    </>
  );
}
