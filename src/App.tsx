import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { AIPipelineStepper } from './components/AIPipelineStepper';
import { ResultsDashboard } from './components/ResultsDashboard';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { XAIModal } from './components/XAIModal';
import { ExportModal } from './components/ExportModal';
import { analyzeTenderSpecification } from './services/api';
import { AnalysisResult } from './types/standards';
import { MOCK_ANALYSIS_RESULTS } from './data/mockData';

export function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(MOCK_ANALYSIS_RESULTS.geyser);

  const [showGraph, setShowGraph] = useState(false);
  const [showXAI, setShowXAI] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleAnalyze = async (text: string, presetId?: string) => {
    setIsLoading(true);
    setActiveStep(1);

    try {
      const data = await analyzeTenderSpecification(text, presetId, (step, message) => {
        setActiveStep(step);
        setStatusMessage(message);
      });

      setResult(data);
      setIsLoading(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />

      <main className="flex-1 pb-16">
        <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />

        {isLoading && (
          <AIPipelineStepper activeStep={activeStep} statusMessage={statusMessage} />
        )}

        {!isLoading && result && (
          <ResultsDashboard
            result={result}
            onOpenGraph={() => setShowGraph(true)}
            onOpenXAI={() => setShowXAI(true)}
            onOpenExport={() => setShowExport(true)}
          />
        )}
      </main>

      <footer className="bg-doca-950 text-slate-400 py-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-semibold text-slate-300">
            ManakAI — AI-Powered Recommendation Engine for Identifying Applicable Indian Standards for Procurement Specifications
          </p>
          <p>
            Department of Consumer Affairs (DoCA) • Ministry of Consumer Affairs, Food & Public Distribution
          </p>
          <p className="text-[11px] text-slate-500">
            Built for Smart India Hackathon (SIH) Problem Statement 26108
          </p>
        </div>
      </footer>

      {showGraph && result && (
        <KnowledgeGraphView
          nodesData={result.graph.nodes}
          edgesData={result.graph.edges}
          onClose={() => setShowGraph(false)}
        />
      )}

      {showXAI && result && (
        <XAIModal
          standard={result.primary_standard}
          onClose={() => setShowXAI(false)}
        />
      )}

      {showExport && result && (
        <ExportModal
          result={result}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}

export default App;
