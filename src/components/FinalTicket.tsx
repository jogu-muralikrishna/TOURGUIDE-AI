import { motion } from 'motion/react';
import React from 'react';
import { 
  QrCode, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  ShieldCheck, 
  Car, 
  Hotel, 
  UtensilsCrossed, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Vehicle, Pitstop, Hotel as HotelType, UserData } from '../types';

interface FinalTicketProps {
  from: string;
  to: string;
  vehicle: Vehicle | null;
  hotel: HotelType | null;
  pitstops: Pitstop[];
  userData: UserData | null;
  totalCost: number;
}

export default function FinalTicket({ from, to, vehicle, hotel, pitstops, userData, totalCost }: FinalTicketProps) {
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gold/10 blur-[150px] -z-10" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold/10 blur-[150px] -z-10" />

        <div className="glass rounded-[3rem] overflow-hidden border border-gold/20 shadow-[0_0_80px_rgba(212,175,55,0.15)] relative">
          {/* Ticket Cutout Decorations */}
          <div className="absolute top-1/2 -left-4 w-8 h-8 bg-midnight rounded-full border border-gold/20 hidden md:block" />
          <div className="absolute top-1/2 -right-4 w-8 h-8 bg-midnight rounded-full border border-gold/20 hidden md:block" />
          
          {/* Header */}
          <div className="bg-gold p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-midnight font-black text-4xl md:text-5xl tracking-tighter uppercase italic leading-none mb-2">
                Booking Confirmed
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-4 text-midnight/60 font-bold uppercase text-[10px] tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4" /> Transit ID: TGAI-{Math.floor(Math.random() * 100000)}
              </div>
            </div>
            
            <div className="bg-midnight rounded-3xl p-4 flex items-center gap-6 shadow-2xl">
              <div className="p-2 bg-white/5 rounded-xl">
                <QrCode className="w-16 h-16 text-gold" />
              </div>
              <div className="pr-4">
                <p className="text-gold font-black text-2xl tracking-tighter">₹{totalCost.toLocaleString()}</p>
                <p className="text-white/30 text-[9px] uppercase font-bold tracking-widest">Total Energy Units</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Route */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
              <div className="text-center md:text-left flex-1">
                <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Point Alpha</p>
                <h3 className="text-3xl font-black text-white tracking-tight">{from}</h3>
              </div>
              
              <div className="flex flex-col items-center gap-2 flex-grow">
                <motion.div 
                   animate={{ x: [-5, 5, -5] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="text-gold"
                >
                  <ArrowRight className="w-12 h-12" />
                </motion.div>
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              </div>

              <div className="text-center md:text-right flex-1">
                <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Point Omega</p>
                <h3 className="text-3xl font-black text-white tracking-tight">{to}</h3>
              </div>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vechile & Pilot */}
              <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                    <Car className="w-6 h-6 text-gold" />
                  </div>
                  <h4 className="text-white/40 uppercase font-black tracking-widest text-xs">Transportation Fleet</h4>
                </div>
                <div className="flex gap-6">
                  <img src={vehicle?.image} className="w-32 h-32 rounded-2xl object-cover" />
                  <div className="flex flex-col justify-center">
                    <p className="text-xl font-bold text-white mb-1">{vehicle?.name}</p>
                    <p className="text-gold text-sm font-medium mb-4">{vehicle?.category} Class</p>
                    <div className="flex items-center gap-3">
                      <img src={vehicle?.driverImage || vehicle?.sage.avatar} className="w-10 h-10 rounded-full border border-gold/30" />
                      <div>
                        <p className="text-[10px] text-white/30 uppercase font-bold">Pilot</p>
                        <p className="text-xs font-bold">{vehicle?.driverName || vehicle?.sage.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sanctuary */}
              <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                    <Hotel className="w-6 h-6 text-gold" />
                  </div>
                  <h4 className="text-white/40 uppercase font-black tracking-widest text-xs">Scheduled Repose</h4>
                </div>
                {hotel ? (
                  <div className="flex gap-6">
                    <img src={hotel.image} className="w-32 h-32 rounded-2xl object-cover" />
                    <div className="flex flex-col justify-center">
                      <p className="text-xl font-bold text-white mb-1">{hotel.name}</p>
                      <p className="text-white/40 text-sm mb-4">{hotel.location}</p>
                      <div className="flex items-center gap-2 text-gold">
                        <Star className="w-3 h-3 fill-gold" />
                        <span className="text-xs font-bold">{hotel.rating} Rating</span>
                      </div>
                      <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">{hotel.contact}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-white/20 italic">
                    Self-Managed Sanctuary
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-4 h-4 text-gold" />
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Registrant</p>
                </div>
                <p className="text-lg font-bold text-white">{userData?.name}</p>
                <p className="text-xs text-white/40 mt-2">{userData?.email}</p>
                <div className="flex items-center gap-2 mt-4 text-white/60">
                  <Phone className="w-3 h-3 text-gold" />
                  <p className="text-sm font-mono">{userData?.contact}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 border border-white/5 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed className="w-4 h-4 text-gold" />
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Vitality Point Strategy</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pitstops.map(p => (
                    <span key={p.id} className="bg-gold/10 border border-gold/20 text-gold px-3 py-1.5 rounded-xl text-xs font-bold">
                      {p.name} • {p.cuisine}
                    </span>
                  ))}
                  {pitstops.length === 0 && <p className="text-white/20 italic text-sm">No specific stops declared.</p>}
                </div>
                {userData?.specialRequests && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em] mb-1">Protocols</p>
                    <p className="text-xs text-white/60 italic leading-relaxed">{userData.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer / Call to Action */}
            <div className="pt-8 text-center space-y-6">
              <div className="flex items-center justify-center gap-2 text-gold">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">Ready for Manifestation</h3>
              </div>
              <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Your journey exists in our core clusters now.</p>
              
              <button 
                onClick={() => window.print()}
                className="bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 text-white/60 px-8 py-4 rounded-2xl text-[10px] items-center gap-2 uppercase tracking-[0.3em] font-bold transition-all inline-flex"
              >
                Output Physical Manifestation (Print)
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
