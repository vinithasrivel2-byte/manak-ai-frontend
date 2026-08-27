import React from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { IndianStandard } from '../types/standards';

interface XAIModalProps {
  standard: IndianStandard;
  onClose: () => void;
}

export const XAIModal: React.FC<XAIModalProps> = ({ standard, onClose }) => {
  const { xai_explanation } = standard;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="px-6 py-4 bg-gradient-to-r from-doca-900 to-doca-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500 text-doca-950 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Explainable AI (XAI) Recommendation Trace</h3>
              <p className="text-xs text-slate-300">Why was {standard.is_code} recommended?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-doca-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
              Multi-Factor Semantic Confidence Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-500 font-medium">Scope Match</div>
                <div className="text-lg font-extrabold text-blue-700 font-mono">
                  {xai_explanation.scope_match_score}%
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-500 font-medium">Parameter Fit</div>
                <div className="text-lg font-extrabold text-emerald-700 font-mono">
                  {xai_explanation.parameter_fit_score}%
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-500 font-medium">Safety Align</div>
                <div className="text-lg font-extrabold text-amber-700 font-mono">
                  {xai_explanation.safety_alignment_score}%
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-500 font-medium">QCO Weight</div>
                <div className="text-lg font-extrabold text-purple-700 font-mono">
                  {xai_explanation.regulatory_weight}%
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2.5">
              Identified Justification Factors
            </h4>
            <div className="space-y-2">
              {xai_explanation.key_reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs text-slate-700 leading-relaxed font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Official BIS Standard Scope Citation
            </h4>
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 font-serif italic leading-relaxed">
              "{xai_explanation.matched_scope_excerpt}"
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Relevant Normative Clause Citations
            </h4>
            <div className="flex flex-wrap gap-2">
              {xai_explanation.clause_citations.map((clause, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1 rounded-lg text-xs font-mono font-medium"
                >
                  {clause}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
