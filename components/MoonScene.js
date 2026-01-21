import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useState } from 'react'

function MoonWithParcels() {
  const group = useRef()

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001
    }
  })

  const parcels = useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.02
      return {
        id: i,
        sold: Math.random() < 0.25,
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        )
      }
    })
  }, [])

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/moon/moon-map.jpg')}
        />
      </mesh>

      {parcels.map(p => (
        <mesh key={p.id} position={p.position}>
          <circleGeometry args={[0.05, 32]} />
          <meshBasicMaterial
            color={p.sold ? 'red' : 'lime'}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function MoonScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <MoonWithParcels />
      <OrbitControls enableZoom enableRotate />
    </Canvas>
  )
}
