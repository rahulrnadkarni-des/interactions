import JoystickSVG from '../components/joystick/JoystickSVG'
import './ArcadeConsole.css'

export default function ArcadeConsole() {
  return (
    <div className="console-shell">
      <div className="console-screen">
        {/* games render here */}
      </div>
      <div className="console-panel">
        <div className="joystick-scaler">
          <JoystickSVG />
        </div>
      </div>
    </div>
  )
}
