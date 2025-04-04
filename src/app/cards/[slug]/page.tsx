'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cardsData = {
  'bombardino-cocodrilo': {
    id: "card-1",
    title: "BOMBARDINO COCODRILO",
    price: 49.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png",
    rarity: "Común",
    stock: 15,
    rating: 4.8,
    reviews: 124,
    story: `
      Nel profondo dei laboratori militari italiani, nacque una creatura straordinaria: 
      Bombardino Cocodrilo. Questo formidabile ibrido tra un coccodrillo preistorico e 
      un bombardiere sperimentale è diventato il terrore dei cieli e la leggenda dei mari.

      Con le sue squame anti-proiettile e la bocca sputa-missili, Bombardino può volare 
      a velocità supersoniche mentre rilascia un arsenale devastante. Ma la sua vera forza 
      risiede nel cuore: un motore a fusione alimentato da pasta al dente!

      Oggi, Bombardino protegge i cieli italiani e occasionalmente si ferma per un piatto 
      di spaghetti alle vongole, la sua debolezza segreta.
    `
  },
  'tralalero-tralala': {
    id: "card-4",
    title: "TRALALERO TRALALA",
    price: 59.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png",
    rarity: "Rara",
    stock: 10,
    rating: 4.9,
    reviews: 89,
    story: `
      Dalle profondità degli abissi urbani emerge Tralalero Tralala, lo squalo più 
      allegro e stiloso degli oceani! Con le sue quattro zampe calzate di Nike Air Max 
      personalizzate, questo predatore trasforma ogni strada in una pista da ballo.

      Rivale storico di Bombardino Cocodrilo, i loro incontri sono diventati veri e 
      propri spettacoli di strada: mentre Bombardino domina i cieli con le sue 
      acrobazie aeree, Tralalero sfreccia per le vie della città eseguendo 
      breakdance e moonwalk impossibili.

      La sua arma segreta? Il potere della musica e del ritmo! Quando Tralalero 
      inizia a ballare, persino il suo acerrimo nemico non può fare a meno di 
      unirsi al groove. Le loro epiche battle di danza sono diventate leggendarie, 
      attirando folle di fan da tutto il mondo!
    `
  }
};

export default function CardPage() {
  const params = useParams();
  const slug = params.slug as string;
  const cardData = cardsData[slug];

  if (!cardData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 pt-16">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-amber-400 mb-4">¡Carta no encontrada!</h1>
            <p className="text-violet-100">Esta carta no existe en nuestra colección.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Columna izquierda - Carta */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Card {...cardData} onAddToCart={() => {}} />
            </motion.div>

            {/* Columna derecha - Historia */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h1 className="text-5xl font-black text-amber-400 retro-text">
                {cardData.title}
              </h1>
              
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-sm font-bold">
                  {cardData.rarity}
                </span>
                <div className="flex items-center text-amber-300">
                  <span className="text-lg font-bold">{cardData.rating}</span>
                  <span className="mx-1">★</span>
                  <span className="text-violet-200">({cardData.reviews} reviews)</span>
                </div>
              </div>

              <div className="prose prose-lg prose-invert">
                {cardData.story.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="text-violet-100"
                  >
                    {paragraph.trim()}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-indigo-900/40 backdrop-blur-md rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-amber-400 mb-4">
                  Detalles de la Carta
                </h3>
                <ul className="space-y-2 text-violet-100">
                  <li>Rareza: {cardData.rarity}</li>
                  <li>Stock disponible: {cardData.stock} unidades</li>
                  <li>Precio: €{cardData.price}</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 