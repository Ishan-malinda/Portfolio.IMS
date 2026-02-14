import React, { useState } from 'react';
import TerminalLayout from './TerminalLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaDiscord, 
  FaYoutube, 
  FaInstagram, 
  FaEnvelope 
} from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-green-400 font-mono"
      >
        <p>➜ Message sent successfully!</p>
        <p>➜ I will get back to you as soon as possible.</p>
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
      <div className="text-slate-300">
        <p className="text-teal-400 font-bold text-xl mb-4"># Contact Me</p>
        <p className="mb-4 text-sm">Have a question or want to work together? Drop me a message below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm max-w-lg">
        <div className="flex items-center space-x-2 border-b border-slate-700 py-2">
          <span className="text-green-400 w-20">name:</span>
          <input 
            type="text" 
            required
            className="bg-transparent border-none outline-none text-slate-300 w-full" 
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="flex items-center space-x-2 border-b border-slate-700 py-2">
          <span className="text-green-400 w-20">email:</span>
          <input 
            type="email" 
            required
            className="bg-transparent border-none outline-none text-slate-300 w-full" 
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="flex flex-col space-y-1 py-2">
          <span className="text-green-400">message:</span>
          <textarea 
            required
            rows="4"
            className="bg-slate-900/50 border border-slate-700 rounded p-2 outline-none text-slate-300 w-full resize-none focus:border-teal-500 transition-colors mt-2" 
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>
        <button 
          type="submit"
          className="bg-teal-600/20 text-teal-400 border border-teal-500/50 px-6 py-2 rounded hover:bg-teal-600/30 transition-all font-bold"
        >
          ./submit_message.bin
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [activeFile, setActiveFile] = useState('about');

  // 1. About Section
  const about = (
    <div className="space-y-6">
      <p className="text-teal-400 font-bold text-2xl"># Who Am I?</p>
      <div className="space-y-4 text-slate-300 leading-relaxed">
        <p>
          I am an aspiring <span className="text-teal-400 font-bold">Computer Science student</span> with a deep passion for 
          Web Development and Data Science. I bridge the gap between complex logic and artistic design.
        </p>
        <p>
          Currently, I'm focusing on <span className="text-yellow-400">Machine Learning</span> and <span className="text-yellow-400">Data Mining</span> 
          to build smarter, data-driven applications that solve real-world problems.
        </p>
        <p className="bg-slate-900/50 border-l-4 border-teal-500 p-4 italic text-slate-400">
          "I believe code is a mix of logic and art. Every line should be as efficient as it is beautiful."
        </p>
      </div>
    </div>
  );

  // 2. CV/Resume Section
  const resume = (
    <div className="space-y-6 text-slate-300">
      <p className="text-teal-400 font-bold text-xl mb-4"># Professional Summary</p>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-purple-400 font-bold underline mb-3 text-lg uppercase tracking-wider">Education</h3>
          <div className="border-l-2 border-slate-700 pl-4 py-2 hover:border-teal-500 transition-colors">
            <p className="font-bold text-teal-400">BSc (Hons) in Computer Science</p>
            <p className="text-xs text-slate-400 italic">2022 - Present</p>
          </div>
        </section>

        <section>
          <h3 className="text-purple-400 font-bold underline mb-3 text-lg uppercase tracking-wider">Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/30 p-3 rounded border border-slate-800">
              <p className="text-teal-400 font-bold mb-1">Frontend</p>
              <p className="text-sm">React, Tailwind CSS, JavaScript (ES6+), Framer Motion</p>
            </div>
            <div className="bg-slate-900/30 p-3 rounded border border-slate-800">
              <p className="text-teal-400 font-bold mb-1">Backend</p>
              <p className="text-sm">Node.js, Express, MongoDB, SQL</p>
            </div>
            <div className="bg-slate-900/30 p-3 rounded border border-slate-800">
              <p className="text-teal-400 font-bold mb-1">Data Science</p>
              <p className="text-sm">Python, ML, Data Mining, Pandas, TensorFlow</p>
            </div>
            <div className="bg-slate-900/30 p-3 rounded border border-slate-800">
              <p className="text-teal-400 font-bold mb-1">Tools</p>
              <p className="text-sm">Git, GitHub, Docker, Gemini AI, VS Code</p>
            </div>
          </div>
        </section>

        <a 
          href="#" 
          className="inline-block bg-teal-600/20 text-teal-400 border border-teal-500/50 px-6 py-3 rounded hover:bg-teal-600/30 transition-all font-bold"
        >
          📄 Download Full CV (PDF)
        </a>
      </div>
    </div>
  );

  // 3. Projects Section
  const projects = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          className="border border-slate-700 p-5 rounded bg-slate-900/50 transition-colors flex flex-col justify-between"
        >
          <div>
            <h4 className="text-teal-400 font-bold text-lg">{p.title}</h4>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a href={p.link} className="text-blue-400 text-xs mt-6 block hover:underline font-mono">view_on_github.exe</a>
        </motion.div>
      ))}
    </div>
  );

  // 4. Links Section
  const links = (
    <div className="space-y-12 text-center py-8">
      <div className="relative inline-block">
        <p className="text-teal-400 font-mono text-3xl font-bold tracking-widest uppercase">
          // Connect With Me
        </p>
        <div className="h-1 w-full bg-teal-500/30 mt-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/3 bg-teal-400 shadow-[0_0_10px_#2dd4bf]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 max-w-3xl mx-auto">
        {[
          { label: 'LINKEDIN', icon: <FaLinkedin />, url: 'https://linkedin.com', color: 'hover:text-blue-500' },
          { label: 'GITHUB', icon: <FaGithub />, url: 'https://github.com/Ishan-malinda', color: 'hover:text-white' },
          { label: 'TWITTER', icon: <FaTwitter />, url: 'https://twitter.com', color: 'hover:text-sky-400' },
          { label: 'DISCORD', icon: <FaDiscord />, url: 'https://discord.com', color: 'hover:text-indigo-400' },
          { label: 'YOUTUBE', icon: <FaYoutube />, url: 'https://youtube.com', color: 'hover:text-red-500' },
          { label: 'INSTAGRAM', icon: <FaInstagram />, url: 'https://instagram.com', color: 'hover:text-pink-500' }
        ].map((link, i) => (
          <motion.a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -8, scale: 1.1 }}
            className="flex flex-col items-center group"
          >
            <div className={`text-6xl mb-4 text-slate-500 transition-all duration-300 ${link.color} group-hover:drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]`}>
              {link.icon}
            </div>
            <p className="text-xs font-mono tracking-[0.2em] text-slate-500 group-hover:text-teal-400 transition-colors">
              {link.label}
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeFile) {
      case 'about': return about;
      case 'resume': return resume;
      case 'projects': return projects;
      case 'links': return links;
      case 'contact': return <ContactSection />;
      default: return about;
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
