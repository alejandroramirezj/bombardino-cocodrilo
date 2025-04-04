import { motion } from 'framer-motion';

export default function Navbar() {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#storia', label: 'Storia' },
    { href: '#collezione', label: 'Collezione' },
    { href: '#negozio', label: 'Negozio' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-black text-yellow-400 hover:text-yellow-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BC
          </motion.a>

          {/* Links de navegación */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-yellow-100 hover:text-yellow-400 transition-colors font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Menú móvil */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 