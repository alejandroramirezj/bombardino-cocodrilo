'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Importamos los datos de personajes
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
    bio: "Bombardino coccodrillo es el personaje central del fenómeno Italian Brainrot. Nacido en las profundidades del pantano italiano, desarrolló poderes explosivos después de tragar accidentalmente un cohete de fuegos artificiales durante un festival. Su característico grito de batalla 'Bappa di Boopi' es reconocido y temido en todo el universo del Brainrot. Puede generar explosiones con solo chasquear sus garras y es el líder no oficial de la facción anfibia.",
    birthdate: "Desconocida",
    height: "2.1 metros",
    weight: "350 kg",
    abilities: ["Explosiones de energía", "Mordida perforadora", "Nado supersónico", "Inmunidad a explosiones"],
    catchphrase: "¡Bappa di Boopi, explosione per tutti!",
    appearances: ["Guerra de los Pantanos", "La Gran Explosión", "Croco-Avian Wars", "Bombardino vs Tralalero"]
  },
  {
    id: 2,
    name: "Glorbo Fruttodrillo",
    type: "Anfibio",
    power: 88,
    image: "/images/bobritto-bandito.webp",
    description: "Primo de Bombardino. Experto en tácticas de combate y frutas tropicales.",
    allies: ["Bombardino coccodrillo", "Bobritto bandito"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    bio: "Glorbo Fruttodrillo, primo segundo de Bombardino, es reconocido por su inteligencia táctica y su extraña conexión con las frutas tropicales. Puede comunicarse telepáticamente con plantas y transformar frutas en armas letales. Desarrolló estas habilidades después de caer en un barril de químicos en una plantación de piñas. A diferencia de su primo, prefiere la estrategia sobre la fuerza bruta.",
    birthdate: "15 de julio",
    height: "1.9 metros",
    weight: "280 kg",
    abilities: ["Frutoquinesis", "Comunicación con plantas", "Tácticas avanzadas", "Lanzamiento de proyectiles frutales"],
    catchphrase: "¡Ananas explosiva, banana ballistica!",
    appearances: ["La Rebelión de las Frutas", "Croco-Avian Wars", "El Gran Banquete"]
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
    bio: "Bombombini Gusini surgió como el principal rival de Bombardino. Su control sobre las explosiones es considerado superior, aunque le falta la carisma de su nemesis. Nacido en un laboratorio secreto bajo los Alpes italianos, fue creado específicamente para contrarrestar el poder de Bombardino. Puede crear explosiones con diferentes propiedades elementales, superando la capacidad de Bombardino en variedad, aunque no en potencia pura.",
    birthdate: "Creado en laboratorio",
    height: "2.2 metros",
    weight: "375 kg",
    abilities: ["Explosiones elementales", "Inmunidad a daños explosivos", "Rugido sónico", "Visión térmica"],
    catchphrase: "¡Explosionetta superiore, Bombardino inferiore!",
    appearances: ["El Desafío Explosivo", "Duelo en el Vesuvio", "La Traición del Pantano"]
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
    bio: "Brr brr Patapim emergió como la interpretación italiana del fenómeno Skibidi Toilet. Habitante de la dimensión de los baños, puede viajar a través de cualquier tubería o sistema de alcantarillado. Su cuerpo está parcialmente hecho de porcelana encantada que le otorga una resistencia sorprendente. Aunque parece cómico, su dominio sobre el agua y los fluidos lo convierte en un aliado formidable.",
    birthdate: "Emergió durante la Gran Inundación",
    height: "1.5 metros",
    weight: "120 kg",
    abilities: ["Teleportación acuática", "Chorros de agua a presión", "Creación de portales entre baños", "Inmunidad a toxinas"],
    catchphrase: "¡Flusha flusha, acqua potente!",
    appearances: ["La Revolución de los Baños", "El Gran Desagüe", "Inundación en Milán"]
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
    bio: "Trippi Troppi, el ser con cabeza de cámara, representa la vigilancia constante en la era digital. Puede grabar, almacenar y proyectar cualquier momento del pasado que haya presenciado. Su origen es desconocido, pero hay teorías que sugieren que fue alguna vez un fotógrafo humano que se fusionó con su equipo durante un extraño accidente. Usa su habilidad para chantajear a otros y obtener poder.",
    birthdate: "Desconocida",
    height: "1.85 metros",
    weight: "90 kg (mayoría tecnología)",
    abilities: ["Visión omnidireccional", "Grabación perfecta", "Proyección de recuerdos", "Análisis visual avanzado"],
    catchphrase: "¡Tutto registrato, niente dimenticato!",
    appearances: ["El Gran Hermano", "Memorias Robadas", "La Conspiración Visual"]
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
    bio: "Bobritto bandito, conocido como 'El Fantasma de los Alpes', es el ladrón más escurridizo del universo Brainrot. Su habilidad para robar conceptos abstractos lo hace único: puede literalmente robar colores, emociones o incluso el tiempo. Descendiente de una antigua línea de ladrones místicos italianos, utiliza guantes especiales que le permiten manipular la esencia misma de los objetos. Es buscado por las autoridades de múltiples dimensiones.",
    birthdate: "29 de febrero (año bisiesto)",
    height: "1.7 metros",
    weight: "65 kg",
    abilities: ["Robo conceptual", "Invisibilidad parcial", "Manipulación temporal limitada", "Evasión sobrenatural"],
    catchphrase: "¡Rubato con amore, scomparso con stile!",
    appearances: ["El Gran Atraco", "El Robo del Tiempo", "La Galería Invisible"]
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
    bio: "Tralalelo Tralala nació del eco de una antigua canción italiana que quedó atrapada en una cueva durante siglos. Este ser manifestado por sonido puro puede manipular ondas sonoras a voluntad, creando efectos devastadores o hermosas melodías. Su cuerpo está compuesto de ondas sonoras solidificadas que vibran constantemente. Es considerado el guardián de la música italiana y protege celosamente su patrimonio cultural.",
    birthdate: "Formado a partir del eco eterno",
    height: "Variable (normalmente 1.8 metros)",
    weight: "Inconsistente (compuesto de ondas sonoras)",
    abilities: ["Sonoquinesis", "Ilusiones acústicas", "Gritos destructivos", "Música hipnótica"],
    catchphrase: "¡La musica è potere, la melodia è vita!",
    appearances: ["La Sinfonía del Caos", "Bombardino vs Tralalero", "El Concierto Final"]
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
    bio: "Tung tung tung sahur emergió de las tradiciones del Ramadán en Indonesia, donde se despierta a la gente para el sahur (comida antes del amanecer). Este ser rítmico puede penetrar en los sueños y las mentes mediante sus característicos golpes. A diferencia de los personajes italianos, su poder proviene del ritmo constante y la tradición, no del caos. Puede controlar el tiempo subjetivo de quienes escuchan su ritmo.",
    birthdate: "Primer día de Ramadán (hace siglos)",
    height: "1.75 metros",
    weight: "70 kg",
    abilities: ["Manipulación mental rítmica", "Inducción al sueño/vigilia", "Alteración temporal subjetiva", "Viaje onírico"],
    catchphrase: "Tung tung tung... sahur... tung tung tung...",
    appearances: ["La Gran Guerra del Ritmo", "Tung vs Bombardino", "El Ramadán Eterno"]
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
    bio: "La vaca saturno saturnita, posiblemente el ser más antiguo del universo Brainrot, nació junto con el universo mismo. Con forma de vaca pero compuesta de materia estelar y energía cósmica, este ser tiene el poder de mover planetas y crear agujeros negros con su mugido. Los anillos que rodean su cuerpo contienen galaxias enteras, y su leche es la fuente del poder cósmico. Raramente interviene en asuntos terrenales, pero cuando lo hace, las consecuencias son astronómicas.",
    birthdate: "13.800.000.000 a.C.",
    height: "Incalculable (cambia de tamaño)",
    weight: "5.685E26 kg",
    abilities: ["Manipulación cósmica", "Creación de agujeros negros", "Viaje intergaláctico", "Manipulación de la realidad"],
    catchphrase: "Muuuuuuniverse...",
    appearances: ["El Origen del Cosmos", "La Batalla Celestial", "El Mugido que Creó el Mundo"]
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
    bio: "Trulimero Trulicina surgió de una partitura musical experimental abandonada que cobró vida propia. A diferencia de Tralalelo Tralala, que controla el sonido físico, Trulimero manipula los conceptos musicales abstractos. Puede transformar la realidad en una partitura musical y reescribirla a voluntad. Su cuerpo está compuesto de notas musicales vivientes que cambian constantemente de acuerdo a su estado de ánimo.",
    birthdate: "Compuesto en 1924",
    height: "Variable (dependiendo de la melodía)",
    weight: "El equivalente a 88 teclas de piano",
    abilities: ["Alteración de la realidad musical", "Composición viva", "Encantamiento melódico", "Transformación armónica"],
    catchphrase: "¡Truli truli, la vita è una melodia!",
    appearances: ["La Sinfonía Cósmica", "Duelo de Compositores", "El Concierto del Fin del Mundo"]
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
    bio: "Lirilì Larilà, el legendario pájaro de los Alpes italianos, posee un canto que puede alterar la mente de quien lo escucha. A diferencia de otros personajes sonoros, su poder se centra en la hipnosis y manipulación mental. Sus plumas brillantes cambian de color según la emoción que quiera inducir en sus oyentes. Es uno de los pocos seres que pueden resistir la grabación de Trippi Troppi, ya que su canto distorsiona cualquier intento de registro electrónico.",
    birthdate: "Eclosionó durante un eclipse lunar",
    height: "40 cm (1.7 metros con alas extendidas)",
    weight: "0.5 kg",
    abilities: ["Hipnosis vocal", "Vuelo supersónico", "Manipulación emocional", "Distorsión electrónica"],
    catchphrase: "¡Liri liri là, ascolta e sogna già!",
    appearances: ["La Guerra de los Cantores", "Croco-Avian Wars", "El Vuelo Eterno"]
  }
];

