import React, { useState, useEffect, useRef } from 'react';
import BackgroundCanvas from './BackgroundCanvas';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaPowerOff, FaSync, FaMusic, FaVolumeUp, FaVolumeMute, FaTerminal } from 'react-icons/fa';
import profilePic from './assets/profile.png';

const TerminalLayout = ({ 
  children, 
  activeFile, 
  setActiveFile, 
  openApps, 
  setOpenApps, 
  activeWindow, 
  setActiveWindow,
  isMinimized,
  setIsMinimized 
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Try to auto-play audio on first interaction if blocked
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
        window.removeEventListener('click', handleFirstInteraction);
      }
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [isPlaying]);

  if (isClosed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-teal-500 p-4 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-xl md:text-2xl mb-4">➜ System Halted.</p>
          <p className="text-sm text-slate-500 uppercase tracking-widest">Connection terminated safely</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all rounded-full text-xs font-bold"
          >
            REBOOT SYSTEM
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 overflow-hidden font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <BackgroundCanvas />
      
      {/* Audio Player */}
      <audio 
        ref={audioRef}
        loop
        autoPlay
        src="https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" 
      />
      
      {/* Main OS Area (Desktop) */}
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>

      {/* OS Taskbar (Bottom) */}
      <footer className="h-12 bg-slate-900/80 backdrop-blur-2xl border-t border-white/5 fixed bottom-0 left-0 right-0 z-[100] flex items-center px-4 justify-between select-none">
        <div className="flex items-center space-x-2 h-full">
          {/* Start Button */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStartMenu(!showStartMenu)}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg cursor-pointer transition-all border ${
              showStartMenu ? 'bg-teal-500 text-slate-900 border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.4)]' : 'bg-slate-800/50 hover:bg-slate-700/50 text-teal-400 border-slate-700/50'
            }`}
          >
            <FaTerminal className={`text-sm ${showStartMenu ? 'text-slate-900' : 'text-teal-400'}`} />
            <span className="text-xs font-bold uppercase tracking-tighter">Ishan_OS</span>
          </motion.div>

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {/* Taskbar Apps */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'terminal', icon: '⌨️', label: 'Terminal' },
              { id: 'notes', icon: '📝', label: 'Notes' },
              { id: 'game', icon: '🎮', label: 'Game' }
            ].map(app => (
              openApps.includes(app.id) && (
                <motion.div 
                  key={app.id}
                  layoutId={`taskbar-${app.id}`}
                  onClick={() => {
                    if (app.id === 'terminal') setIsMinimized(!isMinimized);
                    setActiveWindow(app.id);
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all border whitespace-nowrap ${
                    activeWindow === app.id && (app.id !== 'terminal' || !isMinimized) 
                      ? 'bg-teal-500/20 text-teal-400 border-teal-500/30 shadow-[0_0_10px_rgba(45,212,191,0.2)]' 
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/5'
                  }`}
                >
                  <span className="text-sm">{app.icon}</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest hidden lg:block">{app.label}</span>
                  <div className={`w-1 h-1 rounded-full ${activeWindow === app.id ? 'bg-teal-400 shadow-[0_0_5px_#2dd4bf]' : 'bg-slate-600'}`}></div>
                </motion.div>
              )
            ))}
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-4 md:space-x-6 text-slate-400 pr-2">
          <div className="flex items-center space-x-3 bg-black/20 px-3 py-1 rounded-full border border-white/5">
            <FaMusic className={`text-[10px] ${isPlaying ? 'text-teal-400 animate-pulse' : 'text-slate-600'}`} />
            <div onClick={() => {
              if (isPlaying) { audioRef.current.pause(); } 
              else { audioRef.current.play().catch(() => {}); }
              setIsPlaying(!isPlaying);
            }} className="cursor-pointer hover:text-white transition-colors p-1">
              {!isPlaying ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} className="text-teal-400" />}
            </div>
          </div>
          <div className="text-xs font-mono font-bold tracking-tighter bg-white/5 px-3 py-1 rounded-md border border-white/5 text-white">
            {time}
          </div>
        </div>

        {/* Start Menu Popup */}
        <AnimatePresence>
          {showStartMenu && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setShowStartMenu(false)} 
                className="fixed inset-0 z-[140] bg-black/20 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.95 }} 
                animate={{ y: 0, opacity: 1, scale: 1 }} 
                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                className="absolute bottom-14 left-4 w-72 bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 overflow-hidden z-[150]"
              >
                <div className="p-5 border-b border-white/5 mb-2 flex items-center space-x-4 text-left bg-gradient-to-br from-teal-500/10 to-transparent">
                  <div className="w-12 h-12 rounded-full border border-teal-500/30 overflow-hidden flex items-center justify-center shadow-inner">
                    <img src={profilePic} alt="Ishan Malinda" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-bold tracking-tight">Ishan Malinda</p>
                    <p className="text-[10px] text-teal-500/70 uppercase font-mono font-bold tracking-tighter">System Administrator</p>
                  </div>
                </div>
                <div className="p-1 space-y-1">
                  {[
                    { icon: <FaHome />, label: 'Home Dashboard', action: () => { setActiveFile('home'); setIsMinimized(false); setActiveWindow('terminal'); setShowStartMenu(false); } },
                    { icon: <FaSync />, label: 'Reboot System', action: () => window.location.reload(), color: 'text-blue-400' },
                    { icon: <FaPowerOff />, label: 'Power Off', action: () => setIsClosed(true), color: 'text-red-400' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      onClick={item.action} 
                      className="flex items-center space-x-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all group"
                    >
                      <span className={`text-lg ${item.color || 'text-slate-400'} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                      <span className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
};

export default TerminalLayout;
