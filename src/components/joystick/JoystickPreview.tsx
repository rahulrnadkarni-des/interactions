import { useState, useCallback, useRef } from 'react'
import JoystickSVG from './JoystickSVG'
import { useHaptics } from '../../hooks/useHaptics'

export default function JoystickPreview() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [snapBack, setSnapBack] = useState(false)
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { rumbling } = useHaptics({ x: pos.x, y: pos.y, snapBack })

  const handleChange = useCallback((next: { x: number; y: number }) => {
    setPos(next)
  }, [])

  const handleRelease = useCallback(() => {
    setSnapBack(true)
    if (snapTimer.current) clearTimeout(snapTimer.current)
    snapTimer.current = setTimeout(() => setSnapBack(false), 50)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <JoystickSVG onChange={handleChange} onRelease={handleRelease} rumbling={rumbling} />
      <span style={{ fontFamily: 'var(--font)', fontSize: 13, color: 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums' }}>
        {pos.x.toFixed(2)}, {pos.y.toFixed(2)}
      </span>
    </div>
  )
}
