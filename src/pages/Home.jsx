import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'
import RotatingBadge from '../components/RotatingBadge'
import ParallaxImage from '../components/ParallaxImage'
import Marquee from '../components/Marquee'
import ExpandingCards from '../components/ExpandingCards'
import SvgWave from '../components/SvgWave'
import './Home.css'

const specials = [
  {
    title: 'Khasta Kachori',
    description: 'Crispy, flaky, and loaded with spiced lentil filling. Our signature.',
    price: '40/-',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  },
  {
    title: 'Khasta Chaat',
    description: 'Khasta topped with tangy chutneys, yoghurt, and fresh garnishes.',
    price: '50/-',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=800&q=80',
  },
  {
    title: 'Masala Chai',
    description: 'Hand-brewed with whole spices, fresh ginger, and rich milk.',
    price: '10/-',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80',
  },
  {
    title: 'Daloona Coffee',
    description: 'Our signature whipped coffee — bold, creamy, unforgettable.',
    price: '25/-',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
  },
  {
    title: 'Aloo Puri',
    description: 'Golden fried puri served with spiced potato curry.',
    price: '30/-',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  },
]

const marqueeItems = [
  'Khasta Kachori', 'Masala Chai', 'Aloo Puri', 'Daloona Coffee',
  'Cheese Maggi', 'Peri Peri Corn', 'Bun Maska', 'Khasta Chaat',
]

const galleryImages = [
  'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80',
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80',
  'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&q=80',
  'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80',
  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
  'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=80',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80',
  'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80',
]

const stats = [
  { value: 100, suffix: '+', label: 'Happy Customers Daily' },
  { value: 8, suffix: '', label: 'Menu Categories' },
  { value: 25, suffix: '+', label: 'Unique Items' },
  { value: 10, suffix: '/-', label: 'Starting From' },
]

export default function Home() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const storyRef = useRef(null)
  const numbersRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero video/image parallax
      gsap.to('.hero-bg-media', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      // Hero overlay darken on scroll
      gsap.to('.hero-overlay-gradient', {
        opacity: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: '30% top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Hero content entry
      const heroTl = gsap.timeline({ delay: 0.3 })
      heroTl
        .fromTo('.hero-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
        .fromTo('.hero-cta-group', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .fromTo('.hero-badge', { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }, '-=0.5')
        .fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')

      // Story section
      gsap.fromTo('.story-text-content > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 65%',
          },
        }
      )

      // Numbers count animation
      const numberEls = numbersRef.current?.querySelectorAll('.number-value')
      numberEls?.forEach((el, i) => {
        const target = stats[i].value
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + stats[i].suffix
          },
        })
      })

      // Numbers line animation
      gsap.fromTo('.number-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: numbersRef.current,
            start: 'top 80%',
          },
        }
      )

      // CTA section
      gsap.fromTo('.home-cta-content > *',
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

      // Recalculate trigger positions
      gsap.delayedCall(0.1, () => ScrollTrigger.refresh())
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="home-page">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="hero">
        <div className="hero-bg">
          <video
            className="hero-bg-media"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=1600&q=80"
          >
            <source
              src="https://videos.pexels.com/video-files/5765789/5765789-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay" />
          <div className="hero-overlay-gradient" />
        </div>

        <div className="hero-content container">
          <span className="hero-label text-label">Est. Khasta Corner</span>
          <TextReveal
            text="Where Every"
            mode="split-chars"
            tag="div"
            className="hero-title-line"
            trigger="load"
            stagger={0.03}
            duration={0.8}
            delay={0.5}
          />
          <div className="hero-title-line hero-title-line-2">
            <TextReveal
              text="Bite is"
              mode="split-chars"
              tag="span"
              trigger="load"
              stagger={0.03}
              duration={0.8}
              delay={0.7}
            />
            {' '}
            <TextReveal
              text="Tradition"
              mode="stroke-fill"
              tag="span"
              className="hero-stroke-word"
              trigger="load"
              delay={0.9}
            />
          </div>
          <p className="hero-subtitle">
            Authentic Indian street food — khasta kachori, fresh chai, and flavours
            passed down through generations.
          </p>
          <div className="hero-cta-group">
            <MagneticButton strength={0.3}>
              <Link to="/menu" className="btn btn-primary">
                Explore Menu
                <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link to="/story" className="btn btn-outline">
                Our Story
              </Link>
            </MagneticButton>
          </div>

          <div className="hero-badge">
            <RotatingBadge size={130} />
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-circle" />
          <div className="scroll-line" />
          <span className="text-label">Scroll</span>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="home-marquee-section">
        <Marquee
          items={marqueeItems}
          speed={40}
          separator="diamond"
          pauseOnHover
        />
      </section>

      {/* ===== EXPANDING CARDS SPECIALS ===== */}
      <section className="specials-section section">
        <div className="container">
          <div className="specials-heading">
            <span className="text-label text-accent">What We Serve</span>
            <TextReveal
              text="Our Specials"
              mode="split-words"
              tag="h2"
              className="specials-title"
            />
          </div>
          <ExpandingCards items={specials} />
        </div>
      </section>

      {/* ===== STORY PREVIEW ===== */}
      <section ref={storyRef} className="story-preview section">
        <div className="container story-preview-grid">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
            alt="Indian street food preparation"
            speed={0.3}
            height="550px"
            borderRadius="var(--radius-lg)"
            revealOnScroll
          />
          <div className="story-text-content">
            <div className="story-watermark">खस्ता</div>
            <span className="text-label text-accent">Our Story</span>
            <h2>
              Born from a love of <em>authentic</em> flavours
            </h2>
            <p>
              Khasta Corner started with a simple idea — bring the soul of Indian street food,
              the kind you find in bustling bazaars and roadside stalls, to a place where every
              bite feels like home.
            </p>
            <MagneticButton strength={0.2}>
              <Link to="/story" className="btn btn-outline">
                Read More
                <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <SvgWave color="var(--bg-dark-secondary)" height={80} />

      {/* ===== NUMBERS ===== */}
      <section ref={numbersRef} className="numbers-section section">
        <div className="container">
          <div className="numbers-grid">
            {stats.map((stat, i) => (
              <div key={i} className="number-item">
                <div className="number-line" />
                <span className="number-value">0{stat.suffix}</span>
                <span className="number-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SvgWave color="var(--bg-dark)" height={80} flip />

      {/* ===== PARALLAX IMAGE BREAK ===== */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
        alt="Cafe ambiance"
        height="70vh"
        speed={0.4}
        overlayOpacity={0.6}
      >
        <div className="image-break-content">
          <TextReveal
            text="Made with Love, Served with Pride"
            mode="stroke-fill"
            tag="h2"
            className="image-break-text"
          />
        </div>
      </ParallaxImage>

      {/* ===== SOCIAL GALLERY ===== */}
      <section className="social-gallery section">
        <div className="container social-gallery-header">
          <span className="text-label text-accent">Follow Us</span>
          <h3>
            <a href="https://instagram.com/khasta_corner_" target="_blank" rel="noopener noreferrer">
              @khasta_corner_
            </a>
          </h3>
        </div>
        <div className="social-gallery-rows">
          <Marquee
            items={galleryImages.slice(0, 5)}
            speed={25}
            direction="left"
            separator={null}
            pauseOnHover
            className="social-gallery-row"
            renderItem={(src) => (
              <div className="gallery-image-wrapper">
                <img src={src} alt="Food" loading="lazy" />
              </div>
            )}
          />
          <Marquee
            items={galleryImages.slice(5)}
            speed={25}
            direction="right"
            separator={null}
            pauseOnHover
            className="social-gallery-row"
            renderItem={(src) => (
              <div className="gallery-image-wrapper">
                <img src={src} alt="Food" loading="lazy" />
              </div>
            )}
          />
        </div>
      </section>

      <SvgWave color="var(--bg-warm)" height={80} />

      {/* ===== CTA ===== */}
      <section ref={ctaRef} className="home-cta section section-warm">
        <div className="container home-cta-content">
          <span className="text-label" style={{ color: 'var(--terracotta)' }}>Visit Us</span>
          <TextReveal
            text="Ready to Experience Khasta Corner?"
            mode="split-words"
            tag="h2"
          />
          <p>
            Drop by for a cup of masala chai, a plate of our signature khasta kachori,
            or discover your new favourite street food dish.
          </p>
          <div className="home-cta-buttons">
            <MagneticButton strength={0.3}>
              <Link to="/menu" className="btn btn-primary">
                See Full Menu
                <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link to="/contact" className="btn btn-outline-dark">
                Get Directions
              </Link>
            </MagneticButton>
          </div>
          <div className="home-cta-badge">
            <RotatingBadge size={100} className="badge-dark" />
          </div>
        </div>
      </section>
    </div>
  )
}
