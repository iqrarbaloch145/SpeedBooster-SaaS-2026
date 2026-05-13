import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Activity, Shield, ArrowRight, ChevronRight, CheckCircle2, BarChart, Settings, Globe, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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

const Landing = () => {
  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-50 selection:bg-indigo-500/30">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pb-40 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
              SpeedBooster SaaS 2.0 is live
              <ChevronRight size={14} />
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter max-w-5xl leading-[1.1]">
              Make your website <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                lightning fast
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
              SpeedBooster analyzes your website performance using Lighthouse and provides automated one-click optimizations. Improve your SEO, conversion rates, and user experience instantly.
            </motion.p>

            <motion.div variants={fadeIn} className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-medium rounded-full overflow-hidden transition-all hover:bg-indigo-500 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Optimizing Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-slate-300 font-medium border border-slate-800 hover:bg-slate-800/80 transition-all w-full sm:w-auto bg-slate-900/50 backdrop-blur-sm"
              >
                <PlayCircle size={18} /> Watch Demo
              </a>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-12 flex items-center gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-slate-950" src="https://i.pravatar.cc/100?img=1" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-950" src="https://i.pravatar.cc/100?img=2" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-950" src="https://i.pravatar.cc/100?img=3" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-950" src="https://i.pravatar.cc/100?img=4" alt="User" />
                <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs">+2k</div>
              </div>
              <p>Trusted by over 2,000 developers worldwide</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Dashboard Preview / Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl mb-32"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent rounded-2xl pointer-events-none"></div>
          <div className="rounded-xl overflow-hidden border border-white/5 bg-slate-950 aspect-[16/10] relative flex items-center justify-center shadow-inner">
             {/* Abstract Mockup inside */}
             <div className="absolute inset-0 flex flex-col pointer-events-none opacity-90">
                <div className="h-12 w-full border-b border-white/5 bg-slate-900/50 flex items-center px-6 gap-4">
                   <div className="flex gap-2">
                     <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                     <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                     <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                   </div>
                   <div className="mx-auto w-1/3 h-6 bg-slate-800 rounded-md"></div>
                </div>
                <div className="flex flex-1 p-6 gap-6">
                  <div className="w-64 border-r border-white/5 pr-6 hidden md:block">
                    <div className="h-6 w-32 bg-white/10 rounded mb-8"></div>
                    <div className="space-y-4">
                      <div className="h-8 w-full bg-indigo-500/20 rounded-md border border-indigo-500/30"></div>
                      <div className="h-8 w-full bg-white/5 rounded-md"></div>
                      <div className="h-8 w-full bg-white/5 rounded-md"></div>
                      <div className="h-8 w-full bg-white/5 rounded-md"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="h-32 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 p-5 flex flex-col justify-between">
                        <div className="text-xs text-indigo-300 font-medium tracking-wider">PERFORMANCE</div>
                        <div className="flex items-end gap-2">
                           <div className="text-5xl text-white font-outfit font-bold leading-none">98</div>
                           <div className="text-emerald-400 text-sm font-medium mb-1">+12%</div>
                        </div>
                      </div>
                      <div className="h-32 rounded-2xl bg-white/5 border border-white/5 p-5 flex flex-col justify-between">
                        <div className="text-xs text-slate-400 font-medium tracking-wider">ACCESSIBILITY</div>
                        <div className="flex items-end gap-2">
                           <div className="text-5xl text-white font-outfit font-bold leading-none">100</div>
                        </div>
                      </div>
                      <div className="h-32 rounded-2xl bg-white/5 border border-white/5 p-5 flex flex-col justify-between">
                        <div className="text-xs text-slate-400 font-medium tracking-wider">SEO SCORE</div>
                        <div className="flex items-end gap-2">
                           <div className="text-5xl text-white font-outfit font-bold leading-none">92</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 rounded-2xl bg-slate-900/50 border border-white/5 p-6 flex flex-col">
                      <div className="h-5 w-40 bg-white/10 rounded mb-6"></div>
                      <div className="w-full flex-1 flex items-end gap-3 pb-2 border-b border-white/5">
                        {[40, 70, 45, 90, 65, 85, 100, 75, 55, 85, 95].map((h, i) => (
                          <div key={i} className="flex-1 group relative">
                            <div className="absolute inset-x-0 bottom-0 bg-indigo-500/40 rounded-t-md group-hover:bg-indigo-400 transition-colors" style={{ height: `${h}%` }}></div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-500/80 to-transparent rounded-t-md opacity-50" style={{ height: `${h}%` }}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Logo Cloud */}
        <div className="py-12 border-y border-white/5 mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none"></div>
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Empowering modern teams</p>
          <div className="flex gap-8 md:gap-16 justify-center items-center flex-wrap opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text logos for placeholder */}
            <h3 className="text-2xl font-bold font-outfit">Vercel</h3>
            <h3 className="text-2xl font-bold font-outfit">Next.js</h3>
            <h3 className="text-2xl font-bold font-outfit">Stripe</h3>
            <h3 className="text-2xl font-bold font-outfit">Shopify</h3>
            <h3 className="text-2xl font-bold font-outfit">Figma</h3>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="py-24">
          <div className="text-center mb-20">
            <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">Simple Workflow</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              How SpeedBooster works
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>
            
            <div className="relative text-center">
               <div className="mx-auto w-24 h-24 rounded-full bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)] mb-8 relative z-10">
                  <Globe className="h-10 w-10 text-indigo-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm border-4 border-slate-950">1</div>
               </div>
               <h3 className="text-xl font-bold text-white mb-4">Connect Your Site</h3>
               <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">Simply add your website URL. No code changes or complicated integrations required.</p>
            </div>

            <div className="relative text-center">
               <div className="mx-auto w-24 h-24 rounded-full bg-slate-900 border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(168,85,247,0.5)] mb-8 relative z-10">
                  <BarChart className="h-10 w-10 text-purple-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm border-4 border-slate-950">2</div>
               </div>
               <h3 className="text-xl font-bold text-white mb-4">Deep Analysis</h3>
               <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">We run comprehensive Lighthouse audits across mobile and desktop to identify bottlenecks.</p>
            </div>

            <div className="relative text-center">
               <div className="mx-auto w-24 h-24 rounded-full bg-slate-900 border border-pink-500/30 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(236,72,153,0.5)] mb-8 relative z-10">
                  <Settings className="h-10 w-10 text-pink-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center font-bold text-sm border-4 border-slate-950">3</div>
               </div>
               <h3 className="text-xl font-bold text-white mb-4">1-Click Optimize</h3>
               <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">Our engine automatically applies fixes for Core Web Vitals, images, and blocking scripts.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-32 border-t border-white/5 mt-16 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-20">
            <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">Accelerate Growth</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto">
              Everything you need to optimize your web presence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
            >
              <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mb-6 shadow-inner">
                <Activity className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deep Analytics</h3>
              <p className="text-slate-400 leading-relaxed">
                Run comprehensive Lighthouse audits to discover Core Web Vitals issues holding your site back from ranking higher on Google.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-purple-500/30 bg-purple-900/10 shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Zap className="h-32 w-32 text-purple-400" />
              </div>
              <div className="h-14 w-14 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 mb-6 shadow-inner">
                <Zap className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One-Click Optimize</h3>
              <p className="text-slate-400 leading-relaxed relative z-10">
                Automatically minify CSS/JS, defer non-critical scripts, and compress images to boost your score instantly with a single click.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
            >
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-6 shadow-inner">
                <Shield className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Continuous Monitoring</h3>
              <p className="text-slate-400 leading-relaxed">
                Keep your site fast over time with scheduled daily scans and historical performance tracking to prevent regressions.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="py-32 border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">Wall of Love</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Loved by performance obsessives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { name: 'Sarah Jenkins', role: 'Frontend Lead at TechCorp', text: 'SpeedBooster took our main site from a 45 mobile score to a 98 in less than a day. The ROI is absolutely insane.', initial: 'S', color: 'bg-pink-500' },
               { name: 'Marcus Chen', role: 'Indie Hacker', text: "I used to spend days tweaking webpack and images. Now I just plug my site into SpeedBooster and focus on building features.", initial: 'M', color: 'bg-indigo-500' },
               { name: 'Elena Rodriguez', role: 'SEO Consultant', text: 'This is the secret weapon I use for all my clients. Core Web Vitals are a breeze to fix now.', initial: 'E', color: 'bg-emerald-500' },
             ].map((t, i) => (
               <div key={i} className="glass-panel p-8 rounded-3xl bg-slate-900/40 border border-white/5">
                 <div className="flex items-center gap-2 mb-6">
                   {[1,2,3,4,5].map(s => <Zap key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}
                 </div>
                 <p className="text-slate-300 text-lg mb-8 leading-relaxed">"{t.text}"</p>
                 <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-xl`}>{t.initial}</div>
                   <div>
                     <div className="text-white font-bold">{t.name}</div>
                     <div className="text-slate-500 text-sm">{t.role}</div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-32">
          <div className="glass-panel rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-indigo-500/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/30 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to boost your site?</h2>
              <p className="text-xl text-slate-300 mb-10">Join thousands of developers who are delivering lightning fast web experiences.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/register" className="px-8 py-4 bg-white text-indigo-950 font-bold rounded-full hover:bg-slate-100 transition-colors w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Start 14-Day Free Trial
                </Link>
                <span className="text-slate-400 text-sm">No credit card required.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Landing;
