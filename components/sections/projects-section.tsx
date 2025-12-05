"use client"

import { useState, useEffect } from "react"
import { FlickeringText } from "../flickering-text"
import { Brain, Truck, BarChart3, ShoppingCart, Scan, Github, ExternalLink, CloudSun } from "lucide-react"
import { useUpsideDown } from "../portfolio"

const projects = [
  {
    title: "DayMate",
    description:
      "Multilingual AI weather assistant using Next.js, TypeScript, Tailwind CSS, Gemini API, and OpenWeatherMap with real-time weather insights, personalized recommendations, and voice recognition (English/Japanese) via Web Speech API.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "TypeScript", "API"],
    icon: CloudSun,
    caseNumber: "HNL-006",
    classification: "TOP SECRET",
    subject: "Weather Anomaly Detection",
    github: "https://github.com/yash-G-22/daymat138",
    demo: "https://daymat138.vercel.app/",
  },
  {
    title: "Face Classification with CNN",
    description:
      "Multi-output CNN achieving 94.2% gender accuracy, 89.1% ethnicity accuracy on 23K+ UTKFace dataset with real-time face detection.",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask"],
    icon: Scan,
    caseNumber: "HNL-001",
    classification: "CLASSIFIED",
    subject: "Eleven's Vision Protocol",
    github: "https://github.com/yash-G-22/Face-Attributes",
    demo: "#",
  },
  {
    title: "AI-Driven Product Pricing",
    description:
      "Multimodal ML pipeline combining text and image features for AI-based product pricing on 75K e-commerce products.",
    tech: ["PyTorch", "LightGBM", "NLP", "Computer Vision"],
    icon: ShoppingCart,
    caseNumber: "HNL-002",
    classification: "TOP SECRET",
    subject: "Starcourt Mall Analysis",
    github: "https://github.com/yash-G-22/AI-Driven-Product-Price-Prediction",
    demo: "#",
  },
  {
    title: "ANPR System for HPCL",
    description:
      "Automatic Number Plate Recognition system for 50+ LPG trucks with palm-based driver verification and real-time alerts.",
    tech: ["Image Processing", "Python", "OpenCV"],
    icon: Truck,
    caseNumber: "HNL-003",
    classification: "RESTRICTED",
    subject: "Hawkins Lab Transport",
    github: "https://github.com/yash-G-22/ANPR-System",
    demo: "#",
  },
  {
    title: "Electric Vehicle Analytics",
    description:
      "Interactive Tableau dashboard analyzing EV market growth, model trends, and state-wise adoption patterns with key KPIs.",
    tech: ["Tableau", "Excel", "Data Visualization"],
    icon: BarChart3,
    caseNumber: "HNL-004",
    classification: "CONFIDENTIAL",
    subject: "Energy Grid Anomalies",
    github: "https://github.com/yash-G-22/Electric-Vehicle-Data-Analysis",
    demo: "#",
  },
  {
    title: "E-Commerce Analysis",
    description:
      "PySpark-powered analytics processing 100K+ orders with K-means clustering, time-series forecasting, and recommendation systems.",
    tech: ["PySpark", "ML", "Power BI", "SQL"],
    icon: Brain,
    caseNumber: "HNL-005",
    classification: "TOP SECRET",
    subject: "Mind Flayer Patterns",
    github: "https://github.com/yash-G-22/E-Commerce-Analysis-",
    demo: "#",
  },
]

function ChristmasLights({ count = 12 }: { count?: number }) {
  const colors = ["#ff0000", "#00ff00", "#ffff00", "#0066ff", "#ff00ff", "#00ffff"]
  const [flickerStates, setFlickerStates] = useState<boolean[]>(Array(count).fill(true))

  useEffect(() => {
    const interval = setInterval(() => {
      setFlickerStates((prev) => prev.map(() => Math.random() > 0.15))
    }, 150)
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between px-2 -translate-y-1/2">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-700" />
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative">
          <div className="w-2 h-2 bg-zinc-600 rounded-full" />
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-4 rounded-full transition-all duration-100"
            style={{
              backgroundColor: flickerStates[i] ? colors[i % colors.length] : "#1a1a1a",
              boxShadow: flickerStates[i]
                ? `0 0 10px ${colors[i % colors.length]}, 0 0 20px ${colors[i % colors.length]}`
                : "none",
              opacity: flickerStates[i] ? 1 : 0.3,
            }}
          />
        </div>
      ))}
    </div>
  )
}

