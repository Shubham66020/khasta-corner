import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

const specials = [
    {
        title: 'Khasta Kachori',
        desc: 'Crispy, flaky, and loaded with spiced lentil filling. Our signature.',
        price: '40',
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    },
    {
        title: 'Khasta Chaat',
        desc: 'Khasta topped with tangy chutneys, yoghurt, and fresh garnishes.',
        price: '50',
        img: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=600&q=80',
    },
    {
        title: 'Masala Chai',
        desc: 'Hand-brewed with whole spices, fresh ginger, and rich milk.',
        price: '10',
        img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80',
    },
    {
        title: 'Daloona Coffee',
        desc: 'Our signature whipped coffee — bold, creamy, unforgettable.',
        price: '25',
        img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    },
    {
        title: 'Aloo Puri',
        desc: 'Golden fried puri served with spiced potato curry.',
        price: '30',
        img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
    },
]

export default function Home() {
    const heroRef = useRef(null)
    const specialsRef = useRef(null)
    const storyRef = useRef(null)
    const ctaRef = useRef(null)
    const horizontalRef = useRef(null)
    const trackRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            const heroTl = gsap.timeline({ delay: 0.2 })

            heroTl
                .from('.hero-label', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                })
                .from(
                    '.hero-title-line',
                    {
                        y: 100,
                        opacity: 0,
                        stagger: 0.12,
                        duration: 1,
                        ease: 'power3.out',
                    },
                    '-=0.4'
                )
                .from(
                    '.hero-subtitle',
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.5'
                )
                .from(
                    '.hero-cta-group',
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.4'
                )
                .from(
                    '.hero-scroll-hint',
                    {
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                    },
                    '-=0.2'
                )

            // Hero parallax on scroll
            gsap.to('.hero-bg-image', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            })

            gsap.to('.hero-overlay-gradient', {
                opacity: 1,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: '30% top',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            // Specials section heading reveal
            gsap.from('.specials-heading', {
                y: 60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.specials-heading',
                    start: 'top 80%',
                },
            })

            // Horizontal scroll for specials cards
            if (trackRef.current && horizontalRef.current) {
                const cards = trackRef.current.querySelectorAll('.special-card')
                const totalWidth = trackRef.current.scrollWidth - window.innerWidth + 200

                gsap.to(trackRef.current, {
                    x: -totalWidth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: horizontalRef.current,
                        start: 'top top',
                        end: () => `+=${totalWidth}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    },
                })

                // Card reveal
                cards.forEach((card, i) => {
                    gsap.from(card, {
                        opacity: 0,
                        y: 40,
                        rotation: 2,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'left 80%',
                            containerAnimation: gsap.getById?.('horizontalScroll'),
                            toggleActions: 'play none none none',
                        },
                    })
                })
            }

            // Story section
            gsap.from('.story-preview-img', {
                scale: 1.2,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 70%',
                },
            })

            gsap.from('.story-preview-text > *', {
                y: 50,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: 'top 65%',
                },
            })

            // CTA section
            gsap.from('.home-cta-content > *', {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 75%',
                },
            })

            // Marquee section
            gsap.to('.marquee-track', {
                xPercent: -50,
                duration: 20,
                repeat: -1,
                ease: 'none',
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="home-page">
            {/* ===== HERO ===== */}
            <section ref={heroRef} className="hero">
                <div className="hero-bg">
                    <img
                        className="hero-bg-image"
                        src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=1600&q=80"
                        alt="Indian street food ambiance"
                    />
                    <div className="hero-overlay" />
                    <div className="hero-overlay-gradient" />
                </div>

                <div className="hero-content container">
                    <span className="hero-label text-label">Est. Khasta Corner</span>
                    <h1 className="hero-title">
                        <span className="hero-title-line">Where every</span>
                        <span className="hero-title-line">
                            bite is <em className="text-accent">tradition</em>
                        </span>
                    </h1>
                    <p className="hero-subtitle">
                        Authentic Indian street food — khasta kachori, fresh chai, and flavours
                        passed down through generations.
                    </p>
                    <div className="hero-cta-group">
                        <Link to="/menu" className="btn btn-primary">
                            Explore Menu
                            <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/story" className="btn btn-outline">
                            Our Story
                        </Link>
                    </div>
                </div>

                <div className="hero-scroll-hint">
                    <div className="scroll-line" />
                    <span className="text-label">Scroll</span>
                </div>
            </section>

            {/* ===== MARQUEE ===== */}
            <section className="marquee-section">
                <div className="marquee-track">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="marquee-content">
                            <span>Khasta Kachori</span>
                            <span className="marquee-dot" />
                            <span>Masala Chai</span>
                            <span className="marquee-dot" />
                            <span>Aloo Puri</span>
                            <span className="marquee-dot" />
                            <span>Daloona Coffee</span>
                            <span className="marquee-dot" />
                            <span>Cheese Maggi</span>
                            <span className="marquee-dot" />
                            <span>Peri Peri Corn</span>
                            <span className="marquee-dot" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SPECIALS - Horizontal Scroll ===== */}
            <section ref={horizontalRef} className="specials-section">
                <div className="specials-heading-wrapper container">
                    <div className="specials-heading">
                        <span className="text-label text-accent">What We Serve</span>
                        <h2>
                            Our <em>specials</em>
                        </h2>
                    </div>
                </div>
                <div className="horizontal-scroll-wrapper">
                    <div ref={trackRef} className="horizontal-scroll-track specials-track">
                        <div className="specials-spacer" />
                        {specials.map((item, i) => (
                            <div key={i} className="special-card">
                                <div className="special-card-img-wrapper">
                                    <img src={item.img} alt={item.title} className="special-card-img" />
                                </div>
                                <div className="special-card-content">
                                    <div className="special-card-header">
                                        <h3>{item.title}</h3>
                                        <span className="special-price">{item.price}/-</span>
                                    </div>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                        <div className="specials-spacer" />
                    </div>
                </div>
            </section>

            {/* ===== STORY PREVIEW ===== */}
            <section ref={storyRef} className="story-preview section">
                <div className="container grid-2 story-preview-grid">
                    <div className="story-preview-img-wrapper">
                        <img
                            className="story-preview-img img-cover"
                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                            alt="Indian street food preparation"
                        />
                    </div>
                    <div className="story-preview-text">
                        <span className="text-label text-accent">Our Story</span>
                        <h2>
                            Born from a love of <em>authentic</em> flavours
                        </h2>
                        <p>
                            Khasta Corner started with a simple idea — bring the soul of Indian street food,
                            the kind you find in bustling bazaars and roadside stalls, to a place where every
                            bite feels like home. Our kachoris are hand-rolled, our chai is brewed with whole
                            spices, and every dish carries the warmth of tradition.
                        </p>
                        <Link to="/story" className="btn btn-outline">
                            Read More
                            <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== NUMBERS ===== */}
            <section className="numbers-section section">
                <div className="container">
                    <div className="numbers-grid">
                        <div className="number-item">
                            <span className="number-value">100+</span>
                            <span className="number-label">Happy Customers Daily</span>
                        </div>
                        <div className="number-item">
                            <span className="number-value">8</span>
                            <span className="number-label">Menu Categories</span>
                        </div>
                        <div className="number-item">
                            <span className="number-value">25+</span>
                            <span className="number-label">Unique Items</span>
                        </div>
                        <div className="number-item">
                            <span className="number-value">10/-</span>
                            <span className="number-label">Starting From</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FULL-WIDTH IMAGE BREAK ===== */}
            <section className="image-break">
                <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
                    alt="Cafe ambiance"
                    className="image-break-img img-cover"
                />
                <div className="image-break-overlay" />
                <div className="image-break-text">
                    <span className="text-label">Every day, fresh</span>
                    <h2>Made with love, served with pride</h2>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section ref={ctaRef} className="home-cta section">
                <div className="container home-cta-content">
                    <span className="text-label text-accent">Visit Us</span>
                    <h2>
                        Ready to experience <em>Khasta Corner</em>?
                    </h2>
                    <p>
                        Drop by for a cup of masala chai, a plate of our signature khasta kachori,
                        or discover your new favourite street food dish.
                    </p>
                    <div className="home-cta-buttons">
                        <Link to="/menu" className="btn btn-primary">
                            See Full Menu
                            <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/contact" className="btn btn-outline">
                            Get Directions
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
