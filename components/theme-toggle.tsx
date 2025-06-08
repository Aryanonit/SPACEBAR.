"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-9 h-9 rounded-lg hover:bg-slate-800 relative overflow-hidden"
      >
        <motion.div
          initial={false}
          animate={{
            rotate: theme === "dark" ? 0 : 180,
            scale: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Sun className="h-5 w-5 text-amber-400" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: theme === "dark" ? 180 : 0,
            scale: theme === "dark" ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon className="h-5 w-5 text-slate-400" />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}

export default ThemeToggle
