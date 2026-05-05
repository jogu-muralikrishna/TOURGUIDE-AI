import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { User, Phone, Mail, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { UserData } from '../types';
import { cn } from '../lib/utils';

interface UserDetailsFormProps {
  onComplete: (data: UserData) => void;
  initialData?: UserData;
}

export default function UserDetailsForm({ onComplete, initialData }: UserDetailsFormProps) {
  const [formData, setFormData] = useState<UserData>(initialData || {
    name: '',
    contact: '',
    email: '',
    specialRequests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.contact && formData.email) {
      // Fallback storage since Firebase is currently unavailable
      const existingBookings = JSON.parse(localStorage.getItem('tourguide_bookings') || '[]');
      const newBooking = {
        ...formData,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('tourguide_bookings', JSON.stringify([...existingBookings, newBooking]));
      
      setIsSubmitted(true);
      setTimeout(() => onComplete(formData), 1500);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/10";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20";

  return (
    <section className="py-24 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Step 6: Identity Registration</h2>
        <p className="text-white/40">Secure your clearance for this interstellar logistics operation.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div className="absolute inset-0 bg-gold/5 blur-[120px] -z-10" />
        
        <div className="relative group">
          <User className={iconClasses} />
          <input
            required
            type="text"
            placeholder="Full Name as per Manifest"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <Phone className={iconClasses} />
            <input
              required
              type="tel"
              placeholder="Contact Transponder"
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div className="relative group">
            <Mail className={iconClasses} />
            <input
              required
              type="email"
              placeholder="Neural-Link Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="relative group">
          <FileText className="absolute left-4 top-6 w-5 h-5 text-white/20" />
          <textarea
            placeholder="Special Protocols or Dietary Requirements..."
            value={formData.specialRequests}
            onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
            className={cn(inputClasses, "h-32 pt-5 resize-none")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitted}
          className={cn(
            "w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm transition-all flex items-center justify-center gap-3",
            isSubmitted ? "bg-green-500 text-white" : "bg-gold text-midnight hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
          )}
        >
          {isSubmitted ? (
            <><CheckCircle2 className="w-5 h-5" /> IDENTITY VERIFIED</>
          ) : (
            <><ChevronRight className="w-5 h-5" /> VALIDATE CLEARANCE</>
          )}
        </button>

        <p className="text-center text-[10px] text-white/20 uppercase tracking-widest font-bold">
          Encrypted with 256-Bit Solar Shielding
        </p>
      </form>
    </section>
  );
}
