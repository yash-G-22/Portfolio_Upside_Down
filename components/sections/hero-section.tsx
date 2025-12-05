"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { useUpsideDown } from "../portfolio"

interface HeroSectionProps {
  performanceMode?: boolean
}

export function HeroSection({ performanceMode = false }: HeroSectionProps) {
  const { isFlipped } = useUpsideDown()
  const [showContent, setShowContent] = useState(false)
  const [clockTime, setClockTime] = useState({ hours: 12, minutes: 0, seconds: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [nameGlow, setNameGlow] = useState(true)
  const [floatingAsh, setFloatingAsh] = useState<
    Array<{ size: number; left: number; top: number; duration: number; delay: number }>
  >([])

  // Clock ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setClockTime((prev) => ({
        hours: prev.hours,
        minutes: prev.minutes,
        seconds: (prev.seconds + 1) % 60,
      }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Reveal animation
  useEffect(() => {
    setTimeout(() => setShowContent(true), 800)
  }, [])

  // Name flickering like christmas lights
  useEffect(() => {
    if (performanceMode) return

    const flickerInterval = setInterval(() => {
      if (Math.random() < 0.25) {
        setNameGlow(false)
        setTimeout(() => setNameGlow(true), 80 + Math.random() * 120)
      }
    }, 600)
    return () => clearInterval(flickerInterval)
  }, [performanceMode])

  // Mouse tracking for tendrils
  useEffect(() => {
    if (performanceMode) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [performanceMode])

  // Generate floating ash client-side to avoid SSR/client random mismatch
  useEffect(() => {
    const ash = Array.from({ length: performanceMode ? 18 : 40 }).map(() => ({
      size: 2 + Math.random() * 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: -Math.random() * 10,
    }))
    setFloatingAsh(ash)
  }, [performanceMode])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ background: "linear-gradient(180deg, #0a0000 0%, #000000 50%, #050000 100%)" }}
    >
      {/* Red fog atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(80, 0, 0, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(60, 0, 0, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(60, 0, 0, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating ash/spore particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingAsh.map((ash, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-900/30"
            style={{
              width: `${ash.size}px`,
              height: `${ash.size}px`,
              left: `${ash.left}%`,
              top: `${ash.top}%`,
              animation: `floatUp ${ash.duration}s linear infinite`,
              animationDelay: `${ash.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Vecna's organic tendrils - corners - hidden on small screens */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60 hidden md:block">
        <defs>
          <filter id="tendril-blur">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        {/* Top left tendril */}
        <path
          d={`M 0 0 
              Q ${50 + mousePos.x * 80} ${80 + mousePos.y * 40}, ${120 + mousePos.x * 60} ${180 + mousePos.y * 50}
              Q ${150 + mousePos.x * 40} ${250 + mousePos.y * 30}, ${100 + mousePos.x * 50} ${320}`}
          stroke="#3d0000"
          strokeWidth="12"
          fill="none"
          filter="url(#tendril-blur)"
          className="transition-all duration-700"
        />
        <path
          d={`M 0 60 
              Q ${30 + mousePos.x * 50} ${120 + mousePos.y * 30}, ${80 + mousePos.x * 40} ${200}`}
          stroke="#2d0000"
          strokeWidth="8"
          fill="none"
          filter="url(#tendril-blur)"
          className="transition-all duration-700"
        />

        {/* Top right tendril */}
        <path
          d={`M 100% 0 
              Q ${100 - mousePos.x * 8}% ${8 + mousePos.y * 4}%, ${88 - mousePos.x * 6}% ${20 + mousePos.y * 5}%
              Q ${85 - mousePos.x * 4}% ${28 + mousePos.y * 3}%, ${90 - mousePos.x * 5}% ${35}%`}
          stroke="#3d0000"
          strokeWidth="12"
          fill="none"
          filter="url(#tendril-blur)"
          className="transition-all duration-700"
        />

        {/* Bottom tendrils */}
        <path
          d={`M 0 100% 
              Q ${10 + mousePos.x * 5}% ${85 - mousePos.y * 5}%, ${20 + mousePos.x * 8}% ${70 - mousePos.y * 8}%`}
          stroke="#2d0000"
          strokeWidth="10"
          fill="none"
          filter="url(#tendril-blur)"
          className="transition-all duration-700"
        />
        <path
          d={`M 100% 100% 
              Q ${90 - mousePos.x * 5}% ${85 - mousePos.y * 5}%, ${80 - mousePos.x * 8}% ${70 - mousePos.y * 8}%`}
          stroke="#2d0000"
          strokeWidth="10"
          fill="none"
          filter="url(#tendril-blur)"
          className="transition-all duration-700"
        />
      </svg>

      <div
        className={`absolute left-2 md:left-12 top-1/2 -translate-y-1/2 transition-all duration-1000 hidden md:block ${showContent ? "opacity-100" : "opacity-0 -translate-x-10"}`}
      >
        <div className="relative scale-50 md:scale-75 lg:scale-100">
          {/* Clock body */}
          <div
            className="w-24 h-56 rounded-t-full relative"
            style={{
              background: "linear-gradient(180deg, #1a0a00 0%, #0d0500 100%)",
              border: "2px solid #3d1a00",
              boxShadow: "0 0 30px rgba(60, 20, 0, 0.4), inset 0 0 15px rgba(0,0,0,0.9)",
            }}
          >
            {/* Clock face */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-900/70 shadow-inner">
              {/* Numbers */}
              {["XII", "III", "VI", "IX"].map((num, i) => (
                <span
                  key={num}
                  className="absolute text-[9px] font-serif text-amber-900 font-bold"
                  style={{
                    top: i === 0 ? "3px" : i === 2 ? "auto" : "50%",
                    bottom: i === 2 ? "3px" : "auto",
                    left: i === 3 ? "4px" : i === 1 ? "auto" : "50%",
                    right: i === 1 ? "4px" : "auto",
                    transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)",
                  }}
                >
                  {num}
                </span>
              ))}
              {/* Hands */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute w-1 h-4 bg-amber-900 origin-bottom rounded-full"
                  style={{ transform: `translateY(-50%) rotate(${clockTime.hours * 30}deg)` }}
                />
                <div
                  className="absolute w-0.5 h-5 bg-amber-800 origin-bottom rounded-full"
                  style={{ transform: `translateY(-50%) rotate(${clockTime.minutes * 6}deg)` }}
                />
                <div
                  className="absolute w-px h-6 bg-red-600 origin-bottom transition-transform duration-100"
                  style={{ transform: `translateY(-50%) rotate(${clockTime.seconds * 6}deg)` }}
                />
                <div className="w-1.5 h-1.5 bg-amber-900 rounded-full" />
              </div>
            </div>

            {/* Pendulum window */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-24 bg-black/60 border border-amber-900/30 rounded">
              <div className="absolute top-0 left-1/2 origin-top animate-pendulum">
                <div className="w-px h-16 bg-amber-700 -translate-x-1/2" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-b from-amber-500 to-amber-800 -translate-x-1/2 shadow-lg" />
              </div>
            </div>
          </div>

          {/* Chime text */}
          <div className="mt-3 text-center text-[10px] text-red-900/50 tracking-[0.2em] animate-pulse">
            DONG... DONG...
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-2 sm:px-4 w-full max-w-4xl">
        {/* YASH GUPTA - Stranger Things Style Title */}
        <div
          className={`relative mb-4 sm:mb-8 transition-all duration-1000 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Background glow pulse */}
          <div
            className="absolute inset-0 -inset-x-4 sm:-inset-x-20 -inset-y-4 sm:-inset-y-10 transition-opacity duration-100"
            style={{
              background: "radial-gradient(ellipse at center, rgba(180, 0, 0, 0.4) 0%, transparent 60%)",
              opacity: nameGlow ? 1 : 0.1,
              filter: "blur(30px)",
            }}
          />

          <h1
            className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] font-bold tracking-[0.08em] sm:tracking-[0.15em] transition-all duration-500"
            style={{
              fontFamily: "'Times New Roman', serif",
              color: nameGlow ? "#dc2626" : "#2d0000",
              textShadow: nameGlow
                ? `0 0 10px #dc2626,
                   0 0 20px #dc2626,
                   0 0 40px #b91c1c,
                   0 0 60px #991b1b,
                   0 0 80px #7f1d1d,
                   0 0 100px #450a0a`
                : "none",
              transform: isFlipped ? "rotate(180deg)" : "none",
              letterSpacing: "0.12em",
            }}
          >
            YASH GUPTA
          </h1>

          {/* Vecna vein cracks under text - hidden on mobile */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200%] pointer-events-none hidden sm:block"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            style={{ opacity: nameGlow ? 0.5 : 0.1 }}
          >
            <g stroke="#5c0000" fill="none" strokeWidth="1.5">
              {/* Center spreading veins */}
              <path d="M500 100 Q450 70 380 60 Q300 50 200 70 Q100 90 0 60" strokeWidth="2" />
              <path d="M500 100 Q550 70 620 60 Q700 50 800 70 Q900 90 1000 60" strokeWidth="2" />
              <path d="M500 100 Q480 130 420 150 Q350 170 250 160" strokeWidth="1.5" />
              <path d="M500 100 Q520 130 580 150 Q650 170 750 160" strokeWidth="1.5" />
              {/* Smaller branches */}
              <path d="M380 60 Q360 40 320 30" strokeWidth="1" />
              <path d="M620 60 Q640 40 680 30" strokeWidth="1" />
              <path d="M420 150 Q400 170 350 180" strokeWidth="1" />
              <path d="M580 150 Q600 170 650 180" strokeWidth="1" />
            </g>
          </svg>
        </div>

        <div
          className={`mb-4 sm:mb-6 transition-all duration-700 delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transform: isFlipped ? "rotate(180deg)" : "none" }}
        >
          <span
            className="text-sm sm:text-lg md:text-xl lg:text-2xl tracking-[0.2em] sm:tracking-[0.5em] font-light transition-all duration-200"
            style={{
              color: nameGlow ? "rgba(220, 150, 150, 0.7)" : "rgba(100, 50, 50, 0.4)",
              textShadow: nameGlow ? "0 0 20px rgba(180, 0, 0, 0.4)" : "none",
            }}
          >
            AI & DATA SCIENCE DEVELOPER
          </span>
        </div>

        <p
          className={`text-red-400/50 text-sm sm:text-base md:text-lg mb-6 sm:mb-10 max-w-xl mx-auto italic transition-all duration-700 delay-300 px-2 ${showContent ? "opacity-100" : "opacity-0"}`}
          style={{
            transform: isFlipped ? "rotate(180deg)" : "none",
            fontFamily: "Georgia, serif",
          }}
        >
          "Exploring the depths of Machine Learning, Deep Learning, and Data Science from the Upside Down..."
        </p>

        <div
          className={`flex items-center justify-center gap-3 sm:gap-6 transition-all duration-700 delay-500 ${showContent ? "opacity-100" : "opacity-0"}`}
        >
          {[
            { icon: Github, href: "https://github.com/yash-G-22", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/yash-gupta-yg12", label: "LinkedIn" },
            { icon: Mail, href: "mailto:gupta58901@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 sm:p-4 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(20, 0, 0, 0.6)",
                border: "1px solid rgba(80, 0, 0, 0.5)",
                boxShadow: "0 0 15px rgba(80, 0, 0, 0.3)",
              }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-700 group-hover:text-red-500 transition-all group-hover:drop-shadow-[0_0_8px_rgba(220,50,50,0.8)]" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-[8px] sm:text-[10px] text-red-900/50 tracking-[0.3em] uppercase">Your time has come</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-800/50 animate-bounce" />
      </div>

      <style jsx>{`
        @keyframes pendulum {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
