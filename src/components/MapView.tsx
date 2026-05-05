import { motion } from 'motion/react';
import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface MapViewProps {
  from: string;
  to: string;
}

export default function MapView({ from, to }: MapViewProps) {
  // Construct a Google Maps Embed URL for a search or route
  // Note: For a real app you'd use a real API key, here we use the free embed API behavior
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&mode=driving`;
  
  // Since we don't have a real API key in this environment, 
  // we'll use a standard search embed which is more resilient to missing keys
  const simpleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(to)}&output=embed`;

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Step 5: Tactical Route Visualization</h2>
        <p className="text-white/40">Real-time satellite synchronization for your chosen trajectory.</p>
      </motion.div>

      <div className="relative glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
        {/* Map Header/Controls */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
          <div className="bg-midnight/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl min-w-[240px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <Navigation className="w-4 h-4 text-gold" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40">Active Route</span>
            </div>
            
            <div className="space-y-4">
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-green-500" />
                <div className="absolute left-[3px] top-4 w-0.5 h-6 bg-white/10" />
                <p className="text-[10px] text-white/30 uppercase font-bold">Departure</p>
                <p className="text-sm font-bold text-white truncate">{from}</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]" />
                <p className="text-[10px] text-white/30 uppercase font-bold">Arrival</p>
                <p className="text-sm font-bold text-white truncate">{to}</p>
              </div>
            </div>
          </div>

          <div className="bg-midnight/80 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 w-fit">
            <Compass className="w-4 h-4 text-gold animate-spin-slow" />
            <span className="text-[10px] font-bold text-white/60">GPS SIGNAL: STABLE [98.4%]</span>
          </div>
        </div>

        {/* Map Iframe */}
        <div className="w-full h-[600px] bg-midnight/50">
          <iframe
            src={simpleMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.6)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Route"
            className="grayscale-0 contrast-125"
          />
        </div>

        {/* Overlay Decoration */}
        <div className="absolute inset-0 pointer-events-none border-[20px] border-midnight opacity-20" />
        <div className="absolute bottom-6 right-6 z-10">
          <a 
            href={`https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-midnight px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 transition-all pointer-events-auto"
          >
            Launch Native Nav
          </a>
        </div>
      </div>
    </section>
  );
}
