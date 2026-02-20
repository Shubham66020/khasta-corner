export default function SvgWave({ color = 'var(--bg-warm)', flip = false, height = 80, className = '' }) {
  return (
    <div
      className={`svg-wave ${className}`}
      style={{
        width: '100%',
        lineHeight: 0,
        position: 'relative',
        zIndex: 2,
        transform: flip ? 'rotate(180deg)' : 'none',
        marginTop: flip ? '-1px' : 0,
        marginBottom: flip ? 0 : '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ width: '100%', height }}
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
