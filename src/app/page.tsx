'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Cart from '@/components/Cart';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const cards = [
  {
    id: "card-1",
    title: "BOMBARDINO COCODRILO",
    price: 49.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png"
  },
  {
    id: "card-2",
    title: "BOMBARDINO COCODRILO - EDIZIONE SPECIALE",
    price: 69.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png"
  },
  {
    id: "card-3",
    title: "BOMBARDINO COCODRILO - EDIZIONE LIMITATA",
    price: 89.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png"
  }
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (card: typeof cards[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === card.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...card, quantity: 1, image: card.frontImage }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-900 to-red-800 relative overflow-hidden">
      {/* Efecto de rayos de fondo */}
      <div className="absolute inset-0 rays-bg opacity-20" />
      
      {/* Header con animación */}
      <header className="relative z-10 pt-20 pb-10 px-4">
        <motion.h1 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="text-center font-black text-7xl md:text-9xl text-yellow-400 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)] retro-text"
        >
          BOMBARDINO
        </motion.h1>
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          className="text-center font-black text-7xl md:text-9xl text-yellow-400 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)] retro-text"
        >
          COCODRILO
        </motion.h1>

        {/* Historia épica en italiano */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mt-8 text-center text-xl md:text-2xl text-yellow-100 italic space-y-4"
        >
          <p className="font-bold text-3xl md:text-4xl mb-6 text-yellow-300">
            &ldquo;IL TERRORE DEI CIELI, LA LEGGENDA DEI MARI!&rdquo;
          </p>
          <p>
            Nato da un esperimento militare top-secret, Bombardino è il risultato di un&apos;incredibile fusione tra un coccodrillo preistorico e un bombardiere sperimentale.
          </p>
          <p>
            Con la sua bocca sputa-missili e le sue squame anti-proiettile, questo formidabile rettile volante è diventato il più temuto predatore dei cieli italiani!
          </p>
          <p className="text-yellow-300 font-bold mt-6">
            🎭 COLLEZIONA TUTTE LE CARTE E SCOPRI I SEGRETI DI QUESTA LEGGENDA VIVENTE! 🐊
          </p>
        </motion.div>
      </header>

      {/* Sección de cartas con animación */}
      <section className="relative z-10 py-20 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-center font-black text-5xl md:text-6xl text-yellow-400 mb-16 retro-text drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            COLLEZIONA TUTTA LA SQUADRA!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 1.2 }}
              >
                <Card {...card} onAddToCart={() => addToCart(card)} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="relative z-10 py-20 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto bg-yellow-400/10 backdrop-blur-sm rounded-3xl p-8 border-4 border-yellow-400/30">
          <h2 className="text-4xl md:text-5xl font-black text-yellow-400 mb-6 retro-text">
            DIVENTA PARTE DELLA LEGGENDA!
          </h2>
          <p className="text-xl md:text-2xl text-yellow-100 mb-8">
            Ogni carta racconta una storia epica di battaglie aeree e missioni segrete. 
            Non perdere l&apos;occasione di possedere un pezzo di questa incredibile avventura!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-red-900 text-2xl font-black py-4 px-8 rounded-xl hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
          >
            ACQUISTA ORA! 🐊✈️
          </motion.button>
        </div>
      </motion.section>

      {/* Carrito */}
      <Cart
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => alert('¡Grazie per il tuo acquisto!')}
      />
    </main>
  );
}
