import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Story.css'

export default function Story() {
    const pageRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero text reveal
            gsap.from('.story-hero-content > *', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.2,
            })

            // Parallax hero image
            gsap.to('.story-hero-img', {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.story-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            })

            // Origin section
            gsap.from('.origin-text > *', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.origin-section',
                    start: 'top 70%',
                },
            })

            gsap.from('.origin-image-wrapper', {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.origin-section',
                    start: 'top 65%',
                },
            })

            // Values
            gsap.from('.value-card', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.values-grid',
                    start: 'top 80%',
                },
            })

            // Quote Section
            gsap.from('.story-quote-text', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.story-quote',
                    start: 'top 70%',
                },
            })

            // Philosophy section
            gsap.from('.philosophy-item', {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.philosophy-section',
                    start: 'top 75%',
                },
            })

            // Final CTA
            gsap.from('.story-cta-content > *', {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.story-cta',
                    start: 'top 75%',
                },
            })
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="story-page">
            {/* Hero */}
            <section className="story-hero">
                <div className="story-hero-bg">
                    <img
                        className="story-hero-img"
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
                        alt="Warm cafe atmosphere"
                    />
                    <div className="story-hero-overlay" />
                </div>
                <div className="container story-hero-content">
                    <span className="text-label text-accent">Our Story</span>
                    <h1>
                        A corner built <br />on <em>flavour</em>
                    </h1>
                    <p>
                        How a passion for authentic Indian street food became a
                        neighbourhood favourite.
                    </p>
                </div>
            </section>

            {/* Origin */}
            <section className="origin-section section">
                <div className="container grid-2 origin-grid">
                    <div className="origin-text">
                        <span className="text-label text-accent">The Beginning</span>
                        <h2>
                            It started with a <em>kachori</em>
                        </h2>
                        <p>
                            Khasta Corner was born from a love that runs deep in every Indian household
                            — the love for street food that tastes like it was made by someone who
                            truly cares. The kind of kachori that shatters into golden flakes the moment
                            you bite in. The kind of chai that warms you from the inside out.
                        </p>
                        <p>
                            We saw that the best street food traditions were fading in the rush of modern
                            life, and we wanted to preserve that magic. So we set up a corner — a simple,
                            honest place — where every dish is hand-prepared with the same care and
                            attention as a home-cooked meal.
                        </p>
                    </div>
                    <div className="origin-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                            alt="Artisan food preparation"
                            className="origin-image img-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="values-section section section-warm">
                <div className="container">
                    <div className="values-header">
                        <span className="text-label" style={{ color: 'var(--terracotta)' }}>What We Believe</span>
                        <h2>Our <em>values</em></h2>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-number">01</div>
                            <h3>Fresh, Always</h3>
                            <p>
                                Every kachori is rolled and fried fresh. Every chai is brewed to order.
                                We never compromise on freshness — it is the foundation of everything we serve.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-number">02</div>
                            <h3>Honest Flavour</h3>
                            <p>
                                No shortcuts, no artificial anything. Just real spices, real ingredients,
                                and recipes that have been perfected over time.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-number">03</div>
                            <h3>Warmth & Welcome</h3>
                            <p>
                                We believe food tastes better when it is served with warmth. Every guest
                                at Khasta Corner is family, and every visit should feel like coming home.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="story-quote section">
                <div className="container">
                    <blockquote className="story-quote-text">
                        <p>
                            "The best street food is not just about taste — it is about the
                            feeling. That first bite that takes you back to childhood, to a
                            crowded market, to a moment of pure joy."
                        </p>
                        <cite>— Khasta Corner Family</cite>
                    </blockquote>
                </div>
            </section>

            {/* Philosophy */}
            <section className="philosophy-section section">
                <div className="container">
                    <div className="philosophy-header">
                        <span className="text-label text-accent">How We Work</span>
                        <h2>Our <em>process</em></h2>
                    </div>
                    <div className="philosophy-grid">
                        <div className="philosophy-item">
                            <div className="philosophy-line" />
                            <div className="philosophy-content">
                                <h4>Source</h4>
                                <p>We carefully select fresh, local ingredients every single day.</p>
                            </div>
                        </div>
                        <div className="philosophy-item">
                            <div className="philosophy-line" />
                            <div className="philosophy-content">
                                <h4>Prepare</h4>
                                <p>Hand-rolled dough, hand-ground spices, made-to-order preparations.</p>
                            </div>
                        </div>
                        <div className="philosophy-item">
                            <div className="philosophy-line" />
                            <div className="philosophy-content">
                                <h4>Serve</h4>
                                <p>Hot, fresh, with a smile. Every dish leaves our kitchen at its peak.</p>
                            </div>
                        </div>
                        <div className="philosophy-item">
                            <div className="philosophy-line" />
                            <div className="philosophy-content">
                                <h4>Enjoy</h4>
                                <p>The best part — watching our guests take that first, satisfying bite.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full-width image */}
            <section className="story-image-break">
                <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
                    alt="Cafe interior"
                    className="img-cover"
                />
                <div className="story-image-overlay" />
            </section>

            {/* CTA */}
            <section className="story-cta section">
                <div className="container story-cta-content">
                    <span className="text-label text-accent">Come By</span>
                    <h2>
                        The best way to know us <br />is to <em>taste</em> us
                    </h2>
                    <div className="story-cta-buttons">
                        <Link to="/menu" className="btn btn-primary">
                            View Menu
                            <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/contact" className="btn btn-outline">
                            Find Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
