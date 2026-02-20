import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const routeNames = {
  '/': 'Home',
  '/menu': 'Menu',
  '/story': 'Our Story',
  '/contact': 'Contact',
}

export default function PageTransition({ children, onTransitionComplete }) {
  const overlayRef = useRef(null)
  const textRef = useRef(null)
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const overlay = overlayRef.current
    const text = textRef.current
    if (!overlay || !text) return

    if (prevPathRef.current === location.pathname) return
    prevPathRef.current = location.pathname

    text.textContent = routeNames[location.pathname] || ''

    const tl = gsap.timeline()

    tl.set(overlay, { transformOrigin: 'bottom', scaleY: 0 })
      .to(overlay, { scaleY: 1, duration: 0.5, ease: 'power4.inOut' })
      .to(text, { opacity: 1, duration: 0.15 }, '-=0.1')
      .set(overlay, { transformOrigin: 'top' }, '+=0.15')
      .to(text, { opacity: 0, duration: 0.15 })
      .to(overlay, { scaleY: 0, duration: 0.5, ease: 'power4.inOut' })
      .call(() => {
        if (onTransitionComplete) onTransitionComplete()
      })
  }, [location.pathname])

  return (
    <>
      <div className="page-transition-overlay" ref={overlayRef}>
        <span className="page-transition-text" ref={textRef} />
      </div>
      {children}
    </>
  )
}
