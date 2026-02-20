import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'
import RotatingBadge from '../components/RotatingBadge'
import SvgWave from '../components/SvgWave'
import './Contact.css'

export default function Contact() {
    const pageRef = useRef(null)
    const mapRef = useRef(null)
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        const ctx = gsap.context(() => {
            // Info cards stagger — use fromTo with opacity for reliable visibility
            gsap.fromTo('.contact-info-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: '.contact-info-grid',
                        start: 'top 80%',
                    },
                }
            )

            // Form reveal
            gsap.fromTo('.contact-form-wrapper > *',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.contact-form-wrapper',
                        start: 'top 80%',
                    },
                }
            )

            // Map section reveal
            gsap.fromTo('.contact-map-inner',
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: mapRef.current,
                        start: 'top 80%',
                    },
                }
            )

            // Pulse animation for map
            gsap.to('.map-pulse-ring', {
                scale: 2.5,
                opacity: 0,
                duration: 2,
                ease: 'power2.out',
                repeat: -1,
                stagger: {
                    each: 0.6,
                    repeat: -1,
                },
            })

            // Recalculate trigger positions after layout settles
            gsap.delayedCall(0.1, () => ScrollTrigger.refresh())
        }, pageRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)

        // Burst animation
        const btn = e.target.querySelector('.contact-submit-btn')
        if (btn) {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
            })
        }

        setTimeout(() => {
            setFormState({ name: '', email: '', message: '' })
            setSubmitted(false)
        }, 3000)
    }

    return (
        <div ref={pageRef} className="contact-page">
            {/* ===== HERO ===== */}
            <section className="contact-hero">
                <div className="contact-hero-bg" />
                <div className="container contact-hero-content">
                    <span className="text-label text-accent">Get In Touch</span>
                    <div className="contact-hero-title">
                        <TextReveal
                            text="Come Say"
                            mode="split-chars"
                            tag="span"
                            className="contact-title-line"
                            trigger="load"
                            stagger={0.04}
                            duration={0.7}
                            delay={0.3}
                        />
                    </div>
                    <div className="contact-hero-title contact-hero-title-2">
                        <TextReveal
                            text="Hello"
                            mode="stroke-fill"
                            tag="span"
                            className="contact-title-stroke"
                            trigger="load"
                            delay={0.7}
                        />
                    </div>
                    <p className="contact-hero-subtitle">
                        Whether you want to reserve a table, have a question, or just want
                        to tell us about your favourite dish — we would love to hear from you.
                    </p>
                </div>
            </section>

            {/* ===== INFO CARDS ===== */}
            <section className="contact-info section">
                <div className="container">
                    <div className="contact-info-grid">
                        <div className="contact-info-card">
                            <div className="info-card-icon-wrapper">
                                <div className="info-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-label">Phone</span>
                            <a href="tel:9103777757" className="info-card-value">910 377 7757</a>
                        </div>

                        <div className="contact-info-card">
                            <div className="info-card-icon-wrapper">
                                <div className="info-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-label">Instagram</span>
                            <a href="https://instagram.com/khasta_corner_" target="_blank" rel="noopener noreferrer" className="info-card-value">
                                @khasta_corner_
                            </a>
                        </div>

                        <div className="contact-info-card">
                            <div className="info-card-icon-wrapper">
                                <div className="info-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-label">Hours</span>
                            <span className="info-card-value">Mon-Sat: 8AM - 10PM</span>
                            <span className="info-card-secondary">Sun: 9AM - 9PM</span>
                        </div>

                        <div className="contact-info-card">
                            <div className="info-card-icon-wrapper">
                                <div className="info-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-label">Location</span>
                            <span className="info-card-value">Khasta Corner</span>
                            <span className="info-card-secondary">Your neighbourhood street food stop</span>
                        </div>
                    </div>
                </div>
            </section>

            <SvgWave color="var(--bg-dark-secondary)" height={80} />

            {/* ===== FORM + MAP ===== */}
            <section className="contact-main section" style={{ background: 'var(--bg-dark-secondary)' }}>
                <div className="container contact-main-grid">
                    {/* Form */}
                    <div className="contact-form-wrapper">
                        <div className="form-header">
                            <span className="text-label text-accent">Send a Message</span>
                            <h2>Drop us a line</h2>
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className={`form-group ${focusedField === 'name' || formState.name ? 'focused' : ''}`}>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                />
                                <label htmlFor="name">Your Name</label>
                                <div className="input-line" />
                                <div className="input-glow" />
                            </div>
                            <div className={`form-group ${focusedField === 'email' || formState.email ? 'focused' : ''}`}>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                                <div className="input-line" />
                                <div className="input-glow" />
                            </div>
                            <div className={`form-group ${focusedField === 'message' || formState.message ? 'focused' : ''}`}>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                />
                                <label htmlFor="message">Message</label>
                                <div className="input-line" />
                                <div className="input-glow" />
                            </div>
                            <MagneticButton strength={0.2}>
                                <button type="submit" className="btn btn-primary contact-submit-btn" disabled={submitted}>
                                    {submitted ? 'Message Sent!' : 'Send Message'}
                                    {!submitted && (
                                        <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </MagneticButton>
                        </form>
                    </div>

                    {/* Map */}
                    <div ref={mapRef} className="contact-map">
                        <div className="contact-map-inner">
                            {/* Animated concentric rings */}
                            <div className="map-pulse-container">
                                <div className="map-pulse-ring" />
                                <div className="map-pulse-ring" />
                                <div className="map-pulse-ring" />
                            </div>

                            {/* Pin */}
                            <div className="map-pin">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <div className="map-pin-shadow" />
                            </div>

                            {/* Circular text */}
                            <svg className="map-circle-text" viewBox="0 0 200 200">
                                <defs>
                                    <path id="mapCircle" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                                </defs>
                                <text>
                                    <textPath href="#mapCircle" startOffset="0%">
                                        YOU'LL FIND US HERE ✦ YOU'LL FIND US HERE ✦{' '}
                                    </textPath>
                                </text>
                            </svg>

                            <div className="map-info">
                                <h3>Khasta Corner</h3>
                                <p>Your favourite street food destination</p>
                                <MagneticButton strength={0.2}>
                                    <a href="tel:9103777757" className="btn btn-outline map-cta-btn">
                                        Call: 910 377 7757
                                    </a>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SvgWave color="var(--bg-dark)" height={80} flip />
        </div>
    )
}
