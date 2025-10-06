"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const MobileShopBanner: React.FC = () => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeProduct, setActiveProduct] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  const texts = ["NEW MOBILES", "SECOND HAND MOBILES", "ACCESSORIES"]

  // Updated scroll-based showcase data
  const showcaseData = [
    {
      id: 4,
      title: "Quick Service & Warranty",
      description: "Enjoy instant setup, after-sales support, and hassle-free warranty assistance.",
      image: "/png4.png",
      color: "#ea580c"
    },
    
    {
      id: 1,
      title: "Wide Range of Mobiles",
      description: "Find the latest smartphones from all top brands — all under one roof.",
      image: "/png7.png",
      color: "#059669"
    },
    {
      id: 2,
      title: "Best Price Guarantee",
      description: "We offer genuine mobiles and accessories at the most competitive prices.",
      image: "/png3.png",
      color: "#7c3aed"
    },
    {
      id: 3,
      title: "Expert Support",
      description: "Our team helps you choose the right device with honest guidance and expert advice.",
      image: "/png8.png",
      color: "#dc2626"
    },
    
  ];

  // Product slider data
  const productSlides = [
    {
      image: "/png2.png",
      title: "Latest Smartphones",
      description: "Get the newest models from top brands with amazing features and performance.",
      id: 1
    },
    {
      image: "/png3.png",
      title: "Certified Pre-owned",
      description: "Quality tested second-hand devices with warranty and genuine parts.",
      id: 2
    },
    {
      image: "/png4.png",
      title: "Mobile Accessories",
      description: "Complete range of cases, chargers, headphones and screen protectors.",
      id: 3
    },
    {
      image: "/png5.png",
      title: "Repair Services",
      description: "Expert repair and maintenance services for all mobile brands.",
      id: 4
    }
  ];

  const showcaseRef = useRef<HTMLDivElement>(null)
  const productItemsRef = useRef<HTMLDivElement[]>([])
  const whyChooseRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Check if mobile on initial render and window resize
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100
    const currentFullText = texts[currentIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1))
        } else {
          // Pause for 2-3 seconds when full text is displayed
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, texts])

  // Auto slide for product slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto change for showcase items (3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % showcaseData.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Scroll-based showcase intersection observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const showcaseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          setActiveProduct(index)
        }
      })
    }, observerOptions)

    // Observe showcase items
    productItemsRef.current.forEach((item, index) => {
      if (item) {
        item.setAttribute('data-index', index.toString())
        showcaseObserver.observe(item)
      }
    })

    return () => {
      showcaseObserver.disconnect()
    }
  }, [])

  // Why Choose Us cards intersection observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = Number(entry.target.getAttribute('data-card-id'))
          setVisibleCards(prev => {
            if (!prev.includes(cardId)) {
              return [...prev, cardId]
            }
            return prev
          })
        }
      })
    }, observerOptions)

    // Observe cards
    cardRefs.current.forEach((card) => {
      if (card) {
        cardObserver.observe(card)
      }
    })

    return () => {
      cardObserver.disconnect()
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          
          // Special handling for hero text characters
          if (entry.target.classList.contains('info-section')) {
            const chars = entry.target.querySelectorAll('.char')
            chars.forEach((char, index) => {
              setTimeout(() => {
                char.style.opacity = '1'
                char.style.transform = 'translateY(0)'
              }, index * 100)
            })
          }
        }
      })
    }, observerOptions)
    
    // Observe all main sections
    const sections = document.querySelectorAll('.info-section, .showcase-section, .why-choose-section, .products-section, .cta-section')
    sections.forEach(section => {
      if (section) sectionObserver.observe(section)
    })
    
    return () => {
      sectionObserver.disconnect()
    }
  }, [isMobile])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + productSlides.length) % productSlides.length)
  }

  return (
    <>
      <style>{`
        /* Updated fonts and color scheme for mobile shop */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

        .mobile-shop-banner,
        .mobile-shop-banner * {
          box-sizing: border-box;
        }
        
        .mobile-shop-banner {
          margin: 0;
          background: #ffffff;
          background-size: cover;
          background-repeat: no-repeat;
          overflow-x: hidden;
          min-height: 100vh;
          width: 100%;
          padding-top: 70px;
          transition: all 0.3s ease;
          font-family: "Space Grotesk", sans-serif;
        }

        .dark .mobile-shop-banner {
          background: #0f172a;
        }

        /* Scroll animations for all sections */
        .info-section,
        .showcase-section,
        .why-choose-section,
        .products-section,
        .cta-section {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .info-section.animate-in,
        .showcase-section.animate-in,
        .why-choose-section.animate-in,
        .products-section.animate-in,
        .cta-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero section */
        .info-section {
          height: 100vh;
          min-height: 780px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          user-select: none;
          overflow: hidden;
          background: #ffffff;
        }

        .dark .info-section {
          background: #0f172a;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .left-part {
          padding: 20px 0 0;
          overflow: hidden;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .left-part h1 {
          margin: 0;
          color: #475569;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 900;
          font-size: clamp(48px, 12vw, 100px);
          line-height: 0.9;
          font-style: normal;
          text-transform: uppercase;
          transition: color 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .dark .left-part h1 {
          color: #cbd5e1;
        }

        .left-part h1 .text {
          color: #059669;
          display: block;
          height: clamp(100px, 15vw, 120px);
          transition: color 0.3s ease;
          margin-top: 20px;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 900;
        }

        .dark .left-part h1 .text {
          color: #10b981;
        }

        .left-part h1 .d-flex {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          width: 100%;
        }

        .left-part h1 .char {
          white-space: nowrap;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .left-part.animate-in h1 .char {
          opacity: 1;
          transform: translateY(0);
        }

        /* Delay each character */
        .left-part h1 .char:nth-child(1) { transition-delay: 0.1s; }
        .left-part h1 .char:nth-child(2) { transition-delay: 0.2s; }
        .left-part h1 .char:nth-child(3) { transition-delay: 0.3s; }
        .left-part h1 .char:nth-child(4) { transition-delay: 0.4s; }
        .left-part h1 .char:nth-child(5) { transition-delay: 0.5s; }
        .left-part h1 .char:nth-child(6) { transition-delay: 0.6s; }
        .left-part h1 .char:nth-child(7) { transition-delay: 0.7s; }

        /* Why Choose Us Section */
        .why-choose-section {
          padding: 120px 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          font-family: "Space Grotesk", sans-serif;
        }

        .dark .why-choose-section {
          background: #0f172a;
        }

        .why-choose-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 30px;
        }

        .why-choose-title {
          text-align: center;
          color: #475569;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 900;
          font-size: clamp(48px, 8vw, 80px);
          line-height: 1.1;
          margin: 0 0 20px;
          text-transform: uppercase;
        }

        .dark .why-choose-title {
          color: #cbd5e1;
        }

        .why-choose-subtitle {
          text-align: center;
          color: #64748b;
          font-size: 18px;
          line-height: 1.6;
          margin: 0 0 80px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .dark .why-choose-subtitle {
          color: #94a3b8;
        }

        /* Showcase Section inside Why Choose Us */
        .showcase-container {
          max-width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          min-height: 500px;
        }

        /* Text Content Side - LEFT */
        .showcase-content {
          position: relative;
          height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .showcase-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          background: transparent;
          border-radius: 20px;
          padding: 0;
          box-shadow: none;
          border: none;
        }

        .showcase-item.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .showcase-number {
          font-size: 14px;
          font-weight: 600;
          color: #059669;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: inline-block;
          padding: 4px 12px;
          background: #f0fdf4;
          border-radius: 20px;
          border: 1px solid #dcfce7;
        }

        .dark .showcase-number {
          color: #10b981;
          background: #064e3b;
          border-color: #065f46;
        }

        .showcase-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 20px;
          color: #1f2937;
          font-family: "Space Grotesk", sans-serif;
        }

        .dark .showcase-title {
          color: #f9fafb;
        }

        .showcase-description {
          font-size: 18px;
          line-height: 1.6;
          color: #6b7280;
          margin: 0;
          max-width: 500px;
        }

        .dark .showcase-description {
          color: #d1d5db;
        }

        /* Image Side - RIGHT (Fixed Position) */
        .showcase-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .showcase-image-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark .showcase-image-container {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .showcase-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.8s ease;
          padding: 20px;
        }

        .showcase-image-container:hover .showcase-image {
          transform: scale(1.05);
        }

        /* Progress Indicators */
        .showcase-progress {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 60px;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e5e7eb;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .progress-dot.active {
          background: #059669;
          transform: scale(1.2);
        }

        .progress-dot.active::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 2px solid #059669;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .dark .progress-dot {
          background: #4b5563;
        }

        .dark .progress-dot.active {
          background: #10b981;
        }

        .dark .progress-dot.active::before {
          border-color: #10b981;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        /* Products section with Full-width Slider - CURVED ON ALL SIDES */
        .products-section {
          padding: 100px 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          font-family: "Space Grotesk", sans-serif;
          border-radius: 80px;
          margin: 60px 20px;
        }

        .dark .products-section {
          background: #0f172a;
        }

        .products-container {
          max-width: 100%;
          margin: 0 auto;
          text-align: center;
        }

        .products-title {
          color: #475569;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 900;
          font-size: clamp(60px, 8vw, 100px);
          line-height: 0.9;
          margin: 0 0 80px;
          text-transform: uppercase;
          transition: color 0.3s ease;
          padding: 0 30px;
        }

        .dark .products-title {
          color: #cbd5e1;
        }

        /* Full-width Product Slider */
        .slider-container {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 500px;
          border-radius: 80px;
          overflow: hidden;
        }

        .slider-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
          height: 100%;
        }

        .slide {
          min-width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .slide::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(16, 185, 129, 0.8) 100%);
          z-index: 1;
        }

        .slide:nth-child(2)::before {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(139, 92, 246, 0.8) 100%);
        }

        .slide:nth-child(3)::before {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(248, 113, 113, 0.8) 100%);
        }

        .slide:nth-child(4)::before {
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.9) 0%, rgba(251, 146, 60, 0.8) 100%);
        }

        .slide-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 30px;
          position: relative;
          z-index: 2;
          gap: 60px;
        }

        .slide-image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .slide-image img {
          max-width: 100%;
          max-height: 400px;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .slide-text {
          flex: 1;
          text-align: left;
          color: white;
        }

        .slide-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          margin: 0 0 20px;
          color: #ffffff;
        }

        .slide-description {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(16px, 2vw, 18px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          max-width: 500px;
        }

        .slider-nav {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        .slider-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .slider-dot.active {
          background: #ffffff;
          transform: scale(1.2);
          border-color: #ffffff;
        }

        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          color: white;
          font-size: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .slider-arrow:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .slider-arrow.prev {
          left: 30px;
        }

        .slider-arrow.next {
          right: 30px;
        }

        /* Curved CTA Section */
        .cta-section {
          padding: 120px 30px;
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          position: relative;
          overflow: hidden;
          font-family: "Space Grotesk", sans-serif;
          border-radius: 100% 100% 0 0 / 100px;
          margin-top: 100px;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -100px;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          border-radius: 100% 100% 0 0 / 100px;
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          position: relative;
          z-index: 2;
        }

        .cta-image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cta-image img {
          max-width: 100%;
          height: auto;
          max-height: 400px;
          object-fit: contain;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
        }

        .cta-content {
          flex: 1;
          text-align: left;
        }

        .cta-title {
          color: #ffffff;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 900;
          font-size: clamp(40px, 6vw, 80px);
          line-height: 1.1;
          margin: 0 0 20px;
          text-transform: uppercase;
        }

        .cta-subtitle {
          color: #ffffff;
          font-family: "Space Grotesk", sans-serif;
          font-size: 18px;
          line-height: 1.6;
          margin: 0 0 40px;
          opacity: 0.9;
          max-width: 500px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 16px 32px;
          background: #ffffff;
          color: #059669;
          text-decoration: none;
          font-family: "Space Grotesk", sans-serif;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 50px;
          transition: all 0.3s ease;
          border: 2px solid #ffffff;
          text-align: center;
          min-width: 160px;
        }

        .cta-button:hover {
          background: transparent;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .cta-button.secondary {
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
        }

        .cta-button.secondary:hover {
          background: #ffffff;
          color: #059669;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        /* Responsive adjustments */
        @media screen and (max-width: 1024px) {
          .showcase-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .showcase-visual {
            height: 400px;
            order: -1;
          }

          .showcase-image-container {
            max-width: 500px;
            height: 350px;
          }

          .slide-content {
            flex-direction: column;
            text-align: center;
            gap: 40px;
          }

          .slide-text {
            text-align: center;
          }

          .slider-container {
            height: 60vh;
          }
        }

        @media screen and (max-width: 768px) {
          .why-choose-section {
            padding: 80px 0;
          }

          .showcase-container {
            padding: 0 20px;
            gap: 40px;
          }

          .showcase-content {
            height: 300px;
          }

          .showcase-item {
            padding: 0;
          }

          .showcase-title {
            font-size: clamp(24px, 6vw, 32px);
          }

          .showcase-description {
            font-size: 16px;
          }

          .showcase-visual {
            height: 350px;
          }

          .showcase-image-container {
            max-width: 400px;
            height: 300px;
          }

          /* Improved mobile view for products section */
          .products-section {
            border-radius: 40px;
            margin: 40px 15px;
            padding: 60px 0;
          }

          .slider-container {
            height: 60vh;
            min-height: 450px;
          }

          .slide-content {
            padding: 0 20px;
            gap: 30px;
          }

          .slide-image img {
            max-height: 220px;
          }

          .slide-title {
            font-size: clamp(24px, 5vw, 32px);
            margin-bottom: 15px;
          }

          .slide-description {
            font-size: 14px;
            line-height: 1.5;
            max-width: 100%;
          }

          .slider-arrow {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .slider-arrow.prev {
            left: 15px;
          }

          .slider-arrow.next {
            right: 15px;
          }

          .slider-nav {
            bottom: 30px;
          }

          .cta-container {
            flex-direction: column;
            text-align: center;
            gap: 40px;
          }

          .cta-content {
            text-align: center;
          }

          .cta-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .cta-buttons {
            justify-content: center;
          }
        }

        @media screen and (max-width: 480px) {
          .mobile-shop-banner {
            padding-top: 60px;
          }
          
          .left-part {
            padding: 30px 12px 40px;
          }
          
          .left-part h1 {
            font-size: clamp(32px, 10vw, 48px);
          }
          
          .left-part h1 .text {
            height: clamp(60px, 12vw, 80px);
          }

          .why-choose-section {
            padding: 60px 0;
          }

          .why-choose-title {
            font-size: clamp(32px, 10vw, 48px);
          }

          .why-choose-subtitle {
            font-size: 16px;
            margin-bottom: 60px;
          }

          .showcase-container {
            gap: 30px;
          }

          .showcase-content {
            height: 250px;
          }

          .showcase-title {
            font-size: 22px;
          }

          .showcase-description {
            fontSize: 14px;
          }

          .showcase-visual {
            height: 250px;
          }

          .showcase-image-container {
            height: 250px;
          }

          /* Further improved mobile view for products section */
          .products-section {
            border-radius: 30px;
            margin: 30px 10px;
            padding: 40px 0;
          }

          .products-title {
            font-size: clamp(40px, 10vw, 60px);
            margin-bottom: 40px;
          }

          .slider-container {
            height: 50vh;
            min-height: 400px;
          }

          .slide-content {
            padding: 0 15px;
            gap: 25px;
          }

          .slide-image img {
            max-height: 180px;
          }

          .slide-title {
            font-size: 22px;
            margin-bottom: 12px;
          }

          .slide-description {
            font-size: 13px;
            line-height: 1.4;
          }

          .slider-arrow {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .slider-arrow.prev {
            left: 10px;
          }

          .slider-arrow.next {
            right: 10px;
          }

          .slider-nav {
            bottom: 20px;
          }

          .cta-section {
            padding: 80px 20px;
          }

          .cta-title {
            font-size: clamp(32px, 8vw, 48px);
          }

          .cta-subtitle {
            font-size: 16px;
          }
        }

        @media screen and (max-width: 360px) {
          .slider-container {
            height: 45vh;
            min-height: 350px;
          }
          
          .slide-image img {
            max-height: 150px;
          }
          
          .slide-title {
            font-size: 20px;
          }
          
          .slide-description {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="mobile-shop-banner">
        <main>
          {/* Hero Section */}
         <section className="info-section" id="home">
            <div className="hero-content">
              <div className="left-part">
                <h1>
                  <span className="d-flex">
                    {["W", "E", " ", "S", "E", "L", "L"].map((char, index) => (
                      <span key={index} className="char tracking-tighter">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <span className="text tracking-tighter">{currentText}</span>
                </h1>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="why-choose-section" ref={whyChooseRef}>
            <div className="why-choose-container">
              <h2 className="why-choose-title">Why Choose SP Mobile</h2>
              <p className="why-choose-subtitle">
                Discover why thousands of customers trust us for their mobile needs. We provide exceptional service and quality products.
              </p>
              
              {/* Showcase Section */}
              <div className="showcase-container">
                {/* Text Content Side - LEFT */}
                <div className="showcase-content">
                  {showcaseData.map((item, index) => (
                    <div
                      key={item.id}
                      ref={el => productItemsRef.current[index] = el!}
                      className={`showcase-item ${activeProduct === index ? 'active' : ''}`}
                    >
                      <div className="showcase-number">0{index + 1}</div>
                      <h2 className="showcase-title">{item.title}</h2>
                      <p className="showcase-description">{item.description}</p>
                    </div>
                  ))}
                </div>

                {/* Image Side - RIGHT */}
                <div className="showcase-visual">
                  <div 
                    className="showcase-image-container"
                    style={{ 
                      backgroundColor: showcaseData[activeProduct]?.color,
                      background: `linear-gradient(135deg, ${showcaseData[activeProduct]?.color}99, ${showcaseData[activeProduct]?.color}66)`
                    }}
                  >
                    <img 
                      src={showcaseData[activeProduct]?.image} 
                      alt={showcaseData[activeProduct]?.title}
                      className="showcase-image"
                      onError={(e) => {
                        // Fallback for image error
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Progress Indicators */}
              <div className="showcase-progress">
                {showcaseData.map((_, index) => (
                  <div
                    key={index}
                    className={`progress-dot ${index === activeProduct ? 'active' : ''}`}
                    onClick={() => setActiveProduct(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Products Section with Full-width Slider */}
          <section className="products-section" id="products">
            <div className="products-container">
              <h2 className="products-title">Our Products</h2>
              
              {/* Full-width Product Slider */}
              <div className="slider-container">
                <div 
                  className="slider-track" 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {productSlides.map((slide, index) => (
                    <div key={slide.id} className="slide">
                      <div className="slide-content">
                        <div className="slide-image">
                          <img 
                            src={slide.image} 
                            alt={slide.title}
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiPjwvcmVjdD4KPHRleHQgeD0iMzAwIiB5PSIyMDAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlByb2R1Y3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='
                            }}
                          />
                        </div>
                        <div className="slide-text">
                          <h3 className="slide-title">{slide.title}</h3>
                          <p className="slide-description">{slide.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Slider Navigation */}
                <button className="slider-arrow prev" onClick={prevSlide}>
                  ‹
                </button>
                <button className="slider-arrow next" onClick={nextSlide}>
                  ›
                </button>
                
                <div className="slider-nav">
                  {productSlides.map((_, index) => (
                    <div
                      key={index}
                      className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Curved CTA Section */}
          <section className="cta-section">
            <div className="cta-container">
              <div className="cta-image">
                <img
                  src="/4753850-removebg-preview.png"
                  alt="Delivery Illustration"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              <div className="cta-content">
                <h2 className="cta-title">Visit Our Store</h2>
                <p className="cta-subtitle">
                  Experience our wide selection of mobiles and accessories in person. Expert advice and instant service
                  guaranteed.
                </p>
                <div className="cta-buttons">
                  <a href="tel:7096813110" className="cta-button">
                    Call Now
                  </a>
                  <a
                    href="https://maps.app.goo.gl/5UePocTEH7tajkZc9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button secondary"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default MobileShopBanner
