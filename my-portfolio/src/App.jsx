import React, { useState } from 'react';
import TerminalLayout from './TerminalLayout';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send this to a service
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-green-400 font-mono"
      >
        <p>➜ Message sent successfully!</p>
        <p>➜ We will get back to you soon.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs text-slate-500 hover:text-teal-400 underline"
        >
          send_another_message.sh
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <a href="https://github.com/Ishan-malinda" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors">
          <span className="mr-2">🔗</span> GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors">
          <span className="mr-2">🔗</span> LinkedIn
        </a>
        <a href="mailto:your-email@example.com" className="text-slate-400 hover:text-teal-400 transition-colors">
          <span className="mr-2">📧</span> Email
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-green-400">name:</span>
          <input 
            type="text" 
            required
            className="bg-transparent border-none outline-none text-slate-300 w-full" 
            placeholder="Type your name..."
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-400">email:</span>
          <input 
            type="email" 
            required
            className="bg-transparent border-none outline-none text-slate-300 w-full" 
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-green-400">message:</span>
          <textarea 
            required
            rows="4"
            className="bg-slate-900/50 border border-slate-700 rounded p-2 outline-none text-slate-300 w-full resize-none focus:border-teal-500 transition-colors" 
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>
        <button 
          type="submit"
          className="bg-teal-600/20 text-teal-400 border border-teal-500/50 px-4 py-2 rounded hover:bg-teal-600/30 transition-all font-bold"
        >
          ./submit_message.bin
        </button>
      </form>
    </div>
  );
};

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

  // 2. Your Project Data
  const projects = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          title: "Group Collab App",
          desc: "Built with React & Node.js. Managed via GitHub with custom Wiki integration.",
          tags: ["React", "Node.js", "GitHub API"],
          link: "#"
        },
        {
          title: "ML Sentiment Analyzer",
          desc: "A Python-based tool for analyzing social media trends using NLP.",
          tags: ["Python", "TensorFlow", "Scikit-learn"],
          link: "#"
        },
        {
          title: "Data Miner Bot",
          desc: "Automated web scraping and data cleaning pipeline for large datasets.",
          tags: ["Python", "BeautifulSoup", "Pandas"],
          link: "#"
        },
        {
          title: "Portfolio Terminal",
          desc: "An artistic portfolio designed as a macOS-style terminal window.",
          tags: ["React", "Tailwind", "Framer Motion"],
          link: "#"
        }
      ].map((p, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5, borderColor: 'rgba(20, 184, 166, 0.5)' }}
          className="border border-slate-700 p-4 rounded bg-slate-900/50 transition-colors flex flex-col justify-between"
        >
          <div>
            <h4 className="text-teal-400 font-bold">{p.title}</h4>
            <p className="text-xs text-slate-400 mt-2">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {p.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a href={p.link} className="text-blue-400 text-xs mt-4 block hover:underline">view_on_github.exe</a>
        </motion.div>
      ))}
    </div>
  );

  // 3. Skills Content
  const skills = (
    <div className="space-y-4">
       <div>
         <p className="text-purple-400 font-bold underline mb-2">Frontend Development:</p>
         <p className="text-sm text-slate-300">HTML5, CSS3, JavaScript (ES6+), React, Tailwind CSS, Framer Motion</p>
       </div>
       <div>
         <p className="text-blue-400 font-bold underline mb-2">Backend & Database:</p>
         <p className="text-sm text-slate-300">Node.js, Express, MongoDB, SQL</p>
       </div>
       <div>
         <p className="text-yellow-400 font-bold underline mb-2">Machine Learning & Data:</p>
         <p className="text-sm text-slate-300">Python, NumPy, Pandas, Scikit-learn, TensorFlow, Data Mining</p>
       </div>
       <div>
         <p className="text-green-400 font-bold underline mb-2">Tools & DevOps:</p>
         <p className="text-sm text-slate-300">Git, GitHub, Docker, Gemini AI, VS Code</p>
       </div>
    </div>
  );

  const renderContent = () => {
    switch(activeFile) {
      case 'about_me.txt': return aboutMe;
      case 'projects': return projects;
      case 'skills': return skills;
      case 'contact': return <ContactSection />;
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
