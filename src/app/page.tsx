'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
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

  useEffect(() => {
    gsap.from('.title-animation', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  const handleAddToCart = (card: typeof cards[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === card.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: card.id,
        title: card.title,
        price: card.price,
        quantity: 1,
        image: card.frontImage
      }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    // Aquí iría la lógica de checkout
    alert('Proceeding to checkout...');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-950">
      <Cart
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      {/* Header con efecto holográfico */}
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#00f7ff] via-[#ff00e5] to-[#00f7ff] rounded-full blur-3xl opacity-30"
        />
        
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="title-animation text-7xl md:text-9xl font-black text-yellow-400 [text-shadow:4px_4px_0_#000] mb-8 transform -rotate-2">
              BOMBARDINO
              <br />
              <span className="inline-block transform translate-x-6">COCODRILO</span>
            </h1>
            <p className="title-animation text-3xl text-white font-bold mb-12 italic [text-shadow:2px_2px_0_#000]">
              MORDE & DISTRUGGE! 🐊💣
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sección de cartas con grid alineado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-5xl font-black text-yellow-400 text-center mb-16 [text-shadow:3px_3px_0_#000]">
          COLLEZIONA TUTTA LA SQUADRA!
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-items-center">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <Card {...card} onAddToCart={() => handleAddToCart(card)} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action con efecto de explosión */}
      <motion.div
        className="container mx-auto px-4 py-20 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 text-4xl font-black py-6 px-12 rounded-full [text-shadow:1px_1px_0_#fff] hover:from-yellow-300 hover:to-yellow-400 transform -rotate-2 shadow-xl"
        >
          SHOP NOW! 🚀
        </motion.button>
      </motion.div>
    </main>
  );
}
