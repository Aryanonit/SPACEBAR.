"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Target, Clock, Zap, Award, Calendar } from "lucide-react"

interface TypingSession {
  id: string
  date: string
  wpm: number
  accuracy: number
  duration: number
  mode: string
  mistakes: number
  consistency: number
}

interface StatsData {
  sessions: TypingSession[]
  totalTests: number
  averageWPM: number
  averageAccuracy: number
  totalTimeTyped: number
  bestWPM: number
  bestAccuracy: number
  currentStreak: number
  longestStreak: number
}

// Mock data - in a real app, this would come from your database
const mockSessions: TypingSession[] = [
  { id: "1", date: "2024-01-01", wpm: 45, accuracy: 92, duration: 60, mode: "words", mistakes: 8, consistency: 85 },
  { id: "2", date: "2024-01-02", wpm: 48, accuracy: 94, duration: 60, mode: "words", mistakes: 6, consistency: 87 },
  { id: "3", date: "2024-01-03", wpm: 52, accuracy: 91, duration: 60, mode: "code", mistakes: 9, consistency: 82 },
  { id: "4", date: "2024-01-04", wpm: 55, accuracy: 96, duration: 60, mode: "words", mistakes: 4, consistency: 91 },
  { id: "5", date: "2024-01-05", wpm: 58, accuracy: 93, duration: 60, mode: "email", mistakes: 7, consistency: 88 },
  { id: "6", date: "2024-01-06", wpm: 61, accuracy: 95, duration: 60, mode: "words", mistakes: 5, consistency: 93 },
  { id: "7", date: "2024-01-07", wpm: 65, accuracy: 97, duration: 60, mode: "words", mistakes: 3, consistency: 95 },
]

export default function StatsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("wpm")
  const [stats, setStats] = useState<StatsData | null>(null)

  useEffect(() => {
    // Calculate stats from sessions
    const calculateStats = (sessions: TypingSession[]): StatsData => {
      const totalTests = sessions.length
      const averageWPM = Math.round(sessions.reduce((sum, s) => sum + s.wpm, 0) / totalTests)
      const averageAccuracy = Math.round(sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalTests)
      const totalTimeTyped = sessions.reduce((sum, s) => sum + s.duration, 0)
      const bestWPM = Math.max(...sessions.map((s) => s.wpm))
      const bestAccuracy = Math.max(...sessions.map((s) => s.accuracy))

      return {
        sessions,
        totalTests,
        averageWPM,
        averageAccuracy,
        totalTimeTyped,
        bestWPM,
        bestAccuracy,
        currentStreak: 7, // Mock data
        longestStreak: 12, // Mock data
      }
    }

    setStats(calculateStats(mockSessions))
  }, [])

  const timeRanges = [
    { id: "7d", label: "7 Days" },
    { id: "30d", label: "30 Days" },
    { id: "90d", label: "90 Days" },
    { id: "1y", label: "1 Year" },
  ]

  const metrics = [
    { id: "wpm", label: "WPM", color: "#fbbf24" },
    { id: "accuracy", label: "Accuracy", color: "#10b981" },
    { id: "consistency", label: "Consistency", color: "#6366f1" },
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  if (!stats) return <div>Loading stats...</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Your Typing Stats</h1>
        <p className="text-slate-400">Track your progress and identify areas for improvement</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center gap-2">
        {timeRanges.map((range) => (
          <motion.button
            key={range.id}
            onClick={() => setTimeRange(range.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeRange === range.id
                ? "bg-amber-400 text-slate-900"
                : "bg-slate-800/50 text-slate-400 hover:text-amber-400"
            }`}
          >
            {range.label}
          </motion.button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Average WPM", value: stats.averageWPM, icon: <Zap className="w-5 h-5" />, color: "text-amber-400" },
          {
            label: "Best WPM",
            value: stats.bestWPM,
            icon: <TrendingUp className="w-5 h-5" />,
            color: "text-green-400",
          },
          {
            label: "Accuracy",
            value: `${stats.averageAccuracy}%`,
            icon: <Target className="w-5 h-5" />,
            color: "text-blue-400",
          },
          {
            label: "Time Typed",
            value: formatTime(stats.totalTimeTyped),
            icon: <Clock className="w-5 h-5" />,
            color: "text-purple-400",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`${metric.color}`}>{metric.icon}</div>
              <span className="text-slate-400 text-sm">{metric.label}</span>
            </div>
            <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Progress Over Time</h3>
          <div className="flex gap-2">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  selectedMetric === metric.id
                    ? "bg-amber-400 text-slate-900"
                    : "bg-slate-700/50 text-slate-400 hover:text-white"
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.sessions}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metrics.find((m) => m.id === selectedMetric)?.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={metrics.find((m) => m.id === selectedMetric)?.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={metrics.find((m) => m.id === selectedMetric)?.color}
                strokeWidth={2}
                fill="url(#colorGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Recent Sessions</h3>
        <div className="space-y-3">
          {stats.sessions
            .slice(-5)
            .reverse()
            .map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-slate-400 text-sm">{new Date(session.date).toLocaleDateString()}</div>
                  <div className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 capitalize">
                    {session.mode}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-amber-400 font-medium">{session.wpm} WPM</div>
                  <div className="text-green-400">{session.accuracy}% ACC</div>
                  <div className="text-blue-400">{session.consistency}% CON</div>
                  <div className="text-slate-400">{formatTime(session.duration)}</div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Speed Demon", description: "Reached 60+ WPM", icon: <Zap className="w-6 h-6" />, unlocked: true },
            {
              title: "Accuracy Master",
              description: "95%+ accuracy for 5 tests",
              icon: <Target className="w-6 h-6" />,
              unlocked: true,
            },
            {
              title: "Consistent Typer",
              description: "7-day typing streak",
              icon: <Calendar className="w-6 h-6" />,
              unlocked: true,
            },
            {
              title: "Code Warrior",
              description: "Complete 10 code tests",
              icon: <Award className="w-6 h-6" />,
              unlocked: false,
            },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                  : "bg-slate-900/50 border-slate-700/50 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {achievement.icon}
                <span className="font-medium">{achievement.title}</span>
              </div>
              <p className="text-sm opacity-80">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
