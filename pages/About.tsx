
import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_NAME } from '../constants';
import { Shield, Target, Award, Rocket, Check } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const About: React.FC = () => {
  return (
    <div className="pb-32 bg-[#050505]">
      {/* Hero */}
      <section className="pt-24 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-10 text-gradient tracking-tight"
          >
            About {BRAND_NAME}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed"
          >
            Helping businesses scale through ethical, high-impact SEO strategies since 2018.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">I'm Fahad Hussain, an SEO specialist helping businesses grow online.</h2>
              <p className="text-slate-300 text-xl leading-relaxed mb-8">
                With years of experience in the digital marketing landscape, I've seen SEO evolve from simple meta-tagging to complex AI-driven intelligence. My approach combines technical precision with a deep understanding of user psychology.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 italic border-l-4 border-cyan-500 pl-8 py-2 bg-white/5 rounded-r-2xl">
                "At {BRAND_NAME}, our goal isn't just to rank your website at the top of Google. It's to deliver consistent organic traffic that actually turns into real, paying customers."
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  "Result Driven",
                  "Transparent",
                  "Long-Term Focus",
                  "White Hat Only"
                ].map((val, i) => (
                  <motion.div 
                    key={val} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + (i * 0.04), duration: 0.3 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                      <Check className="text-cyan-400 group-hover:text-black transition-colors" size={18} />
                    </div>
                    <span className="font-bold text-lg text-slate-200">{val}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/10 group relative">
                <img 
                  src="/images/fahad-hussain.jpg" 
                  alt="Fahad Hussain SEO" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1000ms] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-40 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">Our Core Values</h2>
            <p className="text-slate-400 text-xl">The principles that drive every campaign we manage.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { icon: Shield, title: "Transparency", desc: "No hidden tactics or vague reporting. You know exactly where your money goes." },
              { icon: Target, title: "Results Driven", desc: "Rankings are great, but revenue is better. We focus on the metrics that matter." },
              { icon: Rocket, title: "Long Term Growth", desc: "We build sustainable foundations that withstand algorithm changes." },
              { icon: Award, title: "Client First", desc: "Your business goals are our primary directive. We win when you win." }
            ].map((value, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className="p-10 rounded-[2.5rem] bg-zinc-950 border border-white/10 text-center transition-all duration-500"
              >
                <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <value.icon size={40} />
                </div>
                <h3 className="text-2xl font-black mb-4">{value.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-glass rounded-[4rem] p-16 md:p-24 border border-white/10 relative overflow-hidden backdrop-blur-3xl shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center tracking-tight">My SEO Toolkit & Experience</h2>
            <div className="flex flex-wrap justify-center gap-5">
              {["Ahrefs", "Semrush", "Google Search Console", "Google Analytics 4", "Screaming Frog", "SurferSEO", "PageSpeed Insights", "Hotjar"].map((tool, i) => (
                <motion.span 
                  key={tool} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.5)", backgroundColor: "rgba(6, 182, 212, 0.05)" }}
                  className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-200 font-bold text-lg hover:text-cyan-400 transition-all cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
