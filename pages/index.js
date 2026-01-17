import Head from "next/head";

export default function Home() {
  async function buy(parcelId) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parcelId })
    });
    const data = await res.json();
    if (data.url) window.location = data.url;
    else alert("Payment initialization failed.");
  }

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
        <meta name="description" content="Secure a speculative pre-emptive position on lunar surface usage in anticipation of future space law frameworks." />
        <meta name="keywords" content="moon land, lunar land, space law, preemptive rights, future ownership, Elon Musk space, moon economy" />
      </Head>

      <div className="container">
        <section className="hero">
          <div>
            <h1>Reserve Your Place on the Moon</h1>
            <p>
              Humanity is returning to the Moon. Legal frameworks will evolve.
              This platform allows individuals to secure a documented,
              speculative pre-emptive position tied to specific lunar coordinates.
            </p>
            <p>
              <strong>No ownership is granted today.</strong><br/>
              This service exists in anticipation of future international legal change.
            </p>
          </div>
          <img src="/moon.jpg" alt="Lunar surface map" />
        </section>

        <h2>Available Parcels</h2>

        <div className="parcel occupied">
          <strong>Parcel #001</strong><br/>
          Status: Occupied<br/>
          Holder: American Celestial Research Ltd.
        </div>

        <div className="parcel available">
          <strong>Parcel #002</strong><br/>
          Status: Available<br/>
          <button onClick={() => buy(2)}>Acquire Pre-Emptive Right</button>
        </div>

        <footer>
          <p>
            By purchasing, you acknowledge that no property rights are granted under
            current international law (Outer Space Treaty, 1967).
          </p>

          <div className="socials">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com" target="_blank">Facebook</a>
            <a href="https://twitter.com/intent/tweet?text=The%20future%20of%20the%20Moon%20starts%20now" target="_blank">X</a>
            <a href="https://www.instagram.com/" target="_blank">Instagram</a>
          </div>

          <p>© 2026 Lunar Pre-Emptive Rights. Conceptual initiative.</p>
        </footer>
      </div>
    </>
  );
}
