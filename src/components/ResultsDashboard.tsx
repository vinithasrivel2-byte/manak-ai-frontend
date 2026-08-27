import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Network, 
  HelpCircle, 
  Printer, 
  Layers, 
  Tag, 
  Sliders, 
  Award
} from 'lucide-react';
import { AnalysisResult } from '../types/standards';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onOpenGraph: () => void;
  onOpenXAI: () => void;
  onOpenExport: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onOpenGraph,
  onOpenXAI,
  onOpenExport
}) => {
  const [activeAlliedTab, setActiveAlliedTab] = useState<'All' | 'Safety' | 'Testing' | 'Installation' | 'Material'>('All');

  const { extracted_specs, primary_standard, allied_standards, specification_gaps } = result;

  const filteredAllied = activeAlliedTab === 'All' 
    ? allied_standards 
    : allied_standards.filter(a => a.type === activeAlliedTab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Banner: Extracted Parameters Pill Badges */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              AI NLP Attribute Extraction
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Identified Product Technical Parameters
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenExport}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Compliance Report</span>
            </button>
            <button
              onClick={onOpenGraph}
              className="px-3.5 py-1.5 rounded-lg bg-doca-800 text-xs font-semibold text-white hover:bg-doca-900 flex items-center space-x-1.5 shadow-sm"
            >
              <Network className="w-3.5 h-3.5 text-amber-400" />
              <span>Standards Relationship Graph</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 flex items-center space-x-2">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs text-slate-500 font-medium">Product:</span>
            <span className="text-xs font-bold text-blue-900">{extracted_specs.product}</span>
          </div>

          {extracted_specs.capacity && (
            <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-xs text-slate-500 font-medium">Capacity / Size:</span>
              <span className="text-xs font-bold text-slate-800">{extracted_specs.capacity}</span>
            </div>
          )}

          {extracted_specs.power_rating && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 flex items-center space-x-2">
              <span className="text-xs text-amber-700 font-medium">Rating:</span>
              <span className="text-xs font-bold text-amber-900">{extracted_specs.power_rating}</span>
            </div>
          )}

          {extracted_specs.mounting && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1.5 flex items-center space-x-2">
              <span className="text-xs text-purple-700 font-medium">Mounting:</span>
              <span className="text-xs font-bold text-purple-900">{extracted_specs.mounting}</span>
            </div>
          )}

          {extracted_specs.operating_voltage && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 flex items-center space-x-2">
              <span className="text-xs text-emerald-700 font-medium">Voltage:</span>
              <span className="text-xs font-bold text-emerald-900">{extracted_specs.operating_voltage}</span>
            </div>
          )}

          {extracted_specs.design_pressure && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 flex items-center space-x-2">
              <span className="text-xs text-red-700 font-medium">Pressure/Ingress:</span>
              <span className="text-xs font-bold text-red-900">{extracted_specs.design_pressure}</span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Recommendation Card */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-amber-500/80 overflow-hidden relative">
        <div className="bg-gradient-to-r from-doca-900 via-doca-800 to-doca-900 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500 text-doca-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Primary Applicable Standard
            </span>
            <span className="text-xs text-slate-300">Mandatory Specification Reference</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-300 font-medium">Relevance Match:</span>
            <div className="flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono font-bold px-2.5 py-0.5 rounded-lg text-xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{primary_standard.relevance_score}% Confidence</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-doca-900 font-mono">
                  {primary_standard.is_code}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {primary_standard.revision}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>{primary_standard.status}</span>
                </span>
                <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {primary_standard.latest_amendment}
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-800">
                {primary_standard.title}
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed">
                {primary_standard.scope_summary}
              </p>

              <div className="pt-2 flex items-center space-x-2">
                <Award className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold text-slate-700">Regulatory Requirement:</span>
                <span className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-md">
                  {primary_standard.certification_scheme}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-72 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shrink-0">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-doca-700" />
                <span>Verification Intelligence</span>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Publication Year:</span>
                  <span className="font-semibold text-slate-800">{primary_standard.publication_year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quality Order:</span>
                  <span className="font-semibold text-emerald-700">Enforced under QCO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Traceability:</span>
                  <span className="font-semibold text-slate-800">DoCA / BIS Verified</span>
                </div>
              </div>

              <button
                onClick={onOpenXAI}
                className="w-full py-2 bg-doca-700 hover:bg-doca-800 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center space-x-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Explain Why Recommended</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specification Gap Alert Banner */}
      <div className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border-2 border-red-300 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-red-600 text-white rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-red-950">
                Specification Gap & Procurement Risk Alert Detected
              </h4>
              <p className="text-xs text-red-800">
                AI detected {specification_gaps.length} missing technical / safety clauses in your tender description
              </p>
            </div>
          </div>
          <span className="bg-red-200 text-red-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
            Action Required
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {specification_gaps.map((gap, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur rounded-xl p-4 border border-red-200 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-slate-900">{gap.parameter}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    gap.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {gap.severity} Severity
                  </span>
                </div>
                <p className="text-xs text-red-700 font-medium">{gap.issue}</p>
                <p className="text-xs text-slate-700">
                  <strong className="text-emerald-700">Recommended Clause to Add:</strong> {gap.recommendation}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-block text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                  {gap.referenced_is}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Allied Standards */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-doca-700" />
              <h4 className="text-lg font-bold text-slate-900">
                Allied, Safety & Normative References
              </h4>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Standards that must be cited alongside the primary standard for complete tender compliance
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['All', 'Safety', 'Testing', 'Installation', 'Material'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAlliedTab(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  activeAlliedTab === tab
                    ? 'bg-white text-doca-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAllied.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-sm text-doca-900">{item.is_code}</span>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    item.type === 'Safety'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : item.type === 'Testing'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</h5>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>Relationship:</strong> {item.relationship}
                </p>
              </div>
              {item.clause && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Cited Clause:</span>
                  <span className="font-mono font-medium text-slate-700">{item.clause}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
