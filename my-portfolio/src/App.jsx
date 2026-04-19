import React, { useState, useRef, useEffect, useCallback } from 'react';
import TerminalLayout from './TerminalLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaDiscord, 
  FaYoutube, 
  FaInstagram, 
  FaEnvelope,
  FaWhatsapp,
  FaTerminal,
  FaStickyNote,
  FaGamepad,
  FaInfoCircle,
  FaLink,
  FaBriefcase,
  FaFileAlt,
  FaHome
} from 'react-icons/fa';
import profilePic from './assets/profile.png';

// --- SUB-COMPONENTS ---

const TerminalWindow = ({ 
  activeFile, 
  setActiveFile, 
  openApps, 
  setOpenApps, 
  activeWindow, 
  setActiveWindow,
  setIsMinimized,
  children
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 900, height: 550 });
  const isResizing = useRef(false);
  const resizeDir = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startDims = useRef({ width: 0, height: 0 });
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleResizeStart = useCallback((e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    resizeDir.current = direction;
    startPos.current = { x: e.clientX, y: e.clientY };
    startDims.current = { ...dimensions };
    document.body.style.cursor = direction === 'right' ? 'ew-resize' : direction === 'bottom' ? 'ns-resize' : 'nwse-resize';
    document.body.style.userSelect = 'none';
  }, [dimensions]);

  useEffect(() => {
    const handleResizeMove = (e) => {
      if (!isResizing.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      const dir = resizeDir.current;
      const maxW = window.innerWidth * 0.95;
      const maxH = window.innerHeight * 0.90;
      setDimensions(prev => ({
        width: (dir === 'right' || dir === 'corner')
          ? Math.min(maxW, Math.max(400, startDims.current.width + dx))
          : prev.width,
        height: (dir === 'bottom' || dir === 'corner')
          ? Math.min(maxH, Math.max(300, startDims.current.height + dy))
          : prev.height,
      }));
    };
    const handleResizeEnd = () => {
      if (isResizing.current) {
        isResizing.current = false;
        resizeDir.current = null;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeEnd);
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  const handleTerminalClick = (e) => {
    // If the target is an input, textarea, or a link, don't hijack focus
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('a')) {
      return;
    }
    inputRef.current?.focus();
    setActiveWindow('terminal');
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeFile]);

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
        output = 'Available: ls, cat [file], cd [dir], clear, help, whoami, reboot, exit, open [app]';
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'reboot') {
        window.location.reload();
        return;
      } else if (cmd === 'exit') {
        setOpenApps(openApps.filter(a => a !== 'terminal'));
        return;
      } else if (cmd.startsWith('open ')) {
        const app = cmd.split(' ')[1];
        if (['notes', 'game'].includes(app)) {
          if (!openApps.includes(app)) setOpenApps([...openApps, app]);
          setActiveWindow(app);
          output = `Starting ${app}...`;
        } else {
          output = `App not found: ${app}`;
        }
      } else if (cmd === 'whoami') {
        output = 'ishan_malinda (Junior Developer)';
      } else if (cmd.includes('cat about')) {
        setActiveFile('about');
        output = 'Opening about_me.txt...';
      } else if (cmd.includes('open resume') || cmd.includes('cat resume')) {
        setActiveFile('resume');
        output = 'Opening cv_resume.pdf...';
      } else if (cmd.includes('ls projects') || cmd.includes('cd projects')) {
        setActiveFile('projects');
        output = 'Navigating to projects/...';
      } else if (cmd === './links.sh' || cmd === 'links.sh') {
        setActiveFile('links');
        output = 'Executing links.sh...';
      } else if (cmd.includes('vim contact') || cmd.includes('cat contact')) {
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

  return (
    <motion.div 
      drag
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={() => setActiveWindow('terminal')}
      className={`fixed inset-0 pointer-events-none flex items-center justify-center p-4 pb-20 ${activeWindow === 'terminal' ? 'z-40' : 'z-20'}`}
    >
      <div 
        className="pointer-events-auto bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden flex flex-col relative"
        style={{ width: dimensions.width, height: dimensions.height, maxWidth: '95vw', maxHeight: '90vh' }}
      >
        {/* Window Title Bar */}
        <div className="bg-slate-800/80 p-3 flex items-center border-b border-slate-700/50 select-none cursor-move flex-shrink-0">
          <div className="flex space-x-2.5 ml-2">
            <div onClick={(e) => { e.stopPropagation(); setOpenApps(openApps.filter(a => a !== 'terminal')); }} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4b40] cursor-pointer shadow-inner border border-black/10 transition-colors"></div>
            <div onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffaf1a] cursor-pointer shadow-inner border border-black/10 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-black/10"></div>
          </div>
          <div className="text-slate-400 text-[11px] font-mono flex-1 text-center pr-12 uppercase tracking-widest opacity-70">
            {activeFile === 'home' ? 'main_terminal' : `${activeFile}.sh`} — -zsh — 80x24
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-60 bg-black/20 border-r border-slate-700/30 hidden md:flex flex-col p-4 flex-shrink-0">
            <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50 font-mono">System Explorer</h3>
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
            ref={scrollContainerRef}
            onClick={handleTerminalClick}
            className="flex-1 bg-black/40 p-6 font-mono text-slate-300 overflow-y-auto custom-scrollbar flex flex-col relative"
          >
            <div className="flex-1">
              <div className="mb-6 flex items-center text-sm">
                <span className="text-green-400 mr-2 font-bold">➜</span>
                <span className="text-slate-500 mr-2">~</span>
                <motion.span key={activeFile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400">
                  {activeFile === 'home' ? 'init --welcome' : `cat ${activeFile}`}
                </motion.span>
              </div>
              
              <div className="relative z-10 min-h-fit overflow-visible">
                {children}
              </div>

              {history.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-800/30 space-y-2">
                  {history.map((item, i) => (
                    <div key={i} className="text-[11px]">
                      {item.type === 'cmd' ? (
                        <div className="flex items-center text-teal-500/60">
                          <span className="mr-2">➜</span><span className="italic">{item.text}</span>
                        </div>
                      ) : (
                        <div className="text-slate-500 pl-4 border-l border-slate-800/50">{item.text}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-sm flex-shrink-0">
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
          </div>
        </div>

        {/* Resize Handles */}
        {/* Right edge */}
        <div
          onMouseDown={(e) => handleResizeStart(e, 'right')}
          className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-teal-500/20 transition-colors z-50"
        />
        {/* Bottom edge */}
        <div
          onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          className="absolute bottom-0 left-0 h-1.5 w-full cursor-ns-resize hover:bg-teal-500/20 transition-colors z-50"
        />
        {/* Bottom-right corner */}
        <div
          onMouseDown={(e) => handleResizeStart(e, 'corner')}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 group"
        >
          <svg className="w-3 h-3 absolute bottom-0.5 right-0.5 text-slate-600 group-hover:text-teal-400 transition-colors" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="4" cy="8" r="1.5" />
            <circle cx="8" cy="4" r="1.5" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeFile, setActiveFile] = useState('home');
  const [openApps, setOpenApps] = useState(['terminal']);
  const [activeWindow, setActiveWindow] = useState('terminal');
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Desktop Icons Component
  const DesktopIcons = () => (
    <div className="fixed inset-0 pointer-events-none p-8 flex flex-col flex-wrap content-start gap-8 z-0 mt-4 overflow-hidden">
      {[
        { id: 'terminal', icon: <FaTerminal className="text-teal-400" />, label: 'Terminal', color: 'bg-teal-500/10' },
        { id: 'notes', icon: <FaStickyNote className="text-yellow-400" />, label: 'Notes', color: 'bg-yellow-500/10' },
        { id: 'game', icon: <FaGamepad className="text-purple-400" />, label: 'HackerRun', color: 'bg-purple-500/10' },
      ].map((app) => (
        <motion.div
          key={app.id}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
          onClick={() => {
            if (!openApps.includes(app.id)) setOpenApps([...openApps, app.id]);
            if (app.id === 'terminal') setIsMinimized(false);
            setActiveWindow(app.id);
          }}
          className="pointer-events-auto flex flex-col items-center space-y-2 w-20 cursor-pointer p-2 rounded-xl transition-all group"
        >
          <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-2xl border border-white/5 group-hover:border-white/20 shadow-lg`}>
            {app.icon}
          </div>
          <span className="text-[10px] font-bold text-white/70 tracking-wide text-center drop-shadow-md font-mono uppercase">
            {app.label}
          </span>
        </motion.div>
      ))}
    </div>
  );

  // 1. Notes / Feedback App
  const NotesApp = () => {
    const [note, setNote] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const sendFeedback = () => {
      window.location.href = `mailto:ishanmalindhaims@gmail.com?subject=Portfolio Feedback&body=${encodeURIComponent(note)}`;
      setSubmitted(true);
    };

    if (submitted) {
      return (
        <div className="bg-yellow-500/10 backdrop-blur-2xl p-6 rounded-xl border border-yellow-500/30 w-80 shadow-2xl pointer-events-auto text-center">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-yellow-400 font-bold flex items-center text-xs font-mono uppercase">
              <FaStickyNote className="mr-2" /> Thank_You.txt
            </h3>
            <button 
              onClick={(e) => { e.stopPropagation(); setOpenApps(openApps.filter(a => a !== 'notes')); }}
              className="text-yellow-500/50 hover:text-yellow-500 text-lg leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-yellow-100/80 text-xs font-mono mb-6 leading-relaxed">
            ➜ Data received.<br/>
            Thank you for your feedback!<br/>
            It helps me improve the system.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50 py-2 rounded font-bold text-[10px] transition-all uppercase tracking-widest font-mono"
          >
            ./write_another.sh
          </button>
        </div>
      );
    }
    return (
      <div className="bg-yellow-500/10 backdrop-blur-2xl p-6 rounded-xl border border-yellow-500/30 w-80 shadow-2xl pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-yellow-400 font-bold flex items-center text-xs font-mono uppercase">
            <FaStickyNote className="mr-2" /> Feedback_Note.txt
          </h3>
          <button 
            onClick={(e) => { e.stopPropagation(); setOpenApps(openApps.filter(a => a !== 'notes')); }}
            className="text-yellow-500/50 hover:text-yellow-500 text-lg leading-none"
          >
            ×
          </button>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write some feedback for me..."
          className="w-full h-40 bg-black/30 border border-yellow-500/20 rounded p-3 text-sm text-yellow-100 outline-none focus:border-yellow-500/50 transition-all resize-none font-mono"
        />
        <button
          onClick={sendFeedback}
          className="mt-4 w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50 py-2 rounded font-bold text-[10px] transition-all uppercase tracking-widest font-mono"
        >
          ./send_feedback.sh
        </button>
      </div>
    );
  };

  // 2. Mini Game (Hacker Run)
  const HackerGame = () => {
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('idle'); // idle, playing, over
    const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });

    const startGame = () => {
      setScore(0);
      setGameState('playing');
      moveTarget();
    };

    const moveTarget = () => {
      setTargetPos({
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`,
      });
    };

    const hitTarget = () => {
      setScore(s => s + 1);
      moveTarget();
    };

    return (
      <div className="bg-purple-900/20 backdrop-blur-3xl p-6 rounded-xl border border-purple-500/30 w-80 h-80 shadow-2xl relative overflow-hidden flex flex-col pointer-events-auto text-center">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-purple-400 font-bold flex items-center text-xs tracking-tighter uppercase font-mono">
            <FaGamepad className="mr-2" /> Hacker_Run.exe
          </h3>
          <div className="flex items-center space-x-3">
             <span className="text-[10px] font-mono text-purple-300 uppercase">Score: {score}</span>
             <button 
                onClick={(e) => { e.stopPropagation(); setOpenApps(openApps.filter(a => a !== 'game')); }}
                className="text-purple-500/50 hover:text-purple-500 text-lg leading-none"
             >
                ×
             </button>
          </div>
        </div>
        
        {gameState === 'idle' && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <p className="text-[10px] text-purple-300 font-mono uppercase tracking-widest leading-loose">
              Inject data nodes<br/>to gain system access
            </p>
            <button onClick={startGame} className="bg-purple-500/20 border border-purple-500 text-purple-400 px-6 py-2 rounded-full text-[10px] font-bold hover:bg-purple-500/40 transition-all font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              INITIALIZE_SESSION
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="flex-1 relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={hitTarget}
              style={{ top: targetPos.top, left: targetPos.left }}
              className="absolute w-10 h-10 bg-purple-500/30 rounded-lg cursor-pointer shadow-[0_0_25px_#a855f7] border border-purple-400/50 flex items-center justify-center text-[10px] font-bold text-white select-none backdrop-blur-md"
            >
              <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  const ProjectDetailWindow = ({ project, onClose }) => {
    if (!project) return null;
    return (
      <div className="bg-slate-900/95 backdrop-blur-3xl border border-teal-500/30 rounded-2xl w-[90vw] md:w-[600px] shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]">
        <div className="bg-slate-800/80 p-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center space-x-3">
             <div className="w-3 h-3 rounded-full bg-teal-500/50"></div>
             <h3 className="text-teal-400 font-bold text-xs uppercase tracking-widest font-mono">
                Project_Detail.bin — {project.title}
             </h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xl">×</button>
        </div>
        <div className="overflow-y-auto p-6 custom-scrollbar">
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 mb-6 font-mono relative bg-black/40 flex items-center justify-center group">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">{project.title}</h2>
          <p className="text-teal-500/70 text-[10px] font-mono mb-4 uppercase tracking-[0.3em] font-bold">{project.subtitle}</p>
          <div className="space-y-6 text-slate-300">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono">// Description</p>
              <p className="text-sm leading-relaxed text-slate-400">{project.desc}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 font-mono">// System_Capabilities</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                {project.features.map(f => (
                  <li key={f} className="flex items-center space-x-2">
                    <span className="text-teal-500">➜</span>
                    <span className="text-slate-400">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-teal-500 text-slate-900 text-center py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all font-mono"
                >
                  View Site
                </a>
              )}
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white/5 text-white border border-white/10 text-center py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all font-mono"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const subject = `Portfolio Message from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:ishanmalindhaims@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      setSubmitted(true);
    };
  
    if (submitted) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-teal-400 font-mono space-y-4">
          <p className="text-xl font-bold uppercase tracking-tighter">➜ Transmission Successful</p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Thank you for reaching out! I've prepared the email draft for you. <br/>
            Please ensure you click "Send" in your email client to finalize the message.
          </p>
          <p className="text-slate-500 text-[10px] uppercase">Connection status: Waiting for response...</p>
          <button onClick={() => setSubmitted(false)} className="mt-6 text-xs text-teal-400 hover:text-white border border-teal-500/30 px-4 py-2 rounded-lg hover:bg-teal-500/10 transition-all font-bold uppercase tracking-widest">
            ./reset_form.sh
          </button>
        </motion.div>
      );
    }
  
    return (
      <div className="space-y-6 text-left">
        <div className="text-slate-300">
          <p className="text-teal-400 font-bold text-xl mb-4 tracking-tighter uppercase font-mono"># Get_In_Touch</p>
          <p className="mb-6 text-[11px] text-slate-500 font-mono italic leading-relaxed">
            // Ready to collaborate on something amazing?<br/>// Leave a message and I'll get back to you ASAP.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <a href="mailto:ishanmalindhaims@gmail.com" className="flex items-center space-x-3 text-slate-400 hover:text-teal-400 transition-colors bg-white/5 p-3 rounded-xl border border-white/5 hover:border-teal-500/30">
              <FaEnvelope className="text-lg" />
              <span className="text-[10px] font-mono tracking-tighter uppercase">ishanmalindhaims@gmail.com</span>
            </a>
            <a href="https://wa.me/94720382182" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-400 hover:text-teal-400 transition-colors bg-white/5 p-3 rounded-xl border border-white/5 hover:border-teal-500/30">
              <FaWhatsapp className="text-lg text-green-500" />
              <span className="text-[10px] font-mono tracking-tighter uppercase">+94 72 038 2182</span>
            </a>
          </div>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs max-w-lg">
          <div className="flex items-center space-x-3 border-b border-white/10 py-3">
            <span className="text-green-400 w-24 flex-shrink-0 uppercase font-bold tracking-tighter">User_Name:</span>
            <input 
              type="text" required
              className="bg-transparent border-none outline-none text-slate-300 w-full placeholder:text-slate-700 placeholder:italic" 
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="flex items-center space-x-3 border-b border-white/10 py-3">
            <span className="text-green-400 w-24 flex-shrink-0 uppercase font-bold tracking-tighter">User_Email:</span>
            <input 
              type="email" required
              className="bg-transparent border-none outline-none text-slate-300 w-full placeholder:text-slate-700 placeholder:italic" 
              placeholder="user@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="flex flex-col space-y-2 py-3">
            <span className="text-green-400 uppercase font-bold tracking-tighter font-mono">Content_Packet:</span>
            <textarea 
              required rows="4"
              className="bg-black/20 border border-white/10 rounded-xl p-4 outline-none text-slate-300 w-full resize-none focus:border-teal-500/50 transition-all mt-2 placeholder:text-slate-700 font-mono" 
              placeholder="Describe your project or inquiry..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full sm:w-auto bg-teal-500/10 text-teal-400 border border-teal-500/30 px-8 py-3 rounded-xl hover:bg-teal-500/20 transition-all font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-teal-500/5 font-mono"
          >
            ./execute_send.bin
          </button>
        </form>
      </div>
    );
  };

  // --- CONTENT SECTIONS ---

  const home = (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-10">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase font-sans">
          HI, I AM <span className="text-teal-400 underline decoration-teal-500/30 underline-offset-8">ISHAN MALINDA</span>
        </h1>
        <p className="text-slate-500 font-mono tracking-[0.4em] text-[10px] md:text-xs">
          CREATIVE { '{JUNIOR}' } DEVELOPER
        </p>
        <div className="flex items-center justify-center space-x-3 pt-6">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping"></span>
          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">_ STATUS: READY FOR COMMAND...</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 pt-12 border-t border-white/5 w-full max-w-2xl">
        {[
          { id: 'about', icon: <FaInfoCircle className="text-2xl text-blue-400" />, label: 'ABOUT' },
          { id: 'links', icon: <FaLink className="text-2xl text-pink-400" />, label: 'LINKS' },
          { id: 'projects', icon: <FaBriefcase className="text-2xl text-yellow-400" />, label: 'WORK' },
          { id: 'resume', icon: <FaFileAlt className="text-2xl text-purple-400" />, label: 'CV' },
          { id: 'contact', icon: <FaEnvelope className="text-2xl text-teal-400" />, label: 'MSG' }
        ].map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5, scale: 1.05 }}
            onClick={() => setActiveFile(item.id)}
            className="flex flex-col items-center space-y-3 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-teal-500/30 group-hover:bg-teal-500/10 transition-all shadow-xl group-hover:shadow-teal-500/5">
              {item.icon}
            </div>
            <span className="text-[8px] font-bold text-slate-500 group-hover:text-teal-400 transition-colors uppercase tracking-[0.2em] font-mono">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const about = (
    <div className="space-y-8 max-w-3xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-white/5 pb-8 text-center md:text-left">
        <div className="w-28 h-28 rounded-2xl border border-teal-500/30 overflow-hidden bg-slate-900 flex-shrink-0 shadow-2xl shadow-teal-500/10 rotate-3 group hover:rotate-0 transition-transform duration-500 mx-auto md:mx-0">
          <img src={profilePic} alt="Ishan Malinda" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 pt-2">
          <h1 className="text-white font-bold text-3xl mb-2 tracking-tighter font-sans uppercase">Ishan Malinda</h1>
          <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">Junior Developer // <span className="text-teal-400">Sri Lanka 🇱🇰</span></p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
            <span className="bg-teal-500/5 text-teal-400 text-[9px] px-3 py-1 rounded-full border border-teal-500/20 font-mono">#MACHINE_LEARNING</span>
            <span className="bg-blue-500/5 text-blue-400 text-[9px] px-3 py-1 rounded-full border border-blue-500/20 font-mono">#SOFTWARE_ENGINEERING</span>
            <span className="bg-purple-500/5 text-purple-400 text-[9px] px-3 py-1 rounded-full border border-purple-500/20 font-mono">#WEB_DESIGN</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 text-slate-400 leading-relaxed text-sm md:text-base font-sans text-left">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center justify-center md:justify-start uppercase font-mono">
          <span className="w-8 h-px bg-teal-500/30 mr-3 hidden md:block"></span> Hello_World.sh
        </h2>
        <p>
          I'm a dedicated Computer Science student at the <span className="text-teal-400 font-bold border-b border-teal-500/20">University of Westminster</span> with a passion for building scalable, production-grade applications.
        </p>
        <p>
          My expertise spans <span className="text-yellow-400/80 font-bold">Full-Stack Development</span>, <span className="text-yellow-400/80 font-bold">DevOps</span>, and <span className="text-yellow-400/80 font-bold">Machine Learning</span>. I focus on creating efficient, secure, and user-centric software solutions using modern ecosystems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 font-mono">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-all group">
            <p className="text-[9px] text-slate-600 mb-3 uppercase tracking-widest font-bold">// Core_Focus</p>
            <ul className="text-[11px] space-y-2 list-none text-slate-300">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500/40 rounded-full mr-3 group-hover:bg-teal-500 transition-colors"></span>Production-Grade Architectures</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500/40 rounded-full mr-3 group-hover:bg-teal-500 transition-colors"></span>CI/CD & Dockerization</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500/40 rounded-full mr-3 group-hover:bg-teal-500 transition-colors"></span>Type-Safe Backend Systems</li>
            </ul>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-all">
            <p className="text-[9px] text-slate-600 mb-3 uppercase tracking-widest font-bold">// Academic_Status</p>
            <p className="text-xs font-bold text-teal-400 italic font-mono uppercase tracking-tighter">BSc (Hons) Computer Science</p>
            <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-tighter leading-relaxed">Expected Graduation: May 2028 // University of Westminster, London.</p>
          </div>
        </div>
        <p className="text-slate-500 italic border-l-2 border-slate-700 pl-4 py-1 font-mono text-sm text-center md:text-left">
          Interested in working with me? <span onClick={() => setActiveFile('contact')} className="text-teal-400 cursor-pointer hover:underline font-bold uppercase tracking-widest">./send_message.sh</span>
        </p>
      </div>
    </div>
  );

  const resumeSection = (
    <div className="space-y-6 text-slate-300 pr-2 font-mono text-xs overflow-y-auto max-h-full text-left">
      <div className="border-b border-white/10 pb-4 mb-8">
        <h1 className="text-teal-400 font-bold text-3xl uppercase tracking-tighter">ISHAN MALINDA</h1>
        <p className="text-slate-500 mt-2 text-[10px] uppercase tracking-widest leading-loose">ishanmalindhaims@gmail.com | +94 76 859 4685 | ishanmalinda.dev | linkedin.com/in/ishan-malinda</p>
      </div>
      <div className="space-y-10 leading-relaxed text-justify">
        <section>
          <h3 className="text-purple-400 font-bold mb-4 text-xs tracking-[0.3em] uppercase border-l-2 border-purple-500/30 pl-4">EDUCATION</h3>
          <div className="space-y-6 text-left">
            <div>
              <p className="font-bold text-teal-400 text-left">BSc (Hons.) in Computer Science | University of Westminster, London</p>
              <p className="text-slate-500 text-[10px] mt-1">Expected Graduation: May 2028</p>
            </div>
            <div>
              <p className="font-bold text-slate-300">GCE Advanced Level - Physical Science (Ana/National College)</p>
              <p className="text-slate-400 text-[10px] mt-1 italic">Combined Mathematics: B | Physics: B | Chemistry: C (2021 - 2023)</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-purple-400 font-bold mb-4 text-xs tracking-[0.3em] uppercase border-l-2 border-purple-500/30 pl-4">WORK EXPERIENCE</h3>
          <div className="space-y-6 text-left">
            <div>
              <p className="font-bold text-teal-400 uppercase tracking-tight">Junior Full-Stack Developer - Trade-Flow</p>
              <p className="text-slate-500 italic mb-2 text-[10px]">Production Product (2025 - Present)</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400 text-[10px]">
                <li>Designed and shipped a full-stack trading journal and analytics platform owning React/Vite frontend and Node/Express backend.</li>
                <li>Implemented JWT authentication, third-party payment processing, and RBAC.</li>
                <li>Visualised raw financial data using Recharts for real-time P&L dashboards.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-purple-400 font-bold mb-4 text-xs tracking-[0.3em] uppercase border-l-2 border-purple-500/30 pl-4">PROJECTS</h3>
          <div className="space-y-8 text-left">
            <div>
              <p className="font-bold text-teal-400 uppercase tracking-tight">Production-Grade API & Development System</p>
              <p className="text-slate-500 italic mb-2 text-[10px]">Multi-stage Docker | CI/CD | Node.js (2026 - Present)</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400 text-[10px]">
                <li>Architected reusable Node.js API with 4-layer architecture and multi-stage Docker builds.</li>
                <li>Automated CI/CD pipelines via GitHub Actions for ESLint, Jest, and Docker pushes.</li>
                <li>Integrated Arcjet security, Zod validation, and Drizzle ORM for type-safe persistence.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-teal-400 uppercase tracking-tight">REQRUITA (SDGP) - Anti-Cheating Interview Platform</p>
              <p className="text-slate-500 italic mb-2 text-[10px]">Electron | WebRTC | MongoDB (2025 - Present)</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400 text-[10px]">
                <li>Built tamper-resistant Electron app with browser lockdown and live WebRTC video proctoring.</li>
                <li>Developed scalable Node.js API consumed by both Electron client and Next.js admin panel.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-teal-400 uppercase tracking-tight">Macro-Economic Sentiment Tracker</p>
              <p className="text-slate-500 italic mb-2 text-[10px]">Python Scraper | Supabase | Next.js (2026 - Present)</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400 text-[10px]">
                <li>Engineered 4-tier automated data pipeline using Python/Playwright and Supabase.</li>
                <li>Visualised real-time global market mood via high-impact macroeconomic indicators.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-purple-400 font-bold mb-4 text-xs tracking-[0.3em] uppercase border-l-2 border-purple-500/30 pl-4">TECHNICAL SKILLS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400 text-[10px] font-mono text-left">
            <div>
              <p className="text-teal-400 uppercase font-bold tracking-tighter mb-1">// Frontend</p>
              <p>React.js, Next.js, TypeScript, Tailwind CSS, Vite, Recharts, ElectronJS</p>
            </div>
            <div>
              <p className="text-teal-400 uppercase font-bold tracking-tighter mb-1">// Backend</p>
              <p>Node.js, Express.js, REST API, JWT Auth, Zod, Drizzle ORM</p>
            </div>
            <div>
              <p className="text-teal-400 uppercase font-bold tracking-tighter mb-1">// Databases</p>
              <p>PostgreSQL, MongoDB, Supabase</p>
            </div>
            <div>
              <p className="text-teal-400 uppercase font-bold tracking-tighter mb-1">// DevOps & Cloud</p>
              <p>Docker, Kubernetes, GitHub Actions, CI/CD, Linux, Vercel, Render</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-purple-400 font-bold mb-4 text-xs tracking-[0.3em] uppercase border-l-2 border-purple-500/30 pl-4">REFERENCE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px] font-mono text-left">
            <div>
              <p className="text-teal-400 font-bold">Mr. Chamal Vimukthi Bandara</p>
              <p className="text-slate-500 text-[8px]">Senior Software Engineer, Cassparking Factory</p>
              <p className="text-slate-500 text-[8px]">chamalvimukthi@gmail.com</p>
            </div>
            <div>
              <p className="text-teal-400 font-bold">Mr. Nishara Milinda Sampath</p>
              <p className="text-slate-500 text-[8px]">Head of Procurement, HEINEKEN Lanka Ltd</p>
              <p className="text-slate-500 text-[8px]">nishara.sampath@heineken.com</p>
            </div>
          </div>
        </section>

        <div className="pt-10 flex flex-col sm:flex-row gap-4">
          <a href="./CV_Resume.pdf" target="_blank" rel="noopener noreferrer" download="Ishan_Malinda_CV.pdf" className="inline-block bg-teal-600/20 text-teal-400 border border-teal-500/50 px-6 py-3 rounded-xl hover:bg-teal-600/30 transition-all font-bold text-[10px] uppercase tracking-widest text-center flex-1">
            ./download_updated_cv.sh
          </a>
        </div>
        <p className="text-slate-600 text-center uppercase tracking-widest text-[9px] py-10 border-t border-white/5 mt-10">
          *** EOF: DOCUMENT TERMINATED ***
        </p>
      </div>
    </div>
  );

  const projectsSection = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 text-left">
      {[
        {
          title: "API BLUEPRINT",
          subtitle: "Production-Grade Ecosystem",
          desc: "Enterprise-ready Node.js API template featuring automated CI/CD, multi-stage Docker builds, and advanced security-as-code integration.",
          image: "/projects/api-blueprint.png",
          tags: ["Docker", "GitHub Actions", "Node.js", "Arcjet", "Drizzle"],
          github: "https://github.com/Ishan-malinda/JS-Ecosystem-Production-Grade-Blueprint",
          liveUrl: null,
          features: ["Multi-Stage Docker", "Automated CI/CD", "Security-as-Code"]
        },
        {
          title: "TRADE-FLOW",
          subtitle: "Smart Analytics",
          desc: "Data-driven trading ecosystem combining performance journals with professional analytics and LMS curriculum.",
          image: "/projects/tradeflow.png",
          tags: ["React", "Express", "SQLite", "Recharts"],
          github: "https://github.com/Ishan-malinda/TradeFlow",
          liveUrl: "https://trade-flow-v2.vercel.app/",
          features: ["Strategy Analytics", "Equity Charts", "LMS Architecture"]
        },
        {
          title: "REQRUITA",
          subtitle: "Anti-Cheating Portal",
          desc: "Secure, distraction-free environment for technical interviews. Engineers hardware validation gates and kiosk enforcement.",
          image: "/projects/reqruita.png",
          tags: ["Electron", "React", "WebRTC", "Node.js"],
          github: "https://github.com/Ishan-malinda/Reqruita-CS80",
          liveUrl: "https://reqruita.com/",
          features: ["Hardware Gate", "Kiosk Mode", "Real-time Monitoring"]
        },
        {
          title: "BANK LOAN PREDICTION",
          subtitle: "Risk & Amount Analysis",
          desc: "Machine learning system for predicting loan approvals and maximum eligible amounts using classification and regression models.",
          image: "/projects/bank-loan.png",
          tags: ["Python", "Scikit-Learn", "Pandas", "Plotly"],
          github: "https://github.com/Ishan-malinda/Machine-Learning-Algorithm-for-Bank-Loan-System-Prediction",
          liveUrl: null,
          features: ["Risk Classification", "Regression Pricing", "Hyperparameter Tuning"]
        },
        {
          title: "MACRO SENTIMENT",
          subtitle: "Automated Sentiment Analysis",
          desc: "A fully automated 4-tier data pipeline that scrapes high-impact economic data, calculates live market sentiment, and displays it on a premium dashboard.",
          image: "/projects/macro-sentiment.png",
          tags: ["Python", "Playwright", "Supabase", "Next.js", "Node.js"],
          github: "https://github.com/Ishan-malinda/Macro-Economic-Sentiment-Tracker",
          liveUrl: "https://macro-economic-sentiment-tracker.vercel.app/",
          features: ["4-Tier Pipeline", "Automated Scraper", "Live Sentiment Meter"]
        },
        {
          title: "FOCUSFORGE",
          subtitle: "Productivity Tool",
          desc: "High-performance desktop productivity application designed for deep focus and progress tracking with a minimalist UI.",
          image: "/projects/focusforge.png",
          tags: ["Electron", "React", "Express", "Node.js"],
          github: "https://github.com/Ishan-malinda/FocusForge",
          liveUrl: "https://github.com/Ishan-malinda/FocusForge",
          features: ["Precision Timer", "Session History", "Desktop Native"]
        }
      ].map((p, i) => (
        <motion.div 
          key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all group flex flex-col shadow-2xl h-fit"
        >
          <div className="aspect-video relative overflow-hidden border-b border-white/10">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4">
              <h4 className="text-white font-bold text-xl tracking-tighter uppercase font-mono">{p.title}</h4>
              <p className="text-teal-500/70 text-[9px] font-mono tracking-widest uppercase">{p.subtitle}</p>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1 space-y-4">
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{p.desc}</p>
            <div className="space-y-1 text-[9px] font-mono text-slate-500">
              {p.features.map(f => <div key={f} className="flex items-center"><span className="text-teal-500 mr-2">➜</span>{f}</div>)}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {p.tags.map(tag => <span key={tag} className="text-[8px] bg-black/40 text-teal-400/60 px-2 py-1 rounded border border-white/5 font-mono uppercase">{tag}</span>)}
            </div>
            <div className="pt-4 flex gap-3">
              <button 
                onClick={() => setSelectedProject(p)}
                className="flex-1 text-center bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-[10px] py-2.5 rounded-xl font-bold transition-all border border-teal-500/20 uppercase tracking-widest font-mono"
              >
                View Details
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const linksSection = (
    <div className="flex flex-col items-center justify-center space-y-16 py-12">
      <div className="text-center space-y-4">
        <p className="text-teal-400 font-mono text-2xl font-bold tracking-[0.4em] uppercase">// Connect_Nexus</p>
        <p className="text-slate-600 text-[9px] font-mono tracking-[0.2em] uppercase leading-relaxed italic max-w-xs mx-auto">
          Established secure handshake protocol across digital platforms
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-16 max-w-2xl">
        {[
          { label: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ishan-malinda-414501318/', color: 'hover:text-blue-500' },
          { label: 'GitHub', icon: <FaGithub />, url: 'https://github.com/Ishan-malinda', color: 'hover:text-white' },
          { label: 'Twitter', icon: <FaTwitter />, url: 'https://x.com/ishan_malindha', color: 'hover:text-sky-400' },
          { label: 'Discord', icon: <FaDiscord />, url: 'https://discord.gg/585qpzaA', color: 'hover:text-indigo-400' },
          { label: 'YouTube', icon: <FaYoutube />, url: 'https://www.youtube.com/@Strategic_Club1', color: 'hover:text-red-500' },
          { label: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/wf_ims/', color: 'hover:text-pink-500' }
        ].map((link, i) => (
          <motion.a key={i} href={link.url} target="_blank" rel="noopener noreferrer" whileHover={{ y: -8, scale: 1.15 }} className="flex flex-col items-center group cursor-pointer">
            <div className={`text-6xl text-slate-700 transition-all duration-300 ${link.color} group-hover:drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]`}>
              {link.icon}
            </div>
            <span className="text-[9px] font-mono mt-4 text-slate-700 group-hover:text-teal-400 tracking-[0.2em] uppercase font-bold transition-colors">{link.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeFile) {
      case 'home': return home;
      case 'about': return about;
      case 'resume': return resumeSection;
      case 'projects': return projectsSection;
      case 'links': return linksSection;
      case 'contact': return <ContactSection />;
      default: return home;
    }
  };

  return (
    <TerminalLayout 
      openApps={openApps} setOpenApps={setOpenApps}
      activeWindow={activeWindow} setActiveWindow={setActiveWindow}
      isMinimized={isMinimized} setIsMinimized={setIsMinimized}
      activeFile={activeFile} setActiveFile={setActiveFile}
    >
      <DesktopIcons />

      {/* Independent Floating Windows */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        
        {/* Terminal Window */}
        <AnimatePresence>
          {openApps.includes('terminal') && !isMinimized && (
            <TerminalWindow 
              activeFile={activeFile} setActiveFile={setActiveFile}
              openApps={openApps} setOpenApps={setOpenApps}
              activeWindow={activeWindow} setActiveWindow={setActiveWindow}
              setIsMinimized={setIsMinimized}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFile}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </TerminalWindow>
          )}
        </AnimatePresence>

        {/* Notes Window */}
        <AnimatePresence>
          {openApps.includes('notes') && (
            <motion.div
              drag
              dragMomentum={false}
              initial={{ x: 100, y: 300, opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveWindow('notes')}
              className={`pointer-events-auto absolute ${activeWindow === 'notes' ? 'z-50' : 'z-20'}`}
            >
              <NotesApp />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Window */}
        <AnimatePresence>
          {openApps.includes('game') && (
            <motion.div
              drag
              dragMomentum={false}
              initial={{ x: 800, y: 200, opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveWindow('game')}
              className={`pointer-events-auto absolute ${activeWindow === 'game' ? 'z-50' : 'z-20'}`}
            >
              <HackerGame />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Project Details Window */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setSelectedProject(null)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <ProjectDetailWindow 
                  project={selectedProject} 
                  onClose={() => setSelectedProject(null)} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </TerminalLayout>
  );
};

export default App;
