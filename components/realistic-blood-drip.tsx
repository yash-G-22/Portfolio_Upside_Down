"use client"

import { useEffect, useState, useRef } from "react"

interface BloodDrip {
  id: number
  x: number
  currentHeight: number
  maxHeight: number
  speed: number
  width: number
  delay: number
  hasDroplet: boolean
  dropletY: number
  dropletFalling: boolean
  dropletOpacity: number
}

export function RealisticBloodDrip() {
  const [drips, setDrips] = useState<BloodDrip[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    // Initialize blood drips
    const initialDrips: BloodDrip[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (i / 12) * 100 + Math.random() * 5,
      currentHeight: 0,
      maxHeight: 15 + Math.random() * 50,
      speed: 0.3 + Math.random() * 0.4,
      width: 2 + Math.random() * 4,
      delay: Math.random() * 3000,
      hasDroplet: false,
      dropletY: 0,
      dropletFalling: false,
      dropletOpacity: 1,
    }))
    setDrips(initialDrips)

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      setDrips((prevDrips) =>
        prevDrips.map((drip) => {
          if (elapsed < drip.delay) return drip

          const adjustedTime = elapsed - drip.delay

          // Drip grows
          if (drip.currentHeight < drip.maxHeight && !drip.dropletFalling) {
            const newHeight = Math.min(drip.currentHeight + drip.speed, drip.maxHeight)

            // When drip reaches max, start droplet falling
            if (newHeight >= drip.maxHeight && !drip.hasDroplet) {
              return {
                ...drip,
                currentHeight: newHeight,
                hasDroplet: true,
                dropletY: drip.maxHeight,
                dropletFalling: true,
              }
            }
            return { ...drip, currentHeight: newHeight }
          }

          // Droplet falls
          if (drip.dropletFalling) {
            const newDropletY = drip.dropletY + 2
            const newOpacity = Math.max(0, drip.dropletOpacity - 0.02)

            // Reset when droplet disappears
            if (newOpacity <= 0) {
              return {
                ...drip,
                currentHeight: 0,
                hasDroplet: false,
                dropletY: 0,
                dropletFalling: false,
                dropletOpacity: 1,
                maxHeight: 15 + Math.random() * 50,
                delay: drip.delay + 3000 + Math.random() * 2000,
              }
            }

            return {
              ...drip,
              dropletY: newDropletY,
              dropletOpacity: newOpacity,
              // Drip retracts as droplet falls
              currentHeight: Math.max(0, drip.currentHeight - 0.3),
            }
          }

          return drip
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 h-32 overflow-visible pointer-events-none z-40">
      {/* Main blood bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: "linear-gradient(180deg, #8B0000 0%, #5c0000 50%, #3d0000 100%)",
          boxShadow: "0 2px 8px rgba(139, 0, 0, 0.5), 0 0 20px rgba(180, 0, 0, 0.3)",
        }}
      />

      {/* Coagulated edge */}
      <div
        className="absolute top-1 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(180deg, rgba(60, 0, 0, 0.8) 0%, transparent 100%)",
        }}
      />

      {drips.map((drip) => (
        <div key={drip.id} className="absolute top-1" style={{ left: `${drip.x}%` }}>
          {/* Main drip body */}
          {drip.currentHeight > 0 && (
            <svg
              width={drip.width + 4}
              height={drip.currentHeight + 10}
              className="overflow-visible"
              style={{ marginLeft: -(drip.width + 4) / 2 }}
            >
              <defs>
                <linearGradient id={`blood-grad-${drip.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B0000" />
                  <stop offset="30%" stopColor="#6B0000" />
                  <stop offset="70%" stopColor="#4a0000" />
                  <stop offset="100%" stopColor="#3d0000" />
                </linearGradient>
                <filter id={`blood-glow-${drip.id}`}>
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Drip shape - organic teardrop */}
              <path
                d={`
                  M ${(drip.width + 4) / 2} 0
                  Q ${drip.width + 2} ${drip.currentHeight * 0.3} ${drip.width + 1} ${drip.currentHeight * 0.6}
                  Q ${drip.width} ${drip.currentHeight * 0.85} ${(drip.width + 4) / 2} ${drip.currentHeight + 5}
                  Q ${4 - drip.width} ${drip.currentHeight * 0.85} ${3} ${drip.currentHeight * 0.6}
                  Q ${2} ${drip.currentHeight * 0.3} ${(drip.width + 4) / 2} 0
                `}
                fill={`url(#blood-grad-${drip.id})`}
                filter={`url(#blood-glow-${drip.id})`}
              />

              {/* Highlight for wet look */}
              <ellipse
                cx={(drip.width + 4) / 2 - 1}
                cy={drip.currentHeight * 0.3}
                rx={1}
                ry={3}
                fill="rgba(255, 100, 100, 0.3)"
              />
            </svg>
          )}

          {/* Falling droplet */}
          {drip.hasDroplet && drip.dropletFalling && (
            <div
              className="absolute"
              style={{
                top: drip.dropletY,
                left: -3,
                opacity: drip.dropletOpacity,
              }}
            >
              <svg width="8" height="12" className="overflow-visible">
                <defs>
                  <radialGradient id={`droplet-grad-${drip.id}`}>
                    <stop offset="0%" stopColor="#8B0000" />
                    <stop offset="70%" stopColor="#5c0000" />
                    <stop offset="100%" stopColor="#3d0000" />
                  </radialGradient>
                </defs>
                <ellipse
                  cx="4"
                  cy="6"
                  rx="3"
                  ry="5"
                  fill={`url(#droplet-grad-${drip.id})`}
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(139, 0, 0, 0.6))",
                  }}
                />
                {/* Droplet highlight */}
                <ellipse cx="3" cy="4" rx="1" ry="1.5" fill="rgba(255, 150, 150, 0.4)" />
              </svg>
            </div>
          )}
        </div>
      ))}

      {/* Pooled blood effect at bottom of drips */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139, 0, 0, 0.3) 20%, rgba(139, 0, 0, 0.5) 50%, rgba(139, 0, 0, 0.3) 80%, transparent 100%)",
        }}
      />
    </div>
  )
}
