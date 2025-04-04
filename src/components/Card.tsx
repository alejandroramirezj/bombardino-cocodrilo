import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  frontImage: string;
  backImage: string;
  price: number;
  onAddToCart: () => void;
  rarity?: string;
  stock?: number;
  rating?: number;
  reviews?: number;
}

export default function Card({ 
  title, 
  frontImage, 
  backImage, 
  price,
  onAddToCart,
  rarity
}: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
  };

  return (
    <div 
      className="relative w-[360px] h-[520px] cursor-pointer group perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Marco holográfico exterior */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#00f7ff] via-[#ff00e5] to-[#00f7ff] rounded-2xl animate-holographic opacity-30" />
      
      <motion.div
        className="w-full h-full [transform-style:preserve-3d] relative bg-black rounded-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Cara frontal */}
        <div className="absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-2xl">
          <div className="relative w-full h-full">
            {/* Imagen frontal */}
            <Image
              src={frontImage}
              alt={title}
              fill
              className="object-contain"
              priority
            />
            
            {/* Botón de compra */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-600 font-black py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              €{price} - Aggiungi
            </motion.button>

            {/* Badge de rareza */}
            {rarity && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-yellow-400 font-bold py-1 px-3 rounded-lg">
                {rarity}
              </div>
            )}

            {/* Efecto de brillo en las esquinas */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/20 to-transparent" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Cara trasera */}
        <div 
          className="absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="relative w-full h-full">
            <Image
              src={backImage}
              alt={`${title} details`}
              fill
              className="object-contain"
              priority
            />

            {/* Efecto de brillo en las esquinas */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/20 to-transparent" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/20 to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 