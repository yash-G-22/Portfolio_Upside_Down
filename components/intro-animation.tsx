"use client"

import { useState, useEffect } from "react"
import { FloatingParticles } from "./floating-particles"
import { FlickeringText } from "./flickering-text"

interface IntroAnimationProps {
  onEnter: () => void
}

export function IntroAnimation({ onEnter }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"vecna" | "cube" | "flipping">("vecna")
  const [showLightning, setShowLightning] = useState(false)
  const [cubeHovered, setCubeHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLightning(true)
    }, 500)

    const timer2 = setTimeout(() => {
      setPhase("cube")
    }, 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleCubeClick = () => {
    setIsFlipped(true)
    setPhase("flipping")
    setTimeout(() => {
      onEnter()
    }, 1800)
  }

  return (
    <div className="fixed inset-0 bg-upside-down overflow-hidden">
      {/* Fog layers */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-stranger-red/10 to-transparent"
          style={{ animation: "fog-drift 20s linear infinite" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-stranger-blue/10 to-transparent"
          style={{ animation: "fog-drift 25s linear infinite reverse", animationDelay: "-5s" }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles count={50} />

      {/* Lightning effect */}
      {showLightning && (
        <div
          className="absolute inset-0 bg-stranger-red/20 pointer-events-none"
          style={{ animation: "lightning 4s infinite" }}
        />
      )}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-15" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <filter id="vecna-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Vecna tendrils crawling from corners */}
          <g filter="url(#vecna-glow)" stroke="oklch(0.55 0.28 25)" fill="none" strokeWidth="3">
            <path d="M0 0 Q200 300 100 500 T150 800 T50 1000" className="animate-tendril-1" />
            <path d="M1000 0 Q800 250 900 450 T850 700 T950 1000" className="animate-tendril-2" />
            <path d="M0 1000 Q250 800 200 600 T300 350 T150 0" className="animate-tendril-3" />
            <path d="M1000 1000 Q750 750 850 550 T700 300 T800 0" className="animate-tendril-4" />
            {/* Central Vecna clock pattern */}
            <circle cx="500" cy="500" r="200" strokeDasharray="20 10" className="animate-clock-spin" />
            <circle cx="500" cy="500" r="150" strokeDasharray="10 20" className="animate-clock-spin-reverse" />
          </g>
        </svg>
      </div>

      {/* Demodragon silhouette in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg viewBox="0 0 400 400" className="w-[80vw] h-[80vh] max-w-[800px] max-h-[800px]">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)" className="animate-subtle-flicker">
            <path
              d="M200 50 L220 30 L230 60 L250 40 L255 70 L280 50 L275 80 L300 70 L290 100 L320 100 L300 130 L340 140 L310 160 L350 180 L300 190 L330 220 L280 220 L300 260 L260 250 L270 300 L230 280 L240 340 L200 310 L160 340 L170 280 L130 300 L140 250 L100 260 L120 220 L70 220 L100 190 L50 180 L90 160 L60 140 L100 130 L80 100 L110 100 L100 70 L125 80 L120 50 L145 70 L150 40 L170 60 L180 30 L200 50 Z"
              fill="none"
              stroke="oklch(0.55 0.25 25)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle cx="160" cy="150" r="8" fill="oklch(0.55 0.25 25)" className="animate-pulse" />
            <circle cx="240" cy="150" r="8" fill="oklch(0.55 0.25 25)" className="animate-pulse" />
          </g>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {phase === "vecna" && (
          <div className="text-center" style={{ animation: "vecna-entrance 2s ease-out forwards" }}>
            <FlickeringText
              text="THE UPSIDE DOWN"
              className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-[0.2em] text-stranger-red stranger-text"
            />
            <p className="mt-4 text-stranger-red/60 text-lg tracking-widest animate-subtle-flicker">AWAITS YOU</p>
          </div>
        )}

        {(phase === "cube" || phase === "flipping") && (
          <div className="flex flex-col items-center gap-8">
            <FlickeringText
              text="CLICK TO ENTER"
              className="text-xl md:text-2xl tracking-[0.3em] text-stranger-red/80 stranger-text"
            />

            <div
              className="relative w-48 h-48 md:w-64 md:h-64 cursor-pointer"
              style={{ perspective: "1200px" }}
              onClick={handleCubeClick}
              onMouseEnter={() => setCubeHovered(true)}
              onMouseLeave={() => setCubeHovered(false)}
            >
              <div
                className="relative w-full h-full transition-transform duration-[1500ms] ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped
                    ? "rotateY(180deg)"
                    : cubeHovered
                      ? "rotateY(15deg) rotateX(-10deg)"
                      : "rotateY(0deg)",
                  animation: !isFlipped && phase === "cube" ? "cube-float 4s ease-in-out infinite" : "none",
                }}
              >
                {/* Front face - shows YASH initially */}
                <div
                  className={`absolute w-full h-full border-2 border-stranger-red bg-upside-down/90 backdrop-blur-sm flex items-center justify-center ${cubeHovered && !isFlipped ? "animate-glow-pulse" : ""}`}
                  style={{
                    transform: "translateZ(96px)",
                    boxShadow: "0 0 30px oklch(0.55 0.25 25 / 0.6), inset 0 0 30px oklch(0.55 0.25 25 / 0.2)",
                  }}
                >
                  <FlickeringText
                    text="YASH"
                    className="text-stranger-red text-3xl md:text-5xl font-bold stranger-text"
                    intensity="high"
                  />
                </div>

                {/* Back face - shows ENTER after flip */}
                <div
                  className="absolute w-full h-full border-2 border-stranger-red bg-upside-down/90 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    transform: "rotateY(180deg) translateZ(96px)",
                    boxShadow: "0 0 30px oklch(0.55 0.25 25 / 0.6), inset 0 0 30px oklch(0.55 0.25 25 / 0.2)",
                  }}
                >
                  <FlickeringText
                    text="ENTER"
                    className="text-stranger-red text-2xl md:text-4xl font-bold stranger-text"
                    intensity="high"
                  />
                </div>

                {/* Right face */}
                <div
                  className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    transform: "rotateY(90deg) translateZ(96px)",
                    boxShadow: "0 0 20px oklch(0.55 0.25 25 / 0.4), inset 0 0 20px oklch(0.55 0.25 25 / 0.15)",
                  }}
                >
                  <FlickeringText text="G" className="text-stranger-red text-4xl md:text-6xl font-bold stranger-text" />
                </div>

                {/* Left face */}
                <div
                  className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    transform: "rotateY(-90deg) translateZ(96px)",
                    boxShadow: "0 0 20px oklch(0.55 0.25 25 / 0.4), inset 0 0 20px oklch(0.55 0.25 25 / 0.15)",
                  }}
                >
                  <FlickeringText text="U" className="text-stranger-red text-4xl md:text-6xl font-bold stranger-text" />
                </div>

                {/* Top face */}
                <div
                  className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    transform: "rotateX(90deg) translateZ(96px)",
                    boxShadow: "0 0 20px oklch(0.55 0.25 25 / 0.4), inset 0 0 20px oklch(0.55 0.25 25 / 0.15)",
                  }}
                >
                  <FlickeringText text="P" className="text-stranger-red text-4xl md:text-6xl font-bold stranger-text" />
                </div>

                {/* Bottom face */}
                <div
                  className="absolute w-full h-full border-2 border-stranger-red/70 bg-upside-down/80 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    transform: "rotateX(-90deg) translateZ(96px)",
                    boxShadow: "0 0 20px oklch(0.55 0.25 25 / 0.4), inset 0 0 20px oklch(0.55 0.25 25 / 0.15)",
                  }}
                >
                  <FlickeringText text="T" className="text-stranger-red text-4xl md:text-6xl font-bold stranger-text" />
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm tracking-wider animate-subtle-flicker">
              {"<"} ENTER THE UPSIDE DOWN {">"}
            </p>
          </div>
        )}
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.06 0.02 280) 70%, oklch(0.04 0.02 280) 100%)",
        }}
      />
    </div>
  )
}
