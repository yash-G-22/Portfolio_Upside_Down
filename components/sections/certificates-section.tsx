"use client"

import { useState, useEffect, useRef, useId } from 'react'
import { useUpsideDown } from "../portfolio"

const certificates = [
  { title: "Data Visualization", issuer: "Kaggle", game: "DATA QUEST", color: "#00ff00" },
  { title: "Machine Learning with Python", issuer: "IBM", game: "NEURAL WARS", color: "#ff00ff" },
]

const achievements = [
  {
    title: "HPCL Power Lab",
    detail: "Top 10 from 99,000+ teams",
    score: "999000",
    rank: "04",
    initials: "YASH",
    game: "POWER GRID",
  },
  {
    title: "Amazon ML Challenge",
    detail: "Top from 80,000+ participants",
    score: "800000",
    rank: "~3200",
    initials: "YASH",
    game: "PRIME HUNTER",
  },
  {
    title: "GATE EC 2025",
    detail: "AIR 3328, Score: 496",
    score: "496",
    rank: "3328",
    initials: "YASH",
    game: "GATE KEEPER",
  },
  {
    title: "Codeforces",
    detail: "Rating: 1237",
    score: "1237",
    rank: "PUPIL",
    initials: "YASH",
    game: "CODE WARS",
  },
  {
    title: "LeetCode",
    detail: "430+ problems, Rating: 1721",
    score: "1721",
    rank: "202557",
    initials: "YASH",
    game: "BUG SMASHER",
  },
]

function RealisticBloodDrip({ delay, left, size = 1 }: { delay: number; left: string; size?: number }) {
  const [isMounted, setIsMounted] = useState(false)
  const [pathData, setPathData] = useState({
    d: 'M10 0 Q10 20 10 40 Q10 60 10 80 L10 80',
    dropY: 0,
    isDripping: false
  })
  const id = useId().replace(/:/g, '')
  
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(0)
  const dropYRef = useRef<number>(0)
  const isDrippingRef = useRef<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
    
    const startAnimation = () => {
      isDrippingRef.current = true
      
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp
        }
        
        const elapsed = timestamp - startTimeRef.current
        
        // Update drop position
        if (isDrippingRef.current) {
          dropYRef.current += 1.5 // Slower, smoother movement
          
          if (dropYRef.current > 100) {
            dropYRef.current = 0
          }
        }
        
        // Update path with dynamic values
        const time = timestamp / 1000 // Convert to seconds
        const d = `M10 0 
          Q${8 + Math.sin(time) * 2} 20 10 40 
          Q${12 + Math.cos(time * 1.2) * 2} 60 10 80
          L10 ${80 + dropYRef.current * 0.5}`
        
        // Batch state updates
        setPathData({
          d,
          dropY: dropYRef.current,
          isDripping: isDrippingRef.current
        })
        
        animationRef.current = requestAnimationFrame(animate)
      }
      
      animationRef.current = requestAnimationFrame(animate)
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
    
    const startDelay = setTimeout(startAnimation, delay * 1000)
    
    return () => {
      clearTimeout(startDelay)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [delay])

  return (
    <div className="absolute top-0" style={{ left }}>
      {/* Blood pool at top */}
      <svg width={20 * size} height={150 * size} viewBox="0 0 20 150" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={`bloodGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a0000" />
            <stop offset="30%" stopColor="#8B0000" />
            <stop offset="60%" stopColor="#DC143C" />
            <stop offset="100%" stopColor="#8B0000" />
          </linearGradient>
          <filter id={`bloodGlow-${id}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main drip stream - only render after mount to prevent hydration mismatch */}
        {isMounted && (
          <path
            d={pathData.d}
            fill="none"
            stroke={`url(#bloodGrad-${id})`}
            strokeWidth={4 * size}
            strokeLinecap="round"
            style={{
              filter: `url(#bloodGlow-${id})`,
              transition: 'd 0.1s ease-out',
              willChange: 'd',
              transform: 'translateZ(0)' // Force hardware acceleration
            }}
          />
        )}

        {/* Dripping drop */}
        {pathData.isDripping && (
          <ellipse
            cx="10"
            cy={80 + pathData.dropY}
            rx={3 * size}
            ry={4 * size}
            fill="#DC143C"
            style={{
              filter: `url(#bloodGlow-${id})`,
              opacity: pathData.dropY < 80 ? 1 : 1 - (pathData.dropY - 80) / 20,
              transition: 'opacity 0.1s ease-out',
              willChange: 'transform, opacity'
            }}
          />
        )}

        {/* Small drips branching off */}
        <path
          d="M10 30 Q15 40 14 55"
          fill="none"
          stroke="#8B0000"
          strokeWidth={2 * size}
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  )
}

