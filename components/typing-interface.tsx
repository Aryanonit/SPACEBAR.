"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useTypingStore } from "@/store/typing-store"
import { calculateWPM, calculateAccuracy } from "@/lib/typing-utils"
import { ArrowLeft, RotateCcw } from "lucide-react"
import VoiceRecognition from "@/components/voice-recognition"

export default function TypingInterface() {
  const { currentText, time, resetTyping, voiceMode } = useTypingStore()

  const [userInput, setUserInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(Number.parseInt(time))
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus and start timer on mount
  useEffect(() => {
    if (inputRef.current && !voiceMode) {
      inputRef.current.focus()
    }
    setStartTime(Date.now())
  }, [voiceMode])

  // Timer logic
  useEffect(() => {
    if (!startTime || isFinished) return

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = Number.parseInt(time) - elapsed

      if (remaining <= 0) {
        setTimeLeft(0)
        setIsFinished(true)
      } else {
        setTimeLeft(remaining)
      }

      // Update stats
      if (userInput.length > 0) {
        setWpm(calculateWPM(userInput.length, elapsed))
        setAccuracy(calculateAccuracy(currentText, userInput))
      }
    }, 100)

    return () => clearInterval(timer)
  }, [startTime, time, userInput, currentText, isFinished])

  // Handle input change
  const handleInputChange = useCallback(
    (value: string) => {
      setUserInput(value)
      setCurrentCharIndex(value.length)

      // Check for completion
      if (value === currentText) {
        setIsFinished(true)
      }
    },
    [currentText],
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        resetTyping()
      }
      if (e.key === "Tab") {
        e.preventDefault()
        setUserInput("")
        setStartTime(Date.now())
        setIsFinished(false)
        setCurrentCharIndex(0)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [resetTyping])

  // Render text with MonkeyType-style highlighting
  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = ""

      if (index < userInput.length) {
        // Already typed
        if (userInput[index] === char) {
          className = "text-slate-300" // Correct character
        } else {
          className = "text-red-400 bg-red-400/20 rounded" // Wrong character
        }
      } else if (index === userInput.length) {
        // Current character (cursor position)
        className = "bg-amber-400 text-slate-900 animate-pulse rounded" // Cursor
      } else {
        // Not yet typed
        className = "text-slate-600" // Future characters
      }

      return (
        <span key={index} className={className}>
          {char === " " ? "·" : char}
        </span>
      )
    })
  }

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Test Complete!
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "WPM", value: wpm, color: "text-amber-400" },
            { label: "Accuracy", value: `${accuracy}%`, color: "text-green-400" },
            { label: "Time", value: `${time}s`, color: "text-blue-400" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                className={`text-3xl font-bold ${stat.color}`}
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <motion.button
            onClick={resetTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 backdrop-blur-sm text-white rounded-lg hover:bg-slate-600/50 transition-colors border border-slate-600/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>
          <motion.button
            onClick={() => {
              setUserInput("")
              setStartTime(Date.now())
              setIsFinished(false)
              setCurrentCharIndex(0)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Stats Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mb-8 text-xl bg-slate-800/20 backdrop-blur-sm rounded-xl p-4"
      >
        <div className="text-slate-400">
          <motion.span key={timeLeft} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-amber-400">
            {timeLeft}
          </motion.span>
          s
        </div>
        <div className="text-slate-400">
          <motion.span key={wpm} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-green-400">
            {wpm}
          </motion.span>{" "}
          WPM
        </div>
        <div className="text-slate-400">
          <motion.span key={accuracy} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-blue-400">
            {accuracy}
          </motion.span>
          % ACC
        </div>
      </motion.div>

      {/* Text Display - MonkeyType Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 mb-8 min-h-[200px] flex items-center justify-center border border-slate-700/30"
      >
        <div className="text-2xl leading-relaxed font-mono text-center max-w-3xl">{renderText()}</div>
      </motion.div>

      {/* Input Area - Hidden but functional */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        {voiceMode ? (
          <VoiceRecognition onTranscript={handleInputChange} />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={isFinished} // Prevent typing after finish
            className="w-full p-3 rounded bg-slate-900 text-white font-mono text-xl outline-none"
            autoComplete="off"
            spellCheck={false}
            aria-label="Typing input"
          />
        )}
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 h-1 bg-slate-700 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-amber-400 transition-all duration-300 ease-out"
          animate={{ width: `${(userInput.length / currentText.length) * 100}%` }}
        />
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-center text-slate-500 bg-slate-800/20 backdrop-blur-sm rounded-xl p-4"
      >
        <p className="mb-4">Just start typing! The cursor shows your current position.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">tab</kbd>
            <span>- restart</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">esc</kbd>
            <span>- back to home</span>
          </span>
        </div>
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <motion.button
          onClick={resetTyping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-sm text-slate-300 rounded-lg hover:bg-slate-700/50 transition-colors mx-auto border border-slate-600/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
