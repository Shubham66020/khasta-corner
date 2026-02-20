import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './RotatingBadge.css'

export default function RotatingBadge({ size = 130, className = '' }) {
  const badgeRef = useRef(null)

  useEffect(() => {
    const badge = badgeRef.current
    if (!badge) return
    gsap.to(badge, {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <div
      className={`rotating-badge ${className}`}
      ref={badgeRef}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 130 130" width={size} height={size}>
        <defs>
          <path
            id={`circle-path-${size}`}
            d="M 65,65 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            fill="none"
          />
        </defs>
        <text className="badge-text">
          <textPath href={`#circle-path-${size}`}>
            KHASTA CORNER &#x2726; AUTHENTIC STREET FOOD &#x2726;{' '}
          </textPath>
        </text>
        <circle cx="65" cy="65" r="8" fill="var(--terracotta)" opacity="0.8" />
        <circle cx="65" cy="65" r="3" fill="var(--cream)" />
      </svg>
    </div>
  )
}
