import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    // Only show on non-touch devices
    const isTouch = !window.matchMedia('(pointer: fine)').matches
    if (isTouch) return

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    outer.style.opacity = '1'
    inner.style.opacity = '1'

    const onMouseMove = (e) => {
      gsap.to(outer, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.set(inner, {
        x: e.clientX - 4,
        y: e.clientY - 4,
      })
    }

    const onEnterHover = () => {
      gsap.to(outer, { scale: 1.5, borderColor: 'rgba(194,112,62,0.5)', duration: 0.3 })
      gsap.to(inner, { scale: 0, duration: 0.2 })
    }

    const onLeaveHover = () => {
      gsap.to(outer, { scale: 1, borderColor: 'rgba(245,237,227,0.8)', duration: 0.3 })
      gsap.to(inner, { scale: 1, duration: 0.2 })
    }

    const onMouseDown = () => {
      gsap.to(outer, { scale: 0.85, duration: 0.15 })
      gsap.to(inner, { scale: 0.85, duration: 0.15 })
    }

    const onMouseUp = () => {
      gsap.to(outer, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
      gsap.to(inner, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    const hoverables = document.querySelectorAll('a, button, .cursor-hover, input, textarea')
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnterHover)
      el.addEventListener('mouseleave', onLeaveHover)
    })

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newHoverables = document.querySelectorAll('a, button, .cursor-hover, input, textarea')
      newHoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterHover)
        el.removeEventListener('mouseleave', onLeaveHover)
        el.addEventListener('mouseenter', onEnterHover)
        el.addEventListener('mouseleave', onLeaveHover)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterHover)
        el.removeEventListener('mouseleave', onLeaveHover)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <div className="custom-cursor">
      <div className="cursor-outer" ref={outerRef} />
      <div className="cursor-inner" ref={innerRef} />
    </div>
  )
}
