import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useState } from 'react'

function MoonSystem({ onHover }) {
  const group = useRef()

  useFrame(() => {
    group.current.rotation.y += 0.001
  })

  const parcels = useMemo(() =>
    Array.from({ length: 160 }).map((_, i) => {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.55
      return {
        id: i,
        free: Math.random() > 0.3,
        price: 10,
        area: 100,
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        )
      }
    }), [])

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial map={new THREE.TextureLoader().load('/moon/moon-map.jpg')} />
      </mesh>

      {parcels.map(p => (
        <mesh
          key={p.id}
          position={p.pos}
          onPointerOver={() => onHover(p)}
          onPointerOut={() => onHover(null)}
        >
          <ringGeometry args={[0.035, 0.055, 32]} />
          <meshBasicMaterial color={p.free ? 'lime' : 'red'} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export default function MoonScene() {
  const [hover, setHover] = useState(null)

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <MoonSystem onHover={setHover} />
        <OrbitControls enableZoom />
      </Canvas>

      {hover && (
        <div className="tooltip">
          Parcel #{hover.id}<br />
          Area: {hover.area} km²<br />
          Price: ${hover.price}
        </div>
      )}
    </>
  )
}
