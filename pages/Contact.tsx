
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, MessageSquare } from 'lucide-react';
import { BRAND_NAME, CONTACT_INFO } from '../constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent. We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', website: '', message: '' });
  };

  return (
    <div className="pb-32 bg-[#050505]">
      <section className="pt-24 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-10 text-gradient tracking-tight"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed"
          >
            Ready to scale your organic traffic? Fill out the form below or reach out directly via email or LinkedIn.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="p-8 md:p-12 rounded-[3rem] bg-zinc-950 border border-white/10 h-full relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[80px]" />
              <h2 className="text-3xl md:text-4xl font-black mb-12 text-white tracking-tight">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email Me", val: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                  { icon: Phone, label: "Call Me", val: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
                  { icon: Linkedin, label: "LinkedIn", val: "Connect with Fahad", href: CONTACT_INFO.linkedin, external: true }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    href={item.href} 
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center space-x-4 sm:space-x-6 p-5 sm:p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500 group overflow-hidden"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 flex-shrink-0">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{item.label}</div>
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors break-all sm:break-words line-clamp-2 sm:line-clamp-none leading-tight">{item.val}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="p-12 rounded-[3rem] bg-glass border border-white/10 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-4xl font-black mb-12 flex items-center space-x-4 text-white tracking-tight">
                <MessageSquare className="text-cyan-500" size={32} />
                <span>Send a Message</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3 ml-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3 ml-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. john@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                    />
                  </motion.div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3 ml-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3 ml-2">Website URL</label>
                    <input 
                      type="url" 
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                    />
                  </motion.div>
                </div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-3 ml-2">Your Message</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your SEO goals..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600 resize-none"
                  />
                </motion.div>
                <motion.div 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button 
                    type="submit" 
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center space-x-4 glow-cyan shadow-2xl shadow-cyan-500/30 group"
                  >
                    <span>Send Message</span>
                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
