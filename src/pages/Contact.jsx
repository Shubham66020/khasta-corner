import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

export default function Contact() {
    const pageRef = useRef(null)
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.from('.contact-header > *', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.2,
            })

            // Info cards stagger
            gsap.from('.contact-info-card', {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-info-grid',
                    start: 'top 80%',
                },
            })

            // Form reveal
            gsap.from('.contact-form-wrapper', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-form-wrapper',
                    start: 'top 80%',
                },
            })

            // Map reveal
            gsap.from('.contact-map', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-map',
                    start: 'top 85%',
                },
            })
        }, pageRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        // Reset form
        setTimeout(() => {
            setFormState({ name: '', email: '', message: '' })
            setSubmitted(false)
        }, 3000)
    }

    return (
        <div ref={pageRef} className="contact-page">
            {/* Header */}
            <section className="contact-hero section">
                <div className="container">
                    <div className="contact-header">
                        <span className="text-label text-accent">Get In Touch</span>
                        <h1>
                            Come say <em>hello</em>
                        </h1>
                        <p className="contact-subtitle">
                            Whether you want to reserve a table, have a question, or just want
                            to tell us about your favourite dish — we would love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="contact-info section">
                <div className="container">
                    <div className="contact-info-grid">
                        <div className="contact-info-card">
                            <div className="info-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                            </div>
                            <span className="text-label">Phone</span>
                            <a href="tel:9103777757" className="info-card-value">910 377 7757</a>
                        </div>

                        <div className="contact-info-card">
                            <div className="info-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </div>
                            <span className="text-label">Instagram</span>
                            <a href="https://instagram.com/khasta_corner_" target="_blank" rel="noopener noreferrer" className="info-card-value">
                                @khasta_corner_
                            </a>
                        </div>

                        <div className="contact-info-card">
                            <div className="info-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <span className="text-label">Hours</span>
                            <span className="info-card-value">Mon-Sat: 8AM - 10PM</span>
                            <span className="info-card-secondary">Sun: 9AM - 9PM</span>
                        </div>

                        <div className="contact-info-card">
                            <div className="info-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <span className="text-label">Location</span>
                            <span className="info-card-value">Khasta Corner</span>
                            <span className="info-card-secondary">Your neighbourhood street food stop</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form + Map */}
            <section className="contact-main section">
                <div className="container grid-2 contact-main-grid">
                    {/* Form */}
                    <div className="contact-form-wrapper">
                        <div className="form-header">
                            <span className="text-label text-accent">Send a Message</span>
                            <h2>Drop us a line</h2>
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    placeholder="Enter your name"
                                    required
                                />
                                <div className="input-line" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    placeholder="your@email.com"
                                    required
                                />
                                <div className="input-line" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    placeholder="Tell us what's on your mind..."
                                    required
                                />
                                <div className="input-line" />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={submitted}>
                                {submitted ? 'Sent!' : 'Send Message'}
                                {!submitted && (
                                    <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Map placeholder */}
                    <div className="contact-map">
                        <div className="map-placeholder">
                            <div className="map-pin">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <h3>Khasta Corner</h3>
                            <p>Your favourite street food destination</p>
                            <a href="tel:9103777757" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                                Call Us: 910 377 7757
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
