import { useCallback, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { useSpring, useMotionValueEvent, motion } from 'framer-motion'
import JoystickBase from './JoystickBase'

interface JoystickProps {
  radius?: number
  knobSize?: number
  onChange?: (pos: { x: number; y: number }) => void
  onRelease?: () => void
  rumbling?: boolean
}

export default function Joystick({
  radius = 55,
  knobSize = 56,
  onChange,
  onRelease,
  rumbling = false,
}: JoystickProps) {
  const baseSize = radius * 2 + knobSize

  const springX = useSpring(0, { stiffness: 300, damping: 20 })
  const springY = useSpring(0, { stiffness: 300, damping: 20 })

  const emitRef = useRef(onChange)
  emitRef.current = onChange

  useMotionValueEvent(springX, 'change', () => {
    const x = springX.get()
    const y = springY.get()
    emitRef.current?.({ x: x / radius, y: y / radius })
  })

  const clampToCircle = useCallback(
    (x: number, y: number) => {
      const mag = Math.sqrt(x * x + y * y)
      if (mag <= radius) return { x, y }
      return { x: (x / mag) * radius, y: (y / mag) * radius }
    },
    [radius]
  )

  const bind = useDrag(
    ({ offset: [ox, oy], last }) => {
      if (last) {
        springX.set(0)
        springY.set(0)
        onRelease?.()
      } else {
        const clamped = clampToCircle(ox, oy)
        springX.set(clamped.x)
        springY.set(clamped.y)
      }
    },
    { from: () => [springX.get(), springY.get()] }
  )

  return (
    <JoystickBase size={baseSize}>
      <motion.div
        {...bind()}
        className={rumbling ? 'rumbling' : undefined}
        style={{
          width: knobSize,
          height: knobSize,
          borderRadius: '50%',
          background: '#4a90d9',
          border: '2.5px solid #1a0800',
          outline: 'none',
          cursor: 'grab',
          position: 'absolute',
          x: springX,
          y: springY,
          touchAction: 'none',
          zIndex: 10,
          boxShadow: 'inset -5px -6px 0 rgba(0,0,0,0.2)',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* highlight dot */}
        <div style={{
          position: 'absolute',
          top: 10,
          left: 12,
          width: 13,
          height: 13,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.82)',
          pointerEvents: 'none',
        }} />
      </motion.div>
    </JoystickBase>
  )
}
