import { motion } from 'motion/react';
import { Car } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  progress: number; // 0 to 100
}

export default function Navbar({ progress }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center px-6">
      <div className="flex items-center gap-4 mr-8">
        <span className="text-gold font-bold text-xl tracking-tighter">TOURGUIDE AI</span>
      </div>
      
      <div className="flex-1 relative h-1 bg-white/10 rounded-full overflow-visible">
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
        
        {/* Moving Car Icon */}
        <motion.div
           className="absolute top-1/2 -translate-y-1/2 -ml-4 z-10"
           initial={{ left: 0 }}
           animate={{ left: `${progress}%` }}
           transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <div className="bg-midnight border border-gold p-2 rounded-full shadow-lg">
            <Car className="w-5 h-5 text-gold" />
          </div>
        </motion.div>
      </div>
      
      <div className="ml-8 hidden md:flex gap-6 text-sm font-medium text-white/60">
        {['Portal', 'Location', 'Fleet', 'Pitstops', 'Hotels'].map((step, i) => (
          <span 
            key={step} 
            className={cn(
              "transition-colors",
              progress >= (i * 25) ? "text-gold" : ""
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </nav>
  );
}
