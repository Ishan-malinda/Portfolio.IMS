import React, { useState, useRef, useEffect } from 'react';
import BackgroundCanvas from './BackgroundCanvas';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaPowerOff, FaSync, FaMusic, FaVolumeUp, FaVolumeMute, FaSun, FaMoon } from 'react-icons/fa';

const TerminalLayout = ({ children, activeFile, setActiveFile }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isMuted, setIsMuted] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

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

  // Auto-focus input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (cmd === '') return;

      const newHistory = [...history, { type: 'cmd', text: cmd }];
      let output = '';
      
      if (cmd === 'ls') {
        output = 'about_me.txt  cv_resume.pdf  projects/  links.sh  contact.md';
      } else if (cmd === 'help') {
        output = 'Available: ls, cat [file], cd [dir], clear, help, whoami, reboot, exit';
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'reboot') {
        window.location.reload();
        return;
      } else if (cmd === 'exit') {
        setIsClosed(true);
        return;
      } else if (cmd === 'whoami') {
        output = 'ishan_malinda (Creative Developer)';
      } else if (cmd.includes('cat about')) {
        setActiveFile('about');
        output = 'Opening about_me.txt...';
      } else if (cmd.includes('open resume')) {
        setActiveFile('resume');
        output = 'Opening cv_resume.pdf...';
      } else if (cmd.includes('ls projects') || cmd.includes('cd projects')) {
        setActiveFile('projects');
        output = 'Navigating to projects/...';
      } else if (cmd === './links.sh') {
        setActiveFile('links');
        output = 'Executing links.sh...';
      } else if (cmd.includes('vim contact')) {
        setActiveFile('contact');
        output = 'Opening contact.md...';
      } else {
        output = `zsh: command not found: ${cmd}`;
      }

      if (output) newHistory.push({ type: 'output', text: output });
      setHistory(newHistory);
      setInput('');
    }
  };

  if (isClosed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-teal-500">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p>➜ System Halted.</p>
          <p className="mt-2 text-slate-500">Press F5 to restart the session.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <BackgroundCanvas />
      
      {/* Audio Player */}
      <audio 
        ref={audioRef}
        loop
        autoPlay
        src="https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" 
      />
      
      {/* Main OS Area */}
      <div className="flex-1 flex items-center justify-center p-4 pb-16 relative">
        <AnimatePresence>
          {!isMinimized && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden flex flex-col"
              style={{ height: '550px' }}
            >
              {/* Window Title Bar */}
              <div className="bg-slate-800/80 p-3 flex items-center border-b border-slate-700/50 select-none">
                <div className="flex space-x-2.5 ml-2">
                  <div onClick={() => setIsClosed(true)} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4b40] cursor-pointer shadow-inner border border-black/10 transition-colors"></div>
                  <div onClick={() => setIsMinimized(true)} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffaf1a] cursor-pointer shadow-inner border border-black/10 transition-colors"></div>
                  {/* Maximize removed as requested */}
                  <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-black/10"></div>
                </div>
                <div className="text-slate-400 text-[11px] font-mono flex-1 text-center pr-12 uppercase tracking-widest opacity-70">
                  {activeFile === 'home' ? 'main_terminal' : `${activeFile}.sh`} — -zsh — 80x24
                </div>
              </div>

              {/* Main Content Body */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className={`${isMaximized ? 'w-72' : 'w-60'} bg-black/20 border-r border-slate-700/30 hidden md:flex flex-col p-4`}>
                  <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50">System Explorer</h3>
                  <ul className="space-y-1.5 font-mono text-xs flex-1">
                    {[
                      { id: 'home', icon: <FaHome className="mr-3 text-blue-400" />, label: 'home.exe' },
                      { id: 'about', icon: <span className="mr-3 text-teal-400">📄</span>, label: 'about_me.txt' },
                      { id: 'resume', icon: <span className="mr-3 text-purple-400">📜</span>, label: 'cv_resume.pdf' },
                      { id: 'projects', icon: <span className="mr-3 text-yellow-400">📁</span>, label: 'projects/' },
                      { id: 'links', icon: <span className="mr-3 text-pink-400">🔗</span>, label: 'links.sh' },
                      { id: 'contact', icon: <span className="mr-3 text-green-400">📧</span>, label: 'contact.md' }
                    ].map((item) => (
                      <li 
                        key={item.id}
                        onClick={() => setActiveFile(item.id)}
                        className={`flex items-center cursor-pointer hover:bg-white/5 p-2.5 rounded-lg transition-all border border-transparent ${
                          activeFile === item.id ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]' : 'text-slate-400'
                        }`}
                      >
                        {item.icon} {item.label}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Terminal Screen */}
                <div 
                  onClick={handleTerminalClick}
                  className="flex-1 bg-black/40 p-6 font-mono text-slate-300 overflow-y-auto custom-scrollbar flex flex-col relative"
                >
                  <div className="flex-1 mb-6">
                    {/* Active Command Display */}
                    <div className="mb-6 flex items-center text-sm">
                      <span className="text-green-400 mr-2 font-bold">➜</span>
                      <span className="text-slate-500 mr-2">~</span>
                      <motion.span 
                        key={activeFile}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-blue-400"
                      >
                        {activeFile === 'home' ? 'init --welcome' : `cat ${activeFile}`}
                      </motion.span>
                    </div>
                    
                    {/* Content Component */}
                    <div className="relative z-10 min-h-full">
                      {children}
                    </div>

                    {/* Command History */}
                    {history.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-slate-800/30 space-y-2">
                        {history.map((item, i) => (
                          <div key={i} className="text-[11px]">
                            {item.type === 'cmd' ? (
                              <div className="flex items-center text-teal-500/60">
                                <span className="mr-2">➜</span>
                                <span className="italic">{item.text}</span>
                              </div>
                            ) : (
                              <div className="text-slate-500 pl-4 border-l border-slate-800/50">{item.text}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Input Line - Fixed at Bottom of Scroll Area but doesn't overlap */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-sm">
                    <span className="text-green-400 mr-3 font-bold flex-shrink-0">➜ ~</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleCommand}
                      className="bg-transparent border-none outline-none text-teal-400/80 w-full font-mono placeholder:text-slate-700"
                      placeholder="Type a command..."
                    />
                  </div>
                  <div ref={terminalEndRef} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* OS Taskbar (Bottom) */}
      <div className="h-12 bg-slate-900/80 backdrop-blur-2xl border-t border-white/5 fixed bottom-0 left-0 right-0 z-50 flex items-center px-4 justify-between select-none">
        <div className="flex items-center space-x-2 h-full">
          {/* Start Button */}
          <div 
            onClick={() => setShowStartMenu(!showStartMenu)}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg cursor-pointer transition-all border ${
              showStartMenu ? 'bg-teal-500 text-black border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.4)]' : 'bg-white/5 hover:bg-white/10 text-white border-white/5'
            }`}
          >
            <div className="w-4 h-4 bg-current rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-slate-900 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
            <span className="text-xs font-bold uppercase tracking-tighter">Ishan_OS</span>
          </div>

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {/* Taskbar Apps (Running indicators) */}
          <div 
            onClick={() => setIsMinimized(false)}
            className={`flex items-center space-x-3 px-4 py-1.5 rounded-lg cursor-pointer transition-all border ${
              !isMinimized ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/5'
            }`}
          >
            <span className="text-sm">⌨️</span>
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Terminal</span>
            {!isMinimized && (
              <motion.div 
                layoutId="active-indicator"
                className="w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_5px_#2dd4bf]"
              />
            )}
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-6 text-slate-400 pr-2">
          {/* Audio Controls */}
          <div className="flex items-center space-x-3 bg-black/20 px-3 py-1 rounded-full border border-white/5">
            <FaMusic className={`text-[10px] ${isPlaying ? 'text-teal-400 animate-pulse' : 'text-slate-600'}`} />
            <div onClick={() => {
              if (isPlaying) {
                audioRef.current.pause();
              } else {
                audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
              }
              setIsPlaying(!isPlaying);
            }} className="cursor-pointer hover:text-white transition-colors">
              {!isPlaying ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} className="text-teal-400" />}
            </div>
          </div>

          {/* Clock */}
          <div className="text-xs font-mono font-bold tracking-tighter bg-white/5 px-3 py-1 rounded-md border border-white/5 text-white">
            {time}
          </div>
        </div>

        {/* Start Menu Popup */}
        <AnimatePresence>
          {showStartMenu && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowStartMenu(false)}
                className="fixed inset-0 z-[-1]"
              />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute bottom-14 left-4 w-64 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl p-2 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-white/5 mb-2 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">IM</div>
                  <div>
                    <p className="text-xs text-white font-bold">Ishan Malinda</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">System Administrator</p>
                  </div>
                </div>
                {[
                  { icon: <FaHome />, label: 'Home System', action: () => { setActiveFile('home'); setShowStartMenu(false); } },
                  { icon: <FaSync />, label: 'Reboot System', action: () => window.location.reload(), color: 'text-blue-400' },
                  { icon: <FaPowerOff />, label: 'Power Off', action: () => setIsClosed(true), color: 'text-red-400' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={item.action}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-all group"
                  >
                    <span className={`text-sm ${item.color || 'text-slate-400'} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                    <span className="text-xs text-slate-300 font-medium">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TerminalLayout;
