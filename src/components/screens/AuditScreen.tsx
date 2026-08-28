import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Printer, Download } from 'lucide-react';
import { AnalysisResult } from '../../types/standards';

interface AuditScreenProps {
  result: AnalysisResult | null;
  onOpenExport: () => void;
}

export const AuditScreen: React.FC<AuditScreenProps> = ({ result, onOpenExport }) => {
  const gaps = result?.specification_gaps || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Tender <span className="text-red-600">Specification Audit & Gaps</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated verification of missing testing, safety ratings, and statutory certifications in procurement specifications.
          </p>
        </div>
        <button
          onClick={onOpenExport}
          className="self-start sm:self-auto px-4 py-2 bg-doca-800 text-white rounded-xl text-xs font-bold shadow hover:bg-doca-900 transition flex items-center space-x-1.5 active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Export Compliance Report</span>
        </button>
      </div>

      {/* Audit Checklist Status */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Tender Clause Verification Matrix
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">Primary Product Standard</span>
            <span className="font-bold text-emerald-700">✓ IS Identified</span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <span className="font-semibold text-emerald-950">Mandatory QCO Order</span>
            <span className="font-bold text-emerald-700">✓ Enforced Scheme</span>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
            <span className="font-semibold text-amber-950">Normative Safety Standards</span>
            <span className="font-bold text-amber-800">⚠️ Partial Citation</span>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between">
            <span className="font-semibold text-red-950">Proof Pressure / Test Clauses</span>
            <span className="font-bold text-red-700">⚠️ Missing from Tender</span>
          </div>
        </div>
      </div>

      {/* Active Detected Gaps */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Detected Gaps & Corrective Recommendations ({gaps.length})
        </h4>

        {gaps.map((gap, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-xl border border-red-200 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">{gap.parameter}</span>
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
            <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Benchmark Reference:</span>
              <span className="font-bold text-doca-800">{gap.referenced_is}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
