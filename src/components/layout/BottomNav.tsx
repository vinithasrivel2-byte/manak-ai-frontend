import React from 'react';
import { Sparkles, BookOpen, BarChart3, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export interface NavItem {
  id: number;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 0, label: 'Recommend', shortLabel: 'AI Search', icon: Sparkles },
  { id: 1, label: 'Standards', shortLabel: 'Catalog', icon: BookOpen },
  { id: 2, label: 'Analytics', shortLabel: 'Impact', icon: BarChart3 },
  { id: 3, label: 'Audit', shortLabel: 'Gaps', icon: ShieldAlert },
];

interface BottomNavProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg select-none pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto px-3 py-1 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors duration-150 ${
                isActive ? 'text-doca-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-blue-50/80 rounded-xl -z-10 border border-blue-200/50"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 text-doca-700' : ''}`} />
                {item.id === 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight font-medium ${isActive ? 'font-bold text-doca-700' : ''}`}>
                {item.shortLabel}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
