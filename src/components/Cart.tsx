import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onRemoveItem, onUpdateQuantity, onCheckout }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {/* Cart Button */}
      <motion.button
        className="fixed top-6 right-6 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <span className="text-red-900 text-xl">🛒</span>
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </motion.button>

      {/* Cart Modal */}
      <AnimatePresence>
        {isOpen && (
          <div>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  <div>
                    <div className="flex-1 overflow-auto">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-contain rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                            <p className="text-gray-600">${item.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                -
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onCheckout}
                        className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
                      >
                        Checkout
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 