"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface EnhancedCaretProps {
  position: { x: number; y: number }
  isTyping: boolean
  lastKeyPressed?: string
  wpm: number
}

export default function EnhancedCaret({ position, isTyping, lastKeyPressed, wpm }: EnhancedCaretProps) {
  const [showRipple, setShowRipple] = useState(false)
  const [caretStyle, setCaretStyle] = useState("normal")

  useEffect(() => {
    if (lastKeyPressed) {
      setShowRipple(true)
      setTimeout(() => setShowRipple(false), 300)
    }
  }, [lastKeyPressed])

  useEffect(() => {
    // Change caret style based on typing speed
    if (wpm > 80) {
      setCaretStyle("fire")
    } else if (wpm > 60) {
      setCaretStyle("fast")
    } else if (wpm > 40) {
      setCaretStyle("normal")
    } else {
      setCaretStyle("slow")
    }
  }, [wpm])

  const getCaretColor = () => {
    switch (caretStyle) {
      case "fire":
        return "#ef4444" // Red for super fast
      case "fast":
        return "#f97316" // Orange for fast
      case "normal":
        return "#fbbf24" // Amber for normal
      case "slow":
        return "#64748b" // Slate for slow
      default:
        return "#fbbf24"
    }
  }

  const getGlowIntensity = () => {
    switch (caretStyle) {
      case "fire":
        return "0 0 20px #ef4444, 0 0 40px #ef4444"
      case "fast":
        return "0 0 15px #f97316, 0 0 30px #f97316"
      case "normal":
        return "0 0 10px #fbbf24, 0 0 20px #fbbf24"
      case "slow":
        return "0 0 5px #64748b"
      default:
        return "0 0 10px #fbbf24"
    }
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        zIndex: 10,
      }}
      animate={{
        opacity: isTyping ? [1, 0.3, 1] : 1,
      }}
      transition={{
        duration: isTyping ? 0.5 : 1.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {/* Main Caret */}
      <motion.div
        className="w-0.5 h-6 rounded-full"
        style={{
          backgroundColor: getCaretColor(),
          boxShadow: getGlowIntensity(),
        }}
        animate={{
          scaleY: isTyping ? [1, 1.2, 1] : 1,
          scaleX: caretStyle === "fire" ? [1, 1.5, 1] : 1,
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
      />

      {/* Keystroke Ripple Effect */}
      {showRipple && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: getCaretColor(),
          }}
          initial={{
            scale: 0,
            opacity: 0.8,
          }}
          animate={{
            scale: 4,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        />
      )}

      {/* Speed Indicator Particles */}
      {caretStyle === "fire" && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: Math.random() * 10 - 5,
                top: Math.random() * 10 - 5,
              }}
              animate={{
                y: [-5, -15],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* WPM Display */}
      {wpm > 0 && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-900/80 rounded text-xs font-mono text-white whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: getCaretColor(),
            borderColor: getCaretColor(),
            borderWidth: 1,
          }}
        >
          {wpm} WPM
        </motion.div>
      )}
    </motion.div>
  )
}
