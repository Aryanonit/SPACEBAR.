"use client"

import { useTypingStore } from "@/store/typing-store"
import { Mic, MicOff, Globe } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TestConfiguration() {
  const { mode, setMode, difficulty, setDifficulty, time, setTime, voiceMode, setVoiceMode, language, setLanguage } =
    useTypingStore()
  const [activeTab, setActiveTab] = useState("mode")
  const [bubbleStyle, setBubbleStyle] = useState({
    left: 0,
    width: 0,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const modes = [
    { id: "punctuation", label: "@", title: "punctuation" },
    { id: "numbers", label: "#", title: "numbers" },
    { id: "time", label: "⏱", title: "time" },
    { id: "words", label: "A", title: "words" },
    { id: "quote", label: "❝❞", title: "quote" },
    { id: "code", label: "</>", title: "code" },
    { id: "email", label: "@", title: "email" },
  ]

  // Calculate bubble position and size dynamically
  useEffect(() => {
    const updateBubblePosition = () => {
      if (!containerRef.current) return

      const activeButton = containerRef.current.querySelector(`[data-mode="${mode}"]`) as HTMLElement
      if (!activeButton) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      setBubbleStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      })
    }

    // Update position immediately
    updateBubblePosition()

    // Update on window resize
    window.addEventListener("resize", updateBubblePosition)
    return () => window.removeEventListener("resize", updateBubblePosition)
  }, [mode])

  const timeOptions = ["15", "30", "60", "120"]
  const difficultyOptions = ["easy", "medium", "hard", "expert"]
  const languageOptions = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Configuration Tabs */}
      <div className="flex justify-center gap-4 text-xl">
        {["mode", "settings", "language"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 transition-colors capitalize ${
              activeTab === tab ? "text-amber-400 font-medium" : "text-slate-400"
            }`}
          >
            {tab === "language" && <Globe className="w-5 h-5 inline mr-2" />}
            {tab}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Mode Selection */}
        {activeTab === "mode" && (
          <motion.div
            key="mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <div ref={containerRef} className="relative bg-slate-800/50 rounded-2xl p-2 inline-flex gap-1">
              {/* Dynamic Sliding Pill Background */}
              <motion.div
                className="absolute top-2 bottom-2 bg-amber-400 rounded-xl"
                animate={{
                  left: bubbleStyle.left,
                  width: bubbleStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />

              {/* Mode Buttons */}
              {modes.map((modeOption) => (
                <motion.button
                  key={modeOption.id}
                  data-mode={modeOption.id}
                  onClick={() => setMode(modeOption.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative z-10 flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium whitespace-nowrap ${
                    mode === modeOption.id ? "text-slate-900" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="text-lg">{modeOption.label}</span>
                  <span>{modeOption.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Time Selection */}
            <div className="space-y-3">
              <h3 className="text-center text-slate-400 text-lg">Time (seconds)</h3>
              <div className="flex items-center justify-center gap-4">
                {timeOptions.map((timeOption) => (
                  <motion.button
                    key={timeOption}
                    onClick={() => setTime(timeOption)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg transition-all duration-200 text-lg ${
                      time === timeOption
                        ? "bg-amber-400 text-slate-900"
                        : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                    }`}
                  >
                    {timeOption}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-3">
              <h3 className="text-center text-slate-400 text-lg">Difficulty</h3>
              <div className="flex items-center justify-center gap-4">
                {difficultyOptions.map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg transition-all duration-200 capitalize text-lg ${
                      difficulty === diff
                        ? "bg-amber-400 text-slate-900"
                        : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                    }`}
                  >
                    {diff}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Voice Mode Toggle */}
            <div className="flex items-center justify-center">
              <motion.button
                onClick={() => setVoiceMode(!voiceMode)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 text-lg ${
                  voiceMode ? "bg-green-500 text-white" : "text-slate-400 hover:text-green-400 hover:bg-slate-800"
                }`}
              >
                <motion.div animate={{ rotate: voiceMode ? 0 : 180 }} transition={{ duration: 0.3 }}>
                  {voiceMode ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </motion.div>
                <span>Voice Mode</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Language Tab */}
        {activeTab === "language" && (
          <motion.div
            key="language"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-center text-slate-400 text-lg">Select Language</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {languageOptions.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 text-lg ${
                    language === lang.code
                      ? "bg-amber-400 text-slate-900"
                      : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                  }`}
                >
                  {lang.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
