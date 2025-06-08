"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTypingStore } from "@/store/typing-store"
import { calculateWPM, calculateAccuracy } from "@/lib/typing-utils"

interface TypingBoxProps {
  onFinish: () => void
}

export default function TypingBox({ onFinish }: TypingBoxProps) {
  const { mode, difficulty, time } = useTypingStore()
  const [text, setText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(Number.parseInt(time))
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [mistakes, setMistakes] = useState<{ char: string; typed: string }[]>([])
  const [isFinished, setIsFinished] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // Get text based on mode and difficulty
  useEffect(() => {
    // In a real app, you'd fetch from an API or database
    const texts = {
      normal: {
        easy: "The quick brown fox jumps over the lazy dog.",
        medium: "The five boxing wizards jump quickly. A quick movement of the enemy will jeopardize five gunboats.",
        hard: "Amazingly few discotheques provide jukeboxes. How vexingly quick daft zebras jump! Pack my box with five dozen liquor jugs.",
      },
      code: {
        easy: "function hello() { console.log('Hello, World!'); }",
        medium: "const sum = (a, b) => a + b; const multiply = (a, b) => a * b;",
        hard: "async function fetchData() { try { const response = await fetch(url); return await response.json(); } catch (error) { console.error(error); } }",
      },
      email: {
        easy: "Dear John, Thank you for your email. I look forward to meeting you next week. Best regards, Jane",
        medium:
          "I'm writing to follow up on our previous conversation regarding the project timeline. Could we schedule a meeting to discuss this further?",
        hard: "I hope this email finds you well. I wanted to touch base regarding the quarterly report that's due next Friday. Please ensure all departments submit their data by Wednesday.",
      },
      ssc: {
        easy: "The capital of France is Paris. The Eiffel Tower is a famous landmark.",
        medium:
          "Photosynthesis is the process by which green plants use sunlight to synthesize foods with carbon dioxide and water.",
        hard: "The mitochondrion is a double membrane-bound organelle found in most eukaryotic organisms. Mitochondria generate most of the cell's supply of adenosine triphosphate (ATP).",
      },
    }

    setText(texts[mode as keyof typeof texts][difficulty as keyof typeof texts.normal])
  }, [mode, difficulty])

  // Timer logic
  useEffect(() => {
    if (startTime === null) {
      setStartTime(Date.now())
    }

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - (startTime || Date.now())) / 1000)
      const remaining = Number.parseInt(time) - elapsed

      if (remaining <= 0) {
        clearInterval(timer)
        setTimeLeft(0)
        setIsFinished(true)
      } else {
        setTimeLeft(remaining)
      }

      // Update WPM and accuracy every second
      if (userInput.length > 0) {
        setWpm(calculateWPM(userInput.length, elapsed))
        setAccuracy(calculateAccuracy(text, userInput))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime, time, text, userInput])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setUserInput(value)

      // Check for mistakes
      const newMistakes = []
      for (let i = 0; i < value.length; i++) {
        if (i < text.length && value[i] !== text[i]) {
          newMistakes.push({ char: text[i], typed: value[i] })
        }
      }
      setMistakes(newMistakes.slice(0, 5)) // Show only the last 5 mistakes

      // Check if completed
      if (value === text) {
        setIsFinished(true)
      }
    },
    [text],
  )

  // Handle restart
  const handleRestart = () => {
    onFinish()
  }

  return (
    <div className="w-full max-w-3xl space-y-6">
      {isFinished ? (
        <div className="space-y-8 text-center">
          <h2 className="text-3xl font-bold">Results</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium">WPM</h3>
              <p className="text-3xl font-bold">{wpm}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium">Accuracy</h3>
              <p className="text-3xl font-bold">{accuracy}%</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium">Time</h3>
              <p className="text-3xl font-bold">{Number.parseInt(time)}s</p>
            </div>
          </div>
          <Button size="lg" onClick={handleRestart}>
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">Timer: {timeLeft}s</div>
            <div className="text-lg font-medium">WPM: {wpm}</div>
            <div className="text-lg font-medium">Accuracy: {accuracy}%</div>
          </div>

          <div className="p-6 border rounded-lg">
            <p className="text-xl mb-4">{text}</p>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="w-full p-2 border-b focus:outline-none bg-transparent"
              placeholder="Type here..."
              autoFocus
            />
          </div>

          {mistakes.length > 0 && (
            <div className="text-sm text-red-500">
              <p>Mistakes:</p>
              <div className="flex flex-wrap gap-2">
                {mistakes.map((mistake, i) => (
                  <span key={i}>
                    {mistake.char} → {mistake.typed}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Progress value={(userInput.length / text.length) * 100} className="h-2" />
        </>
      )}
    </div>
  )
}