function DemogorgonPortal({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-lg transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 bg-gradient-radial from-stranger-red/20 via-transparent to-transparent animate-pulse" />
      {Array.from({ length: 6 }).map((_, i) => (
        <svg
          key={i}
          className="absolute w-full h-full opacity-30"
          style={{
            transform: `rotate(${i * 60}deg)`,
            animation: isActive ? `tendril-crawl ${3 + i * 0.5}s ease-in-out infinite` : "none",
          }}
        >
          <path
            d={`M 50 100 Q ${30 + i * 10} 70, 50 50 T 50 0`}
            fill="none"
            stroke="oklch(0.55 0.25 25)"
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>
      ))}
    </div>
  )
}

function AlphabetWall() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const [litIndex, setLitIndex] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLitIndex(Math.random() > 0.7 ? Math.floor(Math.random() * 26) : null)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-1 mb-8 max-w-2xl mx-auto">
      {alphabet.split("").map((letter, i) => {
        const colors = ["#ff0000", "#00ff00", "#ffff00", "#0066ff", "#ff00ff", "#00ffff"]
        const color = colors[i % colors.length]
        const isLit = litIndex === i
        return (
          <div
            key={i}
            className="relative w-8 h-10 flex items-center justify-center font-bold text-lg transition-all duration-150"
            style={{
              color: isLit ? color : "#4a4a4a",
              textShadow: isLit ? `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}` : "none",
              fontFamily: "serif",
            }}
          >
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full transition-all duration-100"
              style={{
                backgroundColor: isLit ? color : "#2a2a2a",
                boxShadow: isLit ? `0 0 8px ${color}` : "none",
              }}
            />
            {letter}
          </div>
        )
      })}
    </div>
  )
}

