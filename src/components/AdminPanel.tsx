import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, Database, Trash2, X, User, Phone, Mail, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);

  const ADMIN_PASSWORD = 'admin123'; // Secret password as requested

  useEffect(() => {
    if (isAuthenticated) {
      const data = JSON.parse(localStorage.getItem('tourguide_bookings') || '[]');
      setBookings(data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Access Code');
      setTimeout(() => setError(''), 2000);
    }
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem('tourguide_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-white/5 hover:bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/10 transition-all group"
      >
        <Lock className="w-5 h-5 text-white/30 group-hover:text-gold transition-colors" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-midnight/90 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-midnight border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Admin Terminal</h2>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                      {isAuthenticated ? 'Data Management System' : 'Awaiting Authorization'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8">
                {!isAuthenticated ? (
                  <div className="max-w-md mx-auto py-20">
                    <div className="text-center mb-10">
                      <div className="inline-flex w-16 h-16 rounded-3xl bg-gold/5 border border-gold/20 items-center justify-center mb-6">
                        <Lock className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Restricted Access</h3>
                      <p className="text-white/40 text-sm">Enter the secondary clearance code to access the booking mainframe.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="relative group">
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-xl tracking-[0.5em] focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {error && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs font-bold text-center uppercase tracking-widest"
                        >
                          {error}
                        </motion.p>
                      )}

                      <button 
                        type="submit"
                        className="w-full py-4 bg-gold text-midnight rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all"
                      >
                        Authorize Grid
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {bookings.length === 0 ? (
                      <div className="text-center py-20 opacity-20">
                        <Database className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-xl font-bold uppercase tracking-widest italic">No Data Sequences Found</p>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {bookings.map((booking) => (
                          <motion.div 
                            key={booking.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group"
                          >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-gold/60">
                                    <User className="w-3 h-3" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Registrant</span>
                                  </div>
                                  <p className="text-lg font-bold text-white">{booking.name}</p>
                                  <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{new Date(booking.timestamp).toLocaleString()}</span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-gold/60">
                                    <Phone className="w-3 h-3" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Contact</span>
                                  </div>
                                  <p className="text-md font-medium text-white/80">{booking.contact}</p>
                                  <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                                    <Mail className="w-3 h-3" />
                                    <span className="truncate">{booking.email}</span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-gold/60">
                                    <Database className="w-3 h-3" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Log Summary</span>
                                  </div>
                                  <p className="text-xs text-white/60 line-clamp-2 italic">
                                    {booking.specialRequests || 'No special protocols declared.'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-end md:border-l border-white/5 md:pl-6">
                                <button 
                                  onClick={() => deleteBooking(booking.id)}
                                  className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-6 bg-black/40 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShieldCheck className={cn("w-4 h-4", isAuthenticated ? "text-green-500" : "text-white/20")} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                    System Integrity: {isAuthenticated ? 'Secured' : 'Locked'}
                  </span>
                </div>
                {isAuthenticated && (
                  <button 
                    onClick={() => {
                      setIsAuthenticated(false);
                      setPassword('');
                    }}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-gold hover:text-white transition-colors"
                  >
                    Terminate Session
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
