import dynamic from 'next/dynamic'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  return (
    <div>
      <h1>🌕 Lunar Pre-Emptive Rights – LIVE</h1>
      <MoonScene />

      <div className="aszf-container">
        <details>
          <summary>ÁSZF</summary>
          <p>Ez a szolgáltatás spekulatív és nem biztosít tulajdonjogot a Holdon. A vásárlásodat dokumentáltan rögzítjük a jövőbeli jogszabályi változások reményében.</p>
        </details>
      </div>

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a>
      </div>
    </div>
  )
}
