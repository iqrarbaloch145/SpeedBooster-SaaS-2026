import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Plus, Globe, ArrowRight, Activity, Loader2, Link2, Sparkles, Trash2, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Dashboard = () => {
  const [sites, setSites] = useState([]);
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null); // stores site ID being deleted

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const { data } = await api.get('/sites');
      setSites(data);
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSite = async (e) => {
    e.preventDefault();
    if (!newSiteUrl) return;
    
    setAdding(true);
    try {
      let urlToSubmit = newSiteUrl;
      if (!urlToSubmit.startsWith('http://') && !urlToSubmit.startsWith('https://')) {
        urlToSubmit = 'https://' + urlToSubmit;
      }
      
      const { data } = await api.post('/sites', { url: urlToSubmit });
      setSites([...sites, data]);
      setNewSiteUrl('');
    } catch (error) {
      console.error('Error adding site:', error);
      alert(error.response?.data?.message || 'Failed to add site. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteSite = async (siteId) => {
    if (!window.confirm('Are you sure you want to delete this website? All reports will be lost.')) return;
    
    setDeleting(siteId);
    try {
      await api.delete(`/sites/${siteId}`);
      setSites(sites.filter(s => s._id !== siteId));
    } catch (error) {
      console.error('Error deleting site:', error);
      alert(error.response?.data?.message || 'Failed to delete site. Please try again.');
    } finally {
      setDeleting(null);
    }
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 font-outfit">
              Dashboard
            </h2>
            <p className="text-slate-400">Manage your websites and track performance insights.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="glass-panel px-5 py-3 rounded-xl flex items-center gap-3">
                <Globe className="text-indigo-400" size={20} />
                <div>
                   <div className="text-xs text-slate-400 uppercase font-semibold">Active Sites</div>
                   <div className="text-lg font-bold text-white leading-none mt-1">{sites.length}</div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Add Site Form */}
        <motion.div variants={itemVariants} className="relative group max-w-3xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass-panel rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Add New Property</h3>
            </div>
            
            <form className="sm:flex sm:items-center gap-4" onSubmit={handleAddSite}>
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Link2 className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="block w-full rounded-xl border-0 py-4 pl-12 bg-slate-900/80 text-white shadow-inner ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm transition-all placeholder-slate-500"
                  placeholder="https://yourwebsite.com"
                  value={newSiteUrl}
                  onChange={(e) => setNewSiteUrl(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={adding || !newSiteUrl}
                className="mt-4 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {adding ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Plus className="mr-2 h-5 w-5" />}
                Analyze Site
              </button>
            </form>
          </div>
        </motion.div>

        {/* Sites List */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Activity className="text-indigo-400" size={20} />
              Your Monitored Sites
            </h3>
          </div>
          
          {sites.length === 0 ? (
            <div className="glass-panel border-dashed rounded-3xl p-12 text-center max-w-3xl">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                <Globe className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2 font-outfit">No properties tracked yet</h3>
              <p className="text-slate-400 max-w-md mx-auto">Add your first URL above to start receiving automated Lighthouse performance insights and Core Web Vitals monitoring.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sites.map((site) => (
                <motion.div 
                  key={site._id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-panel rounded-2xl flex flex-col group overflow-hidden border-white/5 hover:border-indigo-500/50 transition-all shadow-lg relative"
                >
                  <button 
                    onClick={() => handleDeleteSite(site._id)}
                    disabled={deleting === site._id}
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors z-10 opacity-0 group-hover:opacity-100"
                    title="Delete site"
                  >
                    {deleting === site._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>

                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-14 w-14 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
                        <img 
                          src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=64`} 
                          alt="" 
                          className="h-7 w-7 relative z-10" 
                          onError={(e) => {e.target.style.display='none'}}
                        />
                        <Globe className="h-7 w-7 text-slate-700 absolute" />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <h4 className="text-lg font-semibold text-white truncate font-outfit" title={site.url}>
                          {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Clock size={12} />
                          Added {new Date(site.createdAt).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                       <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                       <span className="text-xs text-emerald-400 font-medium tracking-wide">MONITORING ACTIVE</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-4 border-t border-white/5 flex justify-between items-center group-hover:bg-indigo-500/10 transition-colors">
                    <Link 
                      to={`/reports/${site._id}`}
                      className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
                    >
                      <Activity size={16} /> 
                      <span>View Analytics</span>
                    </Link>
                    <Link 
                      to={`/reports/${site._id}`}
                      className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner"
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
