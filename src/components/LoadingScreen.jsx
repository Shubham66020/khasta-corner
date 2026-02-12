import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete }) {
    const screenRef = useRef(null)
    const textRef = useRef(null)
    const barRef = useRef(null)
    const fillRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(screenRef.current, {
                    yPercent: -100,
                    duration: 0.9,
                    ease: 'power4.inOut',
                    onComplete: onComplete,
                })
            },
        })

        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
        })
            .to(
                barRef.current,
                {
                    opacity: 1,
                    duration: 0.3,
                },
                '-=0.4'
            )
            .to(fillRef.current, {
                width: '100%',
                duration: 1.6,
                ease: 'power2.inOut',
            })
            .to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in',
            })
            .to(
                barRef.current,
                {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                },
                '-=0.3'
            )
    }, [onComplete])

    return (
        <div ref={screenRef} className="loading-screen">
            <div ref={textRef} className="loading-text" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                Khasta Corner
            </div>
            <div ref={barRef} className="loading-bar" style={{ opacity: 0 }}>
                <div ref={fillRef} className="loading-bar-fill" />
            </div>
        </div>
    )
}
