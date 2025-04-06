'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Datos de personajes
const characters = [
  {
    id: 1,
    name: "Bombardino coccodrillo",
    type: "Anfibio",
    power: 95,
    image: "/images/bombardino-crocodillo.webp",
    description: "El legendario cocodrilo italiano con poderes explosivos. Su mordida puede atravesar el metal.",
    allies: ["Glorbo Fruttodrillo", "Brr brr Patapim"],
    rivals: ["Bombombini Gusini", "Trippi Troppi"],
  },
  {
    id: 2,
    name: "Glorbo Fruttodrillo",
    type: "Anfibio",
    power: 88,
    image: "/images/glorbo-fruttodrillo.webp",
    description: "Primo de Bombardino. Experto en tácticas de combate y frutas tropicales.",
    allies: ["Bombardino coccodrillo", "Bobritto bandito"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
  },
  {
    id: 3,
    name: "Bombombini Gusini",
    type: "Anfibio",
    power: 90,
    image: "/images/bombombini-gusini.webp",
    description: "Rival directo de Bombardino con habilidades explosivas superiores.",
    allies: ["Trippi Troppi", "Capuchino Assassino"],
    rivals: ["Bombardino coccodrillo", "Glorbo Fruttodrillo"],
  },
  {
    id: 4,
    name: "Brr brr Patapim",
    type: "Baño",
    power: 82,
    image: "/images/brr-brr-patapim.webp",
    description: "Una creación absurda inspirada en Skibidi Toilet, pero con estética italiana.",
    allies: ["Bombardino coccodrillo", "Tralalelo Tralala"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
  },
  {
    id: 5,
    name: "Trippi Troppi",
    type: "Tecnología",
    power: 91,
    image: "/images/trippi-troppi.webp",
    description: "El vigilante con cabeza de cámara. Ve todo y nunca olvida.",
    allies: ["Bombombini Gusini", "Zhuzhuli Buffo"],
    rivals: ["Brr brr Patapim", "Bobritto bandito"],
  },
  {
    id: 6,
    name: "Bobritto bandito",
    type: "Ladrón",
    power: 89,
    image: "/images/bobritto-bandito.webp",
    description: "El ladrón más hábil del universo del Italian Brainrot.",
    allies: ["Glorbo Fruttodrillo", "Lirilì Larilà"],
    rivals: ["Trippi Troppi", "Capuchino Assassino"],
  },
  {
    id: 7,
    name: "Tralalelo Tralala",
    type: "Sonoro",
    power: 86,
    image: "/images/tralalero-tralala.webp",
    description: "Maestro de las artes sonoras, puede manipular las ondas de sonido.",
    allies: ["Brr brr Patapim", "Bombardino coccodrillo"],
    rivals: ["Capuchino Assassino", "Trippi Troppi"],
  },
  {
    id: 8,
    name: "Tung tung tung sahur",
    type: "Indonesio",
    power: 88,
    image: "/images/tung-tung-tung.webp",
    description: "El misterioso personaje indonesio que anuncia el sahur durante el Ramadán. Su ritmo penetra en la mente.",
    allies: ["La vaca saturno saturnita", "Bobritto bandito"],
    rivals: ["Bombardino coccodrillo", "Bombombini Gusini"],
  },
  {
    id: 9,
    name: "La vaca saturno saturnita",
    type: "Galáctico",
    power: 97,
    image: "/images/Vaca%20Saturno%20Saturnita.webp",
    description: "La vaca cósmica nacida hace 13.800 millones de años. Su peso de 5.685E26 kg la hace una de las entidades más poderosas.",
    allies: ["Tung tung tung sahur", "Trulimero Trulicina"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
  },
  {
    id: 10,
    name: "Trulimero Trulicina",
    type: "Musical",
    power: 85,
    image: "/images/Trulimero%20Trulicina.webp",
    description: "El maestro de las melodías absurdas. Sus canciones pueden alterar la realidad misma.",
    allies: ["La vaca saturno saturnita", "Brr brr Patapim"],
    rivals: ["Bombombini Gusini", "Tralalelo Tralala"],
  },
  {
    id: 11,
    name: "Lirilì Larilà",
    type: "Aéreo",
    power: 83,
    image: "/images/lirili-larila.webp",
    description: "El ave cantora del universo Brainrot. Sus melodías pueden hipnotizar a cualquiera que las escuche.",
    allies: ["Bobritto bandito", "Tralalelo Tralala"],
    rivals: ["Bombardino coccodrillo", "Trippi Troppi"],
  }
];

// Agrupar personajes por tipo
const charactersByType: Record<string, typeof characters> = characters.reduce((acc, character) => {
  if (!acc[character.type]) {
    acc[character.type] = [];
  }
  acc[character.type].push(character);
  return acc;
}, {} as Record<string, typeof characters>);

// Actualizar el mapeo de explosionColors para incluir todos los tipos
const explosionColors: Record<string, string> = {
  "Anfibio": "from-green-500 to-blue-500",
  "Baño": "from-blue-400 to-cyan-300",
  "Tecnología": "from-purple-500 to-blue-400",
  "Ladrón": "from-yellow-400 to-red-500",
  "Sonoro": "from-indigo-400 to-purple-600",
  "Indonesio": "from-red-600 to-yellow-400",
  "Galáctico": "from-purple-600 to-pink-400",
  "Musical": "from-blue-500 to-purple-400",
  "Aéreo": "from-cyan-400 to-blue-600"
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [votes, setVotes] = useState<Record<number, number>>({});
  // Estado para las explosiones en las tarjetas
  const [exploding, setExploding] = useState<Record<number, boolean>>({});
  // Estado para controlar si las imágenes están cargadas
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  // Inicializar los votos
  useEffect(() => {
    const initialVotes: Record<number, number> = {};
    characters.forEach(char => {
      initialVotes[char.id] = Math.floor(Math.random() * 50) + 10;
    });
    setVotes(initialVotes);
    
    // Inicializar exploding state
    const initialExploding: Record<number, boolean> = {};
    characters.forEach(char => {
      initialExploding[char.id] = false;
    });
    setExploding(initialExploding);
    
    // Inicializar imagesLoaded state
    const initialImagesLoaded: Record<number, boolean> = {};
    characters.forEach(char => {
      initialImagesLoaded[char.id] = false;
    });
    setImagesLoaded(initialImagesLoaded);
  }, []);

  // Manejador para votar por un personaje
  const handleVote = (characterId: number) => {
    // Activar efecto de explosión
    setExploding(prev => ({
      ...prev,
      [characterId]: true
    }));
    
    // Incrementar votos
    setVotes(prev => ({
      ...prev,
      [characterId]: (prev[characterId] || 0) + 1
    }));
    
    // Desactivar efecto de explosión después de la animación
    setTimeout(() => {
      setExploding(prev => ({
        ...prev,
        [characterId]: false
      }));
    }, 1000);
  };

  // Manejador para cargar imágenes
  const handleImageLoad = (characterId: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [characterId]: true
    }));
  };

  // Ordenar personajes por poder (ranking)
  const sortedCharacters = [...characters].sort((a, b) => b.power - a.power);
  
  // Filtrar personajes según la pestaña activa
  const filteredCharacters = activeTab === "all" 
    ? sortedCharacters 
    : sortedCharacters.filter(char => char.type === activeTab);

  return (
    <main className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Overlay con efecto de escaneo */}
      <div className="absolute inset-0 bg-scan-lines pointer-events-none z-10"></div>
      
      {/* Hero section */}
      <div className="relative bg-gradient-to-b from-black via-purple-900/20 to-black pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-4 glitch-text">
                <span data-text="UNIVERSO BOMBARDINO">UNIVERSO BOMBARDINO</span>
              </h1>
              <p className="text-xl md:text-2xl text-cyan-400 font-mono mb-6">
                L&apos;universo del meme italiano più potente
              </p>
              <p className="max-w-3xl mx-auto text-gray-300">
                Esplora l&apos;universo di Bombardino Coccodrillo e tutti i personaggi del fenomeno &quot;Italian Brainrot&quot;.
                Vota i tuoi preferiti e scopri le intricate relazioni tra queste icone della cultura di internet.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Image 
                src="/images/bombardino-crocodillo.webp" 
                alt="Bombardino coccodrillo" 
                width={400} 
                height={400} 
                className="rounded-lg border-2 border-cyan-500 shadow-lg shadow-cyan-500/50"
                onError={(e) => {
                  console.error("Error cargando imagen hero:", e);
                  e.currentTarget.src = "/images/bombardino-crocodillo.webp";
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="#characters" className="cyber-button bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-md font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
                Ver Personajes
              </Link>
              <Link href="#power-ranking" className="cyber-button-alt border-2 border-cyan-500 text-cyan-400 px-8 py-3 rounded-md font-bold hover:bg-cyan-900/30 transition duration-300">
                Power Ranking
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee banner */}
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 py-3 relative overflow-hidden">
        <div className="cyber-scroll flex whitespace-nowrap gap-8">
          {Array.from({ length: 10 }).map((_, idx) => (
            <span key={idx} className="text-lg font-mono text-cyan-300 inline-block mx-4">
              BOMBARDINO COCCODRILLO 🐊 GLORBO FRUTTODRILLO 🍍 BOMBOMBINI GUSINI 💣 BRR BRR PATAPIM 🚽 TRIPPI TROPPI 📷 BOBRITTO BANDITO 🦝 TRALALELO TRALALA 🎵 TUNG TUNG TUNG SAHUR 🥁 LA VACA SATURNO SATURNITA 🐄 TRULIMERO TRULICINA 🎹 LIRILÌ LARILÀ 🐦
            </span>
          ))}
        </div>
      </div>

      {/* Pestañas de filtro */}
      <section id="characters" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-black mb-6 cyber-heading inline-block">
            ESPLORA PERSONAGGI
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Scopri tutti i personaggi dell&apos;universo di Bombardino Coccodrillo. Filtra per tipo o esplora tutti i personaggi epici.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-md font-bold transition ${
              activeTab === "all"
                ? "bg-cyan-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Todos
          </button>
          {Object.keys(charactersByType).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-6 py-2 rounded-md font-bold transition ${
                activeTab === type
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid de personajes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCharacters.map((character) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="cyber-card bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden relative"
            >
              {/* Efecto de explosión */}
              {exploding[character.id] && (
                <div className={`absolute inset-0 z-10 bg-gradient-radial ${explosionColors[character.type] || "from-yellow-500 to-orange-500"} animate-explosion`}></div>
              )}
              
              <div className="cyber-card-inner p-4">
                <div className="relative h-60 mb-4 overflow-hidden rounded-md border border-gray-700">
                  {!imagesLoaded[character.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <div className="animate-pulse-fast text-cyan-400">Cargando...</div>
                    </div>
                  )}
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className={`h-full w-full object-contain transition-all duration-300 ${!imagesLoaded[character.id] ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => handleImageLoad(character.id)}
                    onError={(e) => {
                      console.error(`Error cargando imagen: ${character.image}`, e);
                      e.currentTarget.src = "/images/bombardino-crocodillo.webp";
                      handleImageLoad(character.id);
                    }}
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-cyan-300">
                  {character.name}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="cyber-chip px-3 py-1 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-sm rounded-md border border-cyan-700 text-cyan-400">
                    {character.type}
                  </span>
                  <div className="cyber-data text-sm text-yellow-400">
                    Poder: {character.power}/100
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">
                  {character.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-xs uppercase text-gray-500 mb-1">Relaciones</h4>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-green-400 text-xs">Aliados:</span>
                      <span className="text-gray-300 text-xs">{character.allies.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-400 text-xs">Rivales:</span>
                      <span className="text-gray-300 text-xs">{character.rivals.join(", ")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-gray-400">
                    <span className="text-cyan-400 font-bold">{votes[character.id] || 0}</span> votos
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(character.id)}
                      className="cyber-button bg-gradient-to-r from-cyan-600 to-blue-700 px-3 py-2 rounded-md text-sm font-bold hover:from-cyan-500 hover:to-blue-600 transition"
                    >
                      Votar
                    </button>
                    <Link
                      href={`/personajes/${character.id}`}
                      className="cyber-button-alt border border-cyan-600 px-3 py-2 rounded-md text-sm font-bold text-cyan-400 hover:bg-cyan-900/30 transition"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Power Ranking */}
      <section id="power-ranking" className="bg-gradient-to-b from-black via-purple-900/20 to-black py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-black mb-6 cyber-heading inline-block">
              CLASSIFICA DI POTENZA
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              La classifica definitiva dei personaggi più potenti dell&apos;universo di Bombardino.
            </p>
          </motion.div>

          <div className="overflow-hidden border border-gray-800 rounded-lg bg-gradient-to-b from-gray-900 to-black">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-left">
                    <th className="py-3 px-4 font-mono text-cyan-300">#</th>
                    <th className="py-3 px-4 font-mono text-cyan-300">Personaje</th>
                    <th className="py-3 px-4 font-mono text-cyan-300">Tipo</th>
                    <th className="py-3 px-4 font-mono text-cyan-300">Poder</th>
                    <th className="py-3 px-4 font-mono text-cyan-300">Votos</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCharacters.map((character, index) => (
                    <tr key={character.id} className="border-t border-gray-800 hover:bg-gray-900/50 transition">
                      <td className="py-3 px-4 font-bold text-gray-300">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-700">
                            <Image
                              src={character.image}
                              alt={character.name}
                              fill
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "/images/bombardino-crocodillo.webp";
                              }}
                            />
                          </div>
                          <span className="font-bold text-white">{character.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="cyber-chip px-2 py-1 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 text-xs rounded-md border border-cyan-800 text-cyan-400">
                          {character.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-800 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                character.power > 90
                                  ? "bg-gradient-to-r from-red-500 to-yellow-500"
                                  : character.power > 85
                                  ? "bg-gradient-to-r from-yellow-500 to-green-500"
                                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
                              }`}
                              style={{ width: `${character.power}%` }}
                            ></div>
                          </div>
                          <span className="cyber-data text-sm text-yellow-400 w-10">
                            {character.power}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 cyber-data text-cyan-400 font-bold">
                        {votes[character.id] || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Acerca del fenómeno */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-black mb-6 cyber-heading inline-block">
            BRAINROT ITALIANO
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            L&apos;affascinante fenomeno di internet che ha conquistato i social media
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-cyan-300">
              El origen del meme
            </h3>
            <p className="text-gray-300 mb-4">
              El fenómeno &quot;Italian Brainrot&quot; comenzó como una parodia de la cultura de memes 
              absurdos e incoherentes que dominan las redes sociales. Bombardino Crocodillo, 
              un cocodrilo antropomórfico con acento italiano, se convirtió rápidamente en el 
              personaje central de esta tendencia.
            </p>
            <p className="text-gray-300 mb-4">
              Lo que comenzó como imágenes editadas evolucionó a un universo expandido de 
              personajes interconectados, cada uno con sus propias historias, rivalidades y alianzas.
            </p>
            <p className="text-gray-300">
              La estética del &quot;brainrot&quot; se caracteriza por su naturaleza deliberadamente 
              absurda, con colores vibrantes, efectos glitch y una narrativa caótica que 
              refleja cómo el contenido de internet puede &quot;pudrir el cerebro&quot;.
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-cyan-300">
              Impacto cultural
            </h3>
            <p className="text-gray-300 mb-4">
              El Italian Brainrot ha trascendido las fronteras de internet para convertirse en 
              un fenómeno cultural. Los personajes como Bombardino Crocodillo y sus aliados 
              han aparecido en memes, videos virales e incluso merchandising.
            </p>
            <p className="text-gray-300 mb-4">
              La popularidad de este universo refleja una tendencia hacia el &quot;humor post-irónico&quot;, 
              donde el absurdo se celebra y la coherencia narrativa es secundaria frente 
              a la experiencia caótica pero entretenida.
            </p>
            <p className="text-gray-300">
              El fenómeno también ilustra cómo la inteligencia artificial está influyendo 
              en la cultura de internet, con muchas de las imágenes y variaciones creadas 
              usando herramientas de IA como DALL-E, Midjourney y Stable Diffusion.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-b from-cyan-900/20 to-purple-900/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-black mb-4 glitch-text-alt">
              <span data-text="UNISCITI AL BRAINROT">UNISCITI AL BRAINROT</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Ricevi gli ultimi aggiornamenti su Bombardino Coccodrillo e l&apos;universo dell&apos;Italian Brainrot
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="La tua email"
                className="bg-gray-900 border border-cyan-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
              <button className="cyber-button bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 rounded-md font-bold hover:from-cyan-500 hover:to-blue-600 transition">
                Iscriviti
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
