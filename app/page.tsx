"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTypingStore } from "@/store/typing-store"
import EnhancedTypingInterface from "@/components/enhanced-typing-interface"
import HandPlacementGuide from "@/components/hand-placement-guide"
import TestConfiguration from "@/components/test-configuration"
import WordPacks from "@/components/word-packs"
import StatsDashboard from "@/components/stats-dashboard"
import DailyChallenge from "@/components/daily-challenge"
//import CustomWordPackBuilder from "@/components/custom-word-pack-builder"
import ParticleBackground from "@/components/particle-background"
// import { generateText } from "@/lib/text-generator"
import ThemeToggle from "@/components/theme-toggle"
import { BarChart3, Package, Settings, Calendar, Plus } from "lucide-react"
import CustomWordPackBuilder from "@/components/ui/custom-word-pack-builder"

export default function Home() {
  const { isTyping, startTyping, currentText, setCurrentText, mode, difficulty, time, language } = useTypingStore()
  const [showHandGuide, setShowHandGuide] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentView, setCurrentView] = useState<"home" | "wordpacks" | "stats" | "challenge" | "custom">("home")

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => setShowHandGuide(false), 6000)
    
    const handleInteraction = () => {
      setShowHandGuide(false)
      clearTimeout(timer)
    }

    document.addEventListener("keydown", handleInteraction)
    document.addEventListener("click", handleInteraction)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("keydown", handleInteraction)
      document.removeEventListener("click", handleInteraction)
    }
  }, [])

  useEffect(() => {
    if (currentView === "home") {
      const text = generateText(mode, difficulty, language)
      setCurrentText(text)
    }
  }, [mode, difficulty, language, setCurrentText, currentView])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center relative z-10"
        >
          <div className="text-5xl font-satoshi font-bold text-amber-400 mb-2">SpaceBar</div>
          <div className="text-slate-400">Loading your typing experience...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Particle Background */}
      <ParticleBackground />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-between p-6"
        >
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-400/20"
              whileHover={{ rotate: 5, boxShadow: "0 10px 25px rgba(251, 191, 36, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-slate-900 font-bold text-xl">⎵</span>
            </motion.div>
            <h1 className="text-3xl font-satoshi font-bold text-white">SpaceBar</h1>
          </motion.div>

          <nav className="flex items-center gap-6 text-slate-300">
            <motion.button
              onClick={() => setCurrentView("home")}
              whileHover={{ scale: 1.1, color: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              className={`hover:text-amber-400 transition-colors ${currentView === "home" ? "text-amber-400" : ""}`}
              title="Home"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setCurrentView("wordpacks")}
              whileHover={{ scale: 1.1, color: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              className={`hover:text-amber-400 transition-colors ${currentView === "wordpacks" ? "text-amber-400" : ""}`}
              title="Word Packs"
            >
              <Package className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setCurrentView("challenge")}
              whileHover={{ scale: 1.1, color: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              className={`hover:text-amber-400 transition-colors ${currentView === "challenge" ? "text-amber-400" : ""}`}
              title="Daily Challenge"
            >
              <Calendar className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setCurrentView("custom")}
              whileHover={{ scale: 1.1, color: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              className={`hover:text-amber-400 transition-colors ${currentView === "custom" ? "text-amber-400" : ""}`}
              title="Custom Packs"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setCurrentView("stats")}
              whileHover={{ scale: 1.1, color: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              className={`hover:text-amber-400 transition-colors ${currentView === "stats" ? "text-amber-400" : ""}`}
              title="Statistics"
            >
              <BarChart3 className="w-5 h-5" />
            </motion.button>
            <ThemeToggle />
          </nav>
        </motion.header>

        <AnimatePresence>{showHandGuide && <HandPlacementGuide show={showHandGuide} />}</AnimatePresence>

        <div className="container mx-auto px-6 pb-12">
          <AnimatePresence mode="wait">
            {currentView === "wordpacks" ? (
              <motion.div
                key="wordpacks"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <WordPacks />
              </motion.div>
            ) : currentView === "stats" ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <StatsDashboard />
              </motion.div>
            ) : currentView === "challenge" ? (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <DailyChallenge />
              </motion.div>
            ) : currentView === "custom" ? (
              <motion.div
                key="custom"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <CustomWordPackBuilder />
              </motion.div>
            ) : !isTyping ? (
              <motion.div
                key="config"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <TestConfiguration />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-12 mb-8"
                >
                  <div className="text-slate-400 text-xl leading-relaxed font-mono bg-slate-800/20 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                    {currentText}
                  </div>
                  <motion.div
                    className="mt-4 h-0.5 bg-slate-700 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="h-full w-0 bg-amber-400 rounded-full transition-all duration-300"></div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={startTyping}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(251, 191, 36, 0.3)",
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-amber-400 text-slate-900 text-xl font-semibold rounded-xl transition-all duration-200 shadow-lg"
                  >
                    Start Typing
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-16 text-center"
                >
                  <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 text-base bg-slate-800/20 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-slate-800 rounded text-sm">tab</kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded text-sm">enter</kbd>
                      <span>- restart test</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-slate-800 rounded text-sm">esc</kbd>
                      <span>or</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded text-sm">ctrl</kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded text-sm">shift</kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded text-sm">p</kbd>
                      <span>- command line</span>
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="typing"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <EnhancedTypingInterface />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  )
}

export function generateText(
  mode: string,
  difficulty: string,
  language: string
): string {
  // Example implementation, replace with your actual logic
  return `Mode: ${mode}, Difficulty: ${difficulty}, Language: ${language}`;
}