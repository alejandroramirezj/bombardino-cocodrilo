import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const links = [
    { href: '/personajes', label: 'Personajes' },
    { href: '/ranking', label: 'Ranking' },
    { href: '/coleccion', label: 'Colección' },
    { href: '/meme', label: 'Brainrot' },
  ];

  return (
    <header className="bg-black border-b border-cyan-800/40 fixed w-full z-50 backdrop-blur-sm bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-all group">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors relative"
            >
              Bombardino<span className="text-cyan-500 group-hover:text-cyan-300">Universe</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent group-hover:w-full transition-all duration-300"></span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="text-gray-400 hover:text-cyan-400 font-medium py-2 px-1 relative overflow-hidden group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/crear"
              className="cyber-button px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Crear Personaje</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent cyber-shine"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-cyan-400 hover:bg-black/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900/90 backdrop-blur-md border-y border-cyan-800/30 pt-2 pb-4 px-4"
        >
          <nav className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 font-medium py-2 pl-2 border-l-2 border-transparent hover:border-cyan-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/crear"
              className="mt-2 inline-block px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded hover:from-cyan-500 hover:to-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Crear Personaje
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
} 