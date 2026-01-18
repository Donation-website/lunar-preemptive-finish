import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const PARCEL_COUNT = 180
const MOON_RADIUS = 5

export default function MoonScene() {
  const mountRef = useRef(null)
  const [hoverInfo, setHoverInfo] = useState(null)

  useEffect(() => {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    /* LIGHTS */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    /* MOON */
    const moonTexture = new THREE.TextureLoader().load('/moon/moon-map.jpg')
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(MOON_RADIUS, 64, 64),
      new THREE.MeshStandardMaterial({ map: moonTexture })
    )
    scene.add(moon)

    /* CONTROLS */
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.minDistance = 7
    controls.maxDistance = 18

    /* PARCELS */
    const parcels = []
    const parcelData = []

    for (let i = 0; i < PARCEL_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = MOON_RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = MOON_RADIUS * Math.cos(phi)
      const z = MOON_RADIUS * Math.sin(phi) * Math.sin(theta)

      const geometry = new THREE.CircleGeometry(0.18, 32)
      const isSold = Math.random() < 0.25

      const material = new THREE.MeshBasicMaterial({
        color: isSold ? 0xff3333 : 0x00ff88,
        transparent: true,
        opacity: isSold ? 0.6 : 0.9,
        side: THREE.DoubleSide
      })

      const parcel = new THREE.Mesh(geometry, material)
      parcel.position.set(x, y, z)
      parcel.lookAt(0, 0, 0)
      parcel.userData = {
        id: i + 1,
        sold: isSold,
        price: isSold ? null : 299 + Math.floor(Math.random() * 700)
      }

      parcels.push(parcel)
      parcelData.push(parcel.userData)
      scene.add(parcel)
    }

    /* RAYCAST */
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(parcels)

      if (intersects.length > 0) {
        const p = intersects[0].object.userData
        setHoverInfo({
          x: event.clientX,
          y: event.clientY,
          text: `Parcel #${p.id} – ${p.sold ? 'Occupied' : '$' + p.price}`
        })
      } else {
        setHoverInfo(null)
      }
    }

    function onClick() {
      if (!hoverInfo) return
      const id = parseInt(hoverInfo.text.match(/\d+/)[0])
      const parcel = parcels.find(p => p.userData.id === id)
      if (parcel.userData.sold) return

      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parcelId: id,
          price: parcel.userData.price
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.url) window.location.href = data.url
        })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)

    function animate() {
      requestAnimationFrame(animate)
      moon.rotation.y += 0.0008
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [hoverInfo])

  return (
    <>
      <div ref={mountRef} />
      {hoverInfo && (
        <div
          className="parcel-label"
          style={{ left: hoverInfo.x + 12, top: hoverInfo.y + 12 }}
        >
          {hoverInfo.text}
        </div>
      )}
    </>
  )
}
