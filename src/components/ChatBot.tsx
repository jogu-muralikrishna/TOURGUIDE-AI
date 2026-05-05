import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Greetings, Traveler. I am the TourGuide AI Core. How can I assist with your journey through the digital expanse today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are 'TourGuide AI Core', a sleek, efficient, and slightly futuristic AI travel assistant for an app called TOURGUIDE AI. You help users plan trips, choose vehicles (Chariots), find hotels (Sanctuaries), and discover pitstops. Your tone is professional, helpful, tech-savvy, and fits a 'cyber-logistic' aesthetic. Keep responses concise and focused on travel planning.",
        },
        history: history as any
      });

      const result = await chat.sendMessage({ message: userMessage });
      const botResponse = result.text;
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse || "I encountered a minor glitch in my logic clusters. Could you repeat that?" }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Signal interference detected. Please ensure your neural-link (API Key) is properly configured." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-midnight/95 backdrop-blur-2xl border border-gold/20 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-gold/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">AI Core</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] text-white/40 font-bold uppercase tracking-tight">System Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/30 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-5 space-y-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-3", m.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    m.role === 'model' ? "bg-gold/10 text-gold" : "bg-white/5 text-white/40"
                  )}>
                    {m.role === 'model' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed",
                    m.role === 'model' 
                      ? "bg-white/5 text-white/80 border border-white/5" 
                      : "bg-gold text-midnight font-bold shadow-lg"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-gold animate-spin" />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <div className="flex gap-1">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-gold rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-gold rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-gold rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-white/5">
              <div className="relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Transmit your query..."
                  className="w-full bg-midnight border border-white/10 rounded-xl px-5 py-3.5 pr-12 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gold text-midnight rounded-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gold text-midnight rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
