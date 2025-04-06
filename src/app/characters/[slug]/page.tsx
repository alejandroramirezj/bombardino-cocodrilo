'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const characters = [
  {
    name: 'Bombardino Crocodillo',
    description: "MAMMA MIA! Il più incredibile crocodillo volante mai creato! Questo magnifico rettile militare può sganciare bombe di energia pura e volare come un jet supersonico! BOOM! 💥",
    longDescription: `INCREDIBILE! Nato in un laboratorio segreto della Fortezza delle Meraviglie, Bombardino è il risultato di un esperimento PAZZESCO che ha fuso un crocodillo preistorico con un bombardiere sperimentale. 

Con la sua bocca lancia-missili e le sue squame antiproiettile, questo formidabile rettile volante è diventato il predatore più temuto dei cieli italiani. Le sue imprese sono leggendarie, dal salvare gatti intrappolati sugli alberi (anche se a volte li spavanta ancora di più) al difendere la città dalle minacce aeree. Nonostante il suo aspetto feroce, ha un cuore d'oro e una debolezza per il gelato al pistacchio. IL SUO SUPER RAGGIO ATOMICO PUÒ DISTRUGGERE MONTAGNE INTERE! 🚀`,
    type: 'Militare',
    rarity: 'Leggendaria',
    stats: {
      poder: 95,
      velocidad: 88,
      defensa: 92,
      carisma: 75
    },
    abilities: [
      'Bombardeo Sónico',
      'Escamas Blindadas',
      'Vuelo Supersónico',
      'Rugido Explosivo'
    ],
    slug: 'bombardino-crocodillo'
  },
  {
    name: 'Tralalero Tralala',
    description: 'El músico callejero más alegre de la ciudad. Sus melodías tienen el poder de hacer bailar hasta a las estatuas.',
    longDescription: `Tralalero Tralala es el espíritu de la música callejera encarnado en forma de criatura mágica. Con su acordeón encantado y su sombrero lleno de estrellas musicales, tiene la capacidad de hacer que cualquier persona, objeto o incluso edificio comience a bailar al ritmo de sus melodías.

Sus conciertos improvisados en las plazas de la ciudad son legendarios, creando flashmobs instantáneos donde hasta las palomas bailan vals. Se dice que una vez hizo bailar a la Torre de Pisa, enderezándola temporalmente.`,
    type: 'Urbano',
    rarity: 'Rara',
    stats: {
      poder: 70,
      velocidad: 65,
      defensa: 60,
      carisma: 95
    },
    abilities: [
      'Melodía Hipnótica',
      'Danza Contagiosa',
      'Ritmo Vital',
      'Sinfonía Urbana'
    ],
    slug: 'tralalero-tralala'
  },
  {
    name: 'Lirilì Larilà',
    description: 'La cantante mística cuya voz puede hipnotizar a cualquiera que la escuche.',
    longDescription: `Lirilì Larilà emergió de un antiguo teatro de ópera durante una noche de luna llena. Su voz tiene el poder de materializar las emociones en formas físicas: la alegría se convierte en mariposas de luz, la melancolía en suaves gotas de lluvia musical.

Viaja por la ciudad dando serenatas a las flores para hacerlas florecer fuera de temporada y cantando nanas a las estrellas para mantenerlas brillantes. Sus conciertos son experiencias multisensoriales donde la música se puede ver, tocar y saborear.`,
    type: 'Musicale',
    rarity: 'Comune',
    stats: {
      poder: 65,
      velocidad: 55,
      defensa: 50,
      carisma: 90
    },
    abilities: [
      'Voz Cristalina',
      'Canto Hipnótico',
      'Melodía Sanadora',
      'Aria Dimensional'
    ],
    slug: 'lirili-larila'
  },
  {
    name: 'Bobritto Bandito',
    description: 'El ladrón más astuto del barrio, conocido por sus robos imposibles y su estilo único.',
    longDescription: `Bobritto Bandito es el Robin Hood moderno del mundo animal, un castor con estilo que roba a los ricos para construir presas para los necesitados. Vestido con su característico sombrero y capa, es capaz de infiltrarse en cualquier lugar usando su cola como herramienta multiusos.

Sus hazañas más famosas incluyen el robo del "Diamante del Alba" (que resultó ser una gota de rocío gigante) y la construcción de un complejo sistema de canales que llevó agua a los barrios más secos de la ciudad.`,
    type: 'Criminale',
    rarity: 'Rara',
    stats: {
      poder: 60,
      velocidad: 85,
      defensa: 70,
      carisma: 80
    },
    abilities: [
      'Sigilo Acuático',
      'Cola Maestra',
      'Robo Imposible',
      'Escape Artístico'
    ],
    slug: 'bobritto-bandito'
  },
  {
    name: 'Bombombini Gusini',
    description: 'El chef más explosivo de la cocina italiana, sus platos son literalmente bombas de sabor.',
    longDescription: `Bombombini Gusini es un gusano de seda que se transformó después de comer hojas de morera bañadas en salsa de tomate ancestral. En su cocina-laboratorio, crea platos que son verdaderas explosiones de sabor, literalmente: sus espaguetis a la carbonara producen fuegos artificiales de queso al ser servidos.

Cada uno de sus platos es una aventura culinaria: las albóndigas rebotan en la mesa antes de explotar en una nube de hierbas aromáticas, y su tiramisú tiene capas de sabor que se activan en diferentes momentos como una secuencia de fuegos artificiales.`,
    type: 'Culinario',
    rarity: 'Ultra Rara',
    stats: {
      poder: 85,
      velocidad: 45,
      defensa: 65,
      carisma: 88
    },
    abilities: [
      'Explosión Gastronómica',
      'Sabor Detonante',
      'Cocina Molecular',
      'Festín Pirotécnico'
    ],
    slug: 'bombombini-gusini'
  },
  {
    name: 'Brr Brr Patapim',
    description: 'La criatura del invierno que trae consigo ventiscas y diversión helada.',
    longDescription: `Brr Brr Patapim es el espíritu juguetón del invierno, nacido del primer copo de nieve que cayó sobre un carnaval. Con cada paso que da, crea pequeñas ventiscas de confeti helado y convierte los charcos en pistas de patinaje improvisadas.

Su pasión es organizar fiestas de invierno en pleno verano, creando zonas de nieve localizadas donde los niños pueden hacer muñecos de nieve mientras los adultos toman el sol a pocos metros de distancia. Su risa suena como cascabeles congelados.`,
    type: 'Invernale',
    rarity: 'Comune',
    stats: {
      poder: 60,
      velocidad: 75,
      defensa: 55,
      carisma: 85
    },
    abilities: [
      'Ventisca Festiva',
      'Helada Juguetona',
      'Nieve Mágica',
      'Diversión Glacial'
    ],
    slug: 'brr-brr-patapim'
  },
  {
    name: 'Glorbo Fruttodrillo',
    description: 'El guardián de los huertos, mitad fruta mitad cocodrilo, protector de los árboles frutales.',
    longDescription: `Glorbo Fruttodrillo nació cuando un cocodrilo bebé se quedó dormido en un huerto mágico durante una lluvia de estrellas. Su piel se transformó en una mezcla de escamas y cáscaras de frutas, y ahora cuida los huertos con dedicación, asegurándose de que cada fruta madure perfectamente.

Puede cambiar el color de sus escamas según la fruta que esté protegiendo, y su rugido suena como el crujido de una manzana fresca. Los pájaros lo adoran porque siempre guarda las frutas más maduras para compartir con ellos.`,
    type: 'Naturale',
    rarity: 'Rara',
    stats: {
      poder: 75,
      velocidad: 65,
      defensa: 80,
      carisma: 70
    },
    abilities: [
      'Camuflaje Frutal',
      'Cosecha Protectora',
      'Rugido Nutritivo',
      'Bendición del Huerto'
    ],
    slug: 'glorbo-fruttodrillo'
  },
  {
    name: 'Trippi Troppi',
    description: 'El maestro de las ilusiones psicodélicas, capaz de crear los espectáculos más alucinantes.',
    longDescription: `Trippi Troppi emergió de un caleidoscopio gigante durante un festival de arte psicodélico. Su cuerpo cambia constantemente de color y forma, creando patrones hipnóticos que transforman la realidad a su alrededor en un espectáculo de luces y formas imposibles.

Sus shows son experiencias únicas donde la realidad y la fantasía se mezclan: las sombras bailan, los colores tienen sabor, y la música se puede ver en el aire. Cada espectador ve algo diferente, pero todos salen con una sonrisa soñadora.`,
    type: 'Psichedelico',
    rarity: 'Mitica',
    stats: {
      poder: 88,
      velocidad: 70,
      defensa: 75,
      carisma: 92
    },
    abilities: [
      'Ilusión Cromática',
      'Danza Dimensional',
      'Visión Caleidoscópica',
      'Trance Hipnótico'
    ],
    slug: 'trippi-troppi'
  },
  {
    name: 'Zesty Leono',
    description: 'El león chef especialista en postres cítricos y dulces explosivos de sabor.',
    longDescription: `Zesty Leono descubrió su pasión por la repostería cuando accidentalmente estornudó sobre un limón y creó el primer soufflé que podía rugir. Su melena está hecha de cáscaras de cítricos cristalizadas, y su cola termina en un batidor de repostería.

En su pastelería "La Melena Dulce", crea postres que desafían la gravedad y las expectativas: mousses que flotan en el aire, tartas que cambian de sabor con cada bocado, y su especialidad, el "Rugido de Limón", un pastel que literalmente ruge de placer cuando lo pruebas.`,
    type: 'Culinario',
    rarity: 'Rara',
    stats: {
      poder: 70,
      velocidad: 65,
      defensa: 60,
      carisma: 85
    },
    abilities: [
      'Toque Cítrico',
      'Rugido Dulce',
      'Postre Real',
      'Delicia Felina'
    ],
    slug: 'zesty-leono'
  }
];

