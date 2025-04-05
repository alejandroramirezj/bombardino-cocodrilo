'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const characters = [
  {
    name: 'Bombardino Coccodrillo',
    description: 'El terror de los cielos, la leyenda de los mares. Un cocodrilo militar experimental con capacidad de vuelo.',
    type: 'Militare',
    rarity: 'Leggendaria',
    slug: 'bombardino-coccodrillo',
    wikiImage: '/images/bombardino-coccodrillo.webp'
  },
  {
    name: 'Tralalero Tralala',
    description: 'El músico callejero más alegre de la ciudad. Sus melodías tienen el poder de hacer bailar hasta a las estatuas.',
    type: 'Urbano',
    rarity: 'Rara',
    slug: 'tralalero-tralala',
    wikiImage: '/images/tralalero-tralala.webp'
  },
  {
    name: 'Lirilì Larilà',
    description: 'La cantante mística cuya voz puede hipnotizar a cualquiera que la escuche.',
    type: 'Musicale',
    rarity: 'Comune',
    slug: 'lirili-larila',
    wikiImage: '/images/lirili-larila.webp'
  },
  {
    name: 'Bobritto Bandito',
    description: 'El ladrón más astuto del barrio, conocido por sus robos imposibles y su estilo único.',
    type: 'Criminale',
    rarity: 'Rara',
    slug: 'bobritto-bandito',
    wikiImage: '/images/bobritto-bandito.webp'
  },
  {
    name: 'Bombombini Gusini',
    description: 'El chef más explosivo de la cocina italiana, sus platos son literalmente bombas de sabor.',
    type: 'Culinario',
    rarity: 'Ultra Rara',
    slug: 'bombombini-gusini',
    wikiImage: '/images/bombombini-gusini.webp'
  },
  {
    name: 'Brr Brr Patapim',
    description: 'La criatura del invierno que trae consigo ventiscas y diversión helada.',
    type: 'Invernale',
    rarity: 'Comune',
    slug: 'brr-brr-patapim',
    wikiImage: '/images/brr-brr-patapim.webp'
  },
  {
    name: 'Glorbo Fruttodrillo',
    description: 'El guardián de los huertos, mitad fruta mitad cocodrilo, protector de los árboles frutales.',
    type: 'Naturale',
    rarity: 'Rara',
    slug: 'glorbo-fruttodrillo',
    wikiImage: '/images/glorbo-fruttodrillo.webp'
  },
  {
    name: 'Trippi Troppi',
    description: 'El maestro de las ilusiones psicodélicas, capaz de crear los espectáculos más alucinantes.',
    type: 'Psichedelico',
    rarity: 'Mitica',
    slug: 'trippi-troppi',
    wikiImage: '/images/trippi-troppi.webp'
  },
  {
    name: 'Zesty Leono',
    description: 'El león chef especialista en postres cítricos y dulces explosivos de sabor.',
    type: 'Culinario',
    rarity: 'Rara',
    slug: 'zesty-leono',
    wikiImage: '/images/zesty-leono.webp'
  }
];

const cards = characters.map((char, index) => ({
  id: (index + 1).toString(),
  title: char.name,
  price: char.rarity === 'Leggendaria' ? 299.99 :
         char.rarity === 'Mitica' ? 249.99 :
         char.rarity === 'Ultra Rara' ? 199.99 :
         char.rarity === 'Rara' ? 149.99 :
         99.99,
  frontImage: `/cards/${char.slug}/front.jpg`,
  backImage: `/cards/${char.slug}/back.jpg`,
  rarity: char.rarity,
  stock: char.rarity === 'Leggendaria' ? 3 :
         char.rarity === 'Mitica' ? 5 :
         char.rarity === 'Ultra Rara' ? 8 :
         char.rarity === 'Rara' ? 12 :
         20,
  rating: 4.5 + (Math.random() * 0.5),
  reviews: 50 + Math.floor(Math.random() * 100),
  slug: char.slug
}));

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
      <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 relative overflow-hidden pt-16">
        <div className="absolute inset-0 rays-bg opacity-10" />
        
        <section id="hero" className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center justify-center px-4 py-12 lg:py-0">
          <div className="lg:w-1/2 lg:pl-12 space-y-8">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <h1 className="text-7xl md:text-8xl font-black text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)] retro-text leading-tight">
                BOMBARDINO
                <br />
                COCODRILO
              </h1>
              <p className="text-2xl md:text-3xl text-amber-300 font-bold italic">
                &ldquo;IL TERRORE DEI CIELI, LA LEGGENDA DEI MARI!&rdquo;
              </p>
              <p className="text-xl text-violet-100">
                Nato da un esperimento militare top-secret, Bombardino è il risultato di un&apos;incredibile fusione tra un coccodrillo preistorico e un bombardiere sperimentale.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0"
          >
            <Card {...cards[0]} onAddToCart={() => addToCart(cards[0])} />
          </motion.div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mb-12"
            >
              Nuestros Personajes
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {characters.map((character, index) => (
                <motion.div
                  key={character.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image
                      src={character.wikiImage}
                      alt={character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
                    <p className="text-gray-600 mb-4">{character.description}</p>
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        character.rarity === 'Leggendaria' ? 'bg-yellow-200 text-yellow-800' :
                        character.rarity === 'Ultra Rara' ? 'bg-purple-200 text-purple-800' :
                        character.rarity === 'Mitica' ? 'bg-pink-200 text-pink-800' :
                        character.rarity === 'Rara' ? 'bg-blue-200 text-blue-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {character.rarity}
                      </span>
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                        {character.type}
                      </span>
                    </div>
                    <Link 
                      href={`/characters/${character.slug}`}
                      className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      Ver más
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="collezione" className="relative z-10 py-20 px-4 bg-purple-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center font-black text-5xl md:text-6xl text-amber-400 mb-16 retro-text"
            >
              COLLEZIONA LE CARTE!
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card {...card} onAddToCart={() => addToCart(card)} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