export default function PersonajePage() {
  const params = useParams();
  const [character, setCharacter] = useState<typeof characters[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [exploding, setExploding] = useState(false);

  useEffect(() => {
    if (params.id) {
      // Buscar el personaje por ID
      const foundCharacter = characters.find(c => c.id === parseInt(params.id as string));
      
      if (foundCharacter) {
        setCharacter(foundCharacter);
      }
      
      setLoading(false);
    }
  }, [params.id]);

  // Efecto de explosión para personajes como Bombardino
  const handleExplode = () => {
    setExploding(true);
    setTimeout(() => setExploding(false), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="cyber-text text-xl text-cyan-400 animate-pulse">Cargando datos...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">¡Personaje no encontrado!</h1>
        <p className="text-gray-400 mb-8">El personaje que buscas no existe en el universo Brainrot... todavía.</p>
        <Link href="/" className="cyber-button bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 rounded-md font-bold hover:from-cyan-500 hover:to-blue-600 transition">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Determinar el color de explosión según el tipo
  const getExplosionColor = () => {
    const typeColors: Record<string, string> = {
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
    
    return typeColors[character.type] || "from-yellow-500 to-orange-500";
  };

  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Overlay con efecto de escaneo */}
      <div className="absolute inset-0 bg-scan-lines pointer-events-none z-10"></div>
      
      {/* Efecto de explosión */}
      {exploding && (
        <div className={`absolute inset-0 z-20 bg-gradient-radial ${getExplosionColor()} animate-explosion`}></div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="self-start mb-8 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a todos los personajes
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-2 text-center glitch-text relative"
          >
            <span data-text={character.name}>{character.name}</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="cyber-chip px-4 py-1 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-sm rounded-md border border-cyan-700 text-cyan-400">
              {character.type}
            </span>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Imagen y estadísticas */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <div 
                className="relative h-80 w-full mb-4 overflow-hidden rounded-lg border-2 border-cyan-600 shadow-lg shadow-cyan-500/30 cursor-pointer"
                onClick={handleExplode}
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    console.error(`Error cargando imagen: ${character.image}`, e);
                    e.currentTarget.src = "/images/bombardino-crocodillo.webp";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 flex items-end">
                  <p className="text-xs text-gray-400 p-2">Haz clic en la imagen para activar poder</p>
                </div>
              </div>
              
              <div className="cyber-card bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4 text-cyan-300 border-b border-gray-800 pb-2">
                    Estadísticas
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Poder</h3>
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
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Fecha de nacimiento</h3>
                      <p className="text-white">{character.birthdate}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Altura</h3>
                      <p className="text-white">{character.height}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Peso</h3>
                      <p className="text-white">{character.weight}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Frase característica</h3>
                      <p className="text-cyan-300 italic">&quot;{character.catchphrase}&quot;</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Columna derecha - Biografía y detalles */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Biografía */}
              <div className="cyber-card bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden p-6">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300 border-b border-gray-800 pb-2">
                  Biografía
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {character.bio}
                </p>
                <p className="text-gray-400">
                  {character.description}
                </p>
              </div>
              
              {/* Habilidades */}
              <div className="cyber-card bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden p-6">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300 border-b border-gray-800 pb-2">
                  Habilidades
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {character.abilities.map((ability: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-cyan-500 mr-2">▲</span>
                      <span className="text-gray-300">{ability}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Relaciones */}
              <div className="cyber-card bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden p-6">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300 border-b border-gray-800 pb-2">
                  Relaciones
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">Aliados</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {character.allies.map((ally: string, index: number) => (
                        <li key={index} className="flex items-center bg-green-900/20 rounded-md p-2 border border-green-800/30">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-gray-300">{ally}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-red-400 mb-2">Rivales</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {character.rivals.map((rival: string, index: number) => (
                        <li key={index} className="flex items-center bg-red-900/20 rounded-md p-2 border border-red-800/30">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          <span className="text-gray-300">{rival}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Apariciones */}
              <div className="cyber-card bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden p-6">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300 border-b border-gray-800 pb-2">
                  Apariciones destacadas
                </h2>
                <ul className="space-y-2">
                  {character.appearances.map((appearance: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="cyber-chip px-2 py-1 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 text-xs rounded-md border border-cyan-800 text-cyan-400 mr-3">
                        #{index + 1}
                      </span>
                      <span className="text-gray-300">{appearance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 