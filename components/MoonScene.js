import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'

export default function MoonScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial color="#cccccc" />
      </Sphere>

      <OrbitControls enableZoom={true} />
    </Canvas>
  )
}
