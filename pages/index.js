import dynamic from 'next/dynamic'
import ASZFDropdown from '../components/ASZFDropdown'
import SocialLinks from '../components/SocialLinks'
import ParcelInfo from '../components/ParcelInfo'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  const parcel = {
    id: 1,
    size: 25,
    price: 2999,
    sold: false,
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <h1 style={{
        position: 'absolute',
        zIndex: 10,
        color: 'white',
        padding: '20px'
      }}>
        🌕 Lunar Pre-Emptive Rights – LIVE
      </h1>

      <MoonScene />
      <ParcelInfo parcel={parcel} />
      <ASZFDropdown />
      <SocialLinks />
    </div>
  )
}
