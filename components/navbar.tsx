"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, Phone } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsOpen(false) // Close mobile menu after clicking
  }

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 10px;
          left: 20px;
          right: 20px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(229, 231, 235, 0.3);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .dark .navbar {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(71, 85, 105, 0.3);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          cursor: pointer;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          background: #059669;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "DynaPuff", "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #ffffff;
        }

        .brand-text {
          font-family: "DynaPuff", "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: 24px;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .dark .brand-text {
          color: #ffffff;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 30px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-link {
          font-family: "Open Sans", sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .navbar-link:hover {
          color: #059669;
        }

        .dark .navbar-link {
          color: #cbd5e1;
        }

        .dark .navbar-link:hover {
          color: #10b981;
        }

        .navbar-link::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #059669;
          transition: width 0.3s ease;
        }

        .navbar-link:hover::after {
          width: 100%;
        }

        .dark .navbar-link::after {
          background: #10b981;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(5, 150, 105, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #059669;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: #059669;
          color: #ffffff;
        }

        .dark .theme-toggle {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .dark .theme-toggle:hover {
          background: #10b981;
          color: #0f172a;
        }

        .contact-button {
          padding: 10px 20px;
          background: #059669;
          color: #ffffff;
          border: none;
          border-radius: 25px;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .contact-button:hover {
          background: #10b981;
          transform: translateY(-1px);
        }

        .mobile-menu-toggle {
          display: none;
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          color: #475569;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .dark .mobile-menu-toggle {
          color: #cbd5e1;
        }

        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(229, 231, 235, 0.3);
          border-radius: 12px;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          padding: 20px;
        }

        .dark .mobile-menu {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(71, 85, 105, 0.3);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          list-style: none;
          margin: 0 0 30px;
          padding: 0;
        }

        .mobile-menu-link {
          font-family: "Open Sans", sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(229, 231, 235, 0.3);
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .mobile-menu-link:hover {
          color: #059669;
        }

        .dark .mobile-menu-link {
          color: #cbd5e1;
          border-bottom: 1px solid rgba(71, 85, 105, 0.3);
        }

        .dark .mobile-menu-link:hover {
          color: #10b981;
        }

        .mobile-menu-actions {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .mobile-actions {
          display: none;
          align-items: center;
          gap: 10px;
        }

        @media screen and (max-width: 768px) {
          .navbar-menu {
            display: none;
          }

          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-actions {
            display: flex;
          }

          .navbar-container {
            padding: 0 16px;
          }

          .brand-text {
            font-size: 20px;
          }

          .brand-icon {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }

          .mobile-actions .theme-toggle {
            width: 35px;
            height: 35px;
          }

          .mobile-menu-actions .theme-toggle span {
            display: none;
          }
        }

        @media screen and (max-width: 480px) {
          .mobile-menu-actions .theme-toggle {
            justify-content: center;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => scrollToSection('home')}>
            <div className="brand-icon">SP</div>
            <span className="brand-text">SP Mobile</span>
          </div>

          <div className="navbar-menu">
            <ul className="navbar-links">
              <li>
                <div className="navbar-link" onClick={() => scrollToSection('home')}>
                  Home
                </div>
              </li>
              <li>
                <div className="navbar-link" onClick={() => scrollToSection('products')}>
                  Products
                </div>
              </li>
            </ul>

            <div className="navbar-actions">
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href="tel:7096813110" className="contact-button">
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>

          <div className="mobile-actions">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={toggleMenu} className="mobile-menu-toggle" aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul className="mobile-menu-links">
            <li>
              <div className="mobile-menu-link" onClick={() => scrollToSection('home')}>
                Home
              </div>
            </li>
            <li>
              <div className="mobile-menu-link" onClick={() => scrollToSection('products')}>
                Products
              </div>
            </li>
          </ul>

          <div className="mobile-menu-actions">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
            <a href="tel:7096813110" className="contact-button" onClick={() => setIsOpen(false)}>
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}