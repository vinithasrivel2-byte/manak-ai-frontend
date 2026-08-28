import React, { useState } from 'react';
import { Search, ShieldCheck, Tag, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CatalogItem {
  is_code: string;
  product: string;
  category: string;
  status: 'Verified / Active' | 'Amended' | 'Withdrawn / Expired';
  qco_status: 'Mandatory QCO' | 'Voluntary';
  year: number;
}

const SEED_STANDARDS: CatalogItem[] = [
  { is_code: 'IS 2082:2018', product: 'Stationary Storage Type Electric Water Heaters', category: 'Electrical', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2018 },
  { is_code: 'IS 302-2-21', product: 'Safety of Household Electrical Storage Heaters', category: 'Safety', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2018 },
  { is_code: 'IS 10322 (Pt 5)', product: 'Luminaires for Road and Street Lighting', category: 'Lighting', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2012 },
  { is_code: 'IS 16102 (Pt 1)', product: 'Self-Ballasted LED Lamps for General Lighting', category: 'Lighting', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2012 },
  { is_code: 'IS 2825:1969', product: 'Code for Unfired Fusion Welded Pressure Vessels', category: 'Mechanical', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2021 },
  { is_code: 'IS 1786:2008', product: 'High Strength Deformed Steel Bars (TMT) for Concrete', category: 'Civil', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2008 },
  { is_code: 'IS 14543:2004', product: 'Packaged Drinking Water (Other than Natural Mineral)', category: 'Food & Safety', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2004 },
  { is_code: 'IS 4984:2016', product: 'High Density Polyethylene (HDPE) Pipes for Water', category: 'Piping', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2016 },
  { is_code: 'IS 15410:2003', product: 'Mineral Water (Packaged)', category: 'Food & Safety', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2003 },
  { is_code: 'IS 694:2010', product: 'PVC Insulated Cables for Working Voltages up to 1100V', category: 'Electrical', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2010 },
  { is_code: 'IS 814:2004', product: 'Covered Electrodes for Manual Metal Arc Welding', category: 'Mechanical', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2004 },
  { is_code: 'IS 1239 (Pt 1)', product: 'Steel Tubes, Tubulars and Other Wrought Steel Fittings', category: 'Piping', status: 'Verified / Active', qco_status: 'Mandatory QCO', year: 2004 }
];

export const CatalogScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electrical', 'Lighting', 'Mechanical', 'Civil', 'Food & Safety', 'Piping'];

  const filtered = SEED_STANDARDS.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.is_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Indian Standards <span className="text-doca-700">Seed Catalog</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Curated index of high-demand procurement standards with instant verified status and QCO classification.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by IS code (e.g. IS 2082) or product name (e.g. Water Heater, LED)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-doca-600 focus:border-doca-600 outline-none bg-white shadow-sm"
        />
      </div>

      {/* Category Pills with active:scale-95 */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
              selectedCategory === cat
                ? 'bg-doca-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filtered.map((item, idx) => (
          <motion.div
            key={idx}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-doca-900">{item.is_code}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{item.status}</span>
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 mt-1.5 leading-snug">{item.product}</h4>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 text-slate-500">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                {item.category}
              </span>
              <span className="font-semibold text-red-700">
                {item.qco_status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
