"use client"
import { useState, useEffect } from "react"
import { FlickeringText } from "../flickering-text"
import { useUpsideDown } from "../portfolio"

const vecnaPowers = [
  {
    title: "Mind Control",
    subtitle: "Languages",
    skills: ["Python", "C++", "SQL", "HTML/CSS"],
    icon: "🧠",
    description: "The ability to command machines through ancient tongues",
  },
  {
    title: "Telekinesis",
    subtitle: "ML/DL Frameworks",
    skills: ["PyTorch", "TensorFlow"],
    icon: "✋",
    description: "Moving data with the power of thought alone",
  },
  {
    title: "Psychic Vision",
    subtitle: "Data Science",
    skills: ["pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-Learn"],
    icon: "👁",
    description: "Seeing patterns hidden from mortal eyes",
  },
  {
    title: "Dark Summoning",
    subtitle: "Tools & Platforms",
    skills: ["Excel", "Power BI", "Tableau", "Flask", "FastAPI"],
    icon: "⚡",
    description: "Conjuring powerful tools from the void",
  },
  {
    title: "Curse Mastery",
    subtitle: "Expertise",
    skills: ["Machine Learning", "Deep Learning", "Data Structures & Algorithms", "Statistics", "OOPs"],
    icon: "💀",
    description: "Knowledge that transcends human understanding",
  },
]

