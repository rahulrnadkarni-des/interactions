import { useRef, useCallback, useEffect } from 'react'
import JoystickSVG from '../components/joystick/JoystickSVG'
import './ArcadeConsole.css'

export default function ArcadeConsole() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleJoystick = useCallback(({ x, y }: { x: number; y: number }) => {
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
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
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
