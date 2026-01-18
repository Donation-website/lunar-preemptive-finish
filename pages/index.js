import dynamic from 'next/dynamic'
import Header from '../components/Header'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  return (
    <>
      <Header />
      <MoonScene />
    </>
  )
}
