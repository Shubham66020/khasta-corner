import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Marquee.css'

export default function Marquee({
  items = [],
  speed = 40,
  direction = 'left',
  separator = 'diamond',
  pauseOnHover = true,
  className = '',
  renderItem,
}) {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  const getSeparator = () => {
    switch (separator) {
      case 'diamond': return '\u2726'
      case 'dot': return '\u2022'
      case 'star': return '\u2605'
      default: return separator
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 3 // We tripled the items

    const tween = gsap.to(track, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,
    })

    tweenRef.current = tween

    if (pauseOnHover) {
      const parent = track.parentElement
      const onEnter = () => gsap.to(tween, { timeScale: 0, duration: 0.5 })
      const onLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 })
      parent.addEventListener('mouseenter', onEnter)
      parent.addEventListener('mouseleave', onLeave)
      return () => {
        parent.removeEventListener('mouseenter', onEnter)
        parent.removeEventListener('mouseleave', onLeave)
        tween.kill()
      }
    }

    return () => tween.kill()
  }, [items, speed, direction, pauseOnHover])

  // Triple items for seamless loop
  const tripled = [...items, ...items, ...items]

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" ref={trackRef}>
        {tripled.map((item, i) => (
          <span key={i} className="marquee-item">
            {renderItem ? renderItem(item, i) : (
              <>
                <span className="marquee-text">{item}</span>
                <span className="marquee-separator">{getSeparator()}</span>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
