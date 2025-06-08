"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"

interface VoiceRecognitionProps {
  onTranscript: (text: string) => void
}

export default function VoiceRecognition({ onTranscript }: VoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsSupported(true)

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript + " ")
          onTranscript(transcript + finalTranscript + " ")
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onTranscript, transcript])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false)
      recognitionRef.current.stop()
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">Voice recognition is not supported in your browser.</p>
        <p className="text-slate-500 text-sm mt-2">Please use Chrome, Edge, or Safari for voice features.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Voice Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
            isListening ? "bg-red-500 text-white animate-pulse" : "bg-green-500 text-white hover:bg-green-400"
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          {isListening ? "Stop Listening" : "Start Voice Input"}
        </button>

        <button
          onClick={() => speakText("The quick brown fox jumps over the lazy dog")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-colors"
        >
          <Volume2 className="w-5 h-5" />
          Hear Text
        </button>
      </div>

      {/* Transcript Display */}
      <div className="bg-slate-800/50 rounded-xl p-6 min-h-[100px]">
        <h4 className="text-slate-400 text-sm mb-3">Your Speech:</h4>
        <div className="text-white text-lg font-mono">
          {transcript || (isListening ? "Listening..." : "Click 'Start Voice Input' to begin")}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-slate-400 text-sm">
        <p>🎤 Speak clearly and at a normal pace</p>
        <p>🔊 Click "Hear Text" to listen to the text you need to type</p>
      </div>
    </div>
  )
}
