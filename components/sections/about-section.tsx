"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { FlickeringText } from "../flickering-text"
import { useUpsideDown } from "../portfolio"
import { AlertTriangle, Eye, Brain, Zap, FileWarning, Upload, Camera } from "lucide-react"

export function AboutSection() {
  const { isFlipped } = useUpsideDown()
  const [revealedSections, setRevealedSections] = useState<string[]>([])
  const [monitorData, setMonitorData] = useState({ heartRate: 72, brainActivity: 85, psiLevel: 92 })
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simulate live monitoring data
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitorData({
        heartRate: 70 + Math.floor(Math.random() * 15),
        brainActivity: 80 + Math.floor(Math.random() * 20),
        psiLevel: 88 + Math.floor(Math.random() * 12),
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const toggleReveal = (section: string) => {
    setRevealedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedPhoto(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <section id="about" className="relative py-12 sm:py-24 px-2 sm:px-4 overflow-hidden bg-black">
      {/* Lab grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(209, 0, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(209, 0, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-8 text-stranger-red animate-pulse">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          <FlickeringText
            text="CLASSIFIED - HAWKINS NATIONAL LABORATORY"
            className="text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-mono"
            intensity="medium"
            isFlipped={isFlipped}
          />
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <FlickeringText
            text="SUBJECT FILE"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stranger-red stranger-text"
            intensity="medium"
            isFlipped={isFlipped}
          />
          <FlickeringText
            text="DOCUMENT ID: HNL-2022-YG-138"
            className="mt-2 text-zinc-600 font-mono text-[10px] sm:text-sm"
            intensity="low"
            isFlipped={isFlipped}
          />
        </div>

        {/* Main file container */}
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          {/* Top bar with status lights */}
          <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-zinc-900 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-stranger-red animate-pulse" />
              <FlickeringText
                text="LIVE MONITORING"
                className="text-[10px] sm:text-xs text-zinc-500 font-mono"
                intensity="low"
                isFlipped={isFlipped}
              />
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-green-500">● ACTIVE</span>
              <FlickeringText
                text="CLEARANCE: LEVEL 5"
                className="text-zinc-500 hidden sm:inline"
                intensity="low"
                isFlipped={isFlipped}
              />
            </div>
          </div>

          <div className="p-3 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-zinc-800">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="relative mx-auto sm:mx-0 flex-shrink-0">
                  <div className="relative w-32 h-40 sm:w-40 sm:h-48 border-2 border-zinc-700 bg-black overflow-hidden group">
                    {/* Subject number overlay */}
                    <div className="absolute top-2 left-2 z-10 bg-black/80 px-2 py-1 border border-stranger-red">
                      <FlickeringText
                        text="SUBJ-022"
                        className="text-stranger-red font-mono text-[10px] sm:text-xs"
                        intensity="high"
                        isFlipped={isFlipped}
                      />
                    </div>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    {uploadedPhoto ? (
                      <img
                        src={uploadedPhoto || "/placeholder.svg"}
                        alt="Subject: Yash Gupta"
                        className="w-full h-full object-cover"
                        style={{ filter: "contrast(1.1)" }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/50">
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600 mb-2" />
                        <span className="text-zinc-600 text-[10px] sm:text-xs font-mono">NO IMAGE</span>
                      </div>
                    )}

                    {/* Upload overlay on hover */}
                    <div
                      onClick={triggerFileInput}
                      className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer border-2 border-transparent group-hover:border-stranger-red"
                    >
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-stranger-red mb-2 animate-pulse" />
                      <FlickeringText
                        text="UPLOAD PHOTO"
                        className="text-stranger-red font-mono text-[10px] sm:text-xs"
                        intensity="high"
                        isFlipped={isFlipped}
                      />
                      <span className="text-zinc-500 text-[8px] sm:text-[10px] mt-1 font-mono">[CLICK TO SELECT]</span>
                    </div>

                    {/* Scan line effect */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 6px)",
                      }}
                    />
                  </div>

                  {/* Classification stamp */}
                  <div
                    className="absolute -bottom-2 -right-2 text-stranger-red/30 font-bold text-lg sm:text-2xl rotate-[-15deg]"
                    style={{ fontFamily: "Impact, sans-serif" }}
                  >
                    CLASSIFIED
                  </div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm font-mono">
                    <div>
                      <span className="text-zinc-600 text-[10px] sm:text-xs block mb-1">SUBJECT NAME</span>
                      <FlickeringText
                        text="YASH GUPTA"
                        className="text-white text-sm sm:text-lg"
                        intensity="medium"
                        isFlipped={isFlipped}
                      />
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] sm:text-xs block mb-1">DESIGNATION</span>
                      <FlickeringText
                        text="AI & DATA SCIENCE DEVELOPER"
                        className="text-stranger-red text-[10px] sm:text-sm"
                        intensity="medium"
                        isFlipped={isFlipped}
                      />
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] sm:text-xs block mb-1">INSTITUTION</span>
                      <FlickeringText
                        text="IIIT JABALPUR"
                        className="text-zinc-300 text-[10px] sm:text-sm"
                        intensity="low"
                        isFlipped={isFlipped}
                      />
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] sm:text-xs block mb-1">PERFORMANCE INDEX</span>
                      <FlickeringText
                        text="CPI: 9.3 / 10.0"
                        className="text-green-400 text-[10px] sm:text-sm"
                        intensity="low"
                        isFlipped={isFlipped}
                      />
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] sm:text-xs block mb-1">SPECIALIZATION</span>
                      <FlickeringText
                        text="ELECTRONICS & COMMUNICATION"
                        className="text-zinc-300 text-[10px] sm:text-sm"
                        intensity="low"
                        isFlipped={isFlipped}
                      />
                    </div>
                    <div>
                      <span className="text-zinc-600 text-[10px] sm:text-xs block mb-1">GATE EC RANK</span>
                      <FlickeringText
                        text="#3328"
                        className="text-amber-400 text-[10px] sm:text-sm"
                        intensity="medium"
                        isFlipped={isFlipped}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-center gap-2 sm:gap-4">
                {[
                  { icon: Zap, label: "HEART", value: monitorData.heartRate, unit: "BPM", color: "text-red-400" },
                  { icon: Brain, label: "BRAIN", value: monitorData.brainActivity, unit: "%", color: "text-blue-400" },
                  { icon: Eye, label: "PSI", value: monitorData.psiLevel, unit: "LV", color: "text-purple-400" },
                ].map(({ icon: Icon, label, value, unit, color }) => (
                  <div
                    key={label}
                    className="bg-black border border-zinc-800 p-2 sm:p-3 text-center min-w-[60px] sm:min-w-[80px]"
                  >
                    <Icon className={`w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 ${color}`} />
                    <div className={`font-mono text-sm sm:text-lg ${color}`}>{value}</div>
                    <FlickeringText
                      text={`${label} ${unit}`}
                      className="text-[8px] sm:text-[10px] text-zinc-600"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Classified sections */}
            <div className="space-y-3 sm:space-y-4">
              {/* Background section */}
              <div className="border border-zinc-800 rounded">
                <button
                  onClick={() => toggleReveal("background")}
                  className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FileWarning className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                    <FlickeringText
                      text="SUBJECT BACKGROUND"
                      className="text-zinc-400 font-mono text-[10px] sm:text-sm"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                  </div>
                  <FlickeringText
                    text={revealedSections.includes("background") ? "[DECLASSIFIED]" : "[CLICK TO REVEAL]"}
                    className="text-[8px] sm:text-xs text-stranger-red font-mono"
                    intensity="medium"
                    isFlipped={isFlipped}
                  />
                </button>

                {revealedSections.includes("background") && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-zinc-800 pt-3 sm:pt-4">
                    <FlickeringText
                      text="Subject demonstrates exceptional aptitude in artificial intelligence and machine learning domains. Currently pursuing B.Tech in Electronics and Communication Engineering at IIIT Jabalpur with outstanding academic performance. Subject has shown remarkable ability to process complex datasets and develop predictive models with high accuracy rates."
                      className="block"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                  </div>
                )}
              </div>

              {/* Abilities section */}
              <div className="border border-zinc-800 rounded">
                <button
                  onClick={() => toggleReveal("abilities")}
                  className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                    <FlickeringText
                      text="OBSERVED ABILITIES"
                      className="text-zinc-400 font-mono text-[10px] sm:text-sm"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                  </div>
                  <FlickeringText
                    text={revealedSections.includes("abilities") ? "[DECLASSIFIED]" : "[CLICK TO REVEAL]"}
                    className="text-[8px] sm:text-xs text-stranger-red font-mono"
                    intensity="medium"
                    isFlipped={isFlipped}
                  />
                </button>

                {revealedSections.includes("abilities") && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-zinc-800 pt-3 sm:pt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {[
                        "Machine Learning",
                        "Deep Learning",
                        "Data Analysis",
                        "Python Mastery",
                        "TensorFlow",
                        "PyTorch",
                        "Computer Vision",
                        "NLP Processing",
                        "Neural Networks",
                      ].map((ability) => (
                        <div
                          key={ability}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 bg-black border border-zinc-700 text-center text-[10px] sm:text-xs font-mono hover:border-stranger-red hover:text-stranger-red transition-colors"
                        >
                          <FlickeringText
                            text={ability}
                            className="text-zinc-400"
                            intensity="low"
                            isFlipped={isFlipped}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Research notes */}
              <div className="border border-zinc-800 rounded">
                <button
                  onClick={() => toggleReveal("notes")}
                  className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
                    <FlickeringText
                      text="RESEARCHER NOTES"
                      className="text-zinc-400 font-mono text-[10px] sm:text-sm"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                  </div>
                  <FlickeringText
                    text={revealedSections.includes("notes") ? "[DECLASSIFIED]" : "[CLICK TO REVEAL]"}
                    className="text-[8px] sm:text-xs text-stranger-red font-mono"
                    intensity="medium"
                    isFlipped={isFlipped}
                  />
                </button>

                {revealedSections.includes("notes") && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-zinc-500 text-xs sm:text-sm italic border-t border-zinc-800 pt-3 sm:pt-4 font-mono">
                    <FlickeringText
                      text={`"Subject shows extraordinary potential in data science applications. Recommend continued observation and integration into advanced research programs. Notable projects include Driver Drowsiness Detection and Generative Adversarial Networks for image synthesis. Exercise caution - subject's capabilities continue to evolve."`}
                      className="block"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                    <FlickeringText
                      text="— Dr. ██████, Lead Researcher"
                      className="block mt-2 text-right text-zinc-600"
                      intensity="low"
                      isFlipped={isFlipped}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[8px] sm:text-[10px] text-zinc-600 font-mono">
              <FlickeringText text="LAST UPDATED: DECEMBER 2024" intensity="low" isFlipped={isFlipped} />
              <FlickeringText
                text="PROPERTY OF HAWKINS NATIONAL LABORATORY"
                className="hidden sm:block"
                intensity="low"
                isFlipped={isFlipped}
              />
              <FlickeringText text="PAGE 1 OF 1" intensity="low" isFlipped={isFlipped} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
