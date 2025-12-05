"use client"

import { useState } from "react"
import { FlickeringText } from "../flickering-text"
import { useUpsideDown } from "../portfolio"

const experiences = [
  {
    title: "Project Intern",
    company: "Hindustan Petroleum Corporation Limited",
    location: "New Delhi, India",
    period: "May 2025 – July 2025",
    tapeColor: "from-red-900 to-red-950",
    labelColor: "bg-red-200",
    description: [
      "Developed ANPR system for 50+ LPG trucks using image processing",
      "Implemented palm-based scanner for driver-truck verification",
      "Created real-time alerts for delays and operational issues",
    ],
  },
  {
    title: "Volunteer Tutor",
    company: "Jagrati",
    location: "IIIT Jabalpur",
    period: "Aug. 2023 – Present",
    tapeColor: "from-blue-900 to-blue-950",
    labelColor: "bg-blue-200",
    description: [
      "Tutored 100+ underprivileged village children",
      "Developed engaging curriculum for rural students",
      "Led community outreach programs improving literacy levels",
    ],
  },
]

function VHSTape({
  experience,
  isPlaying,
  onPlay,
  isFlipped,
}: {
  experience: (typeof experiences)[0]
  isPlaying: boolean
  onPlay: () => void
  isFlipped: boolean
}) {
  return (
    <div className="relative group">
      {/* VHS Tape */}
      <div
        className={`relative cursor-pointer transition-all duration-500 ${isPlaying ? "scale-95 opacity-50" : "hover:scale-105"}`}
        onClick={onPlay}
      >
        <div
          className={`relative w-56 sm:w-72 h-36 sm:h-44 bg-gradient-to-b ${experience.tapeColor} rounded-lg border-2 border-black shadow-2xl`}
        >
          {/* Top edge detail */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-black/50" />

          {/* Label area */}
          <div
            className={`absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 h-20 sm:h-24 ${experience.labelColor} rounded border border-gray-400 p-1.5 sm:p-2`}
          >
            <div
              className="font-mono text-[10px] sm:text-xs text-gray-800 uppercase tracking-wider transition-transform duration-700"
              style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              {experience.company}
            </div>
            <div
              className="font-bold text-xs sm:text-sm text-black mt-0.5 sm:mt-1 font-serif italic transition-transform duration-700"
              style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              {experience.title}
            </div>
            <div
              className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1 transition-transform duration-700"
              style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              {experience.period}
            </div>
            <div
              className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 text-[8px] sm:text-xs text-gray-500 font-mono transition-transform duration-700"
              style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              SP MODE
            </div>
            {/* Rating sticker */}
            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border border-yellow-600">
              ★
            </div>
          </div>

          {/* Tape window showing reels */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-6 sm:gap-8">
            {/* Left reel */}
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black border-2 border-gray-700">
                <div
                  className={`absolute inset-1 rounded-full border-2 border-gray-600 ${isPlaying ? "animate-spin" : ""}`}
                  style={{ animationDuration: "2s" }}
                >
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-gradient-to-br from-amber-900 to-amber-950" />
                </div>
              </div>
              {/* Tape strip */}
              <div className="absolute top-1/2 -right-3 sm:-right-4 w-3 sm:w-4 h-0.5 bg-amber-900" />
            </div>
            {/* Right reel */}
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black border-2 border-gray-700">
                <div
                  className={`absolute inset-1 rounded-full border-2 border-gray-600 ${isPlaying ? "animate-spin" : ""}`}
                  style={{ animationDuration: "2s" }}
                >
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-gradient-to-br from-amber-900 to-amber-950" />
                </div>
              </div>
              {/* Tape strip */}
              <div className="absolute top-1/2 -left-3 sm:-left-4 w-3 sm:w-4 h-0.5 bg-amber-900" />
            </div>
          </div>

          {/* Bottom grip area */}
          <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-3 bg-black/30 rounded-b-lg" />

          {/* Rental sticker */}
          <div
            className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 bg-orange-500 text-white text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded rotate-12 font-bold transition-transform duration-700"
            style={{ transform: isFlipped ? "rotate(192deg)" : "rotate(12deg)" }}
          >
            BE KIND REWIND
          </div>
        </div>

        {/* Hover instruction */}
        <div
          className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 text-stranger-red text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          style={{ transform: isFlipped ? "translateX(-50%) rotate(180deg)" : "translateX(-50%) rotate(0deg)" }}
        >
          ▶ CLICK TO PLAY
        </div>
      </div>

      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 sm:absolute sm:inset-auto sm:top-0 sm:left-full sm:ml-4 sm:w-80 sm:bg-transparent sm:p-0">
          {/* TV Frame */}
          <div className="relative bg-gradient-to-b from-amber-800 to-amber-950 p-3 sm:p-4 rounded-lg border-4 border-amber-900 shadow-2xl w-full max-w-sm">
            {/* Wood grain texture */}
            <div
              className="absolute inset-0 opacity-20 rounded-lg"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`,
              }}
            />

            {/* Screen */}
            <div className="relative bg-black rounded border-4 border-gray-800 overflow-hidden">
              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`,
                }}
              />

              {/* VHS tracking noise at top */}
              <div className="h-2 bg-gradient-to-r from-gray-800 via-white to-gray-800 opacity-50 animate-pulse" />

              {/* Content */}
              <div className="p-3 sm:p-4 text-green-400 font-mono text-xs sm:text-sm min-h-[180px] sm:min-h-[200px]">
                {/* Timestamp */}
                <div className="flex justify-between text-[10px] sm:text-xs text-green-600 mb-2">
                  <span
                    className="transition-transform duration-700"
                    style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    ▶ PLAY
                  </span>
                  <span
                    className="animate-pulse transition-transform duration-700"
                    style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    ● REC
                  </span>
                </div>

                <div
                  className="transition-transform duration-700"
                  style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <div className="text-stranger-red text-sm sm:text-base font-bold mb-1 glitch-text">
                    {experience.title}
                  </div>
                  <div className="text-green-300 text-[10px] sm:text-xs mb-3">
                    {experience.company} | {experience.location}
                  </div>

                  <ul className="space-y-1.5 sm:space-y-2">
                    {experience.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] sm:text-xs">
                        <span className="text-stranger-red">▸</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom tracking */}
                <div className="mt-4 flex gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 bg-green-900"
                      style={{ opacity: Math.random() > 0.3 ? 1 : 0.3 }}
                    />
                  ))}
                </div>
              </div>

              {/* VHS glitch effect */}
              <div className="absolute inset-0 pointer-events-none animate-vhs-glitch opacity-30" />
            </div>

            {/* TV controls */}
            <div className="flex justify-center gap-4 mt-2 sm:mt-3">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-600 border border-gray-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-600 border border-gray-500" />
              <div className="w-6 sm:w-8 h-1.5 sm:h-2 rounded bg-gray-700" />
            </div>

            {/* Channel/Volume dials - hidden on mobile */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex-col gap-2 hidden sm:flex">
              <div className="w-6 h-6 rounded-full bg-gradient-to-b from-gray-400 to-gray-600 border-2 border-gray-700" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-b from-gray-400 to-gray-600 border-2 border-gray-700" />
            </div>
          </div>

          {/* Click to close */}
          <button
            onClick={onPlay}
            className="absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto sm:mt-2 text-xs text-stranger-red hover:text-red-400 transition-all duration-300 bg-black/50 sm:bg-transparent px-2 py-1 rounded"
            style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ⏹ STOP
          </button>
        </div>
      )}
    </div>
  )
}

