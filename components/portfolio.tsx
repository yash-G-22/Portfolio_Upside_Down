"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { FloatingParticles } from "./floating-particles"
import { HeroSection } from "./sections/hero-section"
import { AboutSection } from "./sections/about-section"
import { ProjectsSection } from "./sections/projects-section"
import { SkillsSection } from "./sections/skills-section"
import { ExperienceSection } from "./sections/experience-section"
import { CertificatesSection } from "./sections/certificates-section"
import { ContactSection } from "./sections/contact-section"
import { Navigation } from "./navigation"
import { UpsideDownCube } from "./upside-down-cube"
import { StrangerThings3DScene } from "./stranger-things-3d"
import { VecnaBackground } from "./vecna-background"
import { AudioPlayer } from "./audio-player"

import { createContext, useContext } from "react"

export const UpsideDownContext = createContext<{ isFlipped: boolean }>({ isFlipped: false })
export const useUpsideDown = () => useContext(UpsideDownContext)

export function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [isPerformanceMode, setIsPerformanceMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    if (!isPerformanceMode) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isPerformanceMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePerformanceMode = () => {
      setIsPerformanceMode(mediaQuery.matches || window.innerWidth < 1024)
    }

    updatePerformanceMode()
    mediaQuery.addEventListener("change", updatePerformanceMode)
    window.addEventListener("resize", updatePerformanceMode)

    return () => {
      mediaQuery.removeEventListener("change", updatePerformanceMode)
      window.removeEventListener("resize", updatePerformanceMode)
    }
  }, [])

  const sporeCount = useMemo(() => (isPerformanceMode ? 10 : 40), [isPerformanceMode])

  const handleFlip = (newFlipState: boolean) => {
    setIsTransitioning(true)
    setGlitchActive(true)

    setTimeout(() => {
      setIsFlipped(newFlipState)
    }, 300)

    setTimeout(() => {
      setGlitchActive(false)
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <UpsideDownContext.Provider value={{ isFlipped }}>
      <div
        ref={containerRef}
        className={`min-h-screen bg-upside-down relative overflow-x-hidden transition-all duration-1000 stranger-cursor ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${glitchActive ? "animate-upside-down-glitch" : ""}`}
        style={{
          filter: isFlipped ? "hue-rotate(180deg) saturate(1.5) contrast(1.1)" : "none",
          transition: "filter 0.8s ease-in-out",
        }}
      >
        {!isPerformanceMode && <VecnaBackground />}

        {isTransitioning && (
          <div className="fixed inset-0 z-[100] pointer-events-none">
            <div className="absolute inset-0 bg-red-600 animate-flash-out" style={{ mixBlendMode: "overlay" }} />
            {[...Array(isPerformanceMode ? 16 : 50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-500 rounded-full animate-particle-burst"
                style={{
                  left: "50%",
                  top: "50%",
                  animationDelay: `${Math.random() * 0.3}s`,
                  transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 500}px)`,
                }}
              />
            ))}
            {[...Array(isPerformanceMode ? 4 : 10)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-red-500 animate-glitch-line"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: 0,
                  right: 0,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {!isPerformanceMode && <StrangerThings3DScene />}

        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none z-10">
          <FloatingParticles count={isPerformanceMode ? 12 : 30} />

          <div
            className="absolute inset-0 opacity-20"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-stranger-red/10 via-transparent to-stranger-blue/10" />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, oklch(0.06 0.02 280 / 0.5) 70%, oklch(0.04 0.02 280 / 0.8) 100%)",
            }}
          />

          {isFlipped && (
            <>
              {[...Array(sporeCount)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/20 animate-upside-down-spore"
                  style={{
                    width: `${2 + Math.random() * 6}px`,
                    height: `${2 + Math.random() * 6}px`,
                    left: `${Math.random() * 100}%`,
                    top: "100%",
                    animationDuration: `${5 + Math.random() * 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </>
          )}

          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <filter id="bg-tendril-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#bg-tendril-glow)" stroke="oklch(0.55 0.28 25)" fill="none" strokeWidth="2">
              <path d="M0 0 Q200 300 100 500 T150 800 T50 1000" className="animate-tendril-1" />
              <path d="M1000 0 Q800 250 900 450 T850 700 T950 1000" className="animate-tendril-2" />
              <path d="M0 1000 Q250 800 200 600 T300 350 T150 0" className="animate-tendril-3" />
              <path d="M1000 1000 Q750 750 850 550 T700 300 T800 0" className="animate-tendril-4" />
            </g>
          </svg>
        </div>

        <Navigation />

        <div
          className="relative z-20"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          <HeroSection performanceMode={isPerformanceMode} />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperienceSection />
          <CertificatesSection />
          <ContactSection />
        </div>

        <UpsideDownCube isFlipped={isFlipped} onFlip={handleFlip} />
        <AudioPlayer />
      </div>
    </UpsideDownContext.Provider>
  )
}
