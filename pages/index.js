import dynamic from 'next/dynamic'
import Head from 'next/head'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights – LIVE</title>
      </Head>

      <h1>🌕 Lunar Pre-Emptive Rights – LIVE</h1>

      <MoonScene />

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/fb.png" alt="Facebook"/>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/insta.png" alt="Instagram"/>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/x.png" alt="X"/>
        </a>
      </div>
    </>
  )
}
