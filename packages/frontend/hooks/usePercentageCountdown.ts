import { useEffect, useState } from "react"

type PercentageCountdown = {
  timer: number,
  startTimer: () => void
}

/**
 * Get countdown every second from a starting timestamp to startTimestamp + timeToEnd
 * @param startTimestamp starting timestamp
 * @param timeToEnd how many millisecond until the end
 * @returns Object containing the percentage left on the clock as well as `startTimer` method to start countdown
 */
export const usePercentageCountdown = (startTimestamp: number, timeToEnd: number, onComplete?: () => void): PercentageCountdown => {
  const [started, setStart] = useState<boolean>(false)
  const [percentageLeft, setPercentageLeft] = useState<number>(0)
  const endDate = new Date(startTimestamp + timeToEnd)
  const range = +endDate - +new Date(startTimestamp)

  const startTimer = () => {
    setStart(true)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!started) return

      const diff = Math.max(0, +endDate - +new Date());
      const perc = 100 - 100 * diff / range

      setPercentageLeft(perc)

      if (perc === 100) {
        clearInterval(timer)

        if (onComplete) onComplete()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [started])

  return {
    timer: percentageLeft,
    startTimer
  }
}