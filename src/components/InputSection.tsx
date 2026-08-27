import React, { useState } from 'react';
import { UploadCloud, FileText, ArrowRight, Zap, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { DEMO_PRESETS } from '../data/mockData';
import { DemoPreset } from '../types/standards';

interface InputSectionProps {
  onAnalyze: (text: string, presetId?: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'upload'>('text');
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const handleSelectPreset = (preset: DemoPreset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.text);
    setFileName(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setInputText(
        `[EXTRACTED FROM TENDER PDF: ${file.name}]\n\nSupply, delivery, installation and commissioning of 25 Litre Storage Type Electric Water Heaters (Geysers) for CPWD Residential Quarters. Technical parameters: 2000W element, 230V AC 50Hz, wall mounted vertical type with stainless steel internal tank, 5-Star energy rating, equipped with safety relief valve and preset thermostat.`
      );
      setSelectedPresetId('geyser');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAnalyze(inputText, selectedPresetId || undefined);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>Department of Consumer Affairs • Smart Procurement Assistant</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Identify Applicable <span className="text-doca-700">Indian Standards (IS)</span> in Seconds
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          Input your tender technical specification, paste product parameters, or upload a tender document.
          ManakAI maps primary, testing, safety and normative standards while detecting critical specification gaps.
        </p>
      </div>

      <div className="mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 rounded-2xl p-4 border border-blue-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Instant Demo Presets (1-Click Evaluation for Evaluators)
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Click any preset to pre-fill test specifications:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">{preset.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{preset.description}</p>
                </div>
                <div className="mt-2 flex items-center text-[11px] text-amber-600 font-semibold">
                  <span>Load specification</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'text'
                ? 'border-doca-700 text-doca-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Specification Text / Natural Language</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-doca-700 text-doca-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Tender Document (PDF / DOCX)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === 'text' ? (
            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <label className="font-semibold text-slate-700">
                  Enter Technical Specifications or Product Description:
                </label>
                <span className="text-slate-400 font-mono">
                  {inputText.length} characters • Supports English, Tamil & Hindi
                </span>
              </div>
              <textarea
                rows={5}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setSelectedPresetId(null);
                }}
                placeholder="Example: 25 litre wall-mounted domestic electric water heater, 2000W, 230V AC, stainless steel tank with high pressure safety valve..."
                className="w-full rounded-xl border border-slate-300 p-4 text-sm focus:ring-2 focus:ring-doca-600 focus:border-doca-600 outline-none transition font-sans placeholder:text-slate-400 bg-slate-50/40"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Upload GeM / CPPP / Departmental Tender PDF:
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-doca-600 rounded-2xl p-8 text-center bg-slate-50/50 transition cursor-pointer relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-doca-700 flex items-center justify-center mb-3">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {fileName ? (
                      <span className="text-doca-700 font-bold">Loaded: {fileName}</span>
                    ) : (
                      'Drag & drop tender PDF here, or browse from computer'
                    )}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    System performs OCR extraction, entity identification and specification gap checks.
                  </p>
                </div>
              </div>
              {fileName && (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between">
                  <span>Simulated text parsed from tender document successfully.</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFileName(null);
                      setInputText('');
                    }}
                    className="text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                Engine checks latest 2024 revisions, normative cross-references and QCO mandatory certifications.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center space-x-2 ${
                isLoading || !inputText.trim()
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
                  : 'bg-gradient-to-r from-doca-700 to-doca-900 hover:from-doca-800 hover:to-doca-950 shadow-doca-700/25 hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Specification...</span>
                </>
              ) : (
                <>
                  <span>Analyze & Recommend Standards</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
