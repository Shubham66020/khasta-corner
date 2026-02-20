import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'
import RotatingBadge from '../components/RotatingBadge'
import ParallaxImage from '../components/ParallaxImage'
import ExpandingCards from '../components/ExpandingCards'
import SvgWave from '../components/SvgWave'
import './Story.css'

const values = [
    {
        title: 'Fresh, Always',
        description: 'Every kachori is rolled and fried fresh. Every chai is brewed to order. We never compromise on freshness.',
        price: '',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    },
    {
        title: 'Honest Flavour',
        description: 'No shortcuts, no artificial anything. Just real spices, real ingredients, and recipes perfected over time.',
        price: '',
        image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&q=80',
    },
    {
        title: 'Warmth & Welcome',
        description: 'We believe food tastes better served with warmth. Every guest at Khasta Corner is family.',
        price: '',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    },
]

const processSteps = [
    {
        num: '01',
        title: 'Source',
        desc: 'We carefully select fresh, local ingredients every single day.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    },
    {
        num: '02',
        title: 'Prepare',
        desc: 'Hand-rolled dough, hand-ground spices, made-to-order preparations.',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    },
    {
        num: '03',
        title: 'Serve',
        desc: 'Hot, fresh, with a smile. Every dish leaves our kitchen at its peak.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    },
    {
        num: '04',
        title: 'Enjoy',
        desc: 'The best part — watching our guests take that first, satisfying bite.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    },
]

export default function Story() {
    const pageRef = useRef(null)
    const timelineRef = useRef(null)
    const originRef = useRef(null)
    const quoteRef = useRef(null)
    const ctaRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        const ctx = gsap.context(() => {
            // Hero slow zoom
            gsap.fromTo('.story-hero-img', {
                scale: 1.3,
            }, {
                scale: 1,
                duration: 8,
                ease: 'power2.out',
            })

            // Origin section
            gsap.fromTo('.origin-text > *',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: originRef.current,
                        start: 'top 65%',
                    },
                }
            )

            // Timeline horizontal scroll (desktop only)
            // Post-pin triggers MUST be inside matchMedia to account for pin spacing
            const mm = gsap.matchMedia()
            mm.add('(min-width: 769px)', () => {
                const timelineEl = timelineRef.current
                if (!timelineEl) return
                const panels = timelineEl.querySelectorAll('.timeline-panel')
                const totalWidth = panels.length * 100

                gsap.to('.timeline-track', {
                    xPercent: -(totalWidth - 100),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timelineEl,
                        start: 'top top',
                        end: () => `+=${window.innerWidth * (panels.length - 1)}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    },
                })

                // Progress bar
                gsap.to('.timeline-progress-fill', {
                    scaleX: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timelineEl,
                        start: 'top top',
                        end: () => `+=${window.innerWidth * (panels.length - 1)}`,
                        scrub: true,
                    },
                })

                // Post-pin sections — created AFTER pin so positions account for pin spacing
                gsap.fromTo('.story-quote-content > *',
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            start: 'top 70%',
                        },
                    }
                )

                gsap.fromTo('.story-cta-inner > *',
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: 'top 75%',
                        },
                    }
                )
            })

            // Mobile: no pin, create post-pin triggers normally
            mm.add('(max-width: 768px)', () => {
                gsap.fromTo('.story-quote-content > *',
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            start: 'top 70%',
                        },
                    }
                )

                gsap.fromTo('.story-cta-inner > *',
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: 'top 75%',
                        },
                    }
                )
            })

            // Recalculate all trigger positions after pin is registered
            gsap.delayedCall(0.2, () => ScrollTrigger.refresh())
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="story-page">
            {/* ===== HERO ===== */}
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
                    <TextReveal
                        text="A Corner Built on"
                        mode="split-chars"
                        tag="div"
                        className="story-hero-title"
                        trigger="load"
                        stagger={0.03}
                        duration={0.7}
                        delay={0.3}
                    />
                    <div className="story-hero-title story-hero-title-2">
                        <TextReveal
                            text="Flavour"
                            mode="stroke-fill"
                            tag="span"
                            className="story-hero-stroke"
                            trigger="load"
                            delay={0.8}
                        />
                    </div>
                    <p className="story-hero-subtitle">
                        How a passion for authentic Indian street food became a
                        neighbourhood favourite.
                    </p>
                </div>
            </section>

            {/* ===== ORIGIN ===== */}
            <section ref={originRef} className="origin-section section">
                <div className="container origin-grid">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                        alt="Artisan food preparation"
                        speed={0.3}
                        height="550px"
                        borderRadius="var(--radius-lg)"
                        revealOnScroll
                    />
                    <div className="origin-text">
                        <div className="origin-badge">
                            <RotatingBadge size={100} />
                        </div>
                        <span className="text-label text-accent">The Beginning</span>
                        <h2>
                            It started with a <em>kachori</em>
                        </h2>
                        <p>
                            Khasta Corner was born from a love that runs deep in every Indian household
                            — the love for street food that tastes like it was made by someone who
                            truly cares. The kind of kachori that shatters into golden flakes the moment
                            you bite in.
                        </p>
                        <p>
                            We saw that the best street food traditions were fading in the rush of modern
                            life, and we wanted to preserve that magic. So we set up a corner — a simple,
                            honest place — where every dish is hand-prepared with the same care and
                            attention as a home-cooked meal.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE (Horizontal Scroll) ===== */}
            <section ref={timelineRef} className="timeline-section">
                <div className="timeline-progress">
                    <div className="timeline-progress-fill" />
                </div>
                <div className="timeline-track">
                    {processSteps.map((step, i) => (
                        <div key={i} className="timeline-panel">
                            <div className="timeline-panel-inner">
                                <div className="timeline-panel-image">
                                    <img src={step.image} alt={step.title} />
                                    <div className="timeline-panel-image-overlay" />
                                </div>
                                <div className="timeline-panel-content">
                                    <span className="timeline-step-num">{step.num}</span>
                                    <h3 className="timeline-step-title">{step.title}</h3>
                                    <p className="timeline-step-desc">{step.desc}</p>
                                </div>
                                <div className="timeline-stroke-num">{step.num}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <SvgWave color="var(--bg-warm)" height={80} />

            {/* ===== VALUES ===== */}
            <section className="values-section section section-warm">
                <div className="container">
                    <div className="values-heading">
                        <span className="text-label" style={{ color: 'var(--terracotta)' }}>What We Believe</span>
                        <TextReveal
                            text="Our Values"
                            mode="split-words"
                            tag="h2"
                            className="values-title"
                        />
                    </div>
                    <ExpandingCards items={values} />
                </div>
            </section>

            <SvgWave color="var(--bg-dark)" height={80} flip />

            {/* ===== QUOTE ===== */}
            <section ref={quoteRef} className="story-quote section">
                <div className="container story-quote-content">
                    <TextReveal
                        text="The best street food is not just about taste — it is about the feeling. That first bite that takes you back."
                        mode="split-words"
                        tag="blockquote"
                        className="story-quote-text"
                    />
                    <cite className="story-quote-cite">— Khasta Corner Family</cite>
                </div>
            </section>

            {/* ===== PARALLAX BREAK ===== */}
            <ParallaxImage
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
                alt="Cafe interior"
                height="60vh"
                speed={0.4}
                overlayOpacity={0.5}
            />

            <SvgWave color="var(--bg-warm)" height={80} />

            {/* ===== CTA ===== */}
            <section ref={ctaRef} className="story-cta section section-warm">
                <div className="container story-cta-inner">
                    <span className="text-label" style={{ color: 'var(--terracotta)' }}>Come By</span>
                    <TextReveal
                        text="The best way to know us is to taste us"
                        mode="split-words"
                        tag="h2"
                        className="story-cta-title"
                    />
                    <div className="story-cta-buttons">
                        <MagneticButton strength={0.3}>
                            <Link to="/menu" className="btn btn-primary">
                                View Menu
                                <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </MagneticButton>
                        <MagneticButton strength={0.2}>
                            <Link to="/contact" className="btn btn-outline-dark">
                                Find Us
                            </Link>
                        </MagneticButton>
                    </div>
                    <div className="story-cta-badge">
                        <RotatingBadge size={90} className="badge-dark" />
                    </div>
                </div>
            </section>
        </div>
    )
}
