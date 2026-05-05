import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle2, ChevronDown, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { Vehicle, Pitstop, Hotel } from '../types';

interface SlotNumberProps {
  key?: string | number;
  value: number;
}

function SlotNumber({ value }: SlotNumberProps) {
  return (
    <div className="h-20 overflow-hidden relative inline-block mx-0.5">
      <motion.div
        key={value}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="text-6xl md:text-8xl font-bold text-gold flex flex-col items-center justify-center h-full"
      >
        {value}
      </motion.div>
    </div>
  );
}

interface CommandCenterProps {
  total: number;
  journeyDetails?: {
    from: string;
    to: string;
    vehicle: Vehicle | null;
    pitstops: Pitstop[];
    hotel: Hotel | null;
  };
}

export default function CommandCenter({ total, journeyDetails }: CommandCenterProps) {
  const [isSecurityActive, setIsSecurityActive] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Split total into digits for slot machine effect
  const digits = total.toString().padStart(6, '0').split('').map(Number); // Increased pad for larger INR

  const handleBooking = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFFFFF', '#0a0a0a']
    });
    setShowRouteMap(true);
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Shield className="w-64 h-64 text-gold" />
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-gold uppercase tracking-[0.3em] font-bold text-sm mb-12">The Command Center</h2>
          
          {/* Slot Machine Counter */}
          <div className="mb-16">
            <h3 className="text-white/40 text-sm mb-4 uppercase tracking-widest">Total Journey Investment</h3>
            <div className="flex items-center justify-center p-4 rounded-3xl bg-midnight/50 inline-flex shadow-inner">
              <span className="text-4xl md:text-6xl text-gold/40 font-light mr-4">₹</span>
              {digits.map((d, i) => (
                <SlotNumber key={i} value={d} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-12 w-full">
            {/* Route Map Summary */}
            <AnimatePresence>
              {showRouteMap && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full text-left bg-white/5 border border-gold/20 rounded-3xl p-8 mb-8"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-gold font-bold text-xl flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Route Map
                    </h3>
                    <button 
                      onClick={handleDownload}
                      className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-gold transition-colors flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" /> {isDownloaded ? 'Saved to Device' : 'Download Map'}
                    </button>
                  </div>

                  {/* Mock Map Visualization */}
                  <div className="relative w-full h-32 bg-midnight/50 rounded-xl mb-6 overflow-hidden border border-white/5">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[size:20px_20px]" />
                    </div>
                    <div className="absolute top-1/2 left-8 right-8 h-1 bg-gold/10 -translate-y-1/2" />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="absolute top-1/2 left-8 h-0.5 bg-gold -translate-y-1/2 shadow-[0_0_15px_rgba(212,175,55,0.8)]" 
                    />
                    <div className="absolute top-1/2 left-8 -translate-y-1/2 -ml-2 w-4 h-4 rounded-full bg-gold border-4 border-midnight shadow-lg" />
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 -mr-2 w-4 h-4 rounded-full bg-gold border-4 border-midnight shadow-lg" />
                    
                    <div className="absolute top-2/3 left-8 text-[10px] text-white/40 font-bold uppercase truncate max-w-[80px]">{journeyDetails?.from}</div>
                    <div className="absolute top-2/3 right-8 text-[10px] text-white/40 font-bold uppercase text-right truncate max-w-[80px]">{journeyDetails?.to}</div>
                  </div>

                  <div className="space-y-6 relative ml-4">
                    <div className="absolute left-[-16px] top-2 bottom-2 w-0.5 bg-gold/20" />
                    
                    <div className="relative">
                      <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Fleet Partner</p>
                      <p className="text-md font-medium text-white/80">
                        {journeyDetails?.vehicle?.name} (Confirmed)
                      </p>
                      <p className="text-[10px] text-white/30 italic">Pilot: {journeyDetails?.vehicle?.driverName || journeyDetails?.vehicle?.sage.name}</p>
                    </div>

                    <div className="relative">
                      <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full bg-white/20" />
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Sanctuary</p>
                      <p className="text-md font-medium text-white/80">
                        Stay at {journeyDetails?.hotel?.name || "Self-Managed Sanctuary"}
                      </p>
                    </div>

                    {journeyDetails?.pitstops && journeyDetails.pitstops.length > 0 && (
                      <div className="relative">
                        <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full bg-white/20" />
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Vitality Points</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {journeyDetails.pitstops.map(p => (
                            <span key={p.id} className="text-[11px] bg-white/10 px-2 py-1 rounded text-gold/80">{p.name}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-center border-t border-white/5 pt-8"
                  >
                    <h3 className="text-2xl md:text-3xl font-black text-gold tracking-tighter uppercase italic leading-tight">THANK YOU FOR USING TOURGUIDE AI</h3>
                    <p className="text-white/20 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">Your journey begins now.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Security Toggle */}
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium flex items-center gap-2">
                  <Lock className={cn("w-4 h-4 transition-colors", isSecurityActive ? "text-green-500" : "text-white/40")} />
                  Enhanced Verification
                </span>
                <button 
                  onClick={() => setIsSecurityActive(!isSecurityActive)}
                  className={cn(
                    "w-12 h-6 rounded-full relative transition-colors duration-300",
                    isSecurityActive ? "bg-gold" : "bg-white/10"
                  )}
                >
                  <motion.div 
                    animate={{ x: isSecurityActive ? 24 : 4 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>

              <AnimatePresence>
                {isSecurityActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                      {[
                        'Pilot License: Certified',
                        'Cosmic Permit: Approved',
                        'Identity Matrix: Secure'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Complete Button */}
            {!showRouteMap && (
              <motion.button
                onClick={handleBooking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-gold text-midnight font-black text-xl rounded-2xl uppercase tracking-widest shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-shadow hover:shadow-[0_25px_50px_rgba(212,175,55,0.4)]"
              >
                Complete Booking
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
