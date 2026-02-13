
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useAnimationFrame, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Search, Link as LinkIcon, Settings, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';
import { BRAND_NAME, SERVICES, TESTIMONIALS, PROCESS_STEPS } from '../constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const motionMouseX = useMotionValue(0);
  const motionMouseY = useMotionValue(0);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  // Create smooth springs for fluid motion
  const springConfig = { damping: 30, mass: 1, stiffness: 100 };
  const smoothMouseX = useSpring(motionMouseX, springConfig);
  const smoothMouseY = useSpring(motionMouseY, springConfig);

  // Measure the width of a single set of testimonials to know when to wrap
  useEffect(() => {
    if (tickerRef.current) {
      // tickerRef contains 4 copies. We want the width of exactly one set.
      setContentWidth(tickerRef.current.scrollWidth / 4);
    }
    
    const handleResize = () => {
      if (tickerRef.current) {
        setContentWidth(tickerRef.current.scrollWidth / 4);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track cursor movement for hero section with real-time responsive motion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const isInHero = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (isInHero && window.innerWidth >= 768) {
        // Calculate cursor position relative to hero section (-1 to 1)
        const normalizedX = (e.clientX - rect.left) / rect.width;
        const normalizedY = (e.clientY - rect.top) / rect.height;

        // Increased offset range for more responsive, noticeable effect: -25px to +25px
        const offsetRange = 25;
        const offsetX = (normalizedX - 0.5) * offsetRange * 2;
        const offsetY = (normalizedY - 0.5) * offsetRange * 2;

        // Update motion values for smooth, real-time tracking
        motionMouseX.set(offsetX);
        motionMouseY.set(offsetY);
      } else if (!isInHero && window.innerWidth >= 768) {
        // Smoothly return to origin when cursor leaves hero
        motionMouseX.set(0);
        motionMouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [motionMouseX, motionMouseY]);

  useAnimationFrame((t, delta) => {
    if (isDragging || contentWidth === 0) return;

    // Automatic scroll speed (pixels per frame)
    // Matches the previous ~45s for one full set loop
    const speed = 0.8 * (delta / 16.67); 
    let currentX = x.get() - speed;

    // Continuous looping logic:
    // If we move too far left (beyond one full set), snap back one set width
    if (currentX <= -contentWidth) {
      currentX += contentWidth;
    }
    // If we drag too far right (beyond 0), snap forward one set width
    else if (currentX > 0) {
      currentX -= contentWidth;
    }

    x.set(currentX);
  });

  const handleDragEnd = () => {
    setIsDragging(false);
    // Smoothly ensure we stay within the wrapped bounds after a drag
    let finalX = x.get();
    if (contentWidth > 0) {
      if (finalX <= -contentWidth) finalX += contentWidth;
      if (finalX > 0) finalX -= contentWidth;
      x.set(finalX);
    }
  };

  return (
    <div className="overflow-hidden bg-[#050505]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[75vh] md:min-h-[85vh] flex items-center pt-16 pb-16 md:pb-24">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              x: smoothMouseX,
              y: smoothMouseY
            }}
            className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-[80px] md:blur-[120px]" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            style={{
              x: useTransform(smoothMouseX, (val) => -val * 0.7),
              y: useTransform(smoothMouseY, (val) => -val * 0.7)
            }}
            className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px]" 
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="max-w-3xl mx-auto md:mx-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs md:text-sm font-semibold mb-6 border border-cyan-500/20 backdrop-blur-sm"
              >
                #1 Result-Driven SEO Agency
              </motion.span>
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-[1.1] text-gradient tracking-tight"
              >
                Grow Your Business with SEO That Drives Real Customers
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl text-slate-400 mb-5 md:mb-6 leading-relaxed max-w-2xl mx-auto md:mx-0"
              >
                I help businesses rank higher on Google, attract quality traffic, and turn visitors into paying customers with proven SEO strategies.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4"
              >
                <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-bold transition-all flex items-center justify-center space-x-2 glow-cyan whitespace-nowrap min-h-[48px] md:min-h-[56px]">
                    <span>Get Free SEO Audit</span>
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
                <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/services" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 md:px-10 py-3 md:py-4 rounded-full font-bold transition-all text-center backdrop-blur-sm whitespace-nowrap flex items-center justify-center min-h-[48px] md:min-h-[56px]">
                    View SEO Services
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Authority Section */}
      <section className="py-16 md:py-24 bg-white/5 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted SEO Partner for Long Term Growth</h2>
              <p className="text-slate-400 mb-8 md:mb-10 leading-relaxed text-base md:text-lg">
                Businesses trust {BRAND_NAME} to deliver ethical, data driven, and result focused SEO that creates sustainable online growth. We don't just chase rankings; we build brands.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: "Clients Served", val: "50+" },
                  { label: "Client Retention", val: "98%" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.4)" }}
                    className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 text-center transition-colors"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.val}</div>
                    <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
            >
              {['CLUTCH', 'UPWORK', 'G2 REVIEWS', 'FORBES'].map((logo, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-xl md:text-2xl font-black text-slate-300 tracking-tighter cursor-default">
                  {logo}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-6">SEO Services That Actually Work</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Tailored SEO solutions designed to improve your visibility, authority, and bottom line.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all hover:bg-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 md:mb-8 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                  {service.id === 'on-page-seo' && <Search size={28} />}
                  {service.id === 'off-page-seo' && <LinkIcon size={28} />}
                  {service.id === 'technical-seo' && <Settings size={28} />}
                  {service.id === 'local-seo' && <MapPin size={28} />}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-8 md:mb-10 leading-relaxed">
                  {service.description}
                </p>
                <Link to="/services" className="text-cyan-400 font-bold flex items-center group/link">
                  <span className="mr-2">Learn More</span>
                  <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-cyan-950/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-6xl font-bold mb-8 md:mb-10 leading-tight">Why Businesses Choose {BRAND_NAME}</motion.h2>
              <div className="space-y-6 md:space-y-8">
                {[
                  "Proven ranking strategies that deliver results",
                  "Transparent reporting and consistent communication",
                  "Strictly white hat SEO only (No risks)",
                  "Obsessed with long term sustainable growth",
                  "Results driven approach focused on ROI"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    className="flex items-start space-x-4 md:space-x-5 group"
                  >
                    <div className="mt-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                          <CheckCircle2 size={20} className="text-cyan-500" />
                        </div>
                    <p className="text-slate-300 text-base md:text-lg font-medium group-hover:text-white transition-colors">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200&h=800" alt="Professional SEO Team working" className="w-full transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <motion.div 
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-glass p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-xl"
                >
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/40 flex-shrink-0">
                      <TrendingUp className="text-black" size={28} />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black text-white">400% Avg. ROI</div>
                      <div className="text-slate-400 text-[10px] md:text-sm font-semibold uppercase tracking-wider">For our enterprise clients</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Proven Process */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-bold mb-16 md:mb-24"
          >
            My Proven SEO Process
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
          >
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -8, backgroundColor: "rgba(6, 182, 212, 0.05)", borderColor: "rgba(6, 182, 212, 0.3)" }}
                className="relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 group transition-all"
              >
                <div className="text-cyan-500 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">{step.step}</div>
                <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 leading-tight">{step.title}</h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{step.description}</p>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowRight className="text-white/20" size={24} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results and Social Proof */}
      <section className="py-24 md:py-40 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-6">Real Results for Real Businesses</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
              My SEO strategies are designed to increase rankings, traffic, leads, and revenue.
            </p>
          </motion.div>
        </div>

        {/* Scrolling Reviews Ticker - Seamless Infinite with Swipe and Drag */}
        <div className="relative mt-6 md:mt-10 overflow-hidden w-full cursor-grab active:cursor-grabbing select-none">
          {/* Edge Gradients */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
          
          <div 
            ref={scrollRef}
            className="overflow-hidden flex"
          >
            <motion.div 
              ref={tickerRef}
              className="flex space-x-4 md:space-x-8 py-6 md:py-10 pr-4 md:pr-8"
              style={{ x }}
              drag="x"
              // No constraints needed because we manually wrap the x motion value
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: "grabbing" }}
            >
              {/* Render 4 sets to ensure there is always content visible during drag and wrap */}
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div 
                  key={`${t.id}-${idx}`} 
                  className="w-[280px] sm:w-[400px] md:w-[500px] flex-shrink-0 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-950 border border-white/10 relative group/card hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-between pointer-events-auto"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div>
                    <div className="text-cyan-400 font-black text-[10px] md:text-xs uppercase tracking-widest mb-4 md:mb-6 flex items-center space-x-2">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>[{t.metric}]</span>
                    </div>
                    
                    <p className="text-base sm:text-lg md:text-2xl text-slate-300 italic mb-6 md:mb-10 leading-relaxed font-medium line-clamp-4 md:line-clamp-none select-none">
                      "{t.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 md:space-x-5 mt-auto">
                    <div className="relative flex-shrink-0">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-cyan-500 object-cover z-10 relative pointer-events-none" />
                      <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm opacity-20" />
                    </div>
                    <div className="min-w-0 select-none">
                      <div className="font-bold text-sm md:text-lg text-white truncate">Mr. {t.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-cyan-600 to-blue-900 rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-cyan-900/20"
          >
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
             <div className="relative z-10">
               <h2 className="text-2xl md:text-6xl font-black mb-6 text-white leading-tight">Get a Free SEO Checklist</h2>
               <p className="text-cyan-100 mb-8 md:mb-12 text-base md:text-xl max-w-xl mx-auto leading-relaxed">
                 Download a simple checklist to find hidden SEO issues that are stopping your website from ranking.
               </p>
               <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://drive.google.com/file/d/1EXvHHTGCPFldojCmgZUKnWVxd-DPBbhE/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-white text-blue-900 hover:text-blue-950 px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-base md:text-xl transition-all shadow-2xl items-center space-x-3 cursor-pointer"
               >
                 <span>Download Free Checklist</span>
                 <CheckCircle2 size={28} />
               </motion.a>
             </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm md:text-base">Everything you need to know about our process and results.</p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            {[
              { q: "How long does SEO take to show results?", a: "Typically, you can see initial movement within 3 months, with significant impact after 6-12 months of consistent work." },
              { q: "Is white hat SEO really safer?", a: "Yes. Ethical strategies ensure your site never gets penalized by Google algorithm updates. We follow strict search engine guidelines." },
              { q: "What is Technical SEO?", a: "It focuses on site architecture, speed, and crawlability so search engines can find and index your content easily." }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ borderColor: "rgba(6, 182, 212, 0.4)" }}
                className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 transition-colors"
              >
                <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{faq.q}</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 md:py-40 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 text-gradient tracking-tight leading-tight">Ready to Grow Your Traffic and Sales?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 md:mb-16 text-base md:text-xl leading-relaxed">
              Let's build a strong SEO strategy that brings you consistent, high quality traffic and real business growth.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="inline-flex items-center space-x-3 md:space-x-4 bg-cyan-500 hover:bg-cyan-400 text-black px-8 md:px-14 py-5 md:py-7 rounded-full font-black text-lg md:text-2xl transition-all glow-cyan shadow-2xl shadow-cyan-500/20 group">
                <span>Book Free SEO Consultation</span>
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
