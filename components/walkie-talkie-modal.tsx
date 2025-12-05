"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Send, Radio, Mic, Volume2 } from "lucide-react"
import { FlickeringText } from "./flickering-text"

interface WalkieTalkieModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
}

export function WalkieTalkieModal({ isOpen, onClose, phoneNumber }: WalkieTalkieModalProps) {
  const [message, setMessage] = useState("")
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [staticNoise, setStaticNoise] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("CONNECTING...")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Create and play walkie-talkie noise
      audioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garbled-speech-32862-1el674EnKDVIMjnVSW7LbecbFtvlr6.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.5 // Updated volume from 0.3 to 0.5 (50%)
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay prevented:", err)
      })

      // Simulate connection sequence
      setConnectionStatus("CONNECTING...")
      setTimeout(() => setConnectionStatus("ESTABLISHING LINK..."), 800)
      setTimeout(() => setConnectionStatus("CHANNEL OPEN"), 1600)

      // Focus textarea after connection
      setTimeout(() => textareaRef.current?.focus(), 1800)
    } else {
      // Stop audio when modal closes
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
    }
  }, [isOpen])

  useEffect(() => {
    // Random static noise effect
    if (isOpen) {
      const interval = setInterval(() => {
        setStaticNoise(true)
        setTimeout(() => setStaticNoise(false), 150)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (!message.trim()) return

    setIsTransmitting(true)

    // Simulate transmission delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      // Open WhatsApp with the message
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, "_blank")

      setIsTransmitting(false)
      setMessage("")
      onClose()
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Static noise overlay */}
      {staticNoise && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Walkie Talkie Device */}
      <div
        className="relative w-full max-w-[280px] sm:max-w-sm z-20"
        style={{
          filter: "drop-shadow(0 0 40px oklch(0.55 0.25 25 / 0.5))",
        }}
      >
        {/* Main Body */}
        <div
          className="relative rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-gray-700 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
            boxShadow: "inset 0 2px 10px rgba(255,255,255,0.1), inset 0 -5px 20px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top Speaker Grille */}
          <div className="px-3 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-4">
            <div
              className="h-10 sm:h-16 rounded-lg border-2 border-gray-600 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
              }}
            >
              {/* Speaker lines */}
              <div className="h-full flex flex-col justify-center gap-0.5 sm:gap-1 px-2 sm:px-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 sm:h-1.5 bg-gray-700 rounded-full"
                    style={{
                      boxShadow: staticNoise ? "0 0 5px oklch(0.55 0.25 25)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 rounded-full bg-gray-800 border border-gray-600 hover:bg-stranger-red/20 hover:border-stranger-red transition-colors"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-stranger-red" />
          </button>

          {/* Status Display */}
          <div className="px-3 sm:px-6 pb-2 sm:pb-4">
            <div
              className="relative p-2 sm:p-4 rounded-lg border-2 border-gray-600"
              style={{
                background: "linear-gradient(180deg, #0f1a0f 0%, #0a120a 100%)",
                boxShadow: `inset 0 0 20px ${connectionStatus === "CHANNEL OPEN" ? "oklch(0.55 0.25 25 / 0.3)" : "rgba(0,255,0,0.1)"}`,
              }}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />

              <div className="relative flex items-center justify-between mb-1 sm:mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Radio
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${connectionStatus === "CHANNEL OPEN" ? "text-stranger-red" : "text-green-500"} ${staticNoise ? "animate-pulse" : ""}`}
                  />
                  <span
                    className={`text-[10px] sm:text-xs font-mono ${connectionStatus === "CHANNEL OPEN" ? "text-stranger-red" : "text-green-500"}`}
                  >
                    {connectionStatus}
                  </span>
                </div>
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${connectionStatus === "CHANNEL OPEN" ? "bg-stranger-red" : "bg-green-500"} ${isTransmitting ? "animate-pulse" : ""}`}
                />
              </div>

              <FlickeringText
                text="HAWKINS EMERGENCY FREQ"
                className="text-stranger-red text-[10px] sm:text-sm font-mono block"
                intensity="medium"
                isFlipped={false}
              />
              <FlickeringText
                text="CH-11 | CODE: VECNA"
                className="text-stranger-red/60 text-[8px] sm:text-xs font-mono block mt-0.5 sm:mt-1"
                intensity="low"
                isFlipped={false}
              />
            </div>
          </div>

          {/* Message Input Area */}
          <div className="px-3 sm:px-6 pb-2 sm:pb-4">
            <div
              className="relative rounded-lg border-2 border-gray-600 overflow-hidden"
              style={{
                background: "#0a0a0a",
              }}
            >
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border-b border-gray-700">
                <Mic
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${isTransmitting ? "text-stranger-red animate-pulse" : "text-gray-500"}`}
                />
                <span className="text-[10px] sm:text-xs font-mono text-gray-500">
                  {isTransmitting ? "TRANSMITTING..." : "ENTER MESSAGE"}
                </span>
              </div>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here... Press Enter to send"
                className="w-full h-16 sm:h-24 p-2 sm:p-3 bg-transparent text-stranger-red font-mono text-xs sm:text-sm resize-none focus:outline-none placeholder:text-gray-600"
                disabled={isTransmitting || connectionStatus !== "CHANNEL OPEN"}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="px-3 sm:px-6 pb-4 sm:pb-6">
            <div className="flex gap-2 sm:gap-3">
              {/* Volume indicator */}
              <div
                className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 rounded-lg border-2 border-gray-600"
                style={{
                  background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
                }}
              >
                <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <div className="flex gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 sm:w-1.5 h-2 sm:h-3 rounded-sm ${i < 3 ? "bg-stranger-red" : "bg-gray-700"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Send Button (PTT Style) */}
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTransmitting || connectionStatus !== "CHANNEL OPEN"}
                className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 rounded-lg border-2 border-stranger-red/50 bg-stranger-red/20 hover:bg-stranger-red/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                style={{
                  boxShadow: message.trim() ? "0 0 20px oklch(0.55 0.25 25 / 0.3)" : "none",
                }}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-stranger-red group-hover:scale-110 transition-transform" />
                <span className="text-stranger-red font-bold text-[10px] sm:text-sm tracking-wider">
                  {isTransmitting ? "SENDING..." : "TRANSMIT"}
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Antenna Mount */}
          <div className="flex justify-center pb-2 sm:pb-4">
            <div
              className="w-12 sm:w-16 h-2 sm:h-3 rounded-full border border-gray-600"
              style={{
                background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
              }}
            />
          </div>
        </div>

        {/* Antenna */}
        <div className="absolute -top-10 sm:-top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div
            className="w-1.5 sm:w-2 h-10 sm:h-16 rounded-full"
            style={{
              background: "linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)",
              boxShadow: staticNoise ? "0 0 10px oklch(0.55 0.25 25)" : "none",
            }}
          />
          <div
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${isTransmitting ? "bg-stranger-red animate-pulse" : "bg-gray-600"}`}
            style={{
              boxShadow: isTransmitting ? "0 0 15px oklch(0.55 0.25 25)" : "none",
            }}
          />
        </div>
      </div>
    </div>
  )
}
