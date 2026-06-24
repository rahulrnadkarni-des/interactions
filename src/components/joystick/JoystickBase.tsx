interface JoystickBaseProps {
  size: number
  children: React.ReactNode
}

export default function JoystickBase({ size, children }: JoystickBaseProps) {
  const baseW = Math.round(size * 0.68)
  const baseTopH = Math.round(baseW * 0.36)
  const baseFrontH = Math.round(baseTopH * 0.55)
  const shaftW = 11

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', touchAction: 'none' }}>

      {/* drag zone — shaft lives here too, behind the ball */}
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* shaft — static, centered, extends from center to bottom of drag zone */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: shaftW,
          height: size / 2 + 4,
          background: '#c8c8c8',
          borderLeft: '2px solid #888',
          borderRight: '2px solid #888',
          zIndex: 1,
        }} />

        {/* ball (children) renders at z-index 10, above shaft */}
        {children}
      </div>

      {/* base — sits flush below drag zone */}
      <div style={{ position: 'relative', width: baseW, height: baseTopH + baseFrontH }}>

        {/* drop shadow */}
        <div style={{
          position: 'absolute',
          top: 9,
          left: 9,
          width: baseW,
          height: baseTopH,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.3)',
          filter: 'blur(4px)',
          zIndex: 0,
        }} />

        {/* top ellipse */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: baseW,
          height: baseTopH,
          borderRadius: '50%',
          background: '#5a2810',
          border: '2.5px solid #1a0800',
          zIndex: 2,
        }} />

        {/* front face */}
        <div style={{
          position: 'absolute',
          top: baseTopH / 2,
          left: 0,
          width: baseW,
          height: baseFrontH + baseTopH / 2,
          background: '#3d1808',
          border: '2.5px solid #1a0800',
          borderTop: 'none',
          borderRadius: `0 0 ${baseW / 2}px ${baseW / 2}px`,
          zIndex: 1,
        }} />
      </div>
    </div>
  )
}
