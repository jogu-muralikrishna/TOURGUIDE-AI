import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface DestinySearchProps {
  onComplete: (from: string, to: string) => void;
}

export default function DestinySearch({ onComplete }: DestinySearchProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const handleInput = (val: string, setter: (s: string) => void) => {
    setter(val);
    
    // Create gold particles on typing
    const newParticles = Array.from({ length: 3 }).map(() => ({
      id: nextId.current++,
      x: Math.random() * 40 - 20,
      y: Math.random() * 20 - 10,
    }));
    setParticles(prev => [...prev, ...newParticles].slice(-50));
  };

  const handleSubmit = () => {
    if (from.trim() && to.trim()) {
      onComplete(from, to);
    }
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Step 1: Your Route</h2>
        <p className="text-white/40">Enter departure and destination points.</p>
      </motion.div>

      <div className="relative w-full max-w-2xl space-y-4">
        <div className="absolute inset-0 bg-gold/10 blur-[100px] -z-10" />
        
        <div className="group relative">
          <input
            type="text"
            value={from}
            onChange={(e) => handleInput(e.target.value, setFrom)}
            placeholder="From: Current City..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-6 text-xl font-light tracking-wide focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/20"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30 group-focus-within:text-gold transition-colors" />
        </div>

        <div className="group relative flex items-center">
          <input
            type="text"
            value={to}
            onChange={(e) => handleInput(e.target.value, setTo)}
            placeholder="To: Target Destination..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-6 text-xl font-light tracking-wide focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/20"
          />
          <Search className="absolute left-6 w-6 h-6 text-white/30 group-focus-within:text-gold transition-colors" />
          
          <button 
            onClick={handleSubmit}
            className={cn(
              "absolute right-4 px-8 py-3 rounded-xl font-bold transition-all",
              (from.trim() && to.trim()) ? "bg-gold text-midnight" : "bg-white/10 text-white/20 cursor-not-allowed"
            )}
            disabled={!from.trim() || !to.trim()}
          >
            Find Fleet
          </button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center pt-4">
          {['Hyderabad to Delhi', 'Mumbai to Bangalore', 'Chennai to Mumbai'].map(route => (
            <button 
              key={route}
              onClick={() => {
                const [f, t] = route.split(' to ');
                setFrom(f);
                setTo(t);
              }}
              className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-xs text-white/40 hover:text-gold hover:border-gold/30 transition-all"
            >
              {route}
            </button>
          ))}
        </div>
        
        {/* Particle Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0, 
                  x: p.x * 5, 
                  y: p.y * 5,
                  rotate: Math.random() * 360 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-gold rounded-full"
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
