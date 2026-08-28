import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav } from './components/layout/BottomNav';
import { MobileAppShell } from './components/layout/MobileAppShell';
import { RecommendScreen } from './components/screens/RecommendScreen';
import { CatalogScreen } from './components/screens/CatalogScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { AuditScreen } from './components/screens/AuditScreen';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { XAIModal } from './components/XAIModal';
import { ExportModal } from './components/ExportModal';
import { analyzeTenderSpecification } from './services/api';
import { AnalysisResult } from './types/standards';
import { MOCK_ANALYSIS_RESULTS } from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(MOCK_ANALYSIS_RESULTS.geyser);

  // Modals
  const [showGraph, setShowGraph] = useState(false);
  const [showXAI, setShowXAI] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleAnalyze = async (text: string, presetId?: string) => {
    setIsLoading(true);

    try {
      const data = await analyzeTenderSpecification(text, presetId);
      setResult(data);
      setIsLoading(false);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 0:
        return (
          <RecommendScreen
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            result={result}
            onOpenGraph={() => setShowGraph(true)}
            onOpenXAI={() => setShowXAI(true)}
            onOpenExport={() => setShowExport(true)}
          />
        );
      case 1:
        return <CatalogScreen />;
      case 2:
        return <DashboardScreen />;
      case 3:
        return (
          <AuditScreen
            result={result}
            onOpenExport={() => setShowExport(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Native App Header */}
      <AppHeader
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeTab={activeTab}
      />

      {/* Main Swipeable App Shell */}
      <main className="flex-1 flex flex-col">
        <MobileAppShell activeTab={activeTab} onSwipeChange={setActiveTab}>
          {renderActiveScreen()}
        </MobileAppShell>
      </main>

      {/* Fixed Native Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals / Drawers */}
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
