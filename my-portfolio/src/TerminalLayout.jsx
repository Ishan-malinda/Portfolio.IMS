import React from 'react';
import BackgroundCanvas from './BackgroundCanvas';

const TerminalLayout = ({ children, activeFile, setActiveFile }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundCanvas />
      {/* This is the Main "Window" Container */}
      <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
        
        {/* Top Bar (The "Title Bar") */}
        <div className="bg-slate-800/50 p-3 flex items-center border-b border-slate-700">
          {/* Traffic Light Buttons */}
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer shadow-md"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer shadow-md"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer shadow-md"></div>
          </div>
          
          {/* Title */}
          <div className="text-slate-400 text-sm font-mono flex-1 text-center pr-12">
            developer_portfolio — -zsh — 80x24
          </div>
        </div>

        {/* Main Content Area (Split into Sidebar and Terminal) */}
        <div className="flex h-[600px]">
          
          {/* Sidebar (File Explorer) */}
          <div className="w-64 bg-slate-900 border-r border-slate-700 hidden md:block p-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Explorer</h3>
            <ul className="space-y-2 font-mono text-sm">
              {[
                { id: 'about', icon: '📄', label: 'about_me.txt' },
                { id: 'resume', icon: '📜', label: 'cv_resume.pdf' },
                { id: 'projects', icon: '📁', label: 'projects/' },
                { id: 'links', icon: '🔗', label: 'links.sh' },
                { id: 'contact', icon: '📧', label: 'contact.md' }
              ].map((item) => (
                <li 
                  key={item.id}
                  onClick={() => setActiveFile(item.id)}
                  className={`flex items-center cursor-pointer hover:bg-slate-800 p-2 rounded transition-all ${
                    activeFile === item.id ? 'bg-slate-800 text-teal-400 border-l-2 border-teal-400' : 'text-slate-400'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span> {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* The Terminal Screen (Where the content goes) */}
          <div className="flex-1 bg-slate-950 p-6 font-mono text-slate-300 overflow-y-auto">
             {/* We will inject content here later */}
             <div className="mb-4 text-green-400">
                ➜  ~ <span className="text-blue-400">whoami</span>
             </div>
             {children}
             
             {/* The Blinking Cursor Effect */}
             <div className="mt-4 flex items-center">
                <span className="text-green-400 mr-2">➜  ~</span>
                <span className="w-2 h-5 bg-slate-400 animate-pulse"></span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TerminalLayout;
