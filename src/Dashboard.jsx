import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldAlert, Activity, BrainCircuit, Zap, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

// API URL (Senin Render Backend Adresin)
const API_URL = "https://skyairdropbackend-1.onrender.com/api/sentiment";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Veri çekilemedi:", error);
        setLoading(false);
      }
    };
    fetchData();
    // Her 60 saniyede bir veriyi tazele
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-cyan-500 animate-pulse font-mono text-xl">
        INITIALIZING HYPER LOGIC CORE...
      </div>
    </div>
  );

  // Veri yoksa güvenli önlem
  const meta = data?.meta || { average_risk: 0, average_sentiment: 0 };
  const news = data?.data || [];

  // Risk Rengi Belirleme
  const getRiskColor = (score) => {
    if (score < 30) return "text-green-400 border-green-500/30 bg-green-500/10";
    if (score < 60) return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
    return "text-red-500 border-red-500/30 bg-red-500/10";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-12 border-b border-cyan-900/30 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <BrainCircuit className="w-8 h-8 text-cyan-400 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-tighter">
            HYPER LOGIC AI
          </h1>
        </div>
        <p className="text-gray-500 font-mono text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          SYSTEM ONLINE • LIVE MARKET ANALYSIS
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: KPI CARDS */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Risk Score Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl relative overflow-hidden group hover:border-red-500/50 transition-colors"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldAlert className="w-24 h-24 text-red-500" />
            </div>
            <h3 className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">Market Risk</h3>
            <div className="flex items-end gap-2">
              <span className={`text-6xl font-bold ${getRiskColor(meta.average_risk).split(" ")[0]}`}>
                {meta.average_risk}
              </span>
              <span className="text-xl text-gray-600 mb-2">/100</span>
            </div>
            <div className="w-full bg-gray-800 h-2 mt-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000"
                style={{ width: `${meta.average_risk}%` }}
              />
            </div>
          </motion.div>

          {/* Sentiment Score Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-24 h-24 text-cyan-500" />
            </div>
            <h3 className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">AI Sentiment</h3>
            <div className="flex items-end gap-2">
              <span className={`text-6xl font-bold ${meta.average_sentiment > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {meta.average_sentiment > 0 ? '+' : ''}{meta.average_sentiment}
              </span>
              <span className="text-xl text-gray-600 mb-2">Score</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-mono">
              {meta.average_sentiment > 0 ? "BULLISH MOMENTUM DETECTED" : "BEARISH PRESSURE DETECTED"}
            </p>
          </motion.div>

          {/* Terminal Log */}
          <div className="bg-black border border-gray-800 rounded-xl p-4 font-mono text-xs text-green-500/80 h-48 overflow-hidden relative">
            <div className="absolute top-2 right-2"><Terminal className="w-4 h-4 text-gray-700" /></div>
            <div className="space-y-1 opacity-70">
              <p>> Initializing connection...</p>
              <p>> Connected to Neural Net [v24.0]</p>
              <p>> Fetching global news sources...</p>
              <p>> Analyzing {meta.news_count} data points...</p>
              <p>> Risk calculation complete.</p>
              <p className="animate-pulse">> Waiting for new blocks...</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* RIGHT COLUMN: NEWS GRID */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-500" />
            LATEST INTELLIGENCE
          </h2>
          
          <div className="space-y-4">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0A0A0A] border border-gray-800 hover:border-gray-600 rounded-xl p-5 transition-all hover:bg-[#0F0F0F] group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {item.news_source}
                    </span>
                    <span className="text-gray-600 text-xs font-mono">
                      {new Date(item.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(item.risk_score)}`}>
                    RISK: {item.risk_score}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
                  {item.headline}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-gray-800 pl-3">
                  {item.ai_summary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
