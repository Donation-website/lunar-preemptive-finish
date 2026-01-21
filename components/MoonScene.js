import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useState } from 'react'

function MoonSystem() {
  const group = useRef()
  const [hovered, setHovered] = useState(null)

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.001
  })

  const parcels = useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.02
      const free = Math.random() > 0.3

      return {
        index: i,
        free,
        price: 10,
        area: 100,
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        )
      }
    })
  }, [])

  const handleClick = async (p) => {
    if (!p.free) return
    const email = prompt('Enter your email for confirmation:')
    if (!email) return

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parcel: p.index, email })
    })

    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <group ref={group}>
      {/* Moon */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={new THREE.TextureLoader().load('/moon/moon-map.jpg')} />
      </mesh>

      {/* Parcels */}
      {parcels.map(p => (
        <mesh
          key={p.index}
          position={p.pos}
          onPointerOver={() => setHovered(p)}
          onPointerOut={() => setHovered(null)}
          onClick={() => handleClick(p)}
        >
          <ringGeometry args={[0.03, 0.05, 32]} />
          <meshBasicMaterial
            color={p.free ? 'lime' : 'red'}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Tooltip */}
      {hovered && (
        <Html position={hovered.pos.clone().multiplyScalar(1.05)}>
          <div style={{
            background: '#000',
            color: '#fff',
            padding: '6px',
            fontSize: '12px',
            borderRadius: '6px'
          }}>
            Parcel #{hovered.index}<br/>
            Area: {hovered.area} km²<br/>
            Price: ${hovered.price}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function MoonScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5,5,5]} />
      <MoonSystem />
      <OrbitControls />
    </Canvas>
  )
}
