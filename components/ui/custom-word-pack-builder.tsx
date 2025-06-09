"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Save, Upload, Download, Trash2, Edit3 } from "lucide-react"

interface CustomWordPack {
  id: string
  name: string
  description: string
  words: string[]
  difficulty: "easy" | "medium" | "hard" | "expert"
  category: string
  isPublic: boolean
  createdAt: string
}

export default function CustomWordPackBuilder() {
  const [packs, setPacks] = useState<CustomWordPack[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingPack, setEditingPack] = useState<CustomWordPack | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    description: string
    words: string
    difficulty: "easy" | "medium" | "hard" | "expert"
    category: string
    isPublic: boolean
  }>({
    name: "",
    description: "",
    words: "",
    difficulty: "medium",
    category: "custom",
    isPublic: false,
  })

  const handleCreatePack = () => {
    const wordList = formData.words
      .split(/[\n,]/)
      .map((word) => word.trim())
      .filter((word) => word.length > 0)

    if (wordList.length < 10) {
      alert("Please add at least 10 words")
      return
    }

    const newPack: CustomWordPack = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      words: wordList,
      difficulty: formData.difficulty,
      category: formData.category,
      isPublic: formData.isPublic,
      createdAt: new Date().toISOString(),
    }

    setPacks([...packs, newPack])
    setFormData({
      name: "",
      description: "",
      words: "",
      difficulty: "medium",
      category: "custom",
      isPublic: false,
    })
    setIsCreating(false)
  }

  const handleImportPack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        setPacks([...packs, { ...imported, id: Date.now().toString() }])
      } catch (error) {
        alert("Invalid file format")
      }
    }
    reader.readAsText(file)
  }

  const handleExportPack = (pack: CustomWordPack) => {
    const dataStr = JSON.stringify(pack, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${pack.name.replace(/\s+/g, "_")}.json`
    link.click()
  }

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

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Custom Word Packs</h1>
        <p className="text-slate-400">Create, import, and manage your own typing practice content</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <motion.button
          onClick={() => setIsCreating(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-slate-900 rounded-lg font-medium"
        >
          <Plus className="w-5 h-5" />
          Create New Pack
        </motion.button>

        <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium cursor-pointer"
        >
          <Upload className="w-5 h-5" />
          Import Pack
          <input type="file" accept=".json" onChange={handleImportPack} className="hidden" />
        </motion.label>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingPack) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            {editingPack ? "Edit Word Pack" : "Create New Word Pack"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 mb-2">Pack Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                placeholder="My Custom Pack"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                placeholder="Describe your word pack..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-2">
                Words (separate by commas or new lines, minimum 10 words)
              </label>
              <textarea
                value={formData.words}
                onChange={(e) => setFormData({ ...formData, words: e.target.value })}
                className="w-full h-32 bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono"
                placeholder="word1, word2, word3&#10;or one word per line"
              />
              <div className="text-slate-400 text-sm mt-1">
                Word count: {formData.words.split(/[\n,]/).filter((w) => w.trim()).length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isPublic" className="text-slate-300">
                Make this pack public
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.button
              onClick={handleCreatePack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg"
            >
              <Save className="w-4 h-4" />
              {editingPack ? "Update Pack" : "Create Pack"}
            </motion.button>

            <motion.button
              onClick={() => {
                setIsCreating(false)
                setEditingPack(null)
                setFormData({
                  name: "",
                  description: "",
                  words: "",
                  difficulty: "medium",
                  category: "custom",
                  isPublic: false,
                })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-slate-600 text-white rounded-lg"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Your Packs */}
      {packs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-xl font-bold text-white mb-6">Your Custom Packs</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packs.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white">{pack.name}</h4>
                    <p className="text-sm text-slate-400">{pack.words.length} words</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(pack.difficulty)}`}>
                    {pack.difficulty}
                  </span>
                </div>

                <p className="text-slate-300 text-sm mb-4">{pack.description}</p>

                <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-slate-400 mb-1">Preview:</p>
                  <p className="text-sm text-slate-300 font-mono line-clamp-2">
                    {pack.words.slice(0, 10).join(", ")}...
                  </p>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => {
                      setEditingPack(pack)
                      setFormData({
                        name: pack.name,
                        description: pack.description,
                        words: pack.words.join(", "),
                        difficulty: pack.difficulty,
                        category: pack.category,
                        isPublic: pack.isPublic,
                      })
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </motion.button>

                  <motion.button
                    onClick={() => handleExportPack(pack)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm"
                  >
                    <Download className="w-3 h-3" />
                    Export
                  </motion.button>

                  <motion.button
                    onClick={() => setPacks(packs.filter((p) => p.id !== pack.id))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
