"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  color: "red" | "blue"
}

interface FloatingParticlesProps {
  count?: number
}

export function FloatingParticles({ count = 30 }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      color: Math.random() > 0.5 ? "red" : "blue",
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.color === "red"
              ? "bg-stranger-red shadow-[0_0_10px_oklch(0.55_0.25_25)]"
              : "bg-stranger-blue shadow-[0_0_10px_oklch(0.35_0.15_260)]"
          }`}
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `particle-float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}
