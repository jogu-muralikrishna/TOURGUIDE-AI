import { motion } from 'motion/react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-[#1a1a1a] to-midnight" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent">
          TOURGUIDE AI
        </h1>
        <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-12 font-light tracking-wide">
          Your complete journey companion. Plan from anywhere to everywhere with real-time AI guidance.
        </p>
        
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-transparent border border-gold/50 rounded-full overflow-hidden transition-all hover:border-gold"
        >
          <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
          <span className="relative z-10 text-gold font-semibold text-lg tracking-widest uppercase">
            Launch Your Journey
          </span>
          <motion.div
            className="absolute inset-0 border-2 border-gold rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <div className="w-1 h-12 border border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
