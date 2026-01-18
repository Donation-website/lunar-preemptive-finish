import dynamic from 'next/dynamic'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  return (
    <div>
      <h1>🌕 Lunar Pre-Emptive Rights – LIVE</h1>

      <div className="social-icons">
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

      <MoonScene />

      <div className="description">
        Select a green lunar parcel to acquire a speculative pre-emptive right.
        Red parcels are already reserved.
      </div>

      <div className="tos">
        <details>
          <summary>Terms of Service</summary>
          <p>
            No ownership rights are granted. This project is conceptual and
            subject to future international legal frameworks, including the
            Outer Space Treaty (1967).
          </p>
        </details>
      </div>
    </div>
  )
}
