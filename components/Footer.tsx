
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, ArrowUpRight } from 'lucide-react';
import { BRAND_NAME, CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" onClick={handleLinkClick} className="text-2xl font-extrabold tracking-tighter text-white">
              {BRAND_NAME.split('Pro')[0]}<span className="text-cyan-400">Pro</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Premium SEO agency delivering ethical, data-driven strategies that turn search engines into your most profitable sales channel.
            </p>
            <div className="flex space-x-4">
              <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center group">Home <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/services" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center group">Services <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/blog" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center group">Blog <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/tools" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center group">Tools <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/about" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center group">About Us <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/contact" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center group">Contact <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-cyan-500" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-cyan-500" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors">{CONTACT_INFO.phone}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Free SEO Checklist</h4>
            <p className="text-sm text-slate-400 mb-4">Subscribe to get our weekly SEO growth tips.</p>
            <form className="flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-cyan-500/50 transition-all">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow min-w-0 bg-transparent border-none px-4 py-2 text-sm focus:outline-none text-white placeholder:text-slate-600"
              />
              <button 
                type="submit"
                className="bg-cyan-500 text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-cyan-400 transition-all flex-shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" onClick={handleLinkClick} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" onClick={handleLinkClick} className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