function TVStatic({ isActive }: { isActive: boolean }) {
  const [noiseKey, setNoiseKey] = useState(0)

  useEffect(() => {
    if (!isActive) return
    const interval = setInterval(() => setNoiseKey((k) => k + 1), 50)
    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none mix-blend-overlay opacity-20">
      <div
        key={noiseKey}
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${0.5 + Math.random() * 0.5}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
      />
    </div>
  )
}

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [backgroundParticles, setBackgroundParticles] = useState<
    Array<{ left: number; top: number; delay: number; duration: number }>
  >([])
  const { isFlipped } = useUpsideDown()

  // Generate particles client-side to keep SSR/CSR markup in sync
  useEffect(() => {
    const particles = Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }))
    setBackgroundParticles(particles)
  }, [])

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {backgroundParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-stranger-red/40 rounded-full animate-float-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <AlphabetWall />

        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <div className="absolute -top-4 -right-8 rotate-12 border-2 border-stranger-red px-3 py-1 text-stranger-red text-xs font-bold tracking-widest opacity-70">
              CLASSIFIED
            </div>
            <FlickeringText
              text="CASE FILES"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-stranger-red stranger-text"
              intensity="medium"
              isFlipped={isFlipped}
            />
            <p
              className="text-muted-foreground mt-2 text-sm tracking-widest transition-transform duration-700"
              style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              HAWKINS NATIONAL LABORATORY - PROJECT ARCHIVES
            </p>
          </div>
          <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-stranger-red to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon
            const isHovered = hoveredIndex === index

            return (
              <div
                key={project.title}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative">
                  <div
                    className="absolute -top-3 left-4 w-24 h-4 rounded-t-md transition-colors duration-300"
                    style={{
                      backgroundColor: isHovered ? "oklch(0.35 0.15 25)" : "oklch(0.2 0.05 25)",
                      boxShadow: isHovered ? "0 -2px 10px oklch(0.55 0.25 25 / 0.3)" : "none",
                    }}
                  >
                    <span className="text-[10px] text-stranger-red/70 px-2 font-mono">{project.caseNumber}</span>
                  </div>

                  <div
                    className={`relative p-6 rounded-lg rounded-tl-none border-2 transition-all duration-500 ${
                      isHovered ? "border-stranger-red" : "border-stranger-red/30"
                    }`}
                    style={{
                      background: isHovered
                        ? "linear-gradient(135deg, oklch(0.15 0.05 25) 0%, oklch(0.1 0.08 25) 100%)"
                        : "linear-gradient(135deg, oklch(0.12 0.03 25) 0%, oklch(0.08 0.05 25) 100%)",
                      boxShadow: isHovered
                        ? "0 0 40px oklch(0.55 0.25 25 / 0.4), inset 0 0 30px oklch(0.55 0.25 25 / 0.1)"
                        : "0 0 15px oklch(0.55 0.25 25 / 0.1)",
                      transform: isHovered ? "translateY(-8px) rotateX(5deg)" : "none",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <ChristmasLights count={8} />
                    <DemogorgonPortal isActive={isHovered} />
                    <TVStatic isActive={isHovered} />

                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold tracking-wider px-2 py-0.5 border rounded transition-colors duration-300 ${
                          project.classification === "TOP SECRET"
                            ? "text-red-500 border-red-500/50 bg-red-500/10"
                            : project.classification === "CLASSIFIED"
                              ? "text-orange-500 border-orange-500/50 bg-orange-500/10"
                              : "text-yellow-500 border-yellow-500/50 bg-yellow-500/10"
                        }`}
                      >
                        {project.classification}
                      </span>
                    </div>

                    <div className="absolute top-12 right-4 space-y-1 opacity-20">
                      <div className="w-16 h-1 bg-foreground" />
                      <div className="w-12 h-1 bg-foreground" />
                      <div className="w-20 h-1 bg-foreground" />
                    </div>

                    <div className="mb-4 pb-2 border-b border-stranger-red/20">
                      <span className="text-[10px] text-muted-foreground tracking-wider">SUBJECT:</span>
                      <p
                        className="text-xs text-stranger-red/70 font-mono transition-transform duration-700"
                        style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        {project.subject}
                      </p>
                    </div>

                    <div className="mb-4 relative inline-block">
                      <div
                        className={`absolute inset-0 bg-stranger-red/30 rounded-full blur-xl transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <Icon
                        className={`relative w-12 h-12 text-stranger-red transition-all duration-300 ${
                          isHovered ? "animate-subtle-flicker scale-110" : ""
                        }`}
                      />
                    </div>

                    <h3
                      className="text-xl font-bold text-foreground mb-3 stranger-text tracking-wider transition-transform duration-700"
                      style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      {isHovered ? (
                        <FlickeringText text={project.title} intensity="high" isFlipped={isFlipped} />
                      ) : (
                        project.title
                      )}
                    </h3>

                    <p
                      className={`text-muted-foreground text-sm mb-4 leading-relaxed transition-all duration-700 ${
                        isHovered ? "text-foreground/80" : ""
                      }`}
                      style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded bg-stranger-red/10 text-stranger-red border border-stranger-red/30 transition-all duration-300"
                          style={{
                            transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                            animationDelay: isHovered ? `${techIndex * 100}ms` : "0ms",
                            boxShadow: isHovered ? "0 0 8px oklch(0.55 0.25 25 / 0.4)" : "none",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="relative flex gap-3 pt-3 border-t border-stranger-red/20 z-20">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded border border-stranger-red/50 text-stranger-red bg-background/80 hover:bg-stranger-red/20 hover:border-stranger-red transition-all duration-300 group/link pointer-events-auto"
                        onMouseEnter={() => setHoveredIndex(index)}
                      >
                        <Github className="w-4 h-4 group-hover/link:animate-pulse" />
                        <span
                          className="transition-transform duration-700"
                          style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          SOURCE CODE
                        </span>
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded border border-cyan-500/50 text-cyan-400 bg-background/80 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group/link pointer-events-auto"
                        onMouseEnter={() => setHoveredIndex(index)}
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:animate-pulse" />
                        <span
                          className="transition-transform duration-700"
                          style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          LIVE DEMO
                        </span>
                      </a>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 right-0 h-16 pointer-events-none transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.55 0.25 25 / 0.03) 2px, oklch(0.55 0.25 25 / 0.03) 4px)",
                        animation: isHovered ? "scanline 8s linear infinite" : "none",
                      }}
                    />

                    <div className="absolute -top-1 -right-1 w-6 h-8 border-2 border-zinc-500 rounded-sm bg-zinc-600 transform rotate-12" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 border border-stranger-red/30 rounded-lg bg-card/30">
            <div className="w-3 h-3 rounded-full bg-stranger-red animate-pulse" />
            <span
              className="text-sm text-muted-foreground font-mono tracking-wider transition-transform duration-700"
              style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              END OF TRANSMISSION - OVER AND OUT
            </span>
            <div className="w-3 h-3 rounded-full bg-stranger-red animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
