import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import ParcelOverlay from './ParcelOverlay'

export default function MoonScene() {
  // 3D hex parcellák (random elosztva a Hold térképen)
  const parcels = Array.from({ length: 180 }).map((_, i) => ({
    id: i + 1,
    x: Math.random() * 1.8 - 0.9, // normalized coords
    y: Math.random() * 1.8 - 0.9,
    status: Math.random() < 0.3 ? 'occupied' : 'available', // 30% foglalt
    size: Math.random() * 0.03 + 0.02,
    price: Math.floor(Math.random() * 1000 + 500) // USD
  }))

  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          attach="material"
          map={null} // texture beállítva alább
          color="white"
          distort={0}
          speed={0.1}
        />
      </Sphere>
      <ParcelOverlay parcels={parcels} />
      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  )
}
