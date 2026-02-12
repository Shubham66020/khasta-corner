import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    const itemsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Page header animation
            gsap.from('.menu-header > *', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.2,
            })

            // Category pills animation
            gsap.from('.category-pill', {
                y: 30,
                opacity: 0,
                stagger: 0.06,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.6,
            })

            // Menu sections stagger
            gsap.utils.toArray('.menu-category-section').forEach((section) => {
                gsap.from(section, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                    },
                })

                const items = section.querySelectorAll('.menu-item')
                gsap.from(items, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.06,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                })
            })
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
            {/* Header */}
            <section className="menu-hero section">
                <div className="container">
                    <div className="menu-header">
                        <span className="text-label text-accent">What We Serve</span>
                        <h1>
                            Our <em>Menu</em>
                        </h1>
                        <p className="menu-subtitle">
                            Every dish is made fresh, with care and the finest ingredients.
                            From our signature khasta kachori to a warming cup of masala chai.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="category-filter">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => scrollToCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Items */}
            <section ref={itemsRef} className="menu-items-section">
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
                            <div className="menu-items-list">
                                {menuData[cat].map((item, i) => (
                                    <div key={i} className="menu-item">
                                        <div className="menu-item-left">
                                            <div className="menu-item-number">{String(i + 1).padStart(2, '0')}</div>
                                            <div className="menu-item-info">
                                                <h4 className="menu-item-name">{item.name}</h4>
                                                <p className="menu-item-desc">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="menu-item-price">{item.price}/-</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
