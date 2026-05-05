import { motion } from 'motion/react';
import React from 'react';
import { HOTELS } from '../constants';
import { MapPin, ShieldCheck, Star, Phone } from 'lucide-react';
import { Hotel } from '../types';

interface HotelCardProps {
  key?: string | number;
  hotel: Hotel;
  onSelect: (h: Hotel) => void;
  isSelected: boolean;
}

function HotelCard({ hotel, onSelect, isSelected }: HotelCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative glass rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
        isSelected ? 'border-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'border-white/5'
      }`}
    >
      <div className="h-64 relative overflow-hidden group">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent" />
        
        {/* Live Availability Dot */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-midnight/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${hotel.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} 
          />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
            {hotel.isAvailable ? 'Live Availability' : 'Limited Spots'}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-gold">
          <Star className="w-3 h-3 fill-gold" />
          <span className="text-xs font-bold">{hotel.rating}</span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white leading-tight">{hotel.name}</h3>
            <p className="text-white/40 flex items-center gap-1.5 text-sm">
              <MapPin className="w-3.5 h-3.5 text-gold" /> {hotel.location}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gold tracking-tight">₹{hotel.price.toLocaleString()}</div>
            <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">per light-cycle</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] text-white/30 uppercase font-bold mb-1 tracking-widest">Sanctuary Code</p>
            <p className="text-white/80 font-mono text-sm uppercase">SNC-{hotel.id.toUpperCase()}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] text-white/30 uppercase font-bold mb-1 tracking-widest">Contact Desk</p>
            <div className="flex items-center gap-2 text-white/80">
              <Phone className="w-3 h-3 text-gold" />
              <span className="text-xs font-medium">{hotel.contact}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => onSelect(hotel)}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 ${
            isSelected 
              ? "bg-green-500 text-white shadow-[0_0_40px_rgba(34,197,94,0.4)]" 
              : "bg-gold text-midnight hover:scale-[1.02] active:scale-95"
          }`}
        >
          {isSelected ? (
            <><ShieldCheck className="w-5 h-5" /> Sanctuary Confirmed</>
          ) : (
            "Enter This Haven"
          )}
        </button>

        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500/50" /> ARCHITECT VERIFIED
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface SanctuaryGalleryProps {
  selectedHotelId?: string;
  onSelect: (h: Hotel) => void;
}

export default function SanctuaryGallery({ selectedHotelId, onSelect }: SanctuaryGalleryProps) {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Step 4: Sanctuary Selection</h2>
        <p className="text-white/40 max-w-xl mx-auto">Temporal havens for deep restoration. Confirm your choice to secure your cycle of repose.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {HOTELS.map(hotel => (
          <HotelCard 
            key={hotel.id} 
            hotel={hotel} 
            onSelect={onSelect}
            isSelected={selectedHotelId === hotel.id}
          />
        ))}
      </div>
    </section>
  );
}