export function ExperienceSection() {
  const { isFlipped } = useUpsideDown()
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="relative py-12 sm:py-24 px-2 sm:px-4 overflow-visible">
      {/* VHS Store shelf background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(90deg, transparent 49%, rgba(139, 69, 19, 0.3) 49%, rgba(139, 69, 19, 0.3) 51%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(139, 69, 19, 0.2) 49%, rgba(139, 69, 19, 0.2) 51%, transparent 51%)
          `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block relative">
            {/* Neon sign frame */}
            <div
              className="absolute -inset-2 sm:-inset-4 border-2 sm:border-4 border-stranger-red/50 rounded-lg"
              style={{
                boxShadow: "0 0 20px oklch(0.55 0.25 25 / 0.5), inset 0 0 20px oklch(0.55 0.25 25 / 0.2)",
              }}
            />
            <div className="relative px-4 sm:px-8 py-2 sm:py-4">
              <FlickeringText
                text="FAMILY VIDEO"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stranger-red stranger-text"
                intensity="medium"
                isFlipped={isFlipped}
              />
              <div
                className="text-[10px] sm:text-sm text-stranger-red/60 mt-1 sm:mt-2 font-mono tracking-widest transition-transform duration-700"
                style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                ★ EXPERIENCE COLLECTION ★
              </div>
            </div>
          </div>

          {/* Store hours sign */}
          <div
            className="mt-4 sm:mt-8 inline-block bg-yellow-200 text-black px-2 sm:px-4 py-1 sm:py-2 rounded font-mono text-[10px] sm:text-sm transition-transform duration-700"
            style={{ transform: isFlipped ? "rotate(181deg)" : "rotate(-1deg)" }}
          >
            NEW RELEASES • CLASSICS • BE KIND REWIND
          </div>
        </div>

        {/* VHS Tape shelf */}
        <div className="relative">
          {/* Shelf */}
          <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-lg" />
          <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 h-1.5 sm:h-2 bg-amber-950/50" />

          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 pb-6 sm:pb-8 relative">
            {experiences.map((exp, index) => (
              <VHSTape
                key={exp.title + exp.company}
                experience={exp}
                isPlaying={playingIndex === index}
                onPlay={() => setPlayingIndex(playingIndex === index ? null : index)}
                isFlipped={isFlipped}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 max-w-sm sm:max-w-md mx-auto px-2">
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700">
            {/* VCR slot */}
            <div className="h-2 sm:h-3 bg-black rounded mx-4 sm:mx-8 mb-2 sm:mb-3 border border-gray-600" />

            {/* Display */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex gap-1.5 sm:gap-2 items-center">
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${playingIndex !== null ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}
                />
                <span
                  className="text-green-400 font-mono transition-transform duration-700"
                  style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  {playingIndex !== null ? "▶ PLAY" : "⏹ STOP"}
                </span>
              </div>
              <div
                className="text-blue-400 font-mono text-xs sm:text-sm tracking-wider transition-transform duration-700"
                style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                12:00
                <span className="animate-pulse">:</span>
                00
              </div>
              <div
                className="text-[8px] sm:text-xs text-gray-500 font-mono transition-transform duration-700 hidden sm:block"
                style={{ transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                PANASONIC
              </div>
            </div>

            <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
              {["⏮", "⏪", "▶", "⏩", "⏭", "⏹"].map((btn, i) => (
                <button
                  key={i}
                  className="w-6 h-5 sm:w-8 sm:h-6 bg-gray-700 hover:bg-gray-600 rounded text-[10px] sm:text-xs text-gray-300 transition-colors border border-gray-600"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scattered rental cards - hidden on mobile */}
        <div
          className="absolute -bottom-4 left-10 opacity-60 transition-transform duration-700 hidden sm:block"
          style={{ transform: isFlipped ? "rotate(186deg)" : "rotate(-6deg)" }}
        >
          <div className="w-20 h-12 bg-yellow-100 rounded shadow-lg p-1">
            <div className="text-xs text-gray-800 font-mono">MEMBER</div>
            <div className="text-xs text-gray-600">#11-08-83</div>
          </div>
        </div>
      </div>
    </section>
  )
}
