import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import RotatingBadge from './RotatingBadge'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const counterRef = useRef(null)
  const brandRef = useRef(null)
  const barFillRef = useRef(null)

  useEffect(() => {
    const counter = counterRef.current
    const brandChars = brandRef.current?.querySelectorAll('.loading-brand-char')
    const barFill = barFillRef.current
    const top = topRef.current
    const bottom = bottomRef.current

    if (!counter || !brandChars?.length || !barFill || !top || !bottom) return

    const obj = { val: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      },
    })

    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      snap: { val: 1 },
      onUpdate: () => {
        counter.textContent = String(Math.round(obj.val)).padStart(3, '0')
      },
    })
      .to(
        barFill,
        {
          scaleX: 1,
          duration: 2.5,
          ease: 'power2.inOut',
        },
        0
      )
      .from(
        brandChars,
        {
          y: '110%',
          stagger: 0.04,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=1.5'
      )
      .to(top, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      })
      .to(
        bottom,
        {
          yPercent: 100,
          duration: 0.8,
          ease: 'power4.inOut',
        },
        '<'
      )
  }, [onComplete])

  const brandText = 'Khasta Corner'

  return (
    <div ref={screenRef} className="loading-screen">
      <div ref={topRef} className="loading-screen-top" />
      <div ref={bottomRef} className="loading-screen-bottom" />

      <div className="loading-content">
        <div ref={counterRef} className="loading-counter">000</div>
        <div ref={brandRef} className="loading-brand">
          {brandText.split('').map((char, i) => (
            <span key={i} className="loading-brand-char">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      <div className="loading-bar">
        <div ref={barFillRef} className="loading-bar-fill" />
      </div>

      <div className="loading-badge">
        <RotatingBadge size={80} />
      </div>
    </div>
  )
}
