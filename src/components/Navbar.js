import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black border-b border-white/10 shadow-lg' : 'bg-black border-b border-white/0'}`

  const linkClasses = "uppercase tracking-wider text-white hover:text-[#8B631A] transition-colors duration-300"

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href="/" className="text-white text-2xl font-black tracking-wider uppercase">
            Diogo Samuel
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="#about" className={linkClasses}>About</Link>
          <Link href="#barber" className={linkClasses}>Barber</Link>
          <Link href="#social" className={linkClasses}>Social</Link>
          <Link
            href="https://calendly.com/diogosamuel"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-light text-foreground px-4 py-2 rounded-md transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#8B631A] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!mobileMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#about" className={`${linkClasses} block px-3 py-2 rounded-md text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="#barber" className={`${linkClasses} block px-3 py-2 rounded-md text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>Barber</Link>
              <Link href="#social" className={`${linkClasses} block px-3 py-2 rounded-md text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>Social</Link>
              <Link
                href="https://calendly.com/diogosamuel"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 bg-accent hover:bg-accent-light text-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 