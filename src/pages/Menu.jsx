import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'
import ParallaxImage from '../components/ParallaxImage'
import SvgWave from '../components/SvgWave'
import MagneticButton from '../components/MagneticButton'
import './Menu.css'

const menuData = {
    'Khasta Special': [
        { name: 'Khasta Kachori', price: '40', desc: 'Crispy, flaky pastry stuffed with spiced lentils' },
        { name: 'Khasta Chaat', price: '50', desc: 'Our kachori topped with yoghurt, chutneys & garnishes' },
        { name: 'Khasta Kadhi', price: '40', desc: 'Crispy khasta served with our signature tangy kadhi' },
        { name: 'Only Khasta', price: '10', desc: 'The classic, plain and perfectly crispy' },
    ],
    'Tea & Coffee': [
        { name: 'Masala Tea', price: '10', desc: 'Hand-brewed with whole spices and fresh ginger' },
        { name: 'Lemon Tea', price: '15', desc: 'Refreshing, citrusy, light' },
        { name: 'Black Coffee', price: '15', desc: 'Bold and strong, no frills' },
        { name: 'Hot Coffee', price: '20', desc: 'Classic milk coffee, perfectly balanced' },
        { name: 'Daloona Coffee', price: '25', desc: 'Our signature whipped coffee creation' },
        { name: 'Green Tea', price: '25', desc: 'Light, cleansing, aromatic' },
    ],
    'Puri Special': [
        { name: 'Aloo Puri', price: '30', desc: 'Golden puri with spiced potato curry' },
        { name: 'Matar Puri', price: '30', desc: 'Puri served with green pea masala' },
        { name: 'Sattu Puri', price: '30', desc: 'Stuffed with roasted gram flour filling' },
        { name: 'Dal Puri', price: '30', desc: 'Lentil-stuffed, deep-fried perfection' },
        { name: 'Sabji Puri', price: '30', desc: 'Paired with seasonal mixed vegetable curry' },
    ],
    'Corn Special': [
        { name: 'Crispy Corn', price: '80', desc: 'Golden fried corn kernels with secret seasoning' },
        { name: 'Plain Salted', price: '40', desc: 'Simple, crunchy, addictive' },
        { name: 'Peri Peri', price: '50', desc: 'Tossed in fiery peri peri seasoning' },
    ],
    'Maggi': [
        { name: 'Plain Maggi', price: '30', desc: 'The classic, done right' },
        { name: 'Veg Maggi', price: '50', desc: 'Loaded with fresh vegetables' },
        { name: 'Cheese Maggi', price: '50', desc: 'Rich, gooey, cheese-laden' },
        { name: 'Veg Cheese Maggi', price: '70', desc: 'The ultimate combo — veggies meets cheese' },
        { name: 'Caramelized Onion Cheese Maggi', price: '80', desc: 'Sweet caramelized onions with melted cheese' },
    ],
    'Paratha Special': [
        { name: 'Aloo Paratha', price: '30', desc: 'Stuffed with spiced mashed potatoes' },
        { name: 'Paneer Paratha', price: '50', desc: 'Packed with seasoned cottage cheese' },
        { name: 'Masala Paratha', price: '20', desc: 'Spiced flatbread with a kick' },
        { name: 'Plain Paratha', price: '10', desc: 'Simple, buttery, classic' },
    ],
    'Bun Maska': [
        { name: 'Bun Maska', price: '35', desc: 'Soft, buttery bun — the perfect chai companion' },
    ],
}

const categories = Object.keys(menuData)

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState(null)
    const pageRef = useRef(null)
    const filterRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        const ctx = gsap.context(() => {
            // Category pills stagger
            gsap.fromTo('.category-pill',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: 'power3.out',
                    delay: 0.4,
                }
            )

            // Menu sections stagger — use fromTo with opacity for reliability
            gsap.utils.toArray('.menu-category-section').forEach((section) => {
                gsap.fromTo(
                    section.querySelector('.menu-category-header'),
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                        },
                    }
                )

                gsap.fromTo(
                    section.querySelectorAll('.menu-card'),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.06,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                        },
                    }
                )
            })

            // Recalculate trigger positions after layout settles
            gsap.delayedCall(0.1, () => ScrollTrigger.refresh())
        }, pageRef)

        return () => ctx.revert()
    }, [])

    const scrollToCategory = (cat) => {
        setActiveCategory(cat)
        const el = document.getElementById(`menu-${cat.replace(/\s+/g, '-').toLowerCase()}`)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div ref={pageRef} className="menu-page">
            {/* ===== HERO ===== */}
            <ParallaxImage
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1600&q=80"
                alt="Indian food spread"
                height="70vh"
                speed={0.3}
                overlayOpacity={0.7}
            >
                <div className="menu-hero-content container">
                    <span className="text-label text-accent">What We Serve</span>
                    <div className="menu-hero-title">
                        <TextReveal
                            text="Our"
                            mode="split-chars"
                            tag="span"
                            className="menu-title-word"
                            trigger="load"
                            stagger={0.04}
                            duration={0.7}
                            delay={0.3}
                        />
                        {' '}
                        <TextReveal
                            text="Menu"
                            mode="stroke-fill"
                            tag="span"
                            className="menu-title-stroke"
                            trigger="load"
                            delay={0.6}
                        />
                    </div>
                    <p className="menu-hero-subtitle">
                        Every dish is made fresh, with care and the finest ingredients.
                        From our signature khasta kachori to a warming cup of masala chai.
                    </p>
                </div>
            </ParallaxImage>

            {/* ===== CATEGORY FILTER ===== */}
            <div ref={filterRef} className="category-filter-bar">
                <div className="container">
                    <div className="category-filter">
                        {categories.map((cat) => (
                            <MagneticButton key={cat} strength={0.15}>
                                <button
                                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => scrollToCategory(cat)}
                                >
                                    {cat}
                                </button>
                            </MagneticButton>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== MENU ITEMS ===== */}
            <section className="menu-items-section section">
                <div className="container">
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            id={`menu-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                            className="menu-category-section"
                        >
                            <div className="menu-category-header">
                                <h2>{cat}</h2>
                                <span className="menu-category-count">{menuData[cat].length} items</span>
                            </div>
                            <div className="menu-cards-grid">
                                {menuData[cat].map((item, i) => (
                                    <div key={i} className="menu-card">
                                        <div className="menu-card-accent" />
                                        <div className="menu-card-number">{String(i + 1).padStart(2, '0')}</div>
                                        <div className="menu-card-body">
                                            <h4 className="menu-card-name">{item.name}</h4>
                                            <p className="menu-card-desc">{item.desc}</p>
                                        </div>
                                        <div className="menu-card-price">
                                            <span className="price-badge">{item.price}/-</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <SvgWave color="var(--bg-warm)" height={80} />

            {/* ===== CTA ===== */}
            <section className="menu-cta section section-warm">
                <div className="container menu-cta-content">
                    <span className="text-label" style={{ color: 'var(--terracotta)' }}>Can't Decide?</span>
                    <TextReveal
                        text="Try Our Specials"
                        mode="split-words"
                        tag="h2"
                        className="menu-cta-title"
                    />
                    <p>Come in and let us guide you through the best of Khasta Corner.</p>
                    <MagneticButton strength={0.3}>
                        <a href="tel:9103777757" className="btn btn-primary">
                            Call to Order
                            <svg className="btn-arrow" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </MagneticButton>
                </div>
            </section>
        </div>
    )
}
