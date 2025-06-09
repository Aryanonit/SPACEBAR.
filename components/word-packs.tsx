"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTypingStore } from "@/store/typing-store"
import { Book, Code, Mail, Hash, Quote, Globe, Zap, Target } from "lucide-react"

interface WordPack {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  difficulty: "easy" | "medium" | "hard" | "expert"
  wordCount: number
  category: string
  preview: string
}

const wordPacks: WordPack[] = [
  // Common Words
  {
    id: "top-200",
    name: "Top 200 Words",
    description: "Most frequently used English words",
    icon: <Target className="w-5 h-5" />,
    difficulty: "easy",
    wordCount: 200,
    category: "common",
    preview:
      "the and for are but not you all can had her was one our out day get has him his how man new now old see two way who boy did its let put say she too use",
  },
  {
    id: "top-1000",
    name: "Top 1000 Words",
    description: "Essential vocabulary for fluent typing",
    icon: <Book className="w-5 h-5" />,
    difficulty: "medium",
    wordCount: 1000,
    category: "common",
    preview:
      "about after again against because before being between both during each even every example first following found given good great group hand help however important large last left life little long made make many most move much need number other part place point public right same seem small social still system take than think though through time under used very water well where while work world would write year young",
  },
  {
    id: "common-phrases",
    name: "Common Phrases",
    description: "Everyday expressions and idioms",
    icon: <Quote className="w-5 h-5" />,
    difficulty: "medium",
    wordCount: 500,
    category: "phrases",
    preview:
      "as soon as possible thank you very much have a great day looking forward to hearing from you please let me know if you need anything else best regards kind regards sincerely yours",
  },

  // Programming
  {
    id: "javascript",
    name: "JavaScript",
    description: "JS keywords, functions, and syntax",
    icon: <Code className="w-5 h-5" />,
    difficulty: "hard",
    wordCount: 300,
    category: "code",
    preview:
      "function const let var if else for while do switch case break continue return try catch finally throw new class extends constructor super this prototype async await Promise then catch finally",
  },
  {
    id: "python",
    name: "Python",
    description: "Python keywords and common patterns",
    icon: <Code className="w-5 h-5" />,
    difficulty: "hard",
    wordCount: 250,
    category: "code",
    preview:
      "def class if elif else for while try except finally import from as with lambda yield return pass break continue global nonlocal assert del print input len range enumerate zip",
  },
  {
    id: "react-typescript",
    name: "React + TypeScript",
    description: "Modern React development patterns",
    icon: <Code className="w-5 h-5" />,
    difficulty: "expert",
    wordCount: 400,
    category: "code",
    preview:
      "interface type useState useEffect useCallback useMemo useRef useContext useReducer React.FC Props children className onClick onChange onSubmit preventDefault stopPropagation async await Promise",
  },

  // Business & Email
  {
    id: "business-email",
    name: "Business Email",
    description: "Professional email templates",
    icon: <Mail className="w-5 h-5" />,
    difficulty: "medium",
    wordCount: 600,
    category: "business",
    preview:
      "Dear Sir Madam regarding your inquiry please find attached following up on our previous conversation I would like to schedule a meeting to discuss further details thank you for your time and consideration",
  },
  {
    id: "corporate-jargon",
    name: "Corporate Speak",
    description: "Business buzzwords and phrases",
    icon: <Globe className="w-5 h-5" />,
    difficulty: "hard",
    wordCount: 300,
    category: "business",
    preview:
      "synergy leverage paradigm shift scalable solution actionable insights best practices core competencies value proposition stakeholder engagement cross-functional collaboration strategic initiative",
  },

  // Numbers & Symbols
  {
    id: "numbers-basic",
    name: "Numbers & Math",
    description: "Digits and mathematical expressions",
    icon: <Hash className="w-5 h-5" />,
    difficulty: "medium",
    wordCount: 200,
    category: "numbers",
    preview:
      "1234567890 + - * / = % ( ) 3.14159 2.71828 100% 50% 25% $100.00 €50.99 £25.50 1,000,000 0.001 1/2 3/4 2/3 5/8",
  },
  {
    id: "special-chars",
    name: "Special Characters",
    description: "Punctuation and symbols",
    icon: <Zap className="w-5 h-5" />,
    difficulty: "expert",
    wordCount: 150,
    category: "symbols",
    preview: "! @ # $ % ^ & * ( ) - _ = + [ ] { } | \\ : ; \" ' < > , . ? / ~ ` § ± ° © ® ™ € £ ¥ ¢ α β γ δ ε",
  },
]

export default function WordPacks() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const { setCurrentText, setMode } = useTypingStore()

  const categories = [
    { id: "all", name: "All Packs", icon: <Globe className="w-4 h-4" /> },
    { id: "common", name: "Common Words", icon: <Book className="w-4 h-4" /> },
    { id: "code", name: "Programming", icon: <Code className="w-4 h-4" /> },
    { id: "business", name: "Business", icon: <Mail className="w-4 h-4" /> },
    { id: "numbers", name: "Numbers", icon: <Hash className="w-4 h-4" /> },
    { id: "symbols", name: "Symbols", icon: <Zap className="w-4 h-4" /> },
  ]

  const filteredPacks =
    selectedCategory === "all" ? wordPacks : wordPacks.filter((pack) => pack.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400 bg-green-400/10"
      case "medium":
        return "text-yellow-400 bg-yellow-400/10"
      case "hard":
        return "text-orange-400 bg-orange-400/10"
      case "expert":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-slate-400 bg-slate-400/10"
    }
  }

  const selectWordPack = (pack: WordPack) => {
    setSelectedPack(pack.id)
    setCurrentText(pack.preview)
    setMode("wordpack")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Word Packs</h2>
        <p className="text-slate-400">Choose from curated word collections to improve specific skills</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category.id
                ? "bg-amber-400 text-slate-900"
                : "bg-slate-800/50 text-slate-400 hover:text-amber-400"
            }`}
          >
            {category.icon}
            <span className="text-sm font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Word Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPacks.map((pack, index) => (
          <motion.div
            key={pack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => selectWordPack(pack)}
            className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border cursor-pointer transition-all hover:scale-105 ${
              selectedPack === pack.id
                ? "border-amber-400 bg-amber-400/10"
                : "border-slate-700/50 hover:border-slate-600"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-700/50 rounded-lg text-amber-400">{pack.icon}</div>
                <div>
                  <h3 className="font-semibold text-white">{pack.name}</h3>
                  <p className="text-sm text-slate-400">{pack.wordCount} words</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(pack.difficulty)}`}>
                {pack.difficulty}
              </span>
            </div>

            <p className="text-slate-300 text-sm mb-4">{pack.description}</p>

            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Preview:</p>
              <p className="text-sm text-slate-300 font-mono leading-relaxed line-clamp-3">{pack.preview}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPack && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-400 text-slate-900 font-semibold rounded-xl shadow-lg"
          >
            Start Typing with {wordPacks.find((p) => p.id === selectedPack)?.name}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
