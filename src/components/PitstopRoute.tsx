import { motion, AnimatePresence } from 'motion/react';
import { PITSTOPS } from '../constants';
import { Plus, Utensils } from 'lucide-react';
import React, { useState } from 'react';
import { Pitstop } from '../types';

interface PitstopCardProps {
  key?: string | number;
  pitstop: Pitstop;
  onAdd: (p: Pitstop, event: React.MouseEvent) => void;
  isSelected: boolean;
}

function PitstopCard({ pitstop, onAdd, isSelected }: PitstopCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="flex-shrink-0 w-80 glass rounded-3xl overflow-hidden group border border-white/5"
    >
      <div className="h-48 relative">
        <img 
          src={pitstop.image} 
          alt={pitstop.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <span className="text-gold text-xs font-bold uppercase tracking-widest bg-midnight/50 backdrop-blur-sm px-2 py-1 rounded">
            {pitstop.cuisine}
          </span>
        </div>
      </div>
      <div className="p-6 flex justify-between items-end">
        <div>
          <h3 className="text-lg font-bold mb-1">{pitstop.name}</h3>
          <div className="flex flex-col">
            <p className="text-white/40 text-xs uppercase tracking-tighter mb-1">{pitstop.priceRange}</p>
            <span className="text-gold font-bold">₹{pitstop.price}</span>
          </div>
        </div>
        <button 
          onClick={(e) => onAdd(pitstop, e)}
          className={`p-3 rounded-full transition-all duration-300 ${
            isSelected 
            ? 'bg-gold text-midnight' 
            : 'bg-white/5 text-white hover:bg-gold/20 hover:text-gold'
          }`}
        >
          <Plus className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
}

interface PitstopRouteProps {
  selectedPitstopIds: string[];
  onAdd: (p: Pitstop, x: number, y: number) => void;
}

export default function PitstopRoute({ selectedPitstopIds, onAdd }: PitstopRouteProps) {
  const [animations, setAnimations] = useState<{id: number, x: number, y: number}[]>([]);

  const handleAdd = (p: Pitstop, e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const animId = Date.now();
    
    setAnimations(prev => [...prev, { id: animId, x, y }]);
    onAdd(p, x, y);
    
    // Clean up animation elements
    setTimeout(() => {
      setAnimations(prev => prev.filter(a => a.id !== animId));
    }, 1000);
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="px-4 max-w-7xl mx-auto mb-12">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Step 3: The Pitstop Route</h2>
          <p className="text-white/40">Select your energy sanctuaries along the path.</p>
        </motion.div>
      </div>

      <div className="flex gap-8 px-4 md:px-24 overflow-x-auto pb-12 no-scrollbar scroll-smooth">
        {PITSTOPS.map(pitstop => (
          <PitstopCard 
            key={pitstop.id} 
            pitstop={pitstop} 
            onAdd={handleAdd}
            isSelected={selectedPitstopIds.includes(pitstop.id)}
          />
        ))}
      </div>

      {/* Flying + Icons Container */}
      <AnimatePresence>
        {animations.map(anim => (
          <motion.div
            key={anim.id}
            initial={{ opacity: 1, scale: 1, x: anim.x, y: anim.y }}
            animate={{ 
              opacity: 0, 
              scale: 0.5,
              x: window.innerWidth - 100, // Toward command center area or top
              y: 50 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[100] text-gold pointer-events-none"
          >
            <Plus className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
