import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  const [showTerms, setShowTerms] = useState(false)

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
        <meta
          name="description"
          content="Reserve a documented speculative pre-emptive position on the Moon. No ownership today. Prepared for future international legal frameworks."
        />
        <meta name="keywords" content="moon land, lunar parcels, space law, moon ownership, lunar rights, space investment" />
      </Head>

      <main>
        <h1>🌕 Lunar Pre-Emptive Rights</h1>

        <p className="description">
          Humanity is returning to the Moon.  
          Laws will follow.  
          This platform allows individuals to secure a documented, speculative
          pre-emptive position linked to specific lunar coordinates.
        </p>

        <MoonScene />

        <section className="info">
          <p>
            No ownership is granted under current international law
            (Outer Space Treaty, 1967).  
            This service exists in anticipation of future legal change.
          </p>

          <button onClick={() => setShowTerms(!showTerms)}>
            {showTerms ? 'Hide Terms & Conditions' : 'View Terms & Conditions'}
          </button>

          {showTerms && (
            <div className="terms">
              <p>
                This is a speculative, symbolic reservation service.
                No legal property rights are transferred.
                Documentation may be referenced if international law evolves.
              </p>
            </div>
          )}
        </section>

        <footer>
          <div className="social">
            <a href="https://facebook.com" target="_blank">
              <img src="/icons/fb.png" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <img src="/icons/insta.png" alt="Instagram" />
            </a>
            <a href="https://x.com" target="_blank">
              <img src="/icons/x.png" alt="X" />
            </a>
          </div>

          <p>© 2026 Lunar Pre-Emptive Rights</p>
        </footer>
      </main>
    </>
  )
}
