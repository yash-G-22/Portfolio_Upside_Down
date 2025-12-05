"use client"

import { FlickeringText } from "../flickering-text"
import { Phone, Radio, AlertTriangle, Github, Linkedin, Mail } from "lucide-react"
import { useUpsideDown } from "../portfolio"
import { useState, useEffect } from "react"
import { WalkieTalkieModal } from "../walkie-talkie-modal"

export function ContactSection() {
  const { isFlipped } = useUpsideDown()
  const [staticNoise, setStaticNoise] = useState(false)
  const [radioMessage, setRadioMessage] = useState("")
  const [isWalkieTalkieOpen, setIsWalkieTalkieOpen] = useState(false)

  const radioMessages = [
    "...this is Hawkins Police...",
    "...copy that, over...",
    "...strange activity reported...",
    "...requesting backup...",
    "...signal interference detected...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStaticNoise(true)
      setRadioMessage(radioMessages[Math.floor(Math.random() * radioMessages.length)])
      setTimeout(() => setStaticNoise(false), 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const contactLinks = [
    {
      icon: Phone,
      href: "tel:+917819996112",
      label: "EMERGENCY LINE",
      value: "+91 781-999-6112",
      code: "CODE: ALPHA",
    },
    {
      icon: Mail,
      href: "mailto:gupta58901@gmail.com",
      label: "DISPATCH EMAIL",
      value: "gupta58901@gmail.com",
      code: "PRIORITY: HIGH",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/yash-gupta-yg12",
      label: "RADIO CHANNEL",
      value: "linkedin.com/in/yash-gupta-yg12",
      code: "FREQ: 11.012",
    },
    {
      icon: Github,
      href: "https://github.com/yash-G-22",
      label: "INTEL DATABASE",
      value: "github.com/yash-G-22",
      code: "CLEARANCE: TOP",
    },
  ]

  return (
    <section id="contact" className="relative py-12 sm:py-24 px-2 sm:px-4 pb-24 sm:pb-32">
      <div className="max-w-4xl mx-auto">
        {/* Police Radio Static Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {staticNoise && (
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          )}
        </div>

        <div className="flex flex-col items-center mb-8 sm:mb-12">
          {/* Badge */}
          <div
            className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6"
            style={{
              filter: "drop-shadow(0 0 20px oklch(0.55 0.25 25))",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Shield shape */}
              <path
                d="M50 5 L90 20 L90 50 Q90 85 50 95 Q10 85 10 50 L10 20 Z"
                fill="oklch(0.15 0.02 280)"
                stroke="oklch(0.55 0.25 25)"
                strokeWidth="2"
              />
              {/* Inner border */}
              <path
                d="M50 12 L82 24 L82 48 Q82 78 50 87 Q18 78 18 48 L18 24 Z"
                fill="none"
                stroke="oklch(0.55 0.25 25 / 0.5)"
                strokeWidth="1"
              />
              {/* Star */}
              <polygon
                points="50,25 53,38 67,38 56,47 60,60 50,52 40,60 44,47 33,38 47,38"
                fill="oklch(0.55 0.25 25)"
              />
              {/* Text */}
              <text x="50" y="72" textAnchor="middle" fill="oklch(0.55 0.25 25)" fontSize="6" fontWeight="bold">
                HAWKINS
              </text>
              <text x="50" y="80" textAnchor="middle" fill="oklch(0.55 0.25 25)" fontSize="5">
                POLICE DEPT
              </text>
            </svg>
          </div>

          <FlickeringText
            text="HAWKINS POLICE DEPARTMENT"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-stranger-red stranger-text text-center"
            intensity="high"
            isFlipped={isFlipped}
          />
          <FlickeringText
            text="COMMUNICATION CENTER"
            className="text-sm sm:text-lg md:text-xl text-muted-foreground mt-1 sm:mt-2 tracking-widest"
            intensity="medium"
            isFlipped={isFlipped}
          />
          <div className="mt-3 sm:mt-4 h-1 w-32 sm:w-48 bg-gradient-to-r from-transparent via-stranger-red to-transparent" />
        </div>

        <div
          className="relative mb-6 sm:mb-8 p-3 sm:p-4 rounded border border-stranger-red/50 bg-card/30"
          style={{
            boxShadow: staticNoise
              ? "0 0 30px oklch(0.55 0.25 25), inset 0 0 20px oklch(0.55 0.25 25 / 0.3)"
              : "0 0 15px oklch(0.55 0.25 25 / 0.3)",
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Radio className={`w-5 h-5 sm:w-6 sm:h-6 text-stranger-red ${staticNoise ? "animate-pulse" : ""}`} />
            <div className="flex-1">
              <FlickeringText
                text="RADIO TRANSMISSION"
                className="text-[10px] sm:text-xs text-muted-foreground"
                intensity="low"
                isFlipped={isFlipped}
              />
              <FlickeringText
                text={radioMessage || "...awaiting transmission..."}
                className="font-mono text-stranger-red text-sm sm:text-base"
                intensity="high"
                isFlipped={isFlipped}
              />
            </div>
            <div
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${staticNoise ? "bg-stranger-red animate-pulse" : "bg-stranger-red/30"}`}
            />
          </div>
        </div>

        {/* Main Contact Card */}
        <div
          className="relative p-4 sm:p-8 md:p-12 rounded-lg border-2 border-stranger-red/40 bg-card/50 backdrop-blur-sm"
          style={{
            boxShadow: "0 0 60px oklch(0.55 0.25 25 / 0.2), inset 0 0 40px oklch(0.55 0.25 25 / 0.05)",
            backgroundImage: `
              linear-gradient(oklch(0.55 0.25 25 / 0.03) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.55 0.25 25 / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        >
          {/* Caution tape corners */}
          <div className="absolute -top-2 sm:-top-3 left-2 sm:left-4 right-2 sm:right-4 h-4 sm:h-6 overflow-hidden">
            <div
              className="h-full flex items-center justify-center text-[8px] sm:text-xs font-bold tracking-wider"
              style={{
                background: "repeating-linear-gradient(45deg, #ffcc00, #ffcc00 10px, #1a1a1a 10px, #1a1a1a 20px)",
                color: "#1a1a1a",
              }}
            >
              CAUTION - RESTRICTED ACCESS - CAUTION - RESTRICTED ACCESS
            </div>
          </div>

          {/* Alert icon */}
          <div className="flex justify-center mb-4 sm:mb-6 mt-3 sm:mt-4">
            <div className="p-3 sm:p-4 rounded-full bg-stranger-red/20 border border-stranger-red/50">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-stranger-red animate-pulse" />
            </div>
          </div>

          <FlickeringText
            text="ATTENTION: Report any strange activities in Hawkins, Indiana. All communications are monitored by Chief Hopper."
            className="text-center text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 font-mono block px-2"
            intensity="low"
            isFlipped={isFlipped}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {contactLinks.map(({ icon: Icon, href, label, value, code }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded border border-stranger-red/30 bg-muted/30 hover:border-stranger-red hover:bg-stranger-red/10 transition-all duration-300 overflow-hidden"
              >
                {/* Scanline effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.55 0.25 25 / 0.3) 2px, oklch(0.55 0.25 25 / 0.3) 4px)",
                  }}
                />

                <div className="p-2 sm:p-3 rounded bg-stranger-red/20 border border-stranger-red/30 group-hover:bg-stranger-red/30 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-stranger-red group-hover:animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <FlickeringText
                      text={label}
                      className="text-[10px] sm:text-xs text-stranger-red font-mono tracking-wider"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                    <FlickeringText
                      text={code}
                      className="text-[8px] sm:text-xs text-muted-foreground font-mono hidden sm:block"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                  </div>
                  <FlickeringText
                    text={value}
                    className="text-foreground text-xs sm:text-sm font-mono mt-1 block truncate"
                    intensity="low"
                    isFlipped={isFlipped}
                  />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsWalkieTalkieOpen(true)}
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 rounded bg-stranger-red text-primary-foreground font-bold stranger-text tracking-wider hover:scale-105 transition-transform duration-300 relative overflow-hidden"
              style={{
                boxShadow: "0 0 30px oklch(0.55 0.25 25), 0 0 60px oklch(0.55 0.25 25 / 0.5)",
              }}
            >
              <span className="absolute inset-0 border-2 border-primary-foreground/50 rounded animate-pulse" />
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <FlickeringText
                text="INITIATE CONTACT"
                className="text-primary-foreground text-sm sm:text-base"
                intensity="medium"
                isFlipped={isFlipped}
              />
            </button>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center border-t border-stranger-red/20 pt-6 sm:pt-8">
          <FlickeringText
            text="CASE FILE: YG-2025 | OFFICER: YASH GUPTA | STATUS: ACTIVE"
            className="text-muted-foreground text-[10px] sm:text-sm font-mono"
            intensity="low"
            isFlipped={isFlipped}
          />
          <FlickeringText
            text="© 2025 Hawkins Police Department. All supernatural activities logged."
            className="text-muted-foreground/60 text-[8px] sm:text-xs font-mono mt-2 block"
            intensity="low"
            isFlipped={isFlipped}
          />
        </div>
      </div>

      {/* Walkie Talkie Modal */}
      <WalkieTalkieModal
        isOpen={isWalkieTalkieOpen}
        onClose={() => setIsWalkieTalkieOpen(false)}
        phoneNumber="917819996112"
      />
    </section>
  )
}
