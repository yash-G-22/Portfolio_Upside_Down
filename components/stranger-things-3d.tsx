"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

// Demogorgon Head
function DemogorgonHead({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} ref={meshRef}>
        {/* Head base */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial color="#3a1515" distort={0.3} speed={2} roughness={0.8} />
        </mesh>
        {/* Petal faces - the iconic demogorgon head petals */}
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.sin((i * Math.PI * 2) / 5) * 0.3, 0.3, Math.cos((i * Math.PI * 2) / 5) * 0.3]}
            rotation={[0.5, (i * Math.PI * 2) / 5, 0]}
          >
            <coneGeometry args={[0.25, 0.6, 4]} />
            <meshStandardMaterial color="#5a1f1f" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Christmas Light Bulb
function ChristmasLight({ position, color }: { position: [number, number, number]; color: string }) {
  const lightRef = useRef<THREE.PointLight>(null)
  const bulbRef = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const flicker = Math.sin(state.clock.elapsedTime * 3 + offset) > 0.3 ? 1 : 0.1
    if (lightRef.current) {
      lightRef.current.intensity = flicker * 2
    }
    if (bulbRef.current) {
      ;(bulbRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flicker * 2
    }
  })

  return (
    <group position={position}>
      <mesh ref={bulbRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      <pointLight ref={lightRef} color={color} intensity={2} distance={3} />
      {/* Bulb cap */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.08, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Christmas Lights String
function ChristmasLightsString() {
  const colors = ["#ff0000", "#00ff00", "#0066ff", "#ffff00", "#ff00ff", "#00ffff"]
  const lights = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      position: [-5 + i * 0.9, 2.5 + Math.sin(i * 0.5) * 0.3, -2] as [number, number, number],
      color: colors[i % colors.length],
    }))
  }, [])

  return (
    <group>
      {/* Wire */}
      <mesh>
        <tubeGeometry
          args={[new THREE.CatmullRomCurve3(lights.map((l) => new THREE.Vector3(...l.position))), 64, 0.02, 8, false]}
        />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {lights.map((light, i) => (
        <ChristmasLight key={i} position={light.position} color={light.color} />
      ))}
    </group>
  )
}

// Eggo Waffle
function EggoWaffle({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={position}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial color="#d4a054" roughness={0.8} />
        </mesh>
        {/* Waffle grid pattern */}
        {[...Array(9)].map((_, i) => (
          <mesh key={i} position={[((i % 3) - 1) * 0.2, 0.06, (Math.floor(i / 3) - 1) * 0.2]}>
            <boxGeometry args={[0.15, 0.02, 0.15]} />
            <meshStandardMaterial color="#b8863c" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Walkie Talkie
function WalkieTalkie({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group position={position} rotation={[0.2, 0.3, 0.1]}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[0.3, 0.6, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0.08, 0.45, 0]}>
          <cylinderGeometry args={[0.02, 0.015, 0.4, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.1, 0.08]}>
          <boxGeometry args={[0.2, 0.15, 0.01]} />
          <meshStandardMaterial color="#1a3a1a" emissive="#00ff00" emissiveIntensity={0.3} />
        </mesh>
        {/* Speaker grille */}
        <mesh position={[0, -0.15, 0.08]}>
          <boxGeometry args={[0.2, 0.2, 0.01]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  )
}

// Vecna Clock
function VecnaClock({ position }: { position: [number, number, number] }) {
  const hourRef = useRef<THREE.Mesh>(null)
  const minuteRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (hourRef.current) {
      hourRef.current.rotation.z = -state.clock.elapsedTime * 0.1
    }
    if (minuteRef.current) {
      minuteRef.current.rotation.z = -state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
      <group position={position}>
        {/* Clock face */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
          <meshStandardMaterial color="#1a1008" roughness={0.7} />
        </mesh>
        {/* Clock rim */}
        <mesh>
          <torusGeometry args={[0.5, 0.05, 16, 32]} />
          <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Hour hand */}
        <mesh ref={hourRef} position={[0, 0, 0.06]}>
          <boxGeometry args={[0.04, 0.25, 0.02]} />
          <meshStandardMaterial color="#2a1a0a" />
        </mesh>
        {/* Minute hand */}
        <mesh ref={minuteRef} position={[0, 0, 0.07]}>
          <boxGeometry args={[0.03, 0.35, 0.02]} />
          <meshStandardMaterial color="#1a0a00" />
        </mesh>
        {/* Center pin */}
        <mesh position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#8b7355" metalness={0.8} />
        </mesh>
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.sin((i * Math.PI * 2) / 12) * 0.4, Math.cos((i * Math.PI * 2) / 12) * 0.4, 0.06]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#8b7355" />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Floating spores/particles from Upside Down
function UpsideDownSpore({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002
      ref.current.position.x += Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.001
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03 + Math.random() * 0.03, 8, 8]} />
      <meshStandardMaterial color="#4a2020" emissive="#ff2222" emissiveIntensity={0.3} transparent opacity={0.6} />
    </mesh>
  )
}

export function StrangerThings3DScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff4444" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4444ff" />

        {/* Stranger Things 3D Objects */}
        <DemogorgonHead position={[-4, 2, -3]} />
        <ChristmasLightsString />
        <EggoWaffle position={[4, -1, -2]} />
        <WalkieTalkie position={[-3, -2, -1]} />
        <VecnaClock position={[3.5, 2, -2]} />

        {/* Floating spores */}
        {[...Array(20)].map((_, i) => (
          <UpsideDownSpore
            key={i}
            position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, -2 - Math.random() * 3]}
          />
        ))}

        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
