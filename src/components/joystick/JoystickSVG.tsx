import { useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { useSpring, useTransform, motion, useMotionValueEvent } from 'framer-motion'

// SVG viewBox is 164×232, rendered at 200×283
const SVG_UNITS_PER_PX = 164 / 200   // screen px → SVG user units
const ROD_LENGTH      = 116           // SVG units, pivot (y≈170) to ball center (y≈54)
const PIVOT_X         = 72.4706       // SVG user units
const PIVOT_Y         = 170           // SVG user units — rod base / base top
const DRAG_RADIUS     = 30            // screen px

interface JoystickSVGProps {
  onChange?:  (pos: { x: number; y: number }) => void
  onRelease?: () => void
  rumbling?:  boolean
}

export default function JoystickSVG({ onChange, onRelease, rumbling = false }: JoystickSVGProps) {
  const springRotate = useSpring(0, { stiffness: 280, damping: 22 })
  const springScaleY = useSpring(1, { stiffness: 260, damping: 22 })
  const springScale  = useSpring(1, { stiffness: 260, damping: 22 })

  // CSS transform string: scaleY applied first (foreshortens along rod axis), then rotate.
  // CSS applies transforms right-to-left, so writing "rotate scaleY" gives: scaleY → rotate.
  const rodTransform = useTransform(
    [springRotate, springScaleY],
    ([r, sy]: number[]) => `rotate(${r}deg) scaleY(${sy})`
  )

  const rawPos  = useRef({ x: 0, y: 0 })
  const emitRef = useRef(onChange)
  emitRef.current = onChange

  useMotionValueEvent(springRotate, 'change', () => {
    emitRef.current?.({
      x: rawPos.current.x / DRAG_RADIUS,
      y: rawPos.current.y / DRAG_RADIUS,
    })
  })

  const bind = useDrag(
    ({ offset: [ox, oy], last }) => {
      if (last) {
        rawPos.current = { x: 0, y: 0 }
        springRotate.set(0)
        springScaleY.set(1)
        springScale.set(1)
        onRelease?.()
        return
      }

      const mag = Math.sqrt(ox * ox + oy * oy)
      const cx  = mag <= DRAG_RADIUS ? ox : (ox / mag) * DRAG_RADIUS
      const cy  = mag <= DRAG_RADIUS ? oy : (oy / mag) * DRAG_RADIUS
      rawPos.current = { x: cx, y: cy }

      const ny = cy / DRAG_RADIUS

      // X → geometric rotation around base pivot
      const svgDragX = cx * SVG_UNITS_PER_PX
      const rotAngle = Math.atan2(svgDragX, ROD_LENGTH) * (180 / Math.PI)

      // Y → rod foreshortening (shorter toward viewer, longer away)
      const scaleY = 1 - ny * 0.18

      // Y → ball perspective scale: bigger coming toward viewer
      const scale = 1 + ny * 0.08

      springRotate.set(rotAngle)
      springScaleY.set(scaleY)
      springScale.set(scale)
    },
    { from: () => [rawPos.current.x, rawPos.current.y] }
  )

  return (
    <div
      {...bind()}
      style={{ touchAction: 'none', userSelect: 'none', cursor: 'grab', display: 'inline-block' }}
    >
      <svg
        viewBox="0 0 164 232"
        width={200}
        height={283}
        overflow="visible"
        style={{ display: 'block' }}
      >
        <defs>
          <mask id="jsk-base-mask" maskUnits="userSpaceOnUse" x="0" y="131.542" width="145" height="100" fill="black">
            <rect fill="white" y="131.542" width="145" height="100" />
            <path d="M72.4707 135.542C110.286 135.542 140.941 152.171 140.941 172.685C140.941 173.027 140.932 173.369 140.915 173.709V189.339C140.932 189.68 140.941 190.022 140.941 190.365C140.941 210.878 110.286 227.507 72.4707 227.507C34.6556 227.507 4.00018 210.878 4 190.365C4 189.989 4.01178 189.614 4.03223 189.241V173.808C4.01181 173.435 4 173.061 4 172.685C4.00023 152.171 34.6556 135.542 72.4707 135.542Z" />
          </mask>
        </defs>

        {/* ── STATIC: shadow + base ── */}
        <g>
          <ellipse cx="95.4706" cy="186.331" rx="68.4706" ry="41.4978" fill="black" fillOpacity="0.2" />
          <path d="M72.4707 135.542C110.286 135.542 140.941 152.171 140.941 172.685C140.941 173.027 140.932 173.369 140.915 173.709V189.339C140.932 189.68 140.941 190.022 140.941 190.365C140.941 210.878 110.286 227.507 72.4707 227.507C34.6556 227.507 4.00018 210.878 4 190.365C4 189.989 4.01178 189.614 4.03223 189.241V173.808C4.01181 173.435 4 173.061 4 172.685C4.00023 152.171 34.6556 135.542 72.4707 135.542Z" fill="#3F0C14" />
          <path d="M72.4707 135.542V131.542V131.542V135.542ZM140.941 172.685H144.941V172.685L140.941 172.685ZM140.915 173.709L136.92 173.51L136.915 173.61V173.709H140.915ZM140.915 189.339H136.915V189.439L136.92 189.539L140.915 189.339ZM140.941 190.365L144.941 190.365V190.365H140.941ZM72.4707 227.507V231.507V231.507V227.507ZM4 190.365H0V190.365L4 190.365ZM4.03223 189.241L8.02624 189.459L8.03223 189.35V189.241H4.03223ZM4.03223 173.808H8.03223V173.699L8.02625 173.589L4.03223 173.808ZM4 172.685L0 172.685V172.685H4ZM72.4707 135.542V139.542C90.8443 139.542 107.28 143.591 118.979 149.937C130.835 156.368 136.941 164.59 136.941 172.685L140.941 172.685L144.941 172.685C144.941 160.267 135.72 149.917 122.794 142.905C109.712 135.808 91.9122 131.542 72.4707 131.542V135.542ZM140.941 172.685H136.941C136.941 172.955 136.934 173.229 136.92 173.51L140.915 173.709L144.91 173.909C144.93 173.509 144.941 173.1 144.941 172.685H140.941ZM140.915 173.709H136.915V189.339H140.915H144.915V173.709H140.915ZM140.915 189.339L136.92 189.539C136.934 189.819 136.941 190.094 136.941 190.365H140.941H144.941C144.941 189.949 144.93 189.54 144.91 189.14L140.915 189.339ZM140.941 190.365L136.941 190.365C136.941 198.46 130.835 206.681 118.979 213.112C107.28 219.459 90.8443 223.507 72.4707 223.507V227.507V231.507C91.9123 231.507 109.712 227.241 122.794 220.144C135.72 213.133 144.941 202.783 144.941 190.365L140.941 190.365ZM72.4707 227.507V223.507C54.0971 223.507 37.6611 219.459 25.962 213.112C14.1067 206.681 8.00007 198.46 8 190.365L4 190.365L0 190.365C0.00010705 202.783 9.22122 213.133 22.1475 220.144C35.2299 227.241 53.0291 231.507 72.4707 231.507V227.507ZM4 190.365H8C8 190.072 8.00918 189.771 8.02624 189.459L4.03223 189.241L0.0382159 189.022C0.0143738 189.457 0 189.905 0 190.365H4ZM4.03223 189.241H8.03223V173.808H4.03223H0.0322266V189.241H4.03223ZM4.03223 173.808L8.02625 173.589C8.0092 173.278 8 172.977 8 172.685H4H0C0 173.144 0.0144305 173.592 0.0382049 174.027L4.03223 173.808ZM4 172.685L8 172.685C8.00009 164.59 14.1068 156.368 25.9621 149.937C37.6612 143.591 54.0971 139.542 72.4707 139.542V135.542V131.542C53.0292 131.542 35.2299 135.808 22.1475 142.905C9.22125 149.917 0.000141382 160.267 0 172.685L4 172.685Z" fill="black" mask="url(#jsk-base-mask)" />
          <ellipse cx="72.4706" cy="172.685" rx="68.4706" ry="37.1431" fill="#5E1923" />
        </g>

        {/* ── ANIMATED: rod + ball, pivoting from rod base ── */}
        <motion.g
          style={{
            transform:       rodTransform,
            transformOrigin: `${PIVOT_X}px ${PIVOT_Y}px`,
            transformBox:    'view-box',
          }}
        >
          <path
            d="M84.5779 60.827V166.712H82.5779L84.5779 166.716V166.75C84.5776 166.764 84.5775 166.779 84.5769 166.796C84.5757 166.829 84.5732 166.867 84.5701 166.91C84.5638 166.995 84.5529 167.099 84.5339 167.22C84.496 167.46 84.4263 167.768 84.2976 168.118C84.0366 168.828 83.5461 169.678 82.658 170.483C80.8838 172.091 77.7865 173.292 72.4705 173.292C67.1545 173.292 64.0571 172.091 62.283 170.483C61.395 169.678 60.9053 168.827 60.6443 168.118C60.5156 167.768 60.4449 167.46 60.407 167.22C60.388 167.099 60.3771 166.995 60.3708 166.91C60.3677 166.867 60.3662 166.829 60.365 166.796C60.3644 166.779 60.3633 166.764 60.363 166.75V166.716L62.363 166.712H60.363V60.827H84.5779Z"
            fill="#A9C3D9"
            stroke="black"
            strokeWidth="4"
          />
          <path
            d="M65.226 104.735H71.7151V165.962C71.7151 165.962 71.7151 167.685 68.4706 167.685C65.226 167.685 65.226 165.962 65.226 165.962V104.735Z"
            fill="#CCE4F8"
          />

          {/* ball — perspective scale on top of rod rotation */}
          <motion.g
            className={rumbling ? 'rumbling' : undefined}
            style={{
              scale:           springScale,
              transformOrigin: `${PIVOT_X}px 54px`,
              transformBox:    'view-box',
            }}
          >
            <circle cx="72.4706" cy="54" r="52" fill="#319FFF" stroke="black" strokeWidth="4" />
            <path d="M76.0302 4.125C101.983 5.95049 122.471 27.5826 122.471 54C122.471 81.6142 100.085 104 72.4706 104C44.8563 104 22.4706 81.6142 22.4706 54C22.4706 52.4083 22.5458 50.834 22.6913 49.2803C24.8668 70.6125 42.8854 87.2568 64.7919 87.2568C88.1652 87.2568 107.113 68.3089 107.113 44.9355C107.113 25.4534 93.9486 9.04819 76.0302 4.125Z" fill="#2390EF" />
            <ellipse cx="48.6554" cy="24.5457" rx="12.5838" ry="7.88548" transform="rotate(-36.8459 48.6554 24.5457)" fill="white" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  )
}
