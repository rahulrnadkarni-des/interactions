import { useRef, useCallback, useEffect, type ReactElement } from 'react'
import JoystickSVG from '../components/joystick/JoystickSVG'
import type { JoystickPosition } from '../types/joystick'
import './ArcadeConsole.css'

export default function ArcadeConsole(): ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleJoystick = useCallback(({ x, y }: JoystickPosition) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'JOYSTICK', x, y }, '*')
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        iframeRef.current?.contentWindow?.postMessage({ type: 'KEY', key: 'Escape' }, '*')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="console-shell">
      <div className="console-screen">
        <iframe
          ref={iframeRef}
          src="/games/mimic/index.html"
          title="MIMIC"
          className="console-iframe"
        />
      </div>
      <div className="console-panel">
        <div className="joystick-scaler">
          <JoystickSVG onChange={handleJoystick} />
        </div>
      </div>
    </div>
  )
}