export default function CharacterPage() {
  const params = useParams();
  const character = characters.find(char => char.slug === params.slug);

  if (!character) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-950 relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-15" />
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold text-orange-400">Personaje no encontrado</h1>
            <Link href="/" className="text-sky-100 hover:text-orange-300 mt-4 inline-block">
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const card = {
    id: character.slug,
    title: character.name,
    price: character.rarity === 'Leggendaria' ? 299.99 :
           character.rarity === 'Mitica' ? 249.99 :
           character.rarity === 'Ultra Rara' ? 199.99 :
           character.rarity === 'Rara' ? 149.99 :
           99.99,
    frontImage: `/cards/${character.slug}/front.jpg`,
    backImage: `/cards/${character.slug}/back.jpg`,
    rarity: character.rarity,
    stock: character.rarity === 'Leggendaria' ? 3 :
           character.rarity === 'Mitica' ? 5 :
           character.rarity === 'Ultra Rara' ? 8 :
           character.rarity === 'Rara' ? 12 :
           20,
    rating: 4.5 + (Math.random() * 0.5),
    reviews: 50 + Math.floor(Math.random() * 100),
    slug: character.slug,
    onAddToCart: () => {}
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-950 relative overflow-hidden pt-16">
        <div className="absolute inset-0 rays-bg opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 py-20">
          <Link 
            href="/"
            className="inline-block mb-8 text-orange-300 hover:text-orange-400 transition-colors"
          >
            ← Volver al inicio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-black text-orange-400 mb-4"
                >
                  {character.name}
                </motion.h1>
                <div className="flex gap-4 mb-6">
                  <span className="px-3 py-1 bg-slate-800/50 rounded-full text-orange-300 text-sm">
                    {character.type}
                  </span>
                  <span className="px-3 py-1 bg-slate-800/50 rounded-full text-orange-300 text-sm">
                    {character.rarity}
                  </span>
                </div>
                <p className="text-xl text-sky-100 mb-8">
                  {character.description}
                </p>
              </div>

              <div className="prose prose-invert prose-orange max-w-none">
                <h2 className="text-2xl font-bold text-orange-300 mb-4">Historia</h2>
                <div className="text-sky-100 whitespace-pre-wrap">
                  {character.longDescription}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-orange-300 mb-4">Estadísticas</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(character.stats).map(([stat, value]) => (
                    <div 
                      key={stat}
                      className="bg-slate-800/40 rounded-lg p-4"
                    >
                      <div className="text-orange-300 capitalize mb-2">{stat}</div>
                      <div className="h-2 bg-slate-800/40 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-orange-400"
                        />
                      </div>
                      <div className="text-right text-sm text-sky-100 mt-1">{value}/100</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-orange-300 mb-4">Habilidades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {character.abilities.map((ability, index) => (
                    <motion.div
                      key={ability}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800/40 rounded-lg p-4 text-sky-100"
                    >
                      {ability}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24"
            >
              <Card {...card} />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 