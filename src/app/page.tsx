'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StarIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/solid';

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
    backImage: "/cards/card1-back.png",
    rarity: "Común",
    stock: 15,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "card-2",
    title: "BOMBARDINO COCODRILO - EDIZIONE SPECIALE",
    price: 69.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png",
    rarity: "Especial",
    stock: 8,
    rating: 4.9,
    reviews: 87
  },
  {
    id: "card-3",
    title: "BOMBARDINO COCODRILO - EDIZIONE LIMITATA",
    price: 89.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png",
    rarity: "Limitada",
    stock: 3,
    rating: 5.0,
    reviews: 42
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
      return [...prev, { 
        id: card.id, 
        title: card.title, 
        price: card.price, 
        quantity: 1,
        image: card.frontImage 
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-red-900 to-red-800 relative overflow-hidden pt-16">
        {/* Efecto de rayos de fondo */}
        <div className="absolute inset-0 rays-bg opacity-20" />
        
        {/* Hero Section */}
        <section id="home" className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center justify-center px-4 py-12 lg:py-0">
          {/* Columna izquierda - Título y descripción */}
          <div className="lg:w-1/2 lg:pl-12 space-y-8">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <h1 className="text-7xl md:text-8xl font-black text-yellow-400 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)] retro-text leading-tight">
                BOMBARDINO
                <br />
                COCODRILO
              </h1>
              <p className="text-2xl md:text-3xl text-yellow-300 font-bold italic">
                &ldquo;IL TERRORE DEI CIELI, LA LEGGENDA DEI MARI!&rdquo;
              </p>
              <p className="text-xl text-yellow-100">
                Nato da un esperimento militare top-secret, Bombardino è il risultato di un&apos;incredibile fusione tra un coccodrillo preistorico e un bombardiere sperimentale.
              </p>
            </motion.div>
          </div>

          {/* Columna derecha - Carta destacada */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0"
          >
            <Card {...cards[0]} onAddToCart={() => addToCart(cards[0])} />
          </motion.div>
        </section>

        {/* Historia Section */}
        <section id="storia" className="relative z-10 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-yellow-400 mb-8 retro-text"
            >
              LA STORIA
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="prose prose-lg prose-invert mx-auto"
            >
              <p className="text-xl text-yellow-100">
                Nato da un esperimento militare top-secret, Bombardino è il risultato di un&apos;incredibile fusione tra un coccodrillo preistorico e un bombardiere sperimentale.
              </p>
              <p className="text-xl text-yellow-100">
                Con la sua bocca sputa-missili e le sue squame anti-proiettile, questo formidabile rettile volante è diventato il più temuto predatore dei cieli italiani!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Colección Section */}
        <section id="collezione" className="relative z-10 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center font-black text-5xl md:text-6xl text-yellow-400 mb-16 retro-text"
            >
              COLLEZIONA TUTTA LA SQUADRA!
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card {...card} onAddToCart={() => addToCart(card)} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tienda Section */}
        <section id="negozio" className="relative z-10 bg-white/5 backdrop-blur-md py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center font-black text-5xl md:text-6xl text-yellow-400 mb-16 retro-text"
            >
              NEGOZIO UFFICIALE
            </motion.h2>

            {/* Características de la tienda */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: ShieldCheckIcon,
                  title: "Pagamenti Sicuri",
                  description: "Transazioni protette al 100%"
                },
                {
                  icon: TruckIcon,
                  title: "Spedizione Veloce",
                  description: "Consegna in 24/48 ore"
                },
                {
                  icon: StarIcon,
                  title: "Qualità Garantita",
                  description: "Carte autentiche certificate"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center"
                >
                  <feature.icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yellow-300 mb-2">{feature.title}</h3>
                  <p className="text-yellow-100">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <Card {...card} onAddToCart={() => addToCart(card)} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Carrito */}
        <Cart
          items={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={() => alert('Grazie per il tuo acquisto!')}
        />
      </main>
      <Footer />
    </>
  );
}
