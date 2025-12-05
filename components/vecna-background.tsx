"use client"

import { useEffect, useState, useRef } from "react"

export function VecnaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      })
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Update on scroll to ensure full page coverage
    const observer = new ResizeObserver(updateDimensions)
    observer.observe(document.body)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw organic Vecna-style texture
    const drawVecnaTexture = () => {
      const { width, height } = dimensions
      if (width === 0 || height === 0) return

      // Base dark flesh color
      ctx.fillStyle = "#0a0505"
      ctx.fillRect(0, 0, width, height)

      // Draw organic vein networks
      const drawVein = (
        startX: number,
        startY: number,
        length: number,
        angle: number,
        thickness: number,
        depth: number,
      ) => {
        if (depth <= 0 || thickness < 0.5) return

        const segments = Math.floor(length / 20)
        let x = startX
        let y = startY
        let currentAngle = angle

        ctx.beginPath()
        ctx.moveTo(x, y)

        for (let i = 0; i < segments; i++) {
          currentAngle += (Math.random() - 0.5) * 0.5
          const segLength = 15 + Math.random() * 10
          x += Math.cos(currentAngle) * segLength
          y += Math.sin(currentAngle) * segLength
          ctx.lineTo(x, y)

          // Branch occasionally
          if (Math.random() < 0.15 && depth > 1) {
            const branchAngle = currentAngle + (Math.random() - 0.5) * 1.5
            drawVein(x, y, length * 0.5, branchAngle, thickness * 0.6, depth - 1)
          }
        }

        const gradient = ctx.createLinearGradient(startX, startY, x, y)
        gradient.addColorStop(0, `rgba(80, 20, 20, ${0.3 + depth * 0.1})`)
        gradient.addColorStop(0.5, `rgba(120, 30, 30, ${0.2 + depth * 0.08})`)
        gradient.addColorStop(1, `rgba(60, 15, 15, ${0.1 + depth * 0.05})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = thickness
        ctx.lineCap = "round"
        ctx.stroke()
      }

      // Draw multiple vein systems from edges
      for (let i = 0; i < 15; i++) {
        const side = Math.floor(Math.random() * 4)
        let startX, startY, angle

        switch (side) {
          case 0: // Top
            startX = Math.random() * width
            startY = 0
            angle = Math.PI / 2 + (Math.random() - 0.5) * 0.5
            break
          case 1: // Right
            startX = width
            startY = Math.random() * height
            angle = Math.PI + (Math.random() - 0.5) * 0.5
            break
          case 2: // Bottom
            startX = Math.random() * width
            startY = height
            angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5
            break
          default: // Left
            startX = 0
            startY = Math.random() * height
            angle = (Math.random() - 0.5) * 0.5
        }

        drawVein(startX, startY, 300 + Math.random() * 400, angle, 4 + Math.random() * 3, 4)
      }

      // Draw tendril clusters
      const drawTendrilCluster = (cx: number, cy: number) => {
        const tendrils = 5 + Math.floor(Math.random() * 8)
        for (let i = 0; i < tendrils; i++) {
          const angle = (i / tendrils) * Math.PI * 2 + Math.random() * 0.3
          const length = 50 + Math.random() * 150
          drawVein(cx, cy, length, angle, 2 + Math.random() * 2, 3)
        }
      }

      // Scatter tendril clusters
      for (let i = 0; i < 8; i++) {
        drawTendrilCluster(Math.random() * width, Math.random() * height)
      }

      // Add flesh membrane texture
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const radius = 20 + Math.random() * 80

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, "rgba(60, 20, 20, 0.15)")
        gradient.addColorStop(0.5, "rgba(40, 15, 15, 0.08)")
        gradient.addColorStop(1, "rgba(20, 8, 8, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(x, y, radius, radius * 0.7, Math.random() * Math.PI, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add pulsing nodes (like Vecna's clock marks)
      for (let i = 0; i < 12; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const radius = 3 + Math.random() * 8

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3)
        gradient.addColorStop(0, "rgba(180, 40, 40, 0.4)")
        gradient.addColorStop(0.3, "rgba(120, 30, 30, 0.2)")
        gradient.addColorStop(1, "rgba(60, 15, 15, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "rgba(200, 50, 50, 0.6)"
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    drawVecnaTexture()
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.6,
        mixBlendMode: "multiply",
      }}
    />
  )
}
