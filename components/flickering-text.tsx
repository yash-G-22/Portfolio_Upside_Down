"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface FlickeringTextProps {
  text: string
  className?: string
  intensity?: "low" | "medium" | "high"
  isFlipped?: boolean
}

export function FlickeringText({ text, className, intensity = "medium", isFlipped = false }: FlickeringTextProps) {
  const [flickerState, setFlickerState] = useState({ opacity: 1, glow: true })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const flickerSpeed = intensity === "high" ? 100 : intensity === "medium" ? 150 : 200
    const flickerChance = intensity === "high" ? 0.3 : intensity === "medium" ? 0.2 : 0.1

    intervalRef.current = setInterval(() => {
      setFlickerState((prev) => {
        // Random chance to flicker the whole word
        if (Math.random() < flickerChance) {
          const goingDark = Math.random() > 0.5
          return {
            opacity: goingDark ? Math.random() * 0.3 + 0.2 : 1,
            glow: !goingDark,
          }
        }
        // Gradually return to normal
        if (prev.opacity < 1) {
          return {
            opacity: Math.min(prev.opacity + 0.2, 1),
            glow: prev.opacity > 0.7,
          }
        }
        return prev
      })
    }, flickerSpeed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [intensity])

  const isGlowing = flickerState.glow && flickerState.opacity > 0.8

  return (
    <span
      className={cn("inline-block transition-all duration-100", className)}
      style={{
        opacity: flickerState.opacity,
        transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.8s ease-in-out, opacity 0.1s",
        textShadow: isGlowing
          ? `0 0 5px currentColor, 
             0 0 10px currentColor, 
             0 0 20px currentColor, 
             0 0 40px oklch(0.55 0.28 25), 
             0 0 80px oklch(0.55 0.28 25)`
          : "0 0 2px currentColor",
        filter: isGlowing ? "brightness(1.3)" : `brightness(${flickerState.opacity * 0.8 + 0.2})`,
      }}
    >
      {text}
    </span>
  )
}
