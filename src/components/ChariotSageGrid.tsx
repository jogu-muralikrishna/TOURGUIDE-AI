import { motion } from 'motion/react';
import { VEHICLES } from '../constants';
import { Star, Clock, User } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Vehicle } from '../types';

interface CardProps {
  key?: string | number;
  vehicle: Vehicle;
  onSelect: (v: Vehicle) => void;
  isSelected: boolean;
}

function ChariotCard({ vehicle, onSelect, isSelected }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[520px] perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => onSelect(vehicle)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="h-56 relative overflow-hidden">
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
            <div className="absolute top-4 right-4 bg-gold px-3 py-1 rounded-full text-xs font-bold text-midnight shadow-lg">
              ₹{vehicle.price.toLocaleString()}
            </div>
            
            {vehicle.specs && (
              <div className="absolute bottom-4 left-4 text-[10px] uppercase font-bold tracking-widest text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                {vehicle.specs}
              </div>
            )}
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gold transition-colors">{vehicle.name}</h3>
            <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {vehicle.reachTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {vehicle.category}
              </span>
            </div>

            {/* History snippet for Cars/Buses */}
            {vehicle.history && (
              <div className="mt-auto space-y-1">
                <p className="text-[10px] uppercase text-white/30 font-bold tracking-tighter">Recent History:</p>
                {vehicle.history.slice(0, 2).map((h, i) => (
                  <p key={i} className="text-[11px] text-white/50 leading-tight">• {h}</p>
                ))}
              </div>
            )}
            
            {isSelected && (
               <div className="absolute top-4 left-4 bg-green-500 w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            )}
          </div>
        </div>

        {/* Back Side (Driver Details) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass rounded-3xl p-6 flex flex-col items-center shadow-2xl">
          <div className="w-24 h-24 rounded-full border-2 border-gold p-1 mb-4 overflow-hidden bg-white/5">
            <img 
              src={vehicle.driverImage || vehicle.sage.avatar} 
              alt={vehicle.driverName || vehicle.sage.name} 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          
          <h4 className="text-gold font-bold text-lg mb-1">{vehicle.driverName || vehicle.sage.name}</h4>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Certified Pilot</p>
          
          <div className="w-full space-y-3 mb-6">
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span className="text-white/40 text-xs">Rating</span>
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-3 h-3 fill-gold" />
                <span className="font-bold text-sm">{vehicle.driverRating || vehicle.sage.rating}</span>
              </div>
            </div>
            
            {vehicle.driverContact && (
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span className="text-white/40 text-xs">Contact</span>
                <span className="text-white/80 font-mono text-xs">{vehicle.driverContact}</span>
              </div>
            )}

            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span className="text-white/40 text-xs">Experience</span>
              <span className="text-white/80 text-xs">Elite Division</span>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(vehicle);
            }}
            className={cn(
              "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all",
              isSelected 
                ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                : "bg-gold text-midnight hover:scale-105"
            )}
          >
            {isSelected ? "Chariot Locked" : "Confirm Selection"}
          </button>

          <div className="mt-auto pt-4 border-t border-white/5 w-full text-center">
            <p className="text-[9px] text-white/20 uppercase tracking-tighter italic">
              AI Monitored for Safety & Integrity
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ChariotSageGridProps {
  selectedVehicleId?: string;
  onSelect: (v: Vehicle) => void;
}

export default function ChariotSageGrid({ selectedVehicleId, onSelect }: ChariotSageGridProps) {
  const [activeTab, setActiveTab] = useState<'Car' | 'Train' | 'Bus'>('Car');

  const filteredVehicles = VEHICLES.filter(v => v.category === activeTab);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Step 2: The Chariot & Sage</h2>
        <p className="text-white/40">Select your travel mode, then choose your specific vessel.</p>
        
        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-4 mt-12 bg-white/5 p-2 rounded-2xl w-fit mx-auto border border-white/10">
          {(['Car', 'Train', 'Bus'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all duration-300 tracking-widest uppercase text-xs",
                activeTab === tab ? "bg-gold text-midnight shadow-lg" : "text-white/40 hover:text-white"
              )}
            >
              {tab}s
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle) => (
          <ChariotCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            onSelect={onSelect}
            isSelected={selectedVehicleId === vehicle.id}
          />
        ))}
        {filteredVehicles.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/20 italic">
            Expanding the fleet... check back soon.
          </div>
        )}
      </div>
    </section>
  );
}
