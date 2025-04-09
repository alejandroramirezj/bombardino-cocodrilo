'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Importamos los datos de los personajes
const characters = [
  {
    id: 1,
    name: "Bombardino coccodrillo",
    slug: "bombardino-coccodrillo",
    type: "Anfibio",
    power: 95,
    image: "/images/Bombardino Crocodillo.webp",
    description: "Il leggendario coccodrillo italiano con poteri esplosivi. Il suo morso può attraversare il metallo.",
    allies: ["Glorbo Fruttodrillo", "Brr brr Patapim"],
    rivals: ["Bombombini Gusini", "Trippi Troppi"],
    bio: "Bombardino coccodrillo è il personaggio centrale del fenomeno Italian Brainrot. Nato nelle profondità della palude italiana, ha sviluppato poteri esplosivi dopo aver ingoiato accidentalmente un razzo di fuochi d'artificio durante un festival. Il suo caratteristico grido di battaglia 'Bappa di Boopi' è riconosciuto e temuto in tutto l'universo del Brainrot. Può generare esplosioni semplicemente schioccando gli artigli ed è il leader non ufficiale della fazione anfibia.",
    birthdate: "Sconosciuta",
    height: "2,1 metri",
    weight: "350 kg",
    abilities: ["Esplosioni di energia", "Morso perforante", "Nuoto supersonico", "Immunità alle esplosioni"],
    catchphrase: "Bappa di Boopi, explosione per tutti!",
    appearances: ["Guerra delle Paludi", "La Grande Esplosione", "Guerre Croco-Avian", "Bombardino vs Tralalero"]
  },
  {
    id: 2,
    name: "Glorbo Fruttodrillo",
    slug: "glorbo-fruttodrillo",
    type: "Anfibio",
    power: 88,
    image: "/images/Glorbo Fruttodrillo.webp",
    description: "Cugino di Bombardino. Esperto in tattiche di combattimento e frutti tropicali.",
    allies: ["Bombardino coccodrillo", "Bobritto bandito"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    bio: "Glorbo Fruttodrillo è il cugino tropicale di Bombardino. Cresciuto nelle giungle del Sud America, ha sviluppato una connessione mistica con i frutti esotici. Le sue tecniche di combattimento combinano arti marziali tradizionali con l'uso creativo di frutti tropicali come armi.",
    birthdate: "15 Maggio 1995",
    height: "1,9 metri",
    weight: "280 kg",
    abilities: ["Frutti esplosivi", "Danza della giungla", "Camuffamento tropicale", "Controllo delle piante"],
    catchphrase: "La frutta è potere, il potere è frutta!",
    appearances: ["Festival dei Frutti", "Guerra delle Paludi", "La Rivolta Tropicale"]
  },
  {
    id: 3,
    name: "Bombombini Gusini",
    slug: "bombombini-gusini",
    type: "Anfibio",
    power: 90,
    image: "/images/Bombombini Gusini.webp",
    description: "Rivale diretto di Bombardino con abilità esplosive superiori.",
    allies: ["Trippi Troppi", "Capuchino Assassino"],
    rivals: ["Bombardino coccodrillo", "Glorbo Fruttodrillo"],
    bio: "Bombombini Gusini è l'arcinemico di Bombardino. Un tempo erano amici d'infanzia, ma un incidente durante un esperimento con fuochi d'artificio li ha separati. Ora compete con Bombardino per il titolo di re delle esplosioni.",
    birthdate: "31 Dicembre 1994",
    height: "2,0 metri",
    weight: "320 kg",
    abilities: ["Mega esplosioni", "Scudo anti-detonazione", "Bomba temporale", "Pioggia di scintille"],
    catchphrase: "Boom boom, hasta la doom!",
    appearances: ["La Grande Esplosione", "Duello Esplosivo", "Il Tradimento"]
  },
  {
    id: 4,
    name: "Brr brr Patapim",
    slug: "brr-brr-patapim",
    type: "Bagno",
    power: 82,
    image: "/images/Brr Brr Patapim.webp",
    description: "Una creazione assurda ispirata a Skibidi Toilet, ma con estetica italiana.",
    allies: ["Bombardino coccodrillo", "Tralalelo Tralala"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    bio: "Brr brr Patapim è una misteriosa entità nata dalla fusione tra un bagno italiano di lusso e un'antica maledizione. Il suo potere risiede nella capacità di manipolare l'acqua e creare illusioni sonore che confondono i nemici.",
    birthdate: "Data sconosciuta",
    height: "Variabile",
    weight: "???",
    abilities: ["Idrokinesi", "Canto ipnotico", "Trasformazione in sanitari", "Portale dimensionale"],
    catchphrase: "Flush your troubles away!",
    appearances: ["La Rivolta dei Bagni", "Concerto nel Bagno", "L'Inondazione"]
  },
  {
    id: 5,
    name: "Trippi Troppi",
    slug: "trippi-troppi",
    type: "Tecnologia",
    power: 91,
    image: "/images/Trippi Troppi.webp",
    description: "Il vigilante con la testa a forma di fotocamera. Vede tutto e non dimentica mai.",
    allies: ["Bombombini Gusini", "Zhuzhuli Buffo"],
    rivals: ["Brr brr Patapim", "Bobritto bandito"],
    bio: "Trippi Troppi è un cyborg fotografico creato da un esperimento governativo segreto. La sua missione è documentare ogni momento dell'universo Brainrot, ma spesso si trova coinvolto in conflitti per la sua tendenza a catturare momenti compromettenti.",
    birthdate: "Versione 1.0: 2020",
    height: "1,85 metri",
    weight: "150 kg",
    abilities: ["Visione a raggi X", "Memoria fotografica", "Flash accecante", "Proiezione olografica"],
    catchphrase: "Ogni momento è una foto, ogni foto è per sempre!",
    appearances: ["L'Occhio che Tutto Vede", "Pixel Perfetto", "La Grande Esposizione"]
  },
  {
    id: 6,
    name: "Bobritto bandito",
    slug: "bobritto-bandito",
    type: "Ladro",
    power: 89,
    image: "/images/Bobritto Bandito.webp",
    description: "Il ladro più abile dell'universo Italian Brainrot.",
    allies: ["Glorbo Fruttodrillo", "Lirilì Larilà"],
    rivals: ["Trippi Troppi", "Capuchino Assassino"],
    bio: "Bobritto bandito è un maestro del furto con un codice d'onore: ruba solo dai cattivi e condivide il bottino con i bisognosi. La sua abilità nel superare qualsiasi sistema di sicurezza è leggendaria, così come la sua passione per i cappelli stravaganti.",
    birthdate: "Data segreta",
    height: "1,7 metri",
    weight: "65 kg",
    abilities: ["Invisibilità temporanea", "Arrampicata suprema", "Furto di ombre", "Teletrasporto breve"],
    catchphrase: "Rubare con stile, vivere con onore!",
    appearances: ["Il Grande Furto", "L'Infiltrazione", "La Redenzione del Ladro"]
  },
  {
    id: 7,
    name: "Tralalelo Tralala",
    slug: "tralalelo-tralala",
    type: "Sonoro",
    power: 86,
    image: "/images/Tralalero Tralala.webp",
    description: "Maestro delle arti sonore, può manipolare le onde sonore.",
    allies: ["Brr brr Patapim", "Bombardino coccodrillo"],
    rivals: ["Capuchino Assassino", "Trippi Troppi"],
    bio: "Tralalelo Tralala è nato dall'eco di un'antica canzone italiana rimasta intrappolata in una grotta per secoli. Questo essere manifestato dal suono puro può manipolare le onde sonore a volontà, creando effetti devastanti o bellissime melodie.",
    birthdate: "Formato dall'eco eterno",
    height: "Variabile (normalmente 1,8 metri)",
    weight: "Inconsistente (composto da onde sonore)",
    abilities: ["Sonocinesi", "Illusioni acustiche", "Urla distruttive", "Musica ipnotica"],
    catchphrase: "La musica è potere, la melodia è vita!",
    appearances: ["La Sinfonia del Caos", "Bombardino vs Tralalero", "Il Concerto Finale"]
  },
  {
    id: 8,
    name: "Tung tung tung sahur",
    slug: "tung-tung-tung-sahur",
    type: "Indonesiano",
    power: 88,
    image: "/images/Tung Tung Tung.webp",
    description: "Il misterioso personaggio indonesiano che annuncia il sahur durante il Ramadan. Il suo ritmo penetra nella mente.",
    allies: ["La vaca saturno saturnita", "Bobritto bandito"],
    rivals: ["Bombardino coccodrillo", "Bombombini Gusini"],
    bio: "Tung tung tung sahur è un'entità ritmica che appare solo durante il Ramadan. Il suo tamburo magico ha il potere di svegliare chiunque per il sahur, ma può anche essere usato come potente arma sonica.",
    birthdate: "Primo giorno di Ramadan",
    height: "2,0 metri",
    weight: "Non misurabile",
    abilities: ["Risveglio cosmico", "Percussione ipnotica", "Viaggio temporale", "Manipolazione del sonno"],
    catchphrase: "Tung tung tung... È ora del sahur!",
    appearances: ["Il Risveglio del Ramadan", "La Notte del Destino", "Il Ritmo Eterno"]
  },
  {
    id: 9,
    name: "La vaca saturno saturnita",
    slug: "la-vaca-saturno-saturnita",
    type: "Galattico",
    power: 97,
    image: "/images/Vaca Saturno Saturnita.webp",
    description: "La mucca cosmica nata 13,8 miliardi di anni fa. Il suo peso di 5,685E26 kg la rende una delle entità più potenti.",
    allies: ["Tung tung tung sahur", "Trulimero Trulicina"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    bio: "La vaca saturno saturnita, probabilmente l'essere più antico dell'universo Brainrot, è nata insieme all'universo stesso. Con forma di mucca ma composta di materia stellare ed energia cosmica, questo essere ha il potere di spostare pianeti e creare buchi neri con il suo muggito.",
    birthdate: "13.800.000.000 a.C.",
    height: "Incalcolabile (cambia dimensione)",
    weight: "5,685E26 kg",
    abilities: ["Manipolazione cosmica", "Creazione di buchi neri", "Viaggio intergalattico", "Manipolazione della realtà"],
    catchphrase: "Muuuuuuniverse...",
    appearances: ["L'Origine del Cosmo", "La Battaglia Celeste", "Il Muggito che Creò il Mondo"]
  },
  {
    id: 10,
    name: "Trulimero Trulicina",
    slug: "trulimero-trulicina",
    type: "Musicale",
    power: 85,
    image: "/images/Trulimero Trulicina.webp",
    description: "Il maestro delle melodie assurde. Le sue canzoni possono alterare la realtà stessa.",
    allies: ["La vaca saturno saturnita", "Brr brr Patapim"],
    rivals: ["Bombombini Gusini", "Tralalelo Tralala"],
    bio: "Trulimero Trulicina è un'entità musicale che esiste in una dimensione di pure melodie. Le sue canzoni non seguono le regole della musica convenzionale e possono piegare la realtà stessa.",
    birthdate: "La prima nota musicale",
    height: "Dipende dalla nota suonata",
    weight: "440Hz",
    abilities: ["Alterazione della realtà", "Melodie del caos", "Danza dimensionale", "Armonia cosmica"],
    catchphrase: "Truli truli, la realtà si annulla!",
    appearances: ["Il Concerto del Caos", "La Melodia Primordiale", "Sinfonia dell'Assurdo"]
  },
  {
    id: 11,
    name: "Lirilì Larilà",
    slug: "lirili-larila",
    type: "Aereo",
    power: 83,
    image: "/images/Lirilì Larilà.webp",
    description: "L'uccello cantante dell'universo Brainrot. Le sue melodie possono ipnotizzare chiunque le ascolti.",
    allies: ["Bobritto bandito", "Tralalelo Tralala"],
    rivals: ["Bombardino coccodrillo", "Trippi Troppi"],
    bio: "Lirilì Larilà è un uccello mistico che vola tra le dimensioni cantando melodie che possono alterare lo stato d'animo di chi le ascolta. Il suo canto può guarire o causare il caos totale.",
    birthdate: "Un giorno di primavera",
    height: "30 cm (forma normale)",
    weight: "Come una piuma",
    abilities: ["Canto ipnotico", "Volo interdimensionale", "Guarigione melodica", "Tempesta di piume"],
    catchphrase: "Lirilì Larilà, il mondo cambierà!",
    appearances: ["Il Volo dell'Aurora", "La Canzone del Destino", "Melodie del Vento"]
  }
];

export default function CharacterPage() {
  const params = useParams();
  const [character, setCharacter] = useState<typeof characters[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [exploding, setExploding] = useState(false);

  useEffect(() => {
    if (params.slug) {
      const foundCharacter = characters.find(c => c.slug === params.slug);
      if (foundCharacter) {
        setCharacter(foundCharacter);
      }
      setLoading(false);
    }
  }, [params.slug]);

  // Efecto de explosión para personajes como Bombardino
  const handleExplode = () => {
    setExploding(true);
    setTimeout(() => setExploding(false), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="cyber-text text-xl text-cyan-400 animate-pulse">Caricamento dati...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">¡Personaje no encontrado!</h1>
        <p className="text-gray-400 mb-8">El personaje que buscas no existe en el universo Brainrot... por ahora.</p>
        <Link href="/" className="cyber-button bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 rounded-md font-bold hover:from-cyan-500 hover:to-blue-600 transition">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Determinar el color de la explosión según el tipo
  const getExplosionColor = () => {
    const typeColors: Record<string, string> = {
      "Anfibio": "from-green-500 to-blue-500",
      "Bagno": "from-blue-400 to-cyan-300",
      "Tecnologia": "from-purple-500 to-blue-400",
      "Ladro": "from-yellow-400 to-red-500",
      "Sonoro": "from-indigo-400 to-purple-600",
      "Indonesiano": "from-red-600 to-yellow-400",
      "Galattico": "from-purple-600 to-pink-400",
      "Musicale": "from-blue-500 to-purple-400",
      "Aereo": "from-cyan-400 to-blue-600"
    };
    
    return typeColors[character.type] || "from-yellow-500 to-orange-500";
  };

  return (
    <div className="bg-black text-white min-h-screen pb-20 relative">
      {/* Overlay con efecto de escaneo */}
      <div className="absolute inset-0 bg-scan-lines pointer-events-none z-10"></div>
      
      {/* Navegación de migas de pan */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <Link href="/" className="text-cyan-400 hover:text-white inline-flex items-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a todos los personajes
        </Link>
      </div>
      
      {/* Sección hero con nombre del personaje */}
      <div className="relative py-20 bg-gradient-to-b from-black via-purple-900/20 to-black overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-20">
          <h1 className="text-7xl font-black mb-6 glitch-text">
            <span data-text={character.name}>{character.name}</span>
          </h1>
          <div className="cyber-chip inline-block px-4 py-2 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-lg rounded-md border border-cyan-700 text-cyan-400 mb-6">
            {character.type}
          </div>
        </div>
      </div>
      
      {/* Información principal del personaje */}
      <div className="container mx-auto px-4 -mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna 1 - Imagen y estadísticas */}
          <div>
            {/* Imagen con efecto al hacer clic */}
            <div 
              className="bg-gradient-to-b from-gray-900 to-black p-2 border border-gray-800 rounded-lg mb-6 relative overflow-hidden cursor-pointer"
              onClick={handleExplode}
            >
              {/* Efecto de explosión */}
              {exploding && (
                <div className={`absolute inset-0 z-10 bg-gradient-radial ${getExplosionColor()} animate-explosion`}></div>
              )}
              
              <div className="relative aspect-square w-full">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-contain rounded-lg"
                  onError={(e) => {
                    console.error(`Error al cargar la imagen: ${character.image}`);
                    e.currentTarget.src = "/images/Bombardino Crocodillo.webp";
                  }}
                />
              </div>
              <div className="text-xs text-center text-gray-500 mt-2 italic">
                Haz clic en la imagen para activar el poder
              </div>
            </div>

            {/* Estadísticas básicas */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Estadísticas básicas</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 mb-1">Poder</div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      style={{ width: `${character.power}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-cyan-400">{character.power}/100</div>
                </div>
              </div>
            </div>

            {/* Relaciones */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Relaciones</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-green-400 mb-2">Aliados</h3>
                  <div className="flex flex-wrap gap-2">
                    {character.allies.map((ally, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-900/30 border border-green-700/30 rounded-full text-green-300 text-sm"
                      >
                        {ally}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-red-400 mb-2">Rivales</h3>
                  <div className="flex flex-wrap gap-2">
                    {character.rivals.map((rival, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-red-900/30 border border-red-700/30 rounded-full text-red-300 text-sm"
                      >
                        {rival}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2 - Biografía y detalles */}
          <div className="space-y-6">
            {/* Descripción */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Biografía</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{character.bio}</p>
            </div>

            {/* Habilidades */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Habilidades</h2>
              <div className="grid grid-cols-2 gap-4">
                {character.abilities.map((ability, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-gray-700"
                  >
                    <span className="text-cyan-400">■</span> {ability}
                  </div>
                ))}
              </div>
            </div>

            {/* Detalles adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frase característica */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">Frase característica</h2>
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-300">
                  &quot;{character.catchphrase}&quot;
                </blockquote>
              </div>
              
              {/* Apariciones notables */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">Apariciones notables</h2>
                <ul className="space-y-2">
                  {character.appearances.map((appearance, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-cyan-400">■</span>
                      <span className="text-white">{appearance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 