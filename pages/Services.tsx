
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';
import ImageWithFallback from '../components/ImageWithFallback';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Services: React.FC = () => {
  return (
    <div className="pb-32 bg-[#050505]">
      {/* Header */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-6xl md:text-8xl font-black mb-8 text-gradient tracking-tight"
          >
            Our SEO Expertise
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed"
          >
            Data-driven strategies designed to help you dominate your market and turn search rankings into sustainable revenue.
          </motion.p>
        </div>
      </section>

      {/* Service Details */}
      <section className="pt-16 pb-32 space-y-48">
        {SERVICES.map((service, idx) => (
          <motion.div 
            key={service.id} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className={`flex-1 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8 border border-cyan-500/20 backdrop-blur-sm"
                >
                  {service.title}
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-[1.15] text-white tracking-tight">{service.longDescription}</h2>
                <div className="grid grid-cols-1 gap-6 mb-12">
                  {service.features.map((feature, fIdx) => (
                    <motion.div 
                      key={fIdx} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: fIdx * 0.05 }}
                      className="flex items-center space-x-4 group/item"
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover/item:bg-cyan-500/20 transition-colors">
                        <Check size={18} className="text-cyan-400" />
                      </div>
                      <span className="text-slate-300 text-lg font-semibold group-hover/item:text-white transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="inline-flex items-center space-x-3 bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-5 rounded-full font-black text-lg transition-all glow-cyan group">
                    <span>Get Started</span>
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: idx % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex-1 relative ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative group">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 border-[8px] border-white/5 rounded-[3rem] pointer-events-none" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-glass border border-white/10 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden backdrop-blur-3xl shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
          <h2 className="text-4xl md:text-7xl font-black mb-10 text-white tracking-tight">Not sure which service you need?</h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-xl leading-relaxed">
            Book a free 15-minute strategy call, and we'll audit your site and suggest the best path forward for your specific business goals.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="inline-flex bg-white text-black px-14 py-6 rounded-full font-black text-xl hover:bg-slate-200 transition-all shadow-2xl">
              Schedule Free Strategy Call
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
