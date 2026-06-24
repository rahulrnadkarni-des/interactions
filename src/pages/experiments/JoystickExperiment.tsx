import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Joystick from '../../components/joystick/Joystick'
import { useHaptics } from '../../hooks/useHaptics'
import './JoystickExperiment.css'

export default function JoystickExperiment() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [snapBack, setSnapBack] = useState(false)
  const snapBackTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { rumbling } = useHaptics({ x: pos.x, y: pos.y, snapBack })

  const handleChange = useCallback((next: { x: number; y: number }) => {
    setPos(next)
  }, [])

  const handleRelease = useCallback(() => {
    setSnapBack(true)
    if (snapBackTimer.current) clearTimeout(snapBackTimer.current)
    snapBackTimer.current = setTimeout(() => setSnapBack(false), 50)
  }, [])

  return (
    <div className="experiment">
      <nav className="experiment-nav">
        <Link to="/">← Back</Link>
        <span>Haptic Joystick</span>
        <span className="experiment-date">2026-06-24</span>
      </nav>

      <div className="experiment-stage">
        <Joystick
          onChange={handleChange}
          onRelease={handleRelease}
          rumbling={rumbling}
        />
      </div>

      <div className="readout">
        <span>x: <code>{pos.x.toFixed(2)}</code></span>
        <span>y: <code>{pos.y.toFixed(2)}</code></span>
      </div>
    </div>
  )
}
