import React from 'react';
import { CheckCircle2, CircleDashed, Cpu, Database, Network, ShieldAlert, FileSearch } from 'lucide-react';

interface AIPipelineStepperProps {
  activeStep: number;
  statusMessage: string;
}

const STEPS = [
  { id: 1, label: 'Document & OCR Parsing', icon: FileSearch },
  { id: 2, label: 'Technical Entity Extraction', icon: Cpu },
  { id: 3, label: 'Semantic Vector Search', icon: Database },
  { id: 4, label: 'Knowledge Graph Traversal', icon: Network },
  { id: 5, label: 'Version & Gap Validation', icon: ShieldAlert },
];

export const AIPipelineStepper: React.FC<AIPipelineStepperProps> = ({ activeStep, statusMessage }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            Multi-Stage Recommendation Pipeline Active
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Semantic Intelligence Engine in Progress
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">{statusMessage}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = activeStep > step.id;
            const isCurrent = activeStep === step.id;

            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : isCurrent
                    ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-300/50 text-blue-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="mb-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : isCurrent ? (
                    <CircleDashed className="w-6 h-6 text-blue-600 animate-spin" />
                  ) : (
                    <Icon className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="text-[11px] font-bold tracking-tight">Step {step.id}</div>
                <div className="text-xs font-semibold mt-0.5 leading-tight">{step.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
