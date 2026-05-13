import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { Check, Loader2, CreditCard, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Billing = () => {
  const { user, updatePlan } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/billing/checkout');
      updatePlan(data.plan);
      alert('Successfully upgraded to Pro Plan!');
    } catch (error) {
      console.error('Error upgrading:', error);
      alert('Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6"
          >
            <Sparkles size={16} /> Transparent Pricing
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Choose the right plan for your workflow
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-400"
        >
          Start for free to test the waters, then upgrade when you need to optimize multiple sites and access advanced diagnostics.
        </motion.p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8">
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-3xl p-8 xl:p-10 transition-all ${
              user?.plan === 'free' 
                ? 'glass-panel border-indigo-500/30 ring-1 ring-indigo-500/50' 
                : 'glass-panel border-white/5'
            }`}
          >
            <h3 className="text-xl font-semibold leading-8 text-white flex justify-between items-center">
              Starter
              {user?.plan === 'free' && <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/30">Current Plan</span>}
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">Perfect for trying out the performance scans.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-5xl font-bold tracking-tight text-white">$0</span>
              <span className="text-sm font-semibold leading-6 text-slate-500">/month</span>
            </p>
            <button
              disabled
              className="mt-8 block rounded-xl py-3 px-4 text-center text-sm font-semibold leading-6 bg-slate-800 text-slate-400 w-full cursor-not-allowed border border-white/5"
            >
              Free Forever
            </button>
            <ul className="mt-8 space-y-4 text-sm leading-6 text-slate-300">
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-indigo-400" /> 1 Website limit</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-indigo-400" /> Desktop & Mobile Scans</li>
              <li className="flex gap-x-3 items-center text-slate-600"><Check className="h-5 w-5 flex-none text-slate-700" /> Tablet Device Scans</li>
              <li className="flex gap-x-3 items-center text-slate-600"><Check className="h-5 w-5 flex-none text-slate-700" /> One-Click Optimization</li>
              <li className="flex gap-x-3 items-center text-slate-600"><Check className="h-5 w-5 flex-none text-slate-700" /> Automated monitoring</li>
            </ul>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-3xl p-8 shadow-2xl xl:p-10 relative overflow-hidden group ${
              user?.plan === 'pro' 
                ? 'glass-panel border-indigo-500 bg-indigo-900/10 ring-2 ring-indigo-500' 
                : 'glass-panel border-indigo-500/30 bg-slate-900/80 relative before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-b before:from-indigo-500/50 before:to-purple-500/10 before:-z-10 before:rounded-3xl'
            }`}
          >
            {user?.plan !== 'pro' && (
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-indigo-500 rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
            )}
            
            <div className="flex justify-between items-center relative z-10">
              <h3 className="text-xl font-semibold leading-8 text-white flex items-center gap-2">
                <Zap className="text-indigo-400" size={20} /> Pro
              </h3>
              {user?.plan === 'pro' && <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">Active Subscription</span>}
            </div>
            
            <p className="mt-4 text-sm leading-6 text-slate-400 relative z-10">For serious developers who want blazing fast sites.</p>
            <p className="mt-6 flex items-baseline gap-x-1 relative z-10">
              <span className="text-5xl font-bold tracking-tight text-white">$25</span>
              <span className="text-sm font-semibold leading-6 text-slate-500">/month</span>
            </p>
            
            {user?.plan === 'pro' ? (
              <button
                disabled
                className="mt-8 block w-full rounded-xl bg-slate-800 py-3 px-4 text-center text-sm font-semibold leading-6 text-slate-400 cursor-not-allowed border border-white/5 relative z-10"
              >
                Already Upgraded
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="mt-8 relative z-10 block w-full rounded-xl bg-indigo-600 py-3 px-4 text-center text-sm font-bold leading-6 text-white shadow-lg hover:bg-indigo-500 hover:scale-[1.02] transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <CreditCard size={18} />} 
                Upgrade to Pro
              </button>
            )}

            <ul className="mt-8 space-y-4 text-sm leading-6 text-slate-300 relative z-10">
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-indigo-400" /> <span className="text-white font-medium">Unlimited Websites</span></li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-indigo-400" /> Desktop & Mobile Scans</li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-indigo-400" /> <span className="text-white font-medium">Tablet Device Scans</span></li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-indigo-400" /> <span className="text-white font-medium">One-Click Optimization</span></li>
              <li className="flex gap-x-3 items-center"><Check className="h-5 w-5 flex-none text-indigo-400" /> Automated monitoring</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