function VecnaPowerCard({
  power,
  index,
  isActive,
  onActivate,
  isFlipped,
}: {
  power: (typeof vecnaPowers)[0]
  index: number
  isActive: boolean
  onActivate: () => void
  isFlipped: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [tendrils, setTendrils] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    // Generate random tendril positions
    setTendrils(
      [...Array(6)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
    )
  }, [])

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${isActive ? "scale-105 z-10" : "scale-100"}`}
      onMouseEnter={() => {
        setIsHovered(true)
        onActivate()
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isFlipped ? "rotate(180deg)" : "none",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Outer glow ring */}
      <div
        className={`absolute -inset-2 rounded-2xl transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(139, 0, 0, 0.6), transparent, rgba(139, 0, 0, 0.4), transparent)",
          animation: isActive ? "spin 4s linear infinite" : "none",
        }}
      />

      {/* Main card */}
      <div
        className="relative bg-gradient-to-b from-gray-900/95 to-black/95 rounded-xl overflow-hidden"
        style={{
          border: isActive ? "2px solid rgba(220, 38, 38, 0.8)" : "1px solid rgba(139, 0, 0, 0.3)",
          boxShadow: isActive
            ? "0 0 40px rgba(139, 0, 0, 0.6), inset 0 0 30px rgba(139, 0, 0, 0.2)"
            : "0 0 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Vecna skin texture overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Creeping tendrils */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {tendrils.map((t, i) => (
            <path
              key={i}
              d={`M ${t.x} ${t.y} Q ${t.x + 20} ${t.y + 30} ${50} ${50}`}
              stroke="rgba(139, 0, 0, 0.4)"
              strokeWidth="1"
              fill="none"
              className={isActive ? "animate-tendril-1" : ""}
              style={{ opacity: isActive ? 1 : 0.3 }}
            />
          ))}
        </svg>

        {/* Card content */}
        <div className="relative p-6 min-h-[280px] flex flex-col">
          {/* Power icon with glow */}
          <div className="text-center mb-4">
            <div
              className={`inline-block text-5xl transition-all duration-300 ${isActive ? "animate-pulse" : ""}`}
              style={{
                filter: isActive ? "drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))" : "none",
              }}
            >
              {power.icon}
            </div>
          </div>

          {/* Power title */}
          <h3
            className="text-xl font-bold text-center mb-1 tracking-wider"
            style={{
              color: isActive ? "#DC2626" : "#991B1B",
              textShadow: isActive ? "0 0 20px rgba(220, 38, 38, 0.8)" : "none",
              fontFamily: "serif",
            }}
          >
            {power.title}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-red-800/60 text-center tracking-[0.2em] mb-4">{power.subtitle}</p>

          {/* Description */}
          <p
            className={`text-xs text-red-300/50 text-center italic mb-4 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            "{power.description}"
          </p>

          {/* Skills list */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="space-y-2">
              {power.skills.map((skill, skillIndex) => (
                <div
                  key={skill}
                  className={`flex items-center gap-2 transition-all duration-300`}
                  style={{
                    transform: isActive ? "translateX(0)" : "translateX(-10px)",
                    opacity: isActive ? 1 : 0.6,
                    transitionDelay: `${skillIndex * 50}ms`,
                  }}
                >
                  {/* Skill indicator - like Vecna's victims */}
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: isActive ? "radial-gradient(circle, #DC2626, #450a0a)" : "#450a0a",
                      boxShadow: isActive ? "0 0 10px #DC2626" : "none",
                    }}
                  />
                  <span
                    className="text-sm tracking-wide"
                    style={{
                      color: isActive ? "#FCA5A5" : "#7F1D1D",
                      textShadow: isActive ? "0 0 5px rgba(220, 38, 38, 0.5)" : "none",
                    }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Power level indicator */}
          <div className="mt-4 pt-4 border-t border-red-900/30">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-red-800/50 tracking-widest">POWER LEVEL</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-1 rounded-full transition-all duration-300"
                    style={{
                      background: i < 4 ? (isActive ? "#DC2626" : "#7F1D1D") : "#450a0a",
                      boxShadow: i < 4 && isActive ? "0 0 5px #DC2626" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Corner decorations - Vecna's mark */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-red-900/50" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-red-900/50" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-red-900/50" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-red-900/50" />
      </div>
    </div>
  )
}

export function SkillsSection() {
  const [activePower, setActivePower] = useState<number | null>(null)
  const { isFlipped } = useUpsideDown()
  const [ambientPulse, setAmbientPulse] = useState(false)
  const [particles, setParticles] = useState<
    Array<{ size: number; left: number; top: number; duration: number; delay: number }>
  >([])

  // Ambient pulse effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setAmbientPulse(true)
      setTimeout(() => setAmbientPulse(false), 1000)
    }, 5000)
    return () => clearInterval(pulseInterval)
  }, [])

  // Floating particles/spores generated client-side to avoid SSR/client mismatch
  useEffect(() => {
    const p = Array.from({ length: 20 }).map(() => ({
      size: 2 + Math.random() * 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
    setParticles(p)
  }, [])

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden">
      {/* Dark atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(139, 0, 0, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 100% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 40%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 0, 0, 0.95) 100%)
          `,
        }}
      />

      {/* Floating particles/spores */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-red-900/30"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float-debris ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Vecna silhouette in background */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none transition-opacity duration-1000 ${ambientPulse ? "opacity-20" : "opacity-10"}`}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="vecna-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139, 0, 0, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#vecna-glow)" />
          {/* Vecna hand reaching */}
          <path
            d="M100 40 L95 70 L90 60 L85 75 L80 65 L75 80 L100 100 L125 80 L120 65 L115 75 L110 60 L105 70 Z"
            fill="rgba(139, 0, 0, 0.3)"
            className={ambientPulse ? "animate-pulse" : ""}
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <FlickeringText
              text="POWERS"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600"
              intensity="medium"
              isFlipped={isFlipped}
            />
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800 to-transparent" />
          </div>
          <p
            className="mt-6 text-red-400/50 text-sm tracking-[0.3em] transition-transform duration-700"
            style={{ transform: isFlipped ? "rotate(180deg)" : "none" }}
          >
            [ HOVER TO UNLOCK DARK ABILITIES ]
          </p>
        </div>

        {/* Powers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {vecnaPowers.map((power, index) => (
            <VecnaPowerCard
              key={power.title}
              power={power}
              index={index}
              isActive={activePower === index}
              onActivate={() => setActivePower(index)}
              isFlipped={isFlipped}
            />
          ))}
        </div>

        {/* Bottom warning text */}
        <div
          className="mt-16 text-center transition-transform duration-700"
          style={{ transform: isFlipped ? "rotate(180deg)" : "none" }}
        >
          <p className="text-red-900/40 text-xs tracking-[0.5em] font-serif italic">
            "YOUR SUFFERING IS ALMOST AT AN END..."
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-debris {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}
