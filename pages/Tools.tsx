import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { TOOLS } from '../constants';
import ImageWithFallback from '../components/ImageWithFallback';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Tools: React.FC = () => {
  return (
    <div className="pb-32 bg-[#050505]">
      <section className="pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-10 text-gradient tracking-tight"
          >
            Free Tools
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed"
          >
            Powerful tools designed to optimize your content, boost your SEO, and streamline your workflow. All built with simplicity and speed in mind.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {TOOLS.map((tool) => (
            <motion.div
              key={tool.id}
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              className="bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col group shadow-2xl hover:border-cyan-500/30 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-zinc-900 flex items-center justify-center">
                <Link to={`/tools/${tool.id}`} className="w-full h-full flex items-center justify-center">
                  <ImageWithFallback
                    src={tool.image}
                    alt={tool.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center space-x-2 mb-6">
                  <Zap size={16} className="text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Free Tool</span>
                </div>
                <Link to={`/tools/${tool.id}`}>
                  <h3 className="text-2xl font-black mb-6 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                    {tool.title}
                  </h3>
                </Link>
                <p className="text-slate-400 text-base mb-10 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={`/tools/${tool.id}`} 
                    className="inline-flex items-center space-x-2 text-cyan-400 font-black text-sm group/btn"
                  >
                    <span>Try Tool</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-3 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Tools;
