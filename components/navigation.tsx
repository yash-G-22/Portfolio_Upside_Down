"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useUpsideDown } from "./portfolio"
import { FlickeringText } from "./flickering-text"
import { RealisticBloodDrip } from "./realistic-blood-drip"

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CERTIFICATES", href: "#certificates" },
  { label: "CONTACT", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isFlipped } = useUpsideDown()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <RealisticBloodDrip />

        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-stranger-red/50 animate-subtle-flicker" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="relative group">
              <FlickeringText
                text="YG"
                className="text-stranger-red font-bold text-2xl stranger-text"
                intensity="high"
                isFlipped={isFlipped}
              />
              <div className="absolute inset-0 bg-stranger-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <a key={item.label} href={item.href} className="relative px-4 py-2 group">
                  <div className="absolute inset-0 bg-stranger-red/0 group-hover:bg-stranger-red/10 transition-all duration-300 rounded" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-stranger-red/50 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-stranger-red/30 transform translate-x-full group-hover:-translate-x-full transition-transform duration-700" />
                  </div>
                  <FlickeringText
                    text={item.label}
                    className="text-zinc-400 group-hover:text-stranger-red transition-colors text-sm tracking-widest font-mono"
                    intensity="low"
                    isFlipped={isFlipped}
                  />
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-stranger-red p-2 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="absolute inset-0 bg-stranger-red/20 blur-lg opacity-50" />
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/98"
            style={{
              backgroundImage: `radial-gradient(ellipse at center, transparent 0%, black 70%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, oklch(0.55 0.28 25 / 0.3) 0%, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-stranger-red/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className="relative flex flex-col items-center justify-center h-full gap-8 pt-16">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative group"
                style={{
                  animation: `fadeInUp 0.5s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <FlickeringText
                  text={item.label}
                  className="text-stranger-red text-3xl tracking-[0.3em] font-bold stranger-text"
                  intensity="medium"
                  isFlipped={isFlipped}
                />
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-stranger-red scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
              </a>
            ))}
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-zinc-600 text-sm font-mono animate-pulse">TAP ANYWHERE TO CLOSE</span>
          </div>
        </div>
      )}
    </>
  )
}
