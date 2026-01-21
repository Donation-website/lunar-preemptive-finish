import dynamic from 'next/dynamic'

const MoonScene = dynamic(() => import('../components/MoonScene'), {
  ssr: false
})

export default function Home() {
  return <MoonScene />
}
