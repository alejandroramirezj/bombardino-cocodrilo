import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  frontImage: string;
  backImage: string;
  price: number;
  onAddToCart: () => void;
}

export default function Card({ 
  title, 
  frontImage, 
  backImage, 
  price,
  onAddToCart 
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
      <motion.div
        className="w-full h-full [transform-style:preserve-3d] relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Cara frontal */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
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
              ${price} - Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Cara trasera */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={backImage}
              alt={`${title} details`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Efecto de brillo holográfico */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-[12px] border-[#00f7ff] opacity-30 bg-gradient-to-r from-[#00f7ff] via-[#ff00e5] to-[#00f7ff] [mix-blend-mode:overlay] animate-holographic" />
        </div>
      </motion.div>
    </div>
  );
} 