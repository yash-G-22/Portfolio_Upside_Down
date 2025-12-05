"use client"

import { useState } from "react"

interface UpsideDownCubeProps {
  onFlip: (isFlipped: boolean) => void
  isFlipped: boolean
}

export function UpsideDownCube({ onFlip, isFlipped }: UpsideDownCubeProps) {
  const [cubeHovered, setCubeHovered] = useState(false)

  const handleClick = () => {
    onFlip(!isFlipped)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      {/* Vecna tendrils around the cube - hidden on mobile */}
      <div className="absolute -inset-8 pointer-events-none hidden sm:block">
        <svg className="w-full h-full opacity-40" viewBox="0 0 200 200">
          <defs>
            <filter id="tendril-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#tendril-glow)" stroke="oklch(0.55 0.28 25)" fill="none" strokeWidth="2">
            <path d="M100 0 Q80 40 100 50" className="animate-tendril-1" />
            <path d="M200 100 Q160 80 150 100" className="animate-tendril-2" />
            <path d="M100 200 Q120 160 100 150" className="animate-tendril-3" />
            <path d="M0 100 Q40 120 50 100" className="animate-tendril-4" />
            {/* Vecna clock circles */}
            <circle cx="100" cy="100" r="70" strokeDasharray="10 5" className="animate-clock-spin" />
            <circle cx="100" cy="100" r="85" strokeDasharray="5 10" className="animate-clock-spin-reverse" />
          </g>
        </svg>
      </div>

      <div
        className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 cursor-pointer group"
        style={{ perspective: "600px" }}
        onClick={handleClick}
        onMouseEnter={() => setCubeHovered(true)}
        onMouseLeave={() => setCubeHovered(false)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : cubeHovered ? "rotateY(15deg) rotateX(-10deg)" : "rotateY(0deg)",
            animation: !isFlipped ? "cube-float 4s ease-in-out infinite" : "none",
          }}
        >
          {/* Front face */}
          <div
            className={`absolute w-full h-full border-2 border-stranger-red bg-upside-down/95 backdrop-blur-sm flex items-center justify-center ${cubeHovered && !isFlipped ? "animate-glow-pulse" : ""}`}
            style={{
              transform: "translateZ(28px) sm:translateZ(40px)",
              boxShadow: "0 0 20px oklch(0.55 0.25 25 / 0.6), inset 0 0 15px oklch(0.55 0.25 25 / 0.2)",
            }}
          >
            <span className="text-stranger-red text-lg sm:text-xl md:text-2xl font-bold stranger-text animate-subtle-flicker">
              ▲
            </span>
          </div>

          {/* Back face */}
          <div
            className="absolute w-full h-full border-2 border-stranger-red bg-upside-down/95 backdrop-blur-sm flex items-center justify-center"
            style={{
              transform: "rotateY(180deg) translateZ(28px) sm:translateZ(40px)",
              boxShadow: "0 0 20px oklch(0.55 0.25 25 / 0.6), inset 0 0 15px oklch(0.55 0.25 25 / 0.2)",
            }}
          >
            <span className="text-stranger-red text-lg sm:text-xl md:text-2xl font-bold stranger-text animate-subtle-flicker">
              ▼
            </span>
          </div>

          {/* Right face */}
          <div
            className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 flex items-center justify-center"
            style={{
              transform: "rotateY(90deg) translateZ(28px) sm:translateZ(40px)",
              boxShadow: "0 0 15px oklch(0.55 0.25 25 / 0.4)",
            }}
          >
            <span className="text-stranger-red text-sm sm:text-lg font-bold stranger-text">U</span>
          </div>

          {/* Left face */}
          <div
            className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 flex items-center justify-center"
            style={{
              transform: "rotateY(-90deg) translateZ(28px) sm:translateZ(40px)",
              boxShadow: "0 0 15px oklch(0.55 0.25 25 / 0.4)",
            }}
          >
            <span className="text-stranger-red text-sm sm:text-lg font-bold stranger-text">D</span>
          </div>

          {/* Top face */}
          <div
            className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 flex items-center justify-center"
            style={{
              transform: "rotateX(90deg) translateZ(28px) sm:translateZ(40px)",
              boxShadow: "0 0 15px oklch(0.55 0.25 25 / 0.4)",
            }}
          >
            <span className="text-stranger-red text-[10px] sm:text-xs font-bold stranger-text">UP</span>
          </div>

          {/* Bottom face */}
          <div
            className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 flex items-center justify-center"
            style={{
              transform: "rotateX(-90deg) translateZ(28px) sm:translateZ(40px)",
              boxShadow: "0 0 15px oklch(0.55 0.25 25 / 0.4)",
            }}
          >
            <span className="text-stranger-red text-[10px] sm:text-xs font-bold stranger-text">DN</span>
          </div>
        </div>
      </div>

      <p className="text-center mt-2 sm:mt-3 text-stranger-red/60 text-[8px] sm:text-xs tracking-widest animate-subtle-flicker">
        {isFlipped ? "RIGHT SIDE UP" : "UPSIDE DOWN"}
      </p>
    </div>
  )
}
