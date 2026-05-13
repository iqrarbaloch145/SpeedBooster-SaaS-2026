import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Play, Zap, CheckCircle2, AlertTriangle, AlertCircle, Loader2, Monitor, Smartphone, Tablet, Lock, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Report = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runningScan, setRunningScan] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [deviceTab, setDeviceTab] = useState('desktop');

  useEffect(() => {
    fetchReports();
  }, [siteId]);

  const fetchReports = async () => {
    try {
      const { data } = await api.get(`/reports/site/${siteId}`);
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunScan = async () => {
    if (deviceTab === 'tablet' && user?.plan !== 'pro') {
      if (window.confirm('Tablet scanning requires a Pro plan. Upgrade now?')) {
        navigate('/billing');
      }
      return;
    }

    setRunningScan(true);
    try {
      const { data } = await api.post('/reports/run', { siteId, deviceType: deviceTab });
      setReports([data, ...reports]);
    } catch (error) {
      console.error('Error running scan:', error);
      alert(error.response?.data?.message || 'Failed to run scan. Please try again later.');
    } finally {
      setRunningScan(false);
    }
  };

  const handleOptimize = async (reportId) => {
    setOptimizing(true);
    try {
      const { data } = await api.post('/optimize/run', { reportId });
      setReports([data.report, ...reports]);
      // Optional: replace alert with toast notification in future
      alert(`Optimization success! Score improved from ${data.originalScore} to ${data.newScore}.`);
    } catch (error) {
      console.error('Error running optimization:', error);
      alert('Failed to optimize. Please try again.');
    } finally {
      setOptimizing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 50) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
  };

  const getScoreRingColor = (score) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-50 rounded-full"></div>
          <Loader2 className="animate-spin text-indigo-400 relative z-10" size={48} />
        </div>
      </div>
    );
  }

  const filteredReports = reports.filter(r => (r.deviceType || 'desktop') === deviceTab);
  const latestReport = filteredReports[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-3xl font-bold leading-7 text-white sm:truncate sm:tracking-tight mb-2">
              Performance Analytics
            </h2>
            <p className="text-slate-400">Detailed insights and optimization opportunities.</p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row md:mt-0 gap-3">
            <button
              onClick={handleRunScan}
              disabled={runningScan || optimizing}
              className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 disabled:opacity-50 transition-all border border-white/5"
            >
              {runningScan ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              Run {deviceTab.charAt(0).toUpperCase() + deviceTab.slice(1)} Scan
            </button>
            {latestReport && (
              <button
                onClick={() => handleOptimize(latestReport._id)}
                disabled={optimizing || runningScan || latestReport.performanceScore === 100}
                className="relative group inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center">
                  {optimizing ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Zap className="mr-2 h-4 w-4" />}
                  ONE-CLICK OPTIMIZE
                </span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Device Tabs */}
      <div className="mb-8 flex gap-2 border-b border-white/10 pb-px overflow-x-auto no-scrollbar">
        {['desktop', 'mobile', 'tablet'].map((tab) => (
          <button
            key={tab}
            onClick={() => setDeviceTab(tab)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap capitalize ${
              deviceTab === tab 
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-white/20'
            }`}
          >
            {tab === 'desktop' && <Monitor size={18} />}
            {tab === 'mobile' && <Smartphone size={18} />}
            {tab === 'tablet' && <Tablet size={18} />}
            {tab}
            {tab === 'tablet' && user?.plan !== 'pro' && <Lock size={14} className="ml-1 text-slate-500" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {deviceTab === 'tablet' && user?.plan !== 'pro' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center glass-panel rounded-3xl p-12 max-w-2xl mx-auto mt-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
            <div className="mx-auto h-20 w-20 bg-slate-900 rounded-2xl flex items-center justify-center shadow-inner border border-white/5 mb-6 relative z-10">
              <Lock className="h-10 w-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Tablet Analytics is a Pro Feature</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8 relative z-10">
              Upgrade your account to unlock tablet performance testing and gain comprehensive insights across all device types.
            </p>
            <button
              onClick={() => navigate('/billing')}
              className="relative z-10 inline-flex items-center rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-indigo-500 hover:scale-105 transition-all"
            >
              Upgrade to Pro
            </button>
          </motion.div>
        ) : !latestReport && !runningScan ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center glass-panel rounded-3xl p-16 mt-12 border-dashed border-white/20"
          >
            <div className="mx-auto h-24 w-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
              {deviceTab === 'desktop' && <Monitor className="h-12 w-12 text-slate-600" />}
              {deviceTab === 'mobile' && <Smartphone className="h-12 w-12 text-slate-600" />}
              {deviceTab === 'tablet' && <Tablet className="h-12 w-12 text-slate-600" />}
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">No {deviceTab} reports found</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">Run your first {deviceTab} scan to analyze performance metrics and uncover optimization opportunities.</p>
            <button
              onClick={handleRunScan}
              className="inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] hover:bg-indigo-500 hover:scale-105 transition-all"
            >
              <Play className="mr-2 h-5 w-5" /> Initialize Scan
            </button>
          </motion.div>
        ) : runningScan && !latestReport ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center glass-panel rounded-3xl p-16 mt-12"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin direction-reverse"></div>
              <div className="absolute inset-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
              <Monitor className="absolute inset-0 m-auto h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Analyzing {deviceTab} performance...</h3>
            <p className="text-indigo-300 animate-pulse">Running Lighthouse audit. This takes about 10-20 seconds.</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Main Score Card */}
            <div className="glass-panel rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left">
                  <div className="relative flex items-center justify-center h-40 w-40 shrink-0">
                    <svg className="h-full w-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${latestReport.performanceScore}, 100` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`${getScoreRingColor(latestReport.performanceScore)}`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-5xl font-outfit font-bold text-white tracking-tighter">
                        {latestReport.performanceScore}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-white capitalize mb-3 flex items-center gap-3 justify-center sm:justify-start">
                      {deviceTab} Score
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${getScoreColor(latestReport.performanceScore)}`}>
                        {latestReport.performanceScore >= 90 ? 'Excellent' : latestReport.performanceScore >= 50 ? 'Average' : 'Poor'}
                      </span>
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Performance snapshot captured on {new Date(latestReport.createdAt).toLocaleString()}
                    </p>
                    
                    {latestReport.performanceScore < 90 && (
                      <p className="text-sm text-indigo-300 bg-indigo-500/10 px-4 py-3 rounded-xl border border-indigo-500/20 max-w-sm">
                        Use the <strong>One-Click Optimize</strong> button to automatically improve this score.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 md:gap-8 text-center w-full md:w-auto bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">LCP</p>
                    <p className="text-3xl font-outfit font-bold text-white">{latestReport.lcp}</p>
                  </div>
                  <div className="border-l border-white/5 px-4 md:px-8">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">TBT</p>
                    <p className="text-3xl font-outfit font-bold text-white">{latestReport.tbt}</p>
                  </div>
                  <div className="border-l border-white/5 pl-4 md:pl-8">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">CLS</p>
                    <p className="text-3xl font-outfit font-bold text-white">{latestReport.cls}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Issues List */}
              <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden flex flex-col">
                <div className="px-8 py-6 border-b border-white/10 bg-slate-900/30">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <AlertTriangle className="mr-3 h-5 w-5 text-amber-400" />
                    Diagnostics & Issues
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[500px] p-2">
                  <ul className="space-y-2 p-2">
                    {latestReport.issues && latestReport.issues.length > 0 ? (
                      latestReport.issues.map((issue, index) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          key={index} 
                          className="px-6 py-5 rounded-2xl bg-slate-900/40 hover:bg-slate-800/60 transition-colors border border-transparent hover:border-white/5 flex items-start gap-4"
                        >
                          {issue.includes('No major issues') ? (
                            <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0 mt-0.5">
                              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            </div>
                          ) : (
                            <div className="p-2 bg-rose-500/10 rounded-lg shrink-0 mt-0.5">
                              <AlertCircle className="h-5 w-5 text-rose-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-base text-slate-200 font-medium leading-relaxed">{issue}</p>
                            {!issue.includes('No major issues') && (
                              <p className="text-sm text-indigo-400 mt-2 flex items-center gap-1">
                                <Zap size={14} /> Auto-fixable via One-Click Optimize
                              </p>
                            )}
                          </div>
                        </motion.li>
                      ))
                    ) : (
                      <div className="px-6 py-16 text-center flex flex-col items-center justify-center h-full">
                        <div className="h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Perfect Score!</h4>
                        <p className="text-slate-400">No issues found. Your site is fully optimized.</p>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
              
              {/* History */}
              <div className="glass-panel rounded-3xl overflow-hidden flex flex-col">
                <div className="px-8 py-6 border-b border-white/10 bg-slate-900/30">
                  <h3 className="text-xl font-bold text-white">Scan History</h3>
                </div>
                
                {filteredReports.length > 1 ? (
                  <ul className="divide-y divide-white/5 overflow-y-auto max-h-[500px]">
                    {filteredReports.slice(1).map((report) => (
                      <li key={report._id} className="p-6 hover:bg-slate-800/30 transition-colors">
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${getScoreColor(report.performanceScore)} font-outfit font-bold text-lg`}>
                            {report.performanceScore}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white capitalize">{report.deviceType} Audit</p>
                            <p className="text-xs text-slate-400 mt-1">{new Date(report.createdAt).toLocaleString(undefined, {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-500 bg-slate-900/50 rounded-lg px-3 py-2">
                           <span>LCP <strong className="text-slate-300">{report.lcp}</strong></span>
                           <span>TBT <strong className="text-slate-300">{report.tbt}</strong></span>
                           <span>CLS <strong className="text-slate-300">{report.cls}</strong></span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-slate-500 h-full flex flex-col items-center justify-center">
                    <Monitor className="h-10 w-10 text-slate-700 mb-3" />
                    <p>Past scan history will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Report;
