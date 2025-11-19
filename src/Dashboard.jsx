// src/Dashboard.jsx (v3.0 - $SKYL Token Integration)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldAlert, Activity, BrainCircuit, Zap, Terminal, Waves, ArrowRight, Clock, Coins, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

// API URL
const API_BASE = "https://skyairdropbackend-1.onrender.com/api";

export default function Dashboard() {
  const [sentimentData, setSentimentData] = useState(null);
  const [whaleData, setWhaleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [sentimentRes, whaleRes] = await Promise.all([
        axios.get(`${API_BASE}/sentiment`),
        axios.get(`${API_BASE}/whales`)
      ]);
      setSentimentData(sentimentRes.data);
      setWhaleData(whaleRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Veri hatası:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-cyan-500 animate-pulse font-mono text-xl">
        INITIALIZING HYPER LOGIC CORE...
      </div>
    </div>
  );

  const meta = sentimentData?.meta || { average_risk: 0, average_sentiment: 0 };
  const news = sentimentData?.data || [];
  const whales = whaleData || [];

  const getRiskColor = (score) => {
    if (score < 30) return "text-green-400 border-green-500/30 bg-green-500/10";
    if (score < 60) return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
    return "text-red-500 border-red-500/30 bg-red-500/10";
  };

  const shortenAddr = (addr) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Unknown';

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-cyan-900/30 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="w-10 h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-tighter">
              HYPER LOGIC AI
            </h1>
          </div>
          <p className="text-gray-500 font-mono text-xs flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            SYSTEM ONLINE • LIVE MARKET ANALYSIS
          </p>
        </div>

        {/* $SKYL TOKEN KARTI (YENİ) */}
        <div className="flex gap-4">
            <div className="bg-cyan-900/10 border border-cyan-500/30 px-6 py-3 rounded-xl flex flex-col items-center">
                <span className="text-xs text-cyan-400 font-mono uppercase tracking-widest flex items-center gap-2">
                    <Rocket className="w-3 h-3" /> Pre-Sale Price
                </span>
                <span className="text-2xl font-bold text-white">$0.0045</span>
            </div>
            <div className="bg-purple-900/10 border border-purple-500/30 px-6 py-3 rounded-xl flex flex-col items-center">
                <span className="text-xs text-purple-400 font-mono uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Launch In
                </span>
                <span className="text-2xl font-bold text-white">42 Days</span>
            </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL KOLON */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Risk Kartı */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldAlert className="w-24 h-24 text-red-500" /></div>
            <h3 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Market Risk</h3>
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-bold ${getRiskColor(meta.average_risk).split(" ")[0]}`}>{meta.average_risk}</span>
              <span className="text-sm text-gray-600 mb-2">/100</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 mt-4 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-1000" style={{ width: `${meta.average_risk}%` }} />
            </div>
          </motion.div>

          {/* Sentiment Kartı */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-24 h-24 text-cyan-500" /></div>
             <h3 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">AI Sentiment</h3>
             <div className="flex items-end gap-2">
               <span className={`text-5xl font-bold ${meta.average_sentiment > 0 ? 'text-green-400' : 'text-red-400'}`}>
                 {meta.average_sentiment > 0 ? '+' : ''}{meta.average_sentiment}
               </span>
             </div>
          </motion.div>

          {/* BALİNA LİSTESİ */}
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-800 flex items-center gap-2 bg-blue-900/10 shrink-0">
              <Waves className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-blue-100 text-sm">LIVE WHALE ALERT (BNB)</h3>
            </div>
            <div className="overflow-y-auto scrollbar-hide p-2 space-y-1 flex-1">
              {whales.map((whale, i) => (
                <motion.div 
                  key={whale.tx_hash || i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 rounded bg-gray-900/50 border border-gray-800/50 hover:border-blue-500/30 text-xs"
                >
                  <div className="flex flex-col">
                    <span className="text-blue-400 font-bold text-sm">{parseFloat(whale.amount).toFixed(2)} BNB</span>
                    <span className="text-gray-500 text-[10px]">${parseFloat(whale.amount_usd).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="font-mono">{shortenAddr(whale.from_address)}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="font-mono">{shortenAddr(whale.to_address)}</span>
                  </div>
                </motion.div>
              ))}
              {whales.length === 0 && <div className="p-4 text-center text-gray-600 text-xs">Listening for whales...</div>}
            </div>
          </div>

        </div>

        {/* SAĞ KOLON */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-500" />
              LATEST INTELLIGENCE
            </h2>
            <span className="text-xs font-mono text-cyan-500 animate-pulse">LIVE FEED</span>
          </div>
          
          <div className="space-y-3">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0A0A0A] border border-gray-800 hover:border-cyan-900/50 rounded-xl p-4 transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {item.news_source}
                    </span>
                    <span className="text-gray-600 text-[10px] font-mono">
                      {new Date(item.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskColor(item.risk_score)}`}>
                    RISK: {item.risk_score}
                  </div>
                </div>
                
                <h3 className="text-base font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors mb-1">
                  {item.headline}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
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
