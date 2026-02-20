import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MagneticButton.css'

export default function MagneticButton({ children, strength = 0.3, className = '' }) {
  const btnRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    const isTouch = !window.matchMedia('(pointer: fine)').matches
    if (isTouch) return

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    btn.addEventListener('mousemove', onMouseMove)
    btn.addEventListener('mouseleave', onMouseLeave)

    return () => {
      btn.removeEventListener('mousemove', onMouseMove)
      btn.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength])

  return (
    <div className={`magnetic-button ${className}`} ref={btnRef}>
      {children}
    </div>
  )
}
