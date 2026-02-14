import React, { useState } from 'react';
import TerminalLayout from './TerminalLayout';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [activeFile, setActiveFile] = useState('about_me.txt');

  // 1. Your Bio Data
  const aboutMe = (
    <div className="space-y-4">
      <p className="text-teal-400 font-bold text-xl"># Who Am I?</p>
      <p>I am an aspiring Computer Science student with a deep passion for Web Development and Data Science.</p>
      <p>Currently, I'm diving into <span className="text-yellow-400">Machine Learning</span> and <span className="text-yellow-400">Data Mining</span> to build smarter applications.</p>
      <p className="text-slate-500">// I believe code is a mix of logic and art.</p>
    </div>
  );

  // 2. Your Project Data (Connect these to your GitHub names)
  const projects = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-slate-700 p-4 rounded bg-slate-900/50 hover:border-teal-500 transition-colors">
        <h4 className="text-teal-400 font-bold">Group Collab App</h4>
        <p className="text-xs text-slate-400 mt-2">Built with React & Node.js. Managed via GitHub with custom Wiki integration.</p>
        <a href="#" className="text-blue-400 text-xs mt-2 block hover:underline">view_on_github.exe</a>
      </div>
      {/* Add more project blocks here */}
    </div>
  );

  // 3. Skills Content
  const skills = (
    <div className="space-y-2">
       <p className="text-purple-400 font-bold underline">Tech Stack:</p>
       <ul className="list-disc list-inside text-sm space-y-1">
         <li>Frontend: HTML, CSS, JavaScript, React</li>
         <li>Backend: Node.js</li>
         <li>Data Science: Machine Learning, Data Mining</li>
         <li>Tools: Git, GitHub, Gemini AI</li>
       </ul>
    </div>
  );

  const renderContent = () => {
    switch(activeFile) {
      case 'about_me.txt': return aboutMe;
      case 'projects': return projects;
      case 'skills': return skills;
      default: return aboutMe;
    }
  };

  return (
    <TerminalLayout activeFile={activeFile} setActiveFile={setActiveFile}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFile}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </TerminalLayout>
  );
};

export default App;
