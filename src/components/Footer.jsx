import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from './Marquee'
import MagneticButton from './MagneticButton'
import RotatingBadge from './RotatingBadge'
import SvgWave from './SvgWave'
import './Footer.css'

const marqueeItems = [
  'Visit Us', 'Fresh Daily', 'Since Day One',
  'Authentic Street Food', 'Made with Love',
  'Khasta Corner', 'Tradition Served Hot',
]

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-inner', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      })

      gsap.from('.footer-reveal', {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="footer">
      {/* Pre-footer marquee */}
      <div className="footer-marquee">
        <Marquee
          items={marqueeItems}
          speed={30}
          separator="diamond"
          className="footer-marquee-inner"
        />
      </div>

      <div className="footer-inner">
        <div className="container">
          {/* CTA Section */}
          <div className="footer-cta footer-reveal">
            <div className="footer-cta-text">
              <h2>Come taste the <em>tradition</em></h2>
            </div>
            <div className="footer-cta-actions">
              <MagneticButton strength={0.3}>
                <Link to="/contact" className="btn btn-primary">
                  Find Us
                  <svg className="btn-arrow" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </MagneticButton>
              <div className="footer-cta-badge">
                <RotatingBadge size={100} />
              </div>
            </div>
          </div>

          <div className="divider footer-reveal" />

          {/* Footer Grid */}
          <div className="footer-grid">
            <div className="footer-col footer-brand footer-reveal">
              <div className="footer-logo">
                <span className="logo-text">Khasta</span>
                <span className="logo-accent">Corner</span>
              </div>
              <p className="footer-tagline">
                Authentic Indian street food, served with warmth and tradition since day one.
              </p>
            </div>

            <div className="footer-col footer-reveal">
              <span className="text-label">Navigate</span>
              <div className="footer-links">
                <Link to="/" className="footer-link-item">
                  <span className="footer-link-arrow">&#8594;</span>Home
                </Link>
                <Link to="/menu" className="footer-link-item">
                  <span className="footer-link-arrow">&#8594;</span>Menu
                </Link>
                <Link to="/story" className="footer-link-item">
                  <span className="footer-link-arrow">&#8594;</span>Our Story
                </Link>
                <Link to="/contact" className="footer-link-item">
                  <span className="footer-link-arrow">&#8594;</span>Contact
                </Link>
              </div>
            </div>

            <div className="footer-col footer-reveal">
              <span className="text-label">Contact</span>
              <div className="footer-links">
                <a href="tel:9103777757" className="footer-link-item">
                  <span className="footer-link-arrow">&#8594;</span>910 377 7757
                </a>
                <a href="https://instagram.com/khasta_corner_" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                  <span className="footer-link-arrow">&#8594;</span>Instagram
                </a>
              </div>
            </div>

            <div className="footer-col footer-reveal">
              <span className="text-label">Hours</span>
              <div className="footer-links">
                <span>Mon &#8212; Sat</span>
                <span>8:00 AM &#8212; 10:00 PM</span>
                <span style={{ marginTop: '0.5rem' }}>Sunday</span>
                <span>9:00 AM &#8212; 9:00 PM</span>
              </div>
            </div>
          </div>

          <SvgWave color="var(--bg-dark-secondary)" height={40} />

          {/* Bottom */}
          <div className="footer-bottom footer-reveal">
            <p>Khasta Corner. All flavours reserved.</p>
            <button className="back-to-top" onClick={scrollToTop}>
              <span>Back to top</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 12V2M7 2L2 7M7 2L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
