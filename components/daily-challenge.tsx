"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Trophy, Users, Clock, Target, Zap } from "lucide-react"

interface Challenge {
  id: string
  date: string
  title: string
  description: string
  text: string
  difficulty: "easy" | "medium" | "hard" | "expert"
  type: "speed" | "accuracy" | "endurance" | "special"
  targetWPM?: number
  targetAccuracy?: number
  duration: number
  participants: number
  topScore: {
    username: string
    wpm: number
    accuracy: number
  }
}

const todaysChallenge: Challenge = {
  id: "daily-2024-01-15",
  date: "2024-01-15",
  title: "Monday Motivation",
  description: "Start your week strong with inspirational quotes from successful entrepreneurs",
  text: "Success is not final, failure is not fatal: it is the courage to continue that counts. The way to get started is to quit talking and begin doing. Innovation distinguishes between a leader and a follower. Your limitation—it's only your imagination.",
  difficulty: "medium",
  type: "speed",
  targetWPM: 50,
  targetAccuracy: 95,
  duration: 60,
  participants: 1247,
  topScore: {
    username: "TypeMaster2024",
    wpm: 87,
    accuracy: 98,
  },
}

const weeklyLeaderboard = [
  { rank: 1, username: "SpeedDemon", wpm: 92, accuracy: 97, score: 8924 },
  { rank: 2, username: "AccuracyKing", wpm: 78, accuracy: 99, score: 7722 },
  { rank: 3, username: "ConsistentTyper", wpm: 85, accuracy: 96, score: 8160 },
  { rank: 4, username: "CodeNinja", wpm: 89, accuracy: 94, score: 8366 },
  { rank: 5, username: "QuickFingers", wpm: 91, accuracy: 95, score: 8645 },
]

export default function DailyChallenge() {
  const [userStats, setUserStats] = useState({
    bestWPM: 0,
    bestAccuracy: 0,
    challengesCompleted: 0,
    currentStreak: 0,
  })

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "speed":
        return <Zap className="w-4 h-4" />
      case "accuracy":
        return <Target className="w-4 h-4" />
      case "endurance":
        return <Clock className="w-4 h-4" />
      default:
        return <Trophy className="w-4 h-4" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Daily Challenge</h1>
        <p className="text-slate-400">Compete with typists worldwide in today's challenge</p>
      </div>

      {/* Today's Challenge Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-amber-400/10 to-orange-400/10 border border-amber-400/30 rounded-xl p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">{todaysChallenge.title}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(todaysChallenge.difficulty)}`}
              >
                {todaysChallenge.difficulty}
              </span>
            </div>
            <p className="text-slate-300 mb-4">{todaysChallenge.description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              {getTypeIcon(todaysChallenge.type)}
              <span className="capitalize font-medium">{todaysChallenge.type} Challenge</span>
            </div>
            <div className="text-slate-400 text-sm">
              {todaysChallenge.duration}s • {todaysChallenge.participants} participants
            </div>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-amber-400 font-bold text-xl">{todaysChallenge.targetWPM}+</div>
            <div className="text-slate-400 text-sm">Target WPM</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-xl">{todaysChallenge.targetAccuracy}%+</div>
            <div className="text-slate-400 text-sm">Target Accuracy</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-blue-400 font-bold text-xl">{todaysChallenge.topScore.wpm}</div>
            <div className="text-slate-400 text-sm">Top WPM Today</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-purple-400 font-bold text-xl">{todaysChallenge.participants}</div>
            <div className="text-slate-400 text-sm">Participants</div>
          </div>
        </div>

        {/* Challenge Text Preview */}
        <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
          <p className="text-slate-400 text-sm mb-2">Challenge Text Preview:</p>
          <p className="text-slate-300 font-mono leading-relaxed line-clamp-3">{todaysChallenge.text}</p>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(251, 191, 36, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl text-lg transition-all"
        >
          Start Today's Challenge 🚀
        </motion.button>
      </motion.div>

      {/* Weekly Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Weekly Leaderboard</h3>
        </div>

        <div className="space-y-3">
          {weeklyLeaderboard.map((player, index) => (
            <motion.div
              key={player.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                index === 0
                  ? "bg-amber-400/10 border border-amber-400/30"
                  : index === 1
                    ? "bg-slate-700/30"
                    : index === 2
                      ? "bg-orange-400/10"
                      : "bg-slate-800/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0
                      ? "bg-amber-400 text-slate-900"
                      : index === 1
                        ? "bg-slate-400 text-slate-900"
                        : index === 2
                          ? "bg-orange-400 text-slate-900"
                          : "bg-slate-600 text-slate-200"
                  }`}
                >
                  {player.rank}
                </div>
                <div>
                  <div className="font-medium text-white">{player.username}</div>
                  <div className="text-slate-400 text-sm">Score: {player.score.toLocaleString()}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-amber-400 font-medium">{player.wpm} WPM</div>
                <div className="text-green-400 text-sm">{player.accuracy}% ACC</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Your Challenge Stats</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">{userStats.bestWPM}</div>
            <div className="text-slate-400 text-sm">Best WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{userStats.bestAccuracy}%</div>
            <div className="text-slate-400 text-sm">Best Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{userStats.challengesCompleted}</div>
            <div className="text-slate-400 text-sm">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{userStats.currentStreak}</div>
            <div className="text-slate-400 text-sm">Day Streak</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
