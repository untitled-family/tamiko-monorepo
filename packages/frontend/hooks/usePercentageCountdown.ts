import { useEffect, useState } from "react"

export const usePercentageCountdown = (startTimestamp: number, timeToEnd: number, onComplete?: () => void) => {
  const [percentageLeft, setPercentageLeft] = useState<number>(0)
  const endDate = new Date(startTimestamp + timeToEnd)
  const range = +endDate - +new Date(startTimestamp)

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.max(0, +endDate - +new Date());
      const perc = 100 - 100 * diff / range

      setPercentageLeft(perc)

      if (perc === 100) {
        clearInterval(timer)

        if (onComplete) onComplete()
      }
    }, 1000)

    return () => clearInterval(timer)
  })

  return percentageLeft
}