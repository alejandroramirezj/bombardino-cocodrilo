import { useState } from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  frontImage: string;
  backImage: string;
  rarity: string;
  slug?: string;
  onAddToCart?: () => void;
}

export default function Card({ title, frontImage, backImage, rarity, slug, onAddToCart }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-full h-[400px] perspective"
      onClick={handleClick}
    >
      <div className={`card-inner w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Frente de la carta */}
        <div className="card-front absolute w-full h-full backface-hidden">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
            <div className="absolute top-2 right-2 z-10">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                {rarity}
              </span>
            </div>
            
            <div className="relative w-full h-full">
              <Image
                src={frontImage}
                alt={title}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3">
              <h3 className="text-xl font-bold text-gray-900 truncate">{title}</h3>
            </div>
          </div>
        </div>
        
        {/* Reverso de la carta */}
        <div className="card-back absolute w-full h-full backface-hidden rotate-y-180">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
            <Image
              src={backImage}
              alt={`${title} - reverso`}
              fill
              className="object-contain"
              priority
            />
            
            {onAddToCart && (
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart();
                  }}
                  className="p-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 