/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinySearch from './components/DestinySearch';
import ChariotSageGrid from './components/ChariotSageGrid';
import PitstopRoute from './components/PitstopRoute';
import SanctuaryGallery from './components/SanctuaryGallery';
import MapView from './components/MapView';
import UserDetailsForm from './components/UserDetailsForm';
import FinalTicket from './components/FinalTicket';
import CommandCenter from './components/CommandCenter';
import AdminPanel from './components/AdminPanel';
import ChatBot from './components/ChatBot';
import { Vehicle, Pitstop, Hotel, WeatherData, UserData } from './types';
import { MOCK_WEATHER } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Sun, CloudRain, Wind, Ticket } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedPitstops, setSelectedPitstops] = useState<Pitstop[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [totalCost, setTotalCost] = useState(0);

  // Refs for scrolling to steps
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const step5Ref = useRef<HTMLDivElement>(null);
  const step6Ref = useRef<HTMLDivElement>(null);
  const step7Ref = useRef<HTMLDivElement>(null);

  // Calculate progress based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update total cost
  useEffect(() => {
    let cost = 0;
    if (selectedVehicle) cost += selectedVehicle.price;
    selectedPitstops.forEach(p => cost += p.price);
    if (selectedHotel) cost += selectedHotel.price;
    setTotalCost(cost);
  }, [selectedVehicle, selectedPitstops, selectedHotel]);

  const scrollToStep = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDestinationComplete = (f: string, t: string) => {
    setFrom(f);
    setTo(t);
    const weatherData = MOCK_WEATHER[t] || MOCK_WEATHER['Delhi'] || MOCK_WEATHER['default'];
    setWeather(weatherData);
    setTimeout(() => scrollToStep(step2Ref), 500);
  };

  const handleSelectPitstop = (p: Pitstop) => {
    setSelectedPitstops(prev => 
      prev.find(i => i.id === p.id) 
        ? prev.filter(i => i.id !== p.id) 
        : [...prev, p]
    );
  };

  const WeatherWidget = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-6 z-40 glass rounded-2xl p-4 flex items-center gap-4 border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
    >
      <div className="text-gold p-2 bg-gold/10 rounded-xl">
        {weather?.condition.includes('Sun') ? <Sun className="w-6 h-6" /> : 
         weather?.condition.includes('Rain') ? <CloudRain className="w-6 h-6" /> : 
         weather?.condition.includes('Wind') ? <Wind className="w-6 h-6" /> : 
         <Cloud className="w-6 h-6" />}
      </div>
      <div>
        <div className="text-xs text-white/40 uppercase font-bold tracking-widest leading-none mb-1">Weather @ {to}</div>
        <div className="text-xl font-bold">{weather?.temp}°C</div>
        <div className="text-[10px] text-white/60">{weather?.condition} • Vis: {weather?.visibility}</div>
      </div>
    </motion.div>
  );

  return (
    <main className="bg-midnight min-h-screen selection:bg-gold/30 selection:text-gold">
      <Navbar progress={progress} />
      
      <AdminPanel />
      <ChatBot />
      
      {to && <WeatherWidget />}

      <Hero onStart={() => scrollToStep(step1Ref)} />
      
      <div ref={step1Ref} className="pt-20">
        <DestinySearch onComplete={handleDestinationComplete} />
      </div>
      
      <AnimatePresence>
        {!to ? (
          <div className="py-24 text-center opacity-20 filter blur-sm select-none pointer-events-none">
            <p className="text-2xl">Complete Step 1 to unlock the Fleet Selection</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div ref={step2Ref} className="pt-20">
              <ChariotSageGrid 
                selectedVehicleId={selectedVehicle?.id} 
                onSelect={(v) => {
                  setSelectedVehicle(v);
                  setTimeout(() => scrollToStep(step3Ref), 500);
                }} 
              />
            </div>
            
            <div ref={step3Ref} className="pt-20">
              <PitstopRoute 
                selectedPitstopIds={selectedPitstops.map(s => s.id)} 
                onAdd={handleSelectPitstop} 
              />
            </div>
            
            <div ref={step4Ref} className="pt-20">
              <SanctuaryGallery 
                selectedHotelId={selectedHotel?.id} 
                onSelect={(h) => {
                  setSelectedHotel(h);
                  setTimeout(() => scrollToStep(step5Ref), 500);
                }} 
              />
            </div>

            <div ref={step5Ref} className="pt-20">
              <MapView from={from} to={to} />
              <div className="flex justify-center -mt-12 mb-20">
                <button 
                  onClick={() => scrollToStep(step6Ref)}
                  className="bg-gold text-midnight px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all"
                >
                  Confirm Route & Register Details
                </button>
              </div>
            </div>

            <div ref={step6Ref} className="pt-20">
              <UserDetailsForm 
                onComplete={(data) => {
                  setUserData(data);
                  setTimeout(() => scrollToStep(step7Ref), 500);
                }} 
              />
            </div>
            
            <div ref={step7Ref} className="pt-20 pb-40">
              <CommandCenter 
                total={totalCost} 
                journeyDetails={{
                  from: from,
                  to: to,
                  vehicle: selectedVehicle,
                  pitstops: selectedPitstops,
                  hotel: selectedHotel
                }}
              />

              {userData && (
                <div className="mt-20">
                  <div className="flex items-center justify-center gap-4 mb-20">
                    <div className="h-px w-20 bg-gold/30" />
                    <Ticket className="w-8 h-8 text-gold" />
                    <div className="h-px w-20 bg-gold/30" />
                  </div>
                  <FinalTicket 
                    from={from}
                    to={to}
                    vehicle={selectedVehicle}
                    hotel={selectedHotel}
                    pitstops={selectedPitstops}
                    userData={userData}
                    totalCost={totalCost}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-white/5 text-center text-white/20 text-sm">
        <p>© 2026 TOURGUIDE AI. All paths converge.</p>
      </footer>
    </main>
  );
}

