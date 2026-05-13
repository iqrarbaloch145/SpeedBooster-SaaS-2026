import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Zap, LogOut, User, CreditCard, Mail, ExternalLink, Menu, X, Globe, MessageSquare, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-inter selection:bg-indigo-500/30 flex flex-col">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-slate-950/80 backdrop-blur-md border-white/10 shadow-lg py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex flex-shrink-0 items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-xl blur group-hover:blur-md transition-all opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl text-white shadow-md">
                    <Zap size={22} className="group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <span className="font-outfit font-bold text-2xl tracking-tight text-white group-hover:text-indigo-100 transition-colors">
                  SpeedBooster
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {!user && (
                <>
                  <a href="/#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
                  <a href="/#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How it Works</a>
                  <a href="/#testimonials" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Testimonials</a>
                </>
              )}
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === '/dashboard' ? 'text-white' : 'text-slate-400'}`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/billing" 
                    className={`text-sm font-medium flex items-center gap-1.5 transition-colors hover:text-white ${location.pathname === '/billing' ? 'text-white' : 'text-slate-400'}`}
                  >
                    <CreditCard size={16} /> Billing
                  </Link>
                </>
              )}
            </div>
            
            {/* Desktop Auth / User Actions */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <User size={12} className="text-indigo-400" />
                    </div>
                    {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all hover:scale-105"
                  >
                    Start Free Trial
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800/50"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 mt-4">
                {!user && (
                  <>
                    <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">Features</a>
                    <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">How it Works</a>
                    <a href="/#testimonials" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">Testimonials</a>
                    <div className="h-px bg-white/10 my-4"></div>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">Log in</Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 mt-2 text-center rounded-xl text-base font-semibold text-white bg-indigo-600">Start Free Trial</Link>
                  </>
                )}
                {user && (
                  <>
                    <div className="px-3 py-3 flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <User size={20} className="text-indigo-400" />
                       </div>
                       <div>
                         <div className="font-medium text-white">{user.name}</div>
                         <div className="text-xs text-slate-400">{user.email}</div>
                       </div>
                    </div>
                    <div className="h-px bg-white/10 my-2"></div>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">Dashboard</Link>
                    <Link to="/billing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"><CreditCard size={18} /> Billing</Link>
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"><LogOut size={18} /> Logout</button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="flex-1 flex flex-col pt-24 relative z-10">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      
      <footer className="border-t border-white/10 pt-16 pb-8 mt-20 relative z-10 bg-slate-950 overflow-hidden">
        {/* Footer Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[200px] bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg text-white shadow-md inline-flex">
                  <Zap size={18} />
                </div>
                <span className="font-outfit font-bold text-xl tracking-tight text-white">
                  SpeedBooster
                </span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                The most advanced platform for optimizing web performance, analyzing Core Web Vitals, and boosting your SEO rankings automatically.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><MessageSquare size={20} /></a>
                <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><Globe size={20} /></a>
                <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><Share2 size={20} /></a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Performance Guides</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Support Center</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h4 className="text-white font-semibold mb-6">Stay up to date</h4>
              <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for the latest performance tips.</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder-slate-500"
                />
                <button 
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2.5 transition-colors flex items-center justify-center"
                >
                  <Mail size={16} />
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} SpeedBooster Technologies, Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