function ArcadeCabinet({
  game,
  score,
  rank,
  initials,
  title,
  detail,
  index,
  isFlipped,
  isGameStarted,
}: {
  game: string
  score: string
  rank: string
  initials: string
  title: string
  detail: string
  index: number
  isFlipped: boolean
  isGameStarted: boolean
}) {
  const [displayScore, setDisplayScore] = useState("000000")
  const [isActive, setIsActive] = useState(false)
  const [showStatic, setShowStatic] = useState(false)
  const [isRotated, setIsRotated] = useState(false)
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    if (!isGameStarted) {
      setDisplayScore("000000")
      setIsActive(false)
      setShowAchievement(false)
      return
    }

    const timer = setTimeout(() => {
      setIsActive(true)
      let current = 0
      const target = Number.parseInt(score)
      const increment = Math.ceil(target / 30)

      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(interval)
          setTimeout(() => setShowAchievement(true), 300)
        }
        setDisplayScore(current.toString().padStart(6, "0"))
      }, 50)

      return () => clearInterval(interval)
    }, index * 300)

    return () => clearTimeout(timer)
  }, [score, index, isGameStarted])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setShowStatic(true)
        setTimeout(() => setShowStatic(false), 100)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="group" style={{ perspective: "1000px" }}>
      <div
        onClick={() => setIsRotated(!isRotated)}
        className="relative cursor-pointer transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isRotated ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of cabinet */}
        <div
          className="relative bg-gradient-to-b from-zinc-800 via-zinc-900 to-black rounded-t-3xl rounded-b-lg p-1 border-4 border-zinc-700 transition-all duration-300 hover:scale-105"
          style={{
            boxShadow: `0 0 30px rgba(255,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.8)`,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Marquee */}
          <div
            className="relative h-12 rounded-t-2xl overflow-hidden mb-1"
            style={{
              background: "linear-gradient(180deg, #1a0a0a 0%, #330000 50%, #1a0a0a 100%)",
              boxShadow: "inset 0 0 20px rgba(255,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-lg font-bold tracking-widest animate-pulse transition-transform duration-700"
                style={{
                  fontFamily: "monospace",
                  color: "#ff3333",
                  textShadow: "0 0 10px #ff0000, 0 0 20px #ff0000",
                  transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {game}
              </span>
            </div>
          </div>

          {/* CRT Screen */}
          <div
            className="relative bg-black rounded-lg overflow-hidden mx-1"
            style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.9)" }}
          >
            <div
              className="relative p-4 min-h-[180px]"
              style={{ background: "radial-gradient(ellipse at center, #0a1a0a 0%, #000 100%)" }}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />
              {showStatic && <div className="absolute inset-0 z-10 opacity-50 bg-white/10" />}
              {showAchievement && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 animate-pulse">
                  <div className="text-center">
                    <div
                      className="text-yellow-400 text-xl font-bold animate-bounce"
                      style={{ fontFamily: "monospace", textShadow: "0 0 20px #ffff00" }}
                    >
                      ★ ACHIEVEMENT ★
                    </div>
                    <div className="text-green-400 text-sm mt-2" style={{ fontFamily: "monospace" }}>
                      UNLOCKED!
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center mb-3">
                <div
                  className="text-xs tracking-widest mb-1 transition-transform duration-700"
                  style={{
                    fontFamily: "monospace",
                    color: "#ff6666",
                    textShadow: "0 0 5px #ff0000",
                    transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  HIGH SCORE
                </div>
                <div
                  className="text-2xl font-bold tracking-wider transition-transform duration-700"
                  style={{
                    fontFamily: "monospace",
                    color: isActive ? "#00ff00" : "#003300",
                    textShadow: isActive ? "0 0 10px #00ff00, 0 0 20px #00ff00" : "none",
                    transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  {displayScore}
                </div>
              </div>
              <div className="flex justify-center gap-4 mb-3">
                <div className="text-center">
                  <div
                    className="text-xs transition-transform duration-700"
                    style={{
                      fontFamily: "monospace",
                      color: "#ffff00",
                      textShadow: "0 0 5px #ffff00",
                      transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    RANK
                  </div>
                  <div
                    className="text-lg font-bold transition-transform duration-700"
                    style={{
                      fontFamily: "monospace",
                      color: "#ffff00",
                      textShadow: "0 0 10px #ffff00",
                      transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    #{rank}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-xs transition-transform duration-700"
                    style={{
                      fontFamily: "monospace",
                      color: "#00ffff",
                      textShadow: "0 0 5px #00ffff",
                      transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    PLAYER
                  </div>
                  <div
                    className="text-lg font-bold transition-transform duration-700"
                    style={{
                      fontFamily: "monospace",
                      color: "#00ffff",
                      textShadow: "0 0 10px #00ffff",
                      transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    {initials}
                  </div>
                </div>
              </div>
              <div
                className="text-center border-t border-green-900/50 pt-2 transition-transform duration-700"
                style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <div
                  className="text-xs font-bold tracking-wide"
                  style={{ fontFamily: "monospace", color: "#ffffff", textShadow: "0 0 5px #ffffff" }}
                >
                  {title}
                </div>
                <div className="text-xs mt-1 opacity-80" style={{ fontFamily: "monospace", color: "#aaaaaa" }}>
                  {detail}
                </div>
              </div>
            </div>
          </div>

          {/* Control panel */}
          <div
            className="mt-2 mx-1 p-2 rounded-lg"
            style={{ background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)" }}
          >
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-8 h-8 rounded-full border-2 border-zinc-600"
                style={{ background: "radial-gradient(circle at 30% 30%, #4a4a4a 0%, #2a2a2a 100%)" }}
              />
              <div className="flex gap-2">
                <div
                  className="w-6 h-6 rounded-full border-2 border-red-900"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #ff4444 0%, #aa0000 100%)",
                    boxShadow: "0 0 10px rgba(255,0,0,0.5)",
                  }}
                />
                <div
                  className="w-6 h-6 rounded-full border-2 border-blue-900"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #4444ff 0%, #0000aa 100%)",
                    boxShadow: "0 0 10px rgba(0,0,255,0.5)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-2 flex justify-center pb-2">
            <div
              className="px-3 py-1 rounded text-xs animate-pulse transition-transform duration-700"
              style={{
                background: "#1a1a1a",
                border: "2px solid #ff3333",
                fontFamily: "monospace",
                color: "#ff3333",
                textShadow: "0 0 5px #ff0000",
                transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              CLICK TO FLIP
            </div>
          </div>
        </div>

        {/* Back of cabinet */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black rounded-t-3xl rounded-b-lg p-4 border-4 border-red-900 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 0 40px rgba(255,0,0,0.5)",
          }}
        >
          <div className="text-center">
            <div className="text-yellow-400 text-2xl mb-4" style={{ textShadow: "0 0 20px #ffff00" }}>
              ★
            </div>
            <div
              className="text-xl font-bold mb-2 transition-transform duration-700"
              style={{
                fontFamily: "monospace",
                color: "#ff3333",
                textShadow: "0 0 10px #ff0000",
                transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {title}
            </div>
            <div
              className="text-sm mb-4 transition-transform duration-700"
              style={{
                fontFamily: "monospace",
                color: "#00ff00",
                transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {detail}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="text-center">
                <div className="text-xs text-zinc-500">SCORE</div>
                <div className="text-lg text-cyan-400" style={{ fontFamily: "monospace" }}>
                  {score}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-zinc-500">RANK</div>
                <div className="text-lg text-yellow-400" style={{ fontFamily: "monospace" }}>
                  #{rank}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GameMasteryBadge({
  title,
  issuer,
  color,
  isFlipped,
}: {
  title: string
  issuer: string
  game: string
  color: string
  isFlipped: boolean
}) {
  const [rotationDeg, setRotationDeg] = useState(0)

  const handleBadgeClick = () => {
    setRotationDeg((prev) => prev + 360)
  }

  return (
    <div className="group relative cursor-pointer" onClick={handleBadgeClick}>
      <div
        className="relative w-40 h-40 mx-auto rounded-full p-1 transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, ${color}44 0%, #000 50%, ${color}44 100%)`,
          boxShadow: `0 0 30px ${color}, 0 0 60px ${color}66, inset 0 0 20px ${color}44`,
          transform: `rotate(${rotationDeg}deg)`,
        }}
      >
        <div
          className="absolute inset-2 rounded-full"
          style={{ border: `3px solid ${color}`, boxShadow: `inset 0 0 15px ${color}44` }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div
            className="text-xs font-bold tracking-wider mb-2 text-center transition-transform duration-700"
            style={{
              fontFamily: "monospace",
              color: color,
              textShadow: `0 0 10px ${color}`,
              transform: `rotate(${-rotationDeg}deg) ${isFlipped ? "rotate(180deg)" : ""}`,
            }}
          >
            ★ MASTERY ★
          </div>
          <div
            className="text-sm font-bold text-center transition-transform duration-700"
            style={{
              fontFamily: "monospace",
              color: "#fff",
              textShadow: "0 0 5px #fff",
              transform: `rotate(${-rotationDeg}deg) ${isFlipped ? "rotate(180deg)" : ""}`,
            }}
          >
            {title}
          </div>
          <div
            className="text-xs mt-1 text-center transition-transform duration-700"
            style={{
              fontFamily: "monospace",
              color: color,
              transform: `rotate(${-rotationDeg}deg) ${isFlipped ? "rotate(180deg)" : ""}`,
            }}
          >
            {issuer}
          </div>
        </div>
      </div>
      <div className="text-center mt-2 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
        CLICK TO SPIN
      </div>
    </div>
  )
}

export function CertificatesSection() {
  const { isFlipped } = useUpsideDown()
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [lightingPhase, setLightingPhase] = useState(0)
  const [flickerText, setFlickerText] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlickerText((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleStartGame = () => {
    // Start lighting sequence
    let phase = 0
    const lightSequence = setInterval(() => {
      phase++
      setLightingPhase(phase)
      if (phase >= 6) {
        clearInterval(lightSequence)
        setTimeout(() => {
          setShowIntro(false)
          setIsGameStarted(true)
        }, 500)
      }
    }, 400)
  }

  // Realistic blood drips at top with varying sizes
  return (
    <section
      id="certificates"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0505 50%, #050505 100%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
        <RealisticBloodDrip delay={0} left="3%" size={1.2} />
        <RealisticBloodDrip delay={2} left="12%" size={0.8} />
        <RealisticBloodDrip delay={1} left="22%" size={1} />
        <RealisticBloodDrip delay={3} left="33%" size={0.9} />
        <RealisticBloodDrip delay={0.5} left="44%" size={1.1} />
        <RealisticBloodDrip delay={2.5} left="55%" size={0.7} />
        <RealisticBloodDrip delay={1.5} left="66%" size={1} />
        <RealisticBloodDrip delay={3.5} left="77%" size={1.3} />
        <RealisticBloodDrip delay={0.8} left="88%" size={0.9} />
        <RealisticBloodDrip delay={2.2} left="96%" size={1} />
      </div>

      {/* Intro Screen */}
      {showIntro && (
        <div
          className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-8"
          style={{ background: "radial-gradient(ellipse at center, #0a0505 0%, #000 100%)" }}
        >
          {/* Ceiling with neon tube lights */}
          <div className="relative w-full h-20 mb-8">
            <div
              className="absolute inset-x-0 top-0 h-8"
              style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)" }}
            />

            {/* Neon tubes */}
            <div className="absolute top-8 left-0 right-0 flex justify-center gap-16">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="relative">
                  {/* Chain */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-0.5 h-8" style={{ background: "#333" }} />
                  {/* Tube */}
                  <div
                    className="w-32 h-4 rounded-full transition-all duration-300"
                    style={{
                      background:
                        lightingPhase > i
                          ? `linear-gradient(90deg, ${["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"][i]} 0%, #fff 50%, ${["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"][i]} 100%)`
                          : "#1a1a1a",
                      boxShadow:
                        lightingPhase > i
                          ? `0 0 20px ${["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"][i]}, 0 0 40px ${["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"][i]}, 0 10px 40px ${["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff"][i]}66`
                          : "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PALACE ARCADE sign */}
          <div
            className="relative mb-12 px-8 py-4 rounded-lg border-4"
            style={{
              background: "linear-gradient(180deg, #1a0a0a 0%, #0a0000 100%)",
              borderColor: "#ff3333",
              boxShadow: "0 0 30px #ff000066, inset 0 0 20px #00000066",
            }}
          >
            <h2
              className="text-4xl md:text-6xl font-bold tracking-wider text-center transition-transform duration-700"
              style={{
                fontFamily: "monospace",
                color: "#ff3333",
                textShadow: "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000",
                transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              PALACE ARCADE
            </h2>
            <div
              className="text-center mt-2 text-sm tracking-widest"
              style={{ color: "#ff6666", fontFamily: "monospace" }}
            >
              ~ ACHIEVEMENTS & CERTIFICATIONS ~
            </div>
          </div>

          {/* Arcade Cabinet with PRESS START */}
          <div className="relative">
            {/* Cabinet body */}
            <div
              className="relative w-72 rounded-t-3xl rounded-b-lg p-1 border-4 border-zinc-700"
              style={{
                background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
                boxShadow: "0 0 40px rgba(255,0,0,0.3)",
              }}
            >
              {/* Screen */}
              <div
                className="relative bg-black rounded-lg overflow-hidden m-2"
                style={{ boxShadow: "inset 0 0 30px #000" }}
              >
                <div
                  className="relative p-8 min-h-[200px] flex flex-col items-center justify-center"
                  style={{ background: "radial-gradient(ellipse at center, #0a1a0a 0%, #000 100%)" }}
                >
                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                    }}
                  />

                  <div className="text-center mb-6">
                    <div className="text-yellow-400 text-sm mb-2" style={{ fontFamily: "monospace" }}>
                      INSERT COIN
                    </div>
                    <div className="text-green-400 text-xs" style={{ fontFamily: "monospace" }}>
                      CREDIT: 0
                    </div>
                  </div>

                  {/* Press Start Button */}
                  <button
                    onClick={handleStartGame}
                    className="relative px-8 py-4 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    style={{
                      background: "linear-gradient(180deg, #330000 0%, #1a0000 100%)",
                      border: `3px solid ${flickerText ? "#ff0000" : "#660000"}`,
                      boxShadow: flickerText
                        ? "0 0 20px #ff0000, 0 0 40px #ff000066, inset 0 0 10px #ff000044"
                        : "none",
                    }}
                  >
                    <span
                      className="text-xl font-bold tracking-widest transition-transform duration-700"
                      style={{
                        fontFamily: "monospace",
                        color: flickerText ? "#ff3333" : "#660000",
                        textShadow: flickerText ? "0 0 10px #ff0000, 0 0 20px #ff0000" : "none",
                        transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                        display: "block",
                      }}
                    >
                      PRESS START
                    </span>
                  </button>
                </div>
              </div>

              {/* Control Panel */}
              <div
                className="mx-2 mb-2 p-3 rounded-lg"
                style={{ background: "linear-gradient(180deg, #333 0%, #1a1a1a 100%)" }}
              >
                <div className="flex items-center justify-center gap-6">
                  {/* Joystick */}
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-full"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 100%)",
                        border: "2px solid #555",
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 rounded-full"
                      style={{ background: "linear-gradient(180deg, #ff4444 0%, #aa0000 100%)" }}
                    />
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #ff4444 0%, #aa0000 100%)",
                        boxShadow: "0 0 10px #ff000066",
                      }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #44ff44 0%, #00aa00 100%)",
                        boxShadow: "0 0 10px #00ff0066",
                      }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #4444ff 0%, #0000aa 100%)",
                        boxShadow: "0 0 10px #0000ff66",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!showIntro && (
        <div className="container mx-auto px-4">
          {/* Title */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 transition-transform duration-700"
              style={{
                fontFamily: "monospace",
                color: "#ff3333",
                textShadow: "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000",
                transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ACHIEVEMENTS UNLOCKED
            </h2>
          </div>

          {/* Arcade Cabinets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
            {achievements.map((achievement, index) => (
              <ArcadeCabinet
                key={achievement.title}
                {...achievement}
                index={index}
                isFlipped={isFlipped}
                isGameStarted={isGameStarted}
              />
            ))}
          </div>

          {/* Game Mastery Section - Centered */}
          <div className="mt-20">
            <h3
              className="text-2xl font-bold text-center mb-12 transition-transform duration-700"
              style={{
                fontFamily: "monospace",
                color: "#00ffff",
                textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
                transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ★ GAME MASTERY ★
            </h3>
            <div className="flex flex-wrap justify-center gap-12">
              {certificates.map((cert) => (
                <GameMasteryBadge key={cert.title} {...cert} isFlipped={isFlipped} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blood drip animation keyframes */}
      <style jsx>{`
        @keyframes bloodDripAnim {
          0% {
            transform: translateY(-60px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(20px);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-60px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
