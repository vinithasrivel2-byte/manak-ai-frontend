import React from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import { AnalysisResult } from '../types/standards';

interface ExportModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ result, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="px-6 py-4 bg-doca-900 text-white flex items-center justify-between border-b border-doca-800">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Tender Standards Compliance Specification Sheet</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-doca-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6 text-slate-900" id="printable-sheet">
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Government of India • Ministry of Consumer Affairs
            </div>
            <div className="text-sm font-bold text-slate-700">DEPARTMENT OF CONSUMER AFFAIRS (DoCA)</div>
            <div className="text-xl font-extrabold mt-1 text-slate-900">
              MANDATORY INDIAN STANDARDS COMPLIANCE CERTIFICATE
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Generated via ManakAI Procurement Intelligence Platform • Reference: DOCA/BIS/2026/0491
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-800 mb-2 uppercase tracking-wide">
              1. Procurement Item Overview
            </h4>
            <table className="w-full text-xs border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="bg-slate-100 font-semibold p-2 w-1/3">Identified Product</td>
                  <td className="p-2 font-bold">{result.extracted_specs.product}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="bg-slate-100 font-semibold p-2">Capacity / Rating</td>
                  <td className="p-2">{result.extracted_specs.capacity || result.extracted_specs.power_rating || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="bg-slate-100 font-semibold p-2">Application Scope</td>
                  <td className="p-2">{result.extracted_specs.application}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-800 mb-2 uppercase tracking-wide">
              2. Mandatory Primary Indian Standard
            </h4>
            <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg">
              <div className="flex justify-between font-mono font-bold text-sm text-doca-900 mb-1">
                <span>{result.primary_standard.is_code}</span>
                <span className="text-emerald-700">Relevance: {result.primary_standard.relevance_score}%</span>
              </div>
              <div className="font-semibold text-xs text-slate-800 mb-2">{result.primary_standard.title}</div>
              <p className="text-xs text-slate-600">{result.primary_standard.scope_summary}</p>
              <div className="mt-2 text-xs font-bold text-red-700">
                Certification Mandate: {result.primary_standard.certification_scheme}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-800 mb-2 uppercase tracking-wide">
              3. Allied Safety & Testing Standards to Cite
            </h4>
            <table className="w-full text-xs border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300">
                <tr>
                  <th className="p-2 text-left">IS Code</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Clause</th>
                </tr>
              </thead>
              <tbody>
                {result.allied_standards.map((allied, i) => (
                  <tr key={i} className="border-b border-slate-200">
                    <td className="p-2 font-mono font-bold">{allied.is_code}</td>
                    <td className="p-2">{allied.type}</td>
                    <td className="p-2">{allied.title}</td>
                    <td className="p-2 font-mono">{allied.clause || 'General'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-800 mb-2 uppercase tracking-wide">
              4. Recommended Tender Specification Corrections
            </h4>
            <div className="space-y-2">
              {result.specification_gaps.map((gap, i) => (
                <div key={i} className="p-2.5 bg-red-50 border border-red-200 rounded text-xs">
                  <div className="font-bold text-red-900">{gap.parameter}: {gap.issue}</div>
                  <div className="text-slate-700 mt-1"><strong>Action:</strong> {gap.recommendation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            Complies with Department of Consumer Affairs & BIS Guidelines
          </span>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-lg bg-doca-800 text-white text-xs font-bold hover:bg-doca-900 flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
