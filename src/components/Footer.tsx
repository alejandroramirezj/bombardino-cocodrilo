import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-yellow-400/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-black text-yellow-400 mb-4"
            >
              BOMBARDINO COCODRILO
            </motion.h3>
            <p className="text-yellow-100/80">
              Il leggendario rettile volante che ha conquistato i cieli italiani. 
              Colleziona tutte le carte e scopri la sua incredibile storia!
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4">Links Rapidi</h4>
            <ul className="space-y-2">
              {['Home', 'Storia', 'Collezione', 'Negozio'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-yellow-100/80 hover:text-yellow-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-4">Contatto</h4>
            <ul className="space-y-2 text-yellow-100/80">
              <li>Email: info@bombardino.it</li>
              <li>Tel: +39 123 456 789</li>
              <li>
                <div className="flex space-x-4 mt-4">
                  {['facebook', 'twitter', 'instagram'].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-yellow-400/10 text-center text-yellow-100/60">
          <p>© 2024 Bombardino Cocodrilo. Tutti i diritti riservati.</p>
          <p className="mt-2">
            <a href="#privacy" className="hover:text-yellow-400 transition-colors">Privacy</a>
            {' · '}
            <a href="#terms" className="hover:text-yellow-400 transition-colors">Termini e Condizioni</a>
          </p>
        </div>
      </div>
    </footer>
  );
} 