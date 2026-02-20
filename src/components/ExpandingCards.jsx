import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ExpandingCards.css'

export default function ExpandingCards({ items = [], className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      gsap.fromTo(container,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={`expanding-cards ${className}`} ref={containerRef}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`expanding-card ${i === activeIndex ? 'active' : ''}`}
          onClick={() => setActiveIndex(i)}
          onMouseEnter={() => setActiveIndex(i)}
        >
          <div className="expanding-card-bg">
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="expanding-card-bg-overlay" />
          </div>

          <div className="expanding-card-vertical">
            <span className="expanding-card-vertical-num">0{i + 1}</span>
            <span className="expanding-card-vertical-title">{item.title}</span>
          </div>

          <div className="expanding-card-content">
            <span className="expanding-card-num">0{i + 1}</span>
            <h3 className="expanding-card-title">{item.title}</h3>
            <p className="expanding-card-desc">{item.description}</p>
            {item.price && (
              <span className="expanding-card-price">{item.price}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
