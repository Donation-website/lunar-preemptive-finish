import Head from 'next/head'
import dynamic from 'next/dynamic'
import ParcelInfo from '../components/ParcelInfo'
import ASZFDropdown from '../components/ASZFDropdown'
import SocialLinks from '../components/SocialLinks'

// Dinamikusan betöltjük a 3D MoonScene-t (ne legyen server-side render)
const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  // Példa parcel adatok – később a backendből jön
  const parcel = {
    id: '001',
    status: 'available',
    holder: null,
    size: '10x10 km',
    price: 50000 // USD
  }

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
        <meta name="description" content="Speculative lunar parcels. Secure your position on the Moon today!" />
        <meta name="keywords" content="Moon, Lunar, Pre-Emptive, Rights, Space, Parcel, Buy Moon, Lunar Property, Extraterrestrial, Legal, Speculative" />
      </Head>

      <h1 style={{
        position: 'absolute',
        zIndex: 10,
        color: 'white',
        padding: '20px'
      }}>
        🌕 Lunar Pre-Emptive Rights – LIVE
      </h1>

      <p style={{
        position: 'absolute',
        top: '80px',
        left: '20px',
        color: 'white',
        maxWidth: '400px',
        zIndex: 10
      }}>
        Secure your speculative lunar parcel today! Each parcel is unique and can be purchased directly from the interactive moon map.
      </p>

      <MoonScene />

      <ParcelInfo parcel={parcel} />
      <ASZFDropdown />
      <SocialLinks />
    </>
  )
}
