'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Importiamo i dati dei personaggi
const characters = [
  {
    id: 1,
    name: "Bombardino coccodrillo",
    type: "Anfibio",
    power: 95,
    image: "/images/bombardino-crocodillo.webp",
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
    type: "Anfibio",
    power: 88,
    image: "/images/glorbo-fruttodrillo.webp",
    description: "Cugino di Bombardino. Esperto in tattiche di combattimento e frutti tropicali.",
    allies: ["Bombardino coccodrillo", "Bobritto bandito"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    bio: "Glorbo Fruttodrillo, cugino di secondo grado di Bombardino, è riconosciuto per la sua intelligenza tattica e il suo strano legame con i frutti tropicali. Può comunicare telepaticamente con le piante e trasformare i frutti in armi letali. Ha sviluppato queste abilità dopo essere caduto in un barile di sostanze chimiche in una piantagione di ananas. A differenza di suo cugino, preferisce la strategia alla forza bruta.",
    birthdate: "15 luglio",
    height: "1,9 metri",
    weight: "280 kg",
    abilities: ["Fruttocinesi", "Comunicazione con le piante", "Tattiche avanzate", "Lancio di proiettili fruttati"],
    catchphrase: "Ananas explosiva, banana ballistica!",
    appearances: ["La Ribellione della Frutta", "Guerre Croco-Avian", "Il Grande Banchetto"]
  },
  {
    id: 3,
    name: "Bombombini Gusini",
    type: "Anfibio",
    power: 90,
    image: "/images/bombombini-gusini.webp",
    description: "Rivale diretto di Bombardino con abilità esplosive superiori.",
    allies: ["Trippi Troppi", "Capuchino Assassino"],
    rivals: ["Bombardino coccodrillo", "Glorbo Fruttodrillo"],
    bio: "Bombombini Gusini è emerso come il principale rivale di Bombardino. Il suo controllo sulle esplosioni è considerato superiore, anche se gli manca il carisma del suo nemico. Nato in un laboratorio segreto sotto le Alpi italiane, è stato creato appositamente per contrastare il potere di Bombardino. Può creare esplosioni con diverse proprietà elementali, superando la capacità di Bombardino in varietà, anche se non in pura potenza.",
    birthdate: "Creato in laboratorio",
    height: "2,2 metri",
    weight: "375 kg",
    abilities: ["Esplosioni elementali", "Immunità ai danni esplosivi", "Ruggito sonico", "Visione termica"],
    catchphrase: "Explosionetta superiore, Bombardino inferiore!",
    appearances: ["La Sfida Esplosiva", "Duello sul Vesuvio", "Il Tradimento della Palude"]
  },
  {
    id: 4,
    name: "Brr brr Patapim",
    type: "Bagno",
    power: 82,
    image: "/images/brr-brr-patapim.webp",
    description: "Una creazione assurda ispirata a Skibidi Toilet, ma con estetica italiana.",
    allies: ["Bombardino coccodrillo", "Tralalelo Tralala"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    bio: "Brr brr Patapim è emerso come l'interpretazione italiana del fenomeno Skibidi Toilet. Abitante della dimensione dei bagni, può viaggiare attraverso qualsiasi tubatura o sistema fognario. Il suo corpo è parzialmente fatto di porcellana incantata che gli conferisce una resistenza sorprendente. Sebbene sembri comico, il suo dominio sull'acqua e sui fluidi lo rende un alleato formidabile.",
    birthdate: "Emerso durante la Grande Inondazione",
    height: "1,5 metri",
    weight: "120 kg",
    abilities: ["Teletrasporto acquatico", "Getti d'acqua pressurizzata", "Creazione di portali tra bagni", "Immunità alle tossine"],
    catchphrase: "Flusha flusha, acqua potente!",
    appearances: ["La Rivoluzione dei Bagni", "Il Grande Scarico", "Inondazione a Milano"]
  },
  {
    id: 5,
    name: "Trippi Troppi",
    type: "Tecnologia",
    power: 91,
    image: "/images/trippi-troppi.webp",
    description: "Il vigilante con la testa a forma di fotocamera. Vede tutto e non dimentica mai.",
    allies: ["Bombombini Gusini", "Zhuzhuli Buffo"],
    rivals: ["Brr brr Patapim", "Bobritto bandito"],
    bio: "Trippi Troppi, l'essere con la testa a forma di fotocamera, rappresenta la sorveglianza costante nell'era digitale. Può registrare, archiviare e proiettare qualsiasi momento del passato che ha osservato. La sua origine è sconosciuta, ma ci sono teorie che suggeriscono che fosse un tempo un fotografo umano fusosi con la sua attrezzatura durante uno strano incidente. Usa la sua abilità per ricattare gli altri e ottenere potere.",
    birthdate: "Sconosciuta",
    height: "1,85 metri",
    weight: "90 kg (maggioranza tecnologia)",
    abilities: ["Visione omnidirezionale", "Registrazione perfetta", "Proiezione dei ricordi", "Analisi visiva avanzata"],
    catchphrase: "Tutto registrato, niente dimenticato!",
    appearances: ["Il Grande Fratello", "Memorie Rubate", "La Cospirazione Visiva"]
  },
  {
    id: 6,
    name: "Bobritto bandito",
    type: "Ladro",
    power: 89,
    image: "/images/bobritto-bandito.webp",
    description: "Il ladro più abile dell'universo Italian Brainrot.",
    allies: ["Glorbo Fruttodrillo", "Lirilì Larilà"],
    rivals: ["Trippi Troppi", "Capuchino Assassino"],
    bio: "Bobritto bandito, conosciuto come 'Il Fantasma delle Alpi', è il ladro più sfuggente dell'universo Brainrot. La sua capacità di rubare concetti astratti lo rende unico: può letteralmente rubare colori, emozioni o addirittura il tempo. Discendente di un'antica stirpe di ladri mistici italiani, utilizza guanti speciali che gli permettono di manipolare l'essenza stessa degli oggetti. È ricercato dalle autorità di multiple dimensioni.",
    birthdate: "29 febbraio (anno bisestile)",
    height: "1,7 metri",
    weight: "65 kg",
    abilities: ["Furto concettuale", "Invisibilità parziale", "Manipolazione temporale limitata", "Evasione soprannaturale"],
    catchphrase: "Rubato con amore, scomparso con stile!",
    appearances: ["Il Grande Furto", "Il Furto del Tempo", "La Galleria Invisibile"]
  },
  {
    id: 7,
    name: "Tralalelo Tralala",
    type: "Sonoro",
    power: 86,
    image: "/images/tralalero-tralala.webp",
    description: "Maestro delle arti sonore, può manipolare le onde sonore.",
    allies: ["Brr brr Patapim", "Bombardino coccodrillo"],
    rivals: ["Capuchino Assassino", "Trippi Troppi"],
    bio: "Tralalelo Tralala è nato dall'eco di un'antica canzone italiana rimasta intrappolata in una grotta per secoli. Questo essere manifestato dal suono puro può manipolare le onde sonore a volontà, creando effetti devastanti o bellissime melodie. Il suo corpo è composto da onde sonore solidificate che vibrano costantemente. È considerato il guardiano della musica italiana e protegge gelosamente il suo patrimonio culturale.",
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
    type: "Indonesiano",
    power: 88,
    image: "/images/tung-tung-tung.webp",
    description: "Il misterioso personaggio indonesiano che annuncia il sahur durante il Ramadan. Il suo ritmo penetra nella mente.",
    allies: ["La vaca saturno saturnita", "Bobritto bandito"],
    rivals: ["Bombardino coccodrillo", "Bombombini Gusini"],
    bio: "Tung tung tung sahur è emerso dalle tradizioni del Ramadan in Indonesia, dove si sveglia la gente per il sahur (pasto prima dell'alba). Questo essere ritmico può penetrare nei sogni e nelle menti attraverso i suoi caratteristici colpi. A differenza dei personaggi italiani, il suo potere proviene dal ritmo costante e dalla tradizione, non dal caos. Può controllare il tempo soggettivo di chi ascolta il suo ritmo.",
    birthdate: "Primo giorno di Ramadan (secoli fa)",
    height: "1,75 metri",
    weight: "70 kg",
    abilities: ["Manipolazione mentale ritmica", "Induzione al sonno/veglia", "Alterazione temporale soggettiva", "Viaggio onirico"],
    catchphrase: "Tung tung tung... sahur... tung tung tung...",
    appearances: ["La Grande Guerra del Ritmo", "Tung vs Bombardino", "Il Ramadan Eterno"]
  },
  {
    id: 9,
    name: "La vaca saturno saturnita",
    type: "Galattico",
    power: 97,
    image: "/images/Vaca%20Saturno%20Saturnita.webp",
    description: "La mucca cosmica nata 13,8 miliardi di anni fa. Il suo peso di 5,685E26 kg la rende una delle entità più potenti.",
    allies: ["Tung tung tung sahur", "Trulimero Trulicina"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    bio: "La vaca saturno saturnita, probabilmente l'essere più antico dell'universo Brainrot, è nata insieme all'universo stesso. Con forma di mucca ma composta di materia stellare ed energia cosmica, questo essere ha il potere di spostare pianeti e creare buchi neri con il suo muggito. Gli anelli che circondano il suo corpo contengono intere galassie, e il suo latte è la fonte del potere cosmico. Raramente interviene nelle questioni terrestri, ma quando lo fa, le conseguenze sono astronomiche.",
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
    type: "Musicale",
    power: 85,
    image: "/images/Trulimero%20Trulicina.webp",
    description: "Il maestro delle melodie assurde. Le sue canzoni possono alterare la realtà stessa.",
    allies: ["La vaca saturno saturnita", "Brr brr Patapim"],
    rivals: ["Bombombini Gusini", "Tralalelo Tralala"],
    bio: "Trulimero Trulicina è emerso da uno spartito musicale sperimentale abbandonato che ha preso vita propria. A differenza di Tralalelo Tralala, che controlla il suono fisico, Trulimero manipola i concetti musicali astratti. Può trasformare la realtà in uno spartito musicale e riscriverla a volontà. Il suo corpo è composto da note musicali viventi che cambiano costantemente in base al suo stato d'animo.",
    birthdate: "Composto nel 1924",
    height: "Variabile (dipende dalla melodia)",
    weight: "L'equivalente di 88 tasti di pianoforte",
    abilities: ["Alterazione della realtà musicale", "Composizione vivente", "Incantamento melodico", "Trasformazione armonica"],
    catchphrase: "Truli truli, la vita è una melodia!",
    appearances: ["La Sinfonia Cosmica", "Duello di Compositori", "Il Concerto della Fine del Mondo"]
  },
  {
    id: 11,
    name: "Lirilì Larilà",
    type: "Aereo",
    power: 83,
    image: "/images/lirili-larila.webp",
    description: "L'uccello cantante dell'universo Brainrot. Le sue melodie possono ipnotizzare chiunque le ascolti.",
    allies: ["Bobritto bandito", "Tralalelo Tralala"],
    rivals: ["Bombardino coccodrillo", "Trippi Troppi"],
    bio: "Lirilì Larilà, il leggendario uccello delle Alpi italiane, possiede un canto che può alterare la mente di chi lo ascolta. A differenza di altri personaggi sonori, il suo potere si concentra sull'ipnosi e la manipolazione mentale. Le sue piume brillanti cambiano colore in base all'emozione che vuole indurre nei suoi ascoltatori. È uno dei pochi esseri che possono resistere alla registrazione di Trippi Troppi, poiché il suo canto distorce qualsiasi tentativo di registrazione elettronica.",
    birthdate: "Nacque durante un'eclissi lunare",
    height: "40 cm (1,7 metri con le ali spiegate)",
    weight: "0,5 kg",
    abilities: ["Ipnosi vocale", "Volo supersonico", "Manipolazione emozionale", "Distorsione elettronica"],
    catchphrase: "Liri liri là, ascolta e sogna già!",
    appearances: ["La Guerra dei Cantanti", "Guerre Croco-Avian", "Il Volo Eterno"]
  }
];

export default function PersonajePage() {
  const params = useParams();
  const [character, setCharacter] = useState<typeof characters[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [exploding, setExploding] = useState(false);

  useEffect(() => {
    if (params.id) {
      // Cercare il personaggio per ID
      const foundCharacter = characters.find(c => c.id === parseInt(params.id as string));
      
      if (foundCharacter) {
        setCharacter(foundCharacter);
      }
      
      setLoading(false);
    }
  }, [params.id]);

  // Effetto esplosione per personaggi come Bombardino
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
        <h1 className="text-3xl font-bold text-red-500 mb-4">Personaggio non trovato!</h1>
        <p className="text-gray-400 mb-8">Il personaggio che stai cercando non esiste nell&apos;universo Brainrot... per ora.</p>
        <Link href="/" className="cyber-button bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 rounded-md font-bold hover:from-cyan-500 hover:to-blue-600 transition">
          Torna alla home
        </Link>
      </div>
    );
  }

  // Determinare il colore dell'esplosione in base al tipo
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
      {/* Overlay con effetto di scansione */}
      <div className="absolute inset-0 bg-scan-lines pointer-events-none z-10"></div>
      
      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <Link href="/" className="text-cyan-400 hover:text-white inline-flex items-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Torna a tutti i personaggi
        </Link>
      </div>
      
      {/* Hero section con nome del personaggio */}
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
      
      {/* Informazioni principali sul personaggio */}
      <div className="container mx-auto px-4 -mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonna 1 - Immagine e statistiche */}
          <div className="lg:col-span-1">
            {/* Immagine con effetto cliccabile */}
            <div 
              className="bg-gradient-to-b from-gray-900 to-black p-2 border border-gray-800 rounded-lg mb-6 relative overflow-hidden cursor-pointer"
              onClick={handleExplode}
            >
              {/* Effetto esplosione */}
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
                    console.error(`Errore caricamento immagine: ${character.image}`);
                    e.currentTarget.src = "/images/bombardino-crocodillo.webp";
                  }}
                />
              </div>
              <div className="text-xs text-center text-gray-500 mt-2 italic">
                Clicca sull&apos;immagine per attivare il potere
              </div>
            </div>
            
            {/* Statistiche */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-cyan-300">Statistiche</h2>
              
              {/* Potere */}
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-1">Potenza</h3>
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
              
              {/* Data di nascita */}
              <div className="mb-3">
                <h3 className="text-gray-400 text-sm mb-1">Data di nascita</h3>
                <p className="text-white">{character.birthdate}</p>
              </div>
              
              {/* Altezza */}
              <div className="mb-3">
                <h3 className="text-gray-400 text-sm mb-1">Altezza</h3>
                <p className="text-white">{character.height}</p>
              </div>
              
              {/* Peso */}
              <div className="mb-3">
                <h3 className="text-gray-400 text-sm mb-1">Peso</h3>
                <p className="text-white">{character.weight}</p>
              </div>
              
              {/* Alleati e Rivali */}
              <div className="mb-3">
                <h3 className="text-gray-400 text-sm mb-1">Alleati</h3>
                <p className="text-green-400">{character.allies.join(", ")}</p>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Rivali</h3>
                <p className="text-red-400">{character.rivals.join(", ")}</p>
              </div>
            </div>
          </div>
          
          {/* Colonna 2-3 - Biografia e dettagli */}
          <div className="lg:col-span-2 space-y-6">
            {/* Biografia */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Biografia</h2>
              <p className="text-gray-300">{character.bio}</p>
            </div>
            
            {/* Abilità */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Abilità</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.abilities.map((ability, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▲</span>
                    <span className="text-white">{ability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Relazioni */}
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Relazioni</h2>
              
              <h3 className="text-xl font-bold mb-2 text-green-400">Alleati</h3>
              <ul className="mb-6 space-y-4">
                {character.allies.map((ally, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="bg-green-900/30 p-1 rounded-full mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <span className="text-white font-bold">{ally}</span>
                      <p className="text-gray-400 text-sm">
                        Alleato fedele in numerose avventure
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-2 text-red-400">Rivali</h3>
              <ul className="space-y-4">
                {character.rivals.map((rival, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="bg-red-900/30 p-1 rounded-full mt-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <span className="text-white font-bold">{rival}</span>
                      <p className="text-gray-400 text-sm">
                        Un conflitto che dura da tempo
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Citazione e Apparizioni */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Citazione caratteristica */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">Frase tipica</h2>
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-300">
                  &quot;{character.catchphrase}&quot;
                </blockquote>
              </div>
              
              {/* Apparizioni notevoli */}
              <div className="bg-gradient-to-b from-gray-900 to-black p-6 border border-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">Apparizioni notevoli</h2>
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