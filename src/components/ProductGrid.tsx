import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from './Card';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

interface Product {
  id: string;
  title: string;
  price: number;
  frontImage: string;
  backImage: string;
  rarity: string;
  stock: number;
  rating: number;
  reviews: number;
}

interface ProductGridProps {
  products: Product[];
  selectedRarity: string;
  priceRange: [number, number];
  sortBy: string;
  onRarityChange: (rarity: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
  products,
  selectedRarity,
  priceRange,
  sortBy,
  onRarityChange,
  onPriceRangeChange,
  onSortChange,
  onAddToCart
}: ProductGridProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredProducts = products
    .filter(product => 
      (selectedRarity === 'all' || product.rarity === selectedRarity) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      {/* Barra de filtros */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2 text-yellow-300 hover:text-yellow-400"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            Filtri e Ordinamento
          </button>

          {/* Indicadores de filtros activos */}
          {selectedRarity !== 'all' && (
            <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
              {selectedRarity}
            </span>
          )}
          <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
            €{priceRange[0]} - €{priceRange[1]}
          </span>
        </div>

        {/* Panel de filtros */}
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Filtro de rareza */}
            <div className="space-y-2">
              <h3 className="text-yellow-300 font-bold">Rarità</h3>
              <select
                value={selectedRarity}
                onChange={(e) => onRarityChange(e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg p-2 text-yellow-100"
              >
                <option value="all">Tutte le carte</option>
                <option value="Común">Comune</option>
                <option value="Especial">Speciale</option>
                <option value="Limitada">Limitata</option>
              </select>
            </div>

            {/* Filtro de precio */}
            <div className="space-y-2">
              <h3 className="text-yellow-300 font-bold">Prezzo</h3>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-yellow-100 text-sm">
                <span>€{priceRange[0]}</span>
                <span>€{priceRange[1]}</span>
              </div>
            </div>

            {/* Ordenamiento */}
            <div className="space-y-2">
              <h3 className="text-yellow-300 font-bold">Ordina per</h3>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg p-2 text-yellow-100"
              >
                <option value="featured">In evidenza</option>
                <option value="price-asc">Prezzo: Dal più basso</option>
                <option value="price-desc">Prezzo: Dal più alto</option>
                <option value="rating">Valutazione</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative group"
          >
            <Card {...product} onAddToCart={() => onAddToCart(product)} />
            
            {/* Detalles adicionales */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-center text-yellow-300 mb-2">
                <span className="font-bold">{product.rarity}</span>
                <span>Stock: {product.stock}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-yellow-100 text-sm">
                  ({product.reviews} recensioni)
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-yellow-300 text-xl">
            Nessuna carta trovata con i filtri selezionati
          </p>
        </div>
      )}
    </div>
  );
} 