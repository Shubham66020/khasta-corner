import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

export default function Footer() {
    const footerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.footer-reveal', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                },
            })
        }, footerRef)

        return () => ctx.revert()
    }, [])

    return (
        <footer ref={footerRef} className="footer">
            <div className="container">
                {/* Top CTA */}
                <div className="footer-cta footer-reveal">
                    <h2>Come taste the <em>tradition</em></h2>
                    <Link to="/contact" className="btn btn-primary">
                        Find Us
                        <svg className="btn-arrow" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
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
                            <Link to="/">Home</Link>
                            <Link to="/menu">Menu</Link>
                            <Link to="/story">Our Story</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>

                    <div className="footer-col footer-reveal">
                        <span className="text-label">Contact</span>
                        <div className="footer-links">
                            <a href="tel:9103777757">910 377 7757</a>
                            <a href="https://instagram.com/khasta_corner_" target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        </div>
                    </div>

                    <div className="footer-col footer-reveal">
                        <span className="text-label">Hours</span>
                        <div className="footer-links">
                            <span>Mon — Sat</span>
                            <span>8:00 AM — 10:00 PM</span>
                            <span style={{ marginTop: '0.5rem' }}>Sunday</span>
                            <span>9:00 AM — 9:00 PM</span>
                        </div>
                    </div>
                </div>

                <div className="divider footer-reveal" />

                {/* Bottom */}
                <div className="footer-bottom footer-reveal">
                    <p>Khasta Corner. All flavours reserved.</p>
                    <p className="footer-credit">Crafted with care</p>
                </div>
            </div>
        </footer>
    )
}
