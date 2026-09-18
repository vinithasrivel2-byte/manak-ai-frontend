import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppHeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  activeTab: number;
}

const TAB_TITLES = ['AI Recommendation', 'BIS Standards Catalog', 'Analytics & Impact', 'Specification Audit'];

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-doca-900 text-white shadow-md border-b border-doca-800 select-none">
      {/* Top micro-ribbon */}
      <div className="bg-doca-950 px-4 py-1 text-[10px] text-slate-300 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-semibold tracking-wider uppercase truncate max-w-[220px] sm:max-w-none">
            Dept of Consumer Affairs • BIS
          </span>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-extrabold tracking-tight">
                Manak<span className="text-amber-400">AI</span>
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                App
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {TAB_TITLES[activeTab]}
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center space-x-1.5 bg-doca-800/90 px-2.5 py-1.5 rounded-lg border border-slate-700">
          <Globe className="w-3.5 h-3.5 text-slate-300" />
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-doca-900 text-white">EN</option>
            <option value="ta" className="bg-doca-900 text-white">தமிழ்</option>
            <option value="hi" className="bg-doca-900 text-white">हिंदी</option>
          </select>
        </div>
      </div>
    </header>
  );
};
