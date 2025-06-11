"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useTypingStore } from "@/store/typing-store"
import { calculateWPM, calculateAccuracy } from "@/lib/typing-utils"
import { ArrowLeft, RotateCcw, Volume2, VolumeX, Home } from "lucide-react"
import EnhancedCaret from "@/components/enhanced-caret"

export default function EnhancedTypingInterface({ onBackToHome }) {
  const { currentText, isTyping, time, resetTyping, voiceMode } = useTypingStore()

  const [userInput, setUserInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(Number.parseInt(time))
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [lastKeyPressed, setLastKeyPressed] = useState("")
  const [caretPosition, setCaretPosition] = useState({ x: 0, y: 0 })

  const inputRef = useRef<HTMLInputElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

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

  // Handle input change with sound effects
  const handleInputChange = useCallback(
    (value: string) => {
      const newChar = value[value.length - 1]
      setLastKeyPressed(newChar)
      setUserInput(value)
      setCurrentCharIndex(value.length)

      // Play typing sound
      if (soundEnabled && newChar) {
        playTypingSound(newChar === currentText[value.length - 1])
      }

      // Check for completion
      if (value === currentText) {
        setIsFinished(true)
      }
    },
    [currentText, soundEnabled],

    
  )

   useEffect(() => {
    if (isTyping && userInput === currentText) {
      setIsFinished(true) // This should stop the timer and show results immediately
    }
  }, [userInput, currentText, isTyping])

  // Typing sound effects
  const playTypingSound = (isCorrect: boolean) => {
    if (typeof window !== "undefined" && window.AudioContext) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Different frequencies for correct/incorrect
      oscillator.frequency.setValueAtTime(isCorrect ? 800 : 400, audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }

  // Update caret position
  useEffect(() => {
    if (textContainerRef.current) {
      const textElement = textContainerRef.current
      const textRect = textElement.getBoundingClientRect()

      // Calculate approximate position based on character index
      const charWidth = 12 // Approximate character width in pixels
      const lineHeight = 32 // Line height in pixels
      const charsPerLine = Math.floor(textRect.width / charWidth)

      const currentLine = Math.floor(currentCharIndex / charsPerLine)
      const charInLine = currentCharIndex % charsPerLine

      setCaretPosition({
        x: charInLine * charWidth,
        y: currentLine * lineHeight + 8,
      })
    }
  }, [currentCharIndex])

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

  // Render text with proper word wrapping and highlighting
  const renderText = () => {
    const words = currentText.split(" ")
    let charIndex = 0

    return (
      <div className="flex flex-wrap gap-x-2 gap-y-1 leading-relaxed">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split("").map((char, charInWordIndex) => {
              const globalCharIndex = charIndex + charInWordIndex
              let className = "transition-all duration-75"

              if (globalCharIndex < userInput.length) {
                // Already typed
                if (userInput[globalCharIndex] === char) {
                  className += " text-slate-200 bg-green-500/20" // Correct character
                } else {
                  className += " text-red-400 bg-red-500/30 rounded" // Wrong character
                }
              } else if (globalCharIndex === userInput.length) {
                // Current character (cursor position)
                className += " bg-amber-400 text-slate-900 rounded animate-pulse" // Cursor
              } else {
                // Not yet typed
                className += " text-slate-500" // Future characters
              }

              return (
                <span key={charInWordIndex} className={className}>
                  {char}
                </span>
              )
            })}
            {/* Add space after word */}
            {wordIndex < words.length - 1 && (
              <span
                className={
                  charIndex + word.length < userInput.length
                    ? userInput[charIndex + word.length] === " "
                      ? "text-slate-200 bg-green-500/20"
                      : "text-red-400 bg-red-500/30"
                    : charIndex + word.length === userInput.length
                      ? "bg-amber-400 text-slate-900 animate-pulse"
                      : "text-slate-500"
                }
              >
                {" "}
              </span>
            )}
            {(() => {
              charIndex += word.length + 1 // +1 for space
              return null
            })()}
          </span>
        ))}
      </div>
    )
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
          Test Complete! 🎉
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "WPM", value: wpm, color: "text-amber-400", icon: "⚡" },
            { label: "Accuracy", value: `${accuracy}%`, color: "text-green-400", icon: "🎯" },
            { label: "Time", value: `${time}s`, color: "text-blue-400", icon: "⏱️" },
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
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
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
      className="max-w-5xl mx-auto"
    >
      {/* Stats Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mb-8 text-xl bg-slate-800/20 backdrop-blur-sm rounded-xl p-4"
      >
        <div className="flex items-center gap-6">
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
        </div>

        {/* Sound Toggle */}
        <motion.button
          onClick={() => setSoundEnabled(!soundEnabled)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-lg transition-colors ${
            soundEnabled ? "text-amber-400 bg-amber-400/10" : "text-slate-500 bg-slate-800/50"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      </motion.div>

      {/* Text Display - MonkeyType Style with Proper Wrapping */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 mb-8 min-h-[300px] relative border border-slate-700/30"
      >
        <div
          ref={textContainerRef}
          className="text-2xl leading-relaxed font-mono max-w-full relative"
          style={{ wordBreak: "break-word" }}
        >
          {renderText()}
        </div>

        {/* Enhanced Caret */}
        <EnhancedCaret position={caretPosition} isTyping={!!lastKeyPressed} lastKeyPressed={lastKeyPressed} wpm={wpm} />
      </motion.div>

      {/* Hidden Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-slate-600 focus:border-amber-400 outline-none text-2xl py-4 text-transparent caret-transparent"
          placeholder=""
          autoFocus
          style={{ caretColor: "transparent" }}
        />
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 h-2 bg-slate-700 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 via-amber-400 to-red-400 transition-all duration-300 ease-out rounded-full"
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
        <p className="mb-4">Focus on accuracy first, speed will follow! 🎯</p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">tab</kbd>
            <span>- restart</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">esc</kbd>
            <span>- back to home</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 bg-green-500/20 rounded"></span>
            <span>correct</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 bg-red-500/30 rounded"></span>
            <span>incorrect</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export interface TypingState {
  currentText: string
  isTyping: boolean
  time: string
  resetTyping: () => void
  voiceMode: boolean
  // ...other properties
}
