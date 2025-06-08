import { create } from "zustand"

interface TypingState {
  mode: string
  setMode: (mode: string) => void
  difficulty: string
  setDifficulty: (difficulty: string) => void
  time: string
  setTime: (time: string) => void
  isTyping: boolean
  startTyping: () => void
  resetTyping: () => void
  currentText: string
  setCurrentText: (text: string) => void
  voiceMode: boolean
  setVoiceMode: (enabled: boolean) => void
  language: string
  setLanguage: (language: string) => void
}

export const useTypingStore = create<TypingState>((set) => ({
  mode: "words",
  setMode: (mode) => set({ mode }),
  difficulty: "medium",
  setDifficulty: (difficulty) => set({ difficulty }),
  time: "60",
  setTime: (time) => set({ time }),
  isTyping: false,
  startTyping: () => set({ isTyping: true }),
  resetTyping: () => set({ isTyping: false }),
  currentText: "The quick brown fox jumps over the lazy dog and runs through the forest.",
  setCurrentText: (text) => set({ currentText: text }),
  voiceMode: false,
  setVoiceMode: (enabled) => set({ voiceMode: enabled }),
  language: "en",
  setLanguage: (language) => set({ language }),
}))
