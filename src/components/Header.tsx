import React from 'react';
import { ShieldCheck, Database, Globe, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <header className="bg-doca-900 text-white border-b border-doca-800 sticky top-0 z-40 shadow-lg">
      <div className="bg-doca-950 px-4 py-1.5 text-xs text-slate-300 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-medium tracking-wide">
            MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION • DEPT OF CONSUMER AFFAIRS (DoCA)
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <span className="bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded border border-amber-600/40 font-mono">
            PS 26108 (SIH)
          </span>
          <span className="text-slate-400 hidden sm:inline">Bureau of Indian Standards (BIS) Intelligence</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Manak<span className="text-amber-400">AI</span>
              </h1>
              <span className="bg-doca-700/80 text-blue-200 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-blue-400/30">
                ProcureTech v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI Recommendation Engine for Applicable Indian Standards & Normative References
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-4 text-xs">
          <div className="hidden lg:flex items-center space-x-2 bg-doca-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <Database className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Indexed Standards</div>
              <div className="text-white font-bold font-mono">25,840+ IS Codes</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2 bg-doca-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Knowledge Graph</div>
              <div className="text-white font-bold font-mono">1.2M+ References</div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 bg-doca-800 px-2.5 py-1.5 rounded-lg border border-slate-700">
            <Globe className="w-4 h-4 text-slate-400" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-doca-900 text-white">English (Default)</option>
              <option value="ta" className="bg-doca-900 text-white">தமிழ் (Tamil)</option>
              <option value="hi" className="bg-doca-900 text-white">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
