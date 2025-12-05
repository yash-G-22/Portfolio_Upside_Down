"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.75
      audioRef.current.loop = true
    }
  }, [])

  const toggleSound = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play()
        setIsPlaying(true)
        setIsMuted(false)
      } else {
        setIsMuted(!isMuted)
        audioRef.current.muted = !isMuted
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stranger_things-KxFue8jfWPAAFO405pCPzGARC4QsBR.mp3" />
      <button
        onClick={toggleSound}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex flex-col items-center gap-1.5 sm:gap-2 group"
        aria-label={isMuted || !isPlaying ? "Enable sound" : "Mute sound"}
      >
        {/* Outer glow ring */}
        <div className="relative">
          {/* Animated pulsing rings when playing */}
          {isPlaying && !isMuted && (
            <>
              <div
                className="absolute inset-0 rounded-full border-2 border-stranger-red/60 animate-ping"
                style={{ animationDuration: "2s" }}
              />
              <div
                className="absolute inset-0 rounded-full border border-stranger-red/40 animate-ping"
                style={{ animationDuration: "3s", animationDelay: "0.5s" }}
              />
            </>
          )}

          <div
            className={`
            relative w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
            bg-gradient-to-br from-black via-gray-950 to-black
            border-2 transition-all duration-300
            ${
              isPlaying && !isMuted
                ? "border-stranger-red shadow-[0_0_15px_rgba(180,0,0,0.6),0_0_30px_rgba(180,0,0,0.3),inset_0_0_10px_rgba(180,0,0,0.2)] sm:shadow-[0_0_20px_rgba(180,0,0,0.6),0_0_40px_rgba(180,0,0,0.3),inset_0_0_15px_rgba(180,0,0,0.2)]"
                : "border-stranger-red/50 shadow-[0_0_8px_rgba(180,0,0,0.3)] sm:shadow-[0_0_10px_rgba(180,0,0,0.3)]"
            }
            group-hover:border-stranger-red group-hover:shadow-[0_0_20px_rgba(180,0,0,0.7)] sm:group-hover:shadow-[0_0_25px_rgba(180,0,0,0.7)]
          `}
          >
            {/* Inner decorative ring */}
            <div
              className={`
              absolute inset-1.5 sm:inset-2 rounded-full border transition-all duration-300
              ${isPlaying && !isMuted ? "border-stranger-red/40" : "border-stranger-red/20"}
            `}
            />

            {/* Icon - responsive size */}
            {isMuted || !isPlaying ? (
              <VolumeX className="w-4 h-4 sm:w-6 sm:h-6 text-stranger-red/70 group-hover:text-stranger-red transition-colors" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-6 sm:h-6 text-stranger-red animate-pulse" />
            )}
          </div>

          {/* Corner accent marks - hidden on mobile */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-stranger-red/50 hidden sm:block" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-stranger-red/50 hidden sm:block" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-stranger-red/50 hidden sm:block" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-stranger-red/50 hidden sm:block" />
        </div>

        {/* Label text - responsive size */}
        <span
          className={`
          text-[8px] sm:text-[10px] font-stranger tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-300
          ${
            isPlaying && !isMuted
              ? "text-stranger-red drop-shadow-[0_0_6px_rgba(180,0,0,0.8)] sm:drop-shadow-[0_0_8px_rgba(180,0,0,0.8)]"
              : "text-stranger-red/60 group-hover:text-stranger-red/80"
          }
        `}
        >
          {!isPlaying ? "Sound Off" : isMuted ? "Muted" : "Sound On"}
        </span>
      </button>
    </>
  )
}
