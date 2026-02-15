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
  FaEnvelope,
  FaWhatsapp 
} from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct mailto link
    const subject = `Portfolio Message from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    const mailtoLink = `mailto:ishanmalindhaims@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-green-400 font-mono"
      >
        <p>➜ Opening your email client...</p>
        <p>➜ If it didn't open, please email directly to ishanmalindhaims@gmail.com</p>
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
        <p className="mb-4 text-sm text-slate-400 font-mono italic">
          // Have a question or want to work together? Drop me a message below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <a href="mailto:ishanmalindhaims@gmail.com" className="flex items-center space-x-3 text-slate-400 hover:text-teal-400 transition-colors bg-slate-900/40 p-3 rounded border border-slate-800">
            <FaEnvelope className="text-xl" />
            <span className="text-sm font-mono">ishanmalindhaims@gmail.com</span>
          </a>
          <a href="https://wa.me/94720382182" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-400 hover:text-teal-400 transition-colors bg-slate-900/40 p-3 rounded border border-slate-800">
            <FaWhatsapp className="text-xl text-green-500" />
            <span className="text-sm font-mono">+94 72 038 2182</span>
          </a>
        </div>
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-slate-800 pb-8">
        <div className="w-32 h-32 rounded-lg border-2 border-teal-500 overflow-hidden bg-slate-800 flex-shrink-0 shadow-[0_0_15px_rgba(45,212,191,0.3)]">
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs text-center p-2 font-mono uppercase tracking-tighter">
            [User Photo]
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-teal-400 font-bold text-3xl mb-1">Ishan Malinda</h1>
          <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Junior Developer based in <span className="text-white">Sri Lanka 🇱🇰</span></p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            <span className="bg-teal-500/10 text-teal-400 text-[10px] px-2 py-1 rounded border border-teal-500/20">#MACHINE_LEARNING</span>
            <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-1 rounded border border-blue-500/20">#SOFTWARE_ENGINEERING</span>
            <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-1 rounded border border-purple-500/20">#WEB_DESIGN</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 text-slate-300 leading-relaxed text-base">
        <h2 className="text-xl font-bold text-white">Hello there... I'm Ishan.</h2>
        <p>
          I'm a passionate and motivated Computer Science student at the <span className="text-teal-400 font-bold">University of Westminster (IIT)</span> with a strong foundation in 
          Programming languages, Software development and Problem solving skills.
        </p>
        
        <p>
          I’m passionate about <span className="text-yellow-400">Machine learning</span>, <span className="text-yellow-400">Algorithms</span> and creating efficient, user-friendly software solutions. 
          I am committed to continuous learning through real-world projects and independent exploration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 font-mono">
          <div className="bg-slate-900/40 p-4 rounded border border-slate-800 hover:border-teal-500/50 transition-colors">
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-tighter">// Expertise</p>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Web Design and Development</li>
              <li>Software Engineering & System design</li>
              <li>Machine Learning & Algorithms</li>
            </ul>
          </div>
          <div className="bg-slate-900/40 p-4 rounded border border-slate-800 hover:border-teal-500/50 transition-colors">
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-tighter">// Development_Profile</p>
            <p className="text-sm font-bold text-teal-400 italic">Continuous Learner</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Focused on Scalability & Performance</p>
          </div>
        </div>

        <p className="text-slate-500 italic border-l-2 border-slate-700 pl-4 py-1 font-mono text-sm">
          Interested in working with me? <span onClick={() => setActiveFile('contact')} className="text-teal-400 cursor-pointer hover:underline font-bold">./send_message.sh</span>
        </p>
      </div>
    </div>
  );

  // 2. CV/Resume Section
  const resume = (
    <div className="space-y-6 text-slate-300 overflow-y-auto pr-2 max-h-full font-mono text-xs text-justify">
      <div className="border-b border-slate-800 pb-4 mb-6 text-left">
        <h1 className="text-teal-400 font-bold text-2xl uppercase tracking-tighter">ISHAN MALINDA</h1>
        <p className="text-slate-500 mt-1">Near to Church, Anamaduwa | ishanmalindhaims@gmail.com | linkedin.com/in/Ishan_Malinda</p>
      </div>

      <div className="space-y-8">
        {/* Profile Info */}
        <section>
          <h3 className="text-purple-400 font-bold mb-3 text-sm uppercase tracking-widest">PROFILE INFO</h3>
          <p className="leading-relaxed text-slate-400 italic">
            Highly motivated computer science student at University of westminster(IIT) with strong foundation in Programming 
            languages, System design, Softwere development and Problem solving skills. I’m passionate about Machine learning, 
            Algorithms, creating efficient user-friendly software solutions with committed to continuous learning through real-
            world projects and independent exploration. Currently seeking an internship opportunity to strengthen my technical 
            expertise, collaborate with industry professionals and contribute value to a forward-thinking tech organisation.
          </p>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-purple-400 font-bold mb-3 text-sm uppercase tracking-widest">EDUCATION</h3>
          <div className="space-y-4">
            <div className="text-left">
              <p className="font-bold text-teal-400">Bsc (Hons) Computer Science | University of Westminster ( IIT Sri Lanka ) - Since 2024</p>
              <div className="mt-2 space-y-2">
                <div>
                  <p className="text-slate-500 uppercase font-bold">Modules (2 year) :</p>
                  <p className="text-slate-400">Object Oriented Programming, Client - Server Architectures, Database Systems, Software Development Group Project, Algorithms & Data structures, Machine learning & Data mining</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase font-bold">Modules (1 year) :</p>
                  <p className="text-slate-400">Mathematics for Computing, Software Development ( Python ), Computer Systems Fundamentals, Software Development II (Java ), Trends in Computer Science, Web Design and Development</p>
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-300">Passed Advanced Level(A/L) in Physical Science (Anamaduwa National College) - Since 2023</p>
              <p className="text-slate-400">Chemistry - B | Com. Maths - C | Physics - C</p>
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-300">Passed Ordinary Level(O/L) (Anamaduwa National College) - Since 2020</p>
            </div>
          </div>
        </section>

        {/* Experience / Projects */}
        <section>
          <h3 className="text-purple-400 font-bold mb-3 text-sm uppercase tracking-widest">EXPERIENCE (PROJECTS)</h3>
          <div className="space-y-6 text-left">
            <div>
              <p className="font-bold text-teal-400 uppercase">REQRUITA - Advanced interview monitoring platform</p>
              <p className="text-slate-500 italic mb-2">Academic project - SDGP (2025-present)</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400">
                <li>Architected a cross-platform desktop application for Interviews using Electron and React with Vite, implementing an IPC (Inter-Process Communication) bridge to securely connect the system-level shell with the UI renderer.</li>
                <li>Developed a high-performance Landing Page and Admin Dashboard using Next.js, TypeScript and Tailwind CSS focusing on a responsive, clean architectural structure for managing large-scale interview data.</li>
                <li>Engineered a scalable Backend utilizing Node.js and Express.js, integrated with Next.js API routes to handle complex business logic and interview scheduling.</li>
                <li>Implemented Secure Authentication using JSON Web Tokens (JWT) to manage session-based access control across different user roles (Admin, Interviewer, Interviewee).</li>
                <li>Designed a Dual-Database Strategy using SQLite for lightweight, local desktop data persistence and MongoDB for centralized, cloud-based storage of interview recordings and analytics.</li>
                <li>Engineered a Secure Interview Lockdown System that enforces mandatory full-screen mode and utilizes Electron’s window-level event listeners to detect and block application switching.</li>
                <li>Developed a real-time monitoring engine using WebRTC APIs to facilitate simultaneous, low-latency streams for camera, microphone and screen-sharing validation.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-teal-400 uppercase">Trade-Flow: Smart Trading Assistant Platform</p>
              <p className="text-slate-500 italic mb-2">Individual project (2025 - present)</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400">
                <li>Architected a comprehensive Trading Journal and Analytics Dashboard using React and Vite, featuring real-time equity charts, performance heatmaps and a modular "Evaluation Panel" for quantitative strategy analysis.</li>
                <li>Developed a Multi-Module Learning Management System (LMS) with a structured "Academy" and "Foundations" section, utilizing a centralized data architecture to manage curriculum across Technical Analysis, Risk Management, and Psychology.</li>
                <li>Engineered a Secure Backend Infrastructure with Node.js and Express.js, implementing a clean controller-service-route pattern to handle complex operations for trade journaling and user management.</li>
                <li>Implemented a Secure Payment Processing System by creating dedicated API routes to handle financial transactions, ensuring seamless integration between the user's subscription status and premium platform features.</li>
                <li>Designed a Scalable Database Schema using SQLite (via better-sqlite3), optimizing data persistence for high-frequency trade entries, user progress tracking in the Academy, and secure authentication logs.</li>
                <li>Developed a Robust Authentication System using JSON Web Tokens (JWT) and bcrypt for password hashing, protected by custom middleware to enforce secure access to the Journal and Academy dashboards.</li>
                <li>Integrated Interactive Data Visualization using Recharts to transform raw trading data into actionable insights, including profit calendars, statistics cards and multi-axis performance graphs.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h3 className="text-purple-400 font-bold mb-3 text-sm uppercase tracking-widest">TECHNICAL SKILLS</h3>
          <div className="space-y-2 text-slate-400 text-left">
            <p><span className="text-teal-400">Front-end & Core :</span> HTML, Tailwind CSS, JavaScript, React.js, Electron.js, Type-Script, JavaFx</p>
            <p><span className="text-teal-400">Back-end & DataBase :</span> Java, Python, Node.js, Express.js, Rest API, MySQL, MongoDB, PostgreSQL</p>
            <p><span className="text-teal-400">Tools & Design :</span> Git & Github actions, Draw.io, Figma, Notion, Click-up, AWS, ORMs</p>
          </div>
        </section>

        {/* Soft Skills */}
        <section>
          <h3 className="text-purple-400 font-bold mb-3 text-sm uppercase tracking-widest">SOFT SKILLS</h3>
          <p className="text-slate-400 text-left">Time Management, Critical Thinking, Problem Solving, Analysis Skills</p>
        </section>

        {/* Reference */}
        <section>
          <h3 className="text-purple-400 font-bold mb-3 text-sm uppercase tracking-widest">REFERENCE</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="text-slate-400">
              <p className="font-bold text-teal-400">Mr Pushpika Prasad Liyanaarachchii</p>
              <p className="text-[10px]">Senior Lecturer</p>
              <p className="text-[10px]">Informatics Institute of Technology (IIT), Sri Lanka</p>
              <p className="text-[10px]">Mobile : +94 76 149 08 60</p>
              <p className="text-[10px]">Email : Parad.I@iit.ac.lk</p>
            </div>
            <div className="text-slate-400">
              <p className="font-bold text-teal-400">Mr A.N.M. Sampath</p>
              <p className="text-[10px]">Head of Procurement</p>
              <p className="text-[10px]">HEINEKEN LANKA LIMITED</p>
              <p className="text-[10px]">Mobile : +94 77 354 62 50</p>
              <p className="text-[10px]">Email : Nishara.milinda@dblanka.com</p>
            </div>
          </div>
        </section>

        <a 
          href="/CV_Resume.pdf" 
          download="Ishan_Malinda_CV.pdf"
          className="inline-block bg-teal-600/20 text-teal-400 border border-teal-500/50 px-6 py-3 rounded hover:bg-teal-600/30 transition-all font-bold text-sm"
        >
          ./download_full_cv.sh
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
