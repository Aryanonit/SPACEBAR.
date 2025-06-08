/**
 * Calculate words per minute
 * @param charCount Number of characters typed
 * @param seconds Time elapsed in seconds
 * @returns WPM value
 */
export function calculateWPM(charCount: number, seconds: number): number {
  if (seconds === 0) return 0

  // Standard: 5 characters = 1 word
  const words = charCount / 5
  const minutes = seconds / 60

  return Math.round(words / minutes)
}

/**
 * Calculate typing accuracy
 * @param originalText The original text
 * @param typedText The text typed by the user
 * @returns Accuracy percentage
 */
export function calculateAccuracy(originalText: string, typedText: string): number {
  if (typedText.length === 0) return 100

  let correctChars = 0
  const minLength = Math.min(originalText.length, typedText.length)

  for (let i = 0; i < minLength; i++) {
    if (originalText[i] === typedText[i]) {
      correctChars++
    }
  }

  return Math.round((correctChars / typedText.length) * 100)
}

/**
 * Calculate consistency score
 * @param wpmHistory Array of WPM values over time
 * @returns Consistency percentage
 */
export function calculateConsistency(wpmHistory: number[]): number {
  if (wpmHistory.length < 2) return 100

  const mean = wpmHistory.reduce((sum, wpm) => sum + wpm, 0) / wpmHistory.length
  const variance = wpmHistory.reduce((sum, wpm) => sum + Math.pow(wpm - mean, 2), 0) / wpmHistory.length
  const standardDeviation = Math.sqrt(variance)

  // Convert to consistency percentage (lower deviation = higher consistency)
  const consistency = Math.max(0, 100 - (standardDeviation / mean) * 100)
  return Math.round(consistency)
}
