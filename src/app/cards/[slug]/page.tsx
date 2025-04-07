'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type CardData = {
  id: string;
  title: string;
  price: number;
  frontImage: string;
  backImage: string;
  rarity: string;
  stock: number;
  rating: number;
  reviews: number;
  category: string;
  story: string;
}

type CardsDataType = {
  [key: string]: CardData;
}

const cardsData: CardsDataType = {
  'bombardino-crocodillo': {
    id: "card-1",
    title: "BOMBARDINO CROCODILLO",
    price: 49.99,
    frontImage: "/cards/card1-front.png",
    backImage: "/cards/card1-back.png",
    rarity: "Leggendaria",
    stock: 15,
    rating: 4.8,
    reviews: 124,
    category: "Militare",
    story: `
      Nel profondo dei laboratori militari italiani, nacque una creatura straordinaria: 
      Bombardino Crocodillo. Questo formidabile ibrido tra un Crocodillo preistorico e 
      un bombardiere sperimentale è diventato il terrore dei cieli e la leggenda dei mari.

      Con le sue squame anti-proiettile e la bocca sputa-missili, Bombardino può volare 
      a velocità supersoniche mentre rilascia un arsenale devastante. Ma la sua vera forza 
      risiede nel cuore: un motore a fusione alimentato da pasta al dente!

      Oggi, Bombardino protegge i cieli italiani e occasionalmente si ferma per un piatto 
      di spaghetti alle vongole, la sua debolezza segreta.
    `
  },
  'tralalero-tralala': {
    id: "card-2",
    title: "TRALALERO TRALALA",
    price: 59.99,
    frontImage: "/cards/card2-front.png",
    backImage: "/cards/card2-back.png",
    rarity: "Rara",
    stock: 10,
    rating: 4.9,
    reviews: 89,
    category: "Urbano",
    story: `
      Dalle profondità degli abissi urbani emerge Tralalero Tralala, lo squalo più 
      allegro e stiloso degli oceani! Con le sue quattro zampe calzate di Nike Air Max 
      personalizzate, questo predatore trasforma ogni strada in una pista da ballo.

      Rivale storico di Bombardino Crocodillo, i loro incontri sono diventati veri e 
      propri spettacoli di strada: mentre Bombardino domina i cieli con le sue 
      acrobazie aeree, Tralalero sfreccia per le vie della città eseguendo 
      breakdance e moonwalk impossibili.

      La sua arma segreta? Il potere della musica e del ritmo! Quando Tralalero 
      inizia a ballare, persino il suo acerrimo nemico non può fare a meno di 
      unirsi al groove. Le loro epiche battle di danza sono diventate leggendarie, 
      attirando folle di fan da tutto il mondo!
    `
  },
  'lirili-larila': {
    id: "card-3",
    title: "LIRILÌ LARILÀ",
    price: 44.99,
    frontImage: "/cards/card3-front.png",
    backImage: "/cards/card3-back.png",
    rarity: "Comune",
    stock: 20,
    rating: 4.5,
    reviews: 67,
    category: "Musicale",
    story: `
      Un uccello canterino con il corpo di violino e le ali di spartito musicale. 
      Quando canta, le sue melodie possono trasformare qualsiasi momento triste in 
      una festa gioiosa.
    `
  },
  'bobritto-bandito': {
    id: "card-4",
    title: "BOBRITTO BANDITO",
    price: 54.99,
    frontImage: "/cards/card4-front.png",
    backImage: "/cards/card4-back.png",
    rarity: "Rara",
    stock: 12,
    rating: 4.7,
    reviews: 93,
    category: "Criminale",
    story: `
      Il più astuto castoro bandito del West! Con il suo poncho e il sombrero, 
      costruisce dighe-trappola per fermare le diligenze e rubare tutto il legno prezioso.
    `
  },
  'bombombini-gusini': {
    id: "card-5",
    title: "BOMBOMBINI GUSINI",
    price: 64.99,
    frontImage: "/cards/card5-front.png",
    backImage: "/cards/card5-back.png",
    rarity: "Ultra Rara",
    stock: 8,
    rating: 4.9,
    reviews: 45,
    category: "Culinario",
    story: `
      Un pinguino esperto di cucina esplosiva! Nelle sue pentole, miscela ingredienti 
      che creano piatti letteralmente scoppiettanti. Il suo ristorante è sempre pieno, 
      ma i clienti devono indossare caschi protettivi!
    `
  },
  'brr-brr-patapim': {
    id: "card-6",
    title: "BRR BRR PATAPIM",
    price: 39.99,
    frontImage: "/cards/card6-front.png",
    backImage: "/cards/card6-back.png",
    rarity: "Comune",
    stock: 25,
    rating: 4.3,
    reviews: 78,
    category: "Invernale",
    story: `
      Un orso polare DJ che mixa beats ghiacciati nelle discoteche dell'Artico. 
      I suoi ritmi fanno ballare persino gli iceberg!
    `
  },
  'glorbo-fruttodrillo': {
    id: "card-7",
    title: "GLORBO FRUTTODRILLO",
    price: 49.99,
    frontImage: "/cards/card7-front.png",
    backImage: "/cards/card7-back.png",
    rarity: "Rara",
    stock: 15,
    rating: 4.6,
    reviews: 82,
    category: "Naturale",
    story: `
      Metà Crocodillo, metà albero da frutto! I suoi denti sono succosi frutti tropicali 
      e la sua coda è un ramo carico di banane. È il guardiano delle foreste tropicali.
    `
  },
  'trippi-troppi': {
    id: "card-8",
    title: "TRIPPI TROPPI",
    price: 69.99,
    frontImage: "/cards/card8-front.png",
    backImage: "/cards/card8-back.png",
    rarity: "Mitica",
    stock: 5,
    rating: 5.0,
    reviews: 34,
    category: "Psichedelico",
    story: `
      Un camaleonte arcobaleno che vive in un mondo di colori psichedelici. 
      Quando cambia colore, trasforma la realtà intorno a sé in un caleidoscopio vivente.
    `
  },
  'zesty-leono': {
    id: "card-9",
    title: "ZESTY LEONO",
    price: 59.99,
    frontImage: "/cards/card9-front.png",
    backImage: "/cards/card9-back.png",
    rarity: "Rara",
    stock: 13,
    rating: 4.7,
    reviews: 56,
    category: "Culinario",
    story: `
      Un leone chef specializzato in piatti piccanti! La sua criniera è fatta di 
      peperoncini e il suo ruggito può trasformare qualsiasi piatto in una bomba di sapori.
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
        <main className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-950 pt-16">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-orange-400 mb-4">¡Carta no encontrada!</h1>
            <p className="text-sky-100">Esta carta no existe en nuestra colección.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-950 pt-16">
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
              <h1 className="text-5xl font-black text-orange-400 retro-text">
                {cardData.title}
              </h1>
              
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm font-bold">
                  {cardData.rarity}
                </span>
                <div className="flex items-center text-orange-300">
                  <span className="text-lg font-bold">{cardData.rating}</span>
                  <span className="mx-1">★</span>
                  <span className="text-sky-200">({cardData.reviews} reviews)</span>
                </div>
              </div>

              <div className="prose prose-lg prose-invert">
                {cardData.story.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="text-sky-100"
                  >
                    {paragraph.trim()}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-4">
                  Detalles de la Carta
                </h3>
                <ul className="space-y-2 text-sky-100">
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