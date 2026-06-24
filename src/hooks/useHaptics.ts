import { useEffect, useRef, useState } from 'react'

interface HapticsInput {
  x: number
  y: number
  snapBack: boolean
}

export function useHaptics({ x, y, snapBack }: HapticsInput) {
  const [rumbling, setRumbling] = useState(false)
  const wasAboveThreshold = useRef(false)
  const rumbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) navigator.vibrate(pattern)
  }

  // movement vibration — pulse once per threshold crossing
  useEffect(() => {
    const mag = Math.sqrt(x * x + y * y)
    const above = mag > 0.3
    if (above && !wasAboveThreshold.current) vibrate(15)
    wasAboveThreshold.current = above
  }, [x, y])

  // snap-back vibration + visual rumble
  useEffect(() => {
    if (!snapBack) return
    vibrate([40, 10, 40])
    setRumbling(true)
    if (rumbleTimer.current) clearTimeout(rumbleTimer.current)
    rumbleTimer.current = setTimeout(() => setRumbling(false), 300)
    return () => {
      if (rumbleTimer.current) clearTimeout(rumbleTimer.current)
    }
  }, [snapBack])

  return { rumbling }
}
