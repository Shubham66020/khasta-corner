import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TextReveal.css'

export default function TextReveal({
  text,
  mode = 'split-chars',
  tag: Tag = 'h1',
  className = '',
  trigger = 'scroll',
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      if (mode === 'split-chars' || mode === 'split-words') {
        const items = el.querySelectorAll('.tr-item')
        const fromConfig = {
          y: '110%',
          rotateX: 10,
        }
        const toConfig = {
          y: '0%',
          rotateX: 0,
          duration,
          stagger,
          ease: 'power3.out',
          delay,
        }

        if (trigger === 'scroll') {
          gsap.fromTo(items, fromConfig, {
            ...toConfig,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        } else {
          gsap.fromTo(items, fromConfig, toConfig)
        }
      } else if (mode === 'split-lines') {
        const lines = el.querySelectorAll('.tr-line')
        const fromConfig = {
          clipPath: 'inset(100% 0% 0% 0%)',
        }
        const toConfig = {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration,
          stagger: stagger * 3,
          ease: 'power3.out',
          delay,
        }

        if (trigger === 'scroll') {
          gsap.fromTo(lines, fromConfig, {
            ...toConfig,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        } else {
          gsap.fromTo(lines, fromConfig, toConfig)
        }
      } else if (mode === 'stroke-fill') {
        gsap.fromTo(
          el,
          {
            '--stroke-progress': 0,
          },
          {
            '--stroke-progress': 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'top 30%',
              scrub: true,
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [mode, trigger, stagger, duration, delay])

  const renderContent = () => {
    if (mode === 'split-chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="tr-wrap">
          <span className="tr-item">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))
    }

    if (mode === 'split-words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="tr-wrap">
          <span className="tr-item">{word}</span>
          {i < text.split(' ').length - 1 && <span className="tr-item">&nbsp;</span>}
        </span>
      ))
    }

    if (mode === 'split-lines') {
      return text.split('\n').map((line, i) => (
        <span key={i} className="tr-line">{line}</span>
      ))
    }

    if (mode === 'stroke-fill') {
      return text
    }

    return text
  }

  return (
    <Tag
      className={`text-reveal text-reveal-${mode} ${className}`}
      ref={containerRef}
    >
      {renderContent()}
    </Tag>
  )
}
