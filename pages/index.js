import dynamic from 'next/dynamic'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  return (
    <div>
      <h1>🌕 Lunar Pre-Emptive Rights – LIVE</h1>

      <div className="social-icons">
        <img src="/social/facebook.png" alt="Facebook" />
        <img src="/social/instagram.png" alt="Instagram" />
        <img src="/social/x.png" alt="X" />
      </div>

      <MoonScene />

      <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', zIndex: 10 }}>
        <button onClick={() => alert("Terms of Service dropdown: ...")}>Terms of Service</button>
      </div>

      <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'white', zIndex: 10 }}>
        Brief description: Select a lunar parcel. Click a green parcel to purchase. After payment, a confirmation email will be sent.
      </div>
    </div>
  )
}
