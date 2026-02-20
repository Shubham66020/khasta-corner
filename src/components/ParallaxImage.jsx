import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ParallaxImage.css'

export default function ParallaxImage({
  src,
  alt = '',
  speed = 0.3,
  scale = 1.2,
  overlay = true,
  overlayOpacity = 0.5,
  height = '100vh',
  borderRadius = '0px',
  revealOnScroll = false,
  children,
  className = '',
}) {
  const wrapperRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const img = imgRef.current
    if (!wrapper || !img) return

    const ctx = gsap.context(() => {
      // Parallax movement
      gsap.to(img, {
        yPercent: speed * 30,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      // Clip-path reveal
      if (revealOnScroll) {
        gsap.fromTo(wrapper,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [speed, revealOnScroll])

  return (
    <div
      className={`parallax-image ${className}`}
      ref={wrapperRef}
      style={{ height, borderRadius, overflow: 'hidden', position: 'relative' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="parallax-image-img"
        style={{ transform: `scale(${scale})` }}
        loading="lazy"
      />
      {overlay && (
        <div
          className="parallax-image-overlay"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && <div className="parallax-image-content">{children}</div>}
    </div>
  )
}
