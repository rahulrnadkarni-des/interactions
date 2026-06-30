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
        <svg
          className="screen-inner-shadow"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <mask id="squircle-outer">
              <rect width="200" height="200" fill="white" />
              <path fill="black" d="M100 0C195 0 200 2.5 200 100C200 197.5 197.5 200 100 200C2.5 200 0 197.5 0 100C0 2.5 2.5 0 100 0Z" />
            </mask>
            <filter id="squircle-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>
          <rect
            width="200"
            height="200"
            fill="#000000"
            mask="url(#squircle-outer)"
            filter="url(#squircle-blur)"
          />
        </svg>
      </div>
      <div className="console-panel">
        <div className="joystick-scaler">
          <JoystickSVG onChange={handleJoystick} />
        </div>
      </div>
    </div>
  )
}
