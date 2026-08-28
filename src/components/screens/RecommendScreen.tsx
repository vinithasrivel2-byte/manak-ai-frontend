import React from 'react';
import { InputSection } from '../InputSection';
import { ResultsDashboard } from '../ResultsDashboard';
import { SkeletonCard } from '../common/SkeletonCard';
import { AnalysisResult } from '../../types/standards';

interface RecommendScreenProps {
  onAnalyze: (text: string, presetId?: string) => void;
  isLoading: boolean;
  result: AnalysisResult | null;
  onOpenGraph: () => void;
  onOpenXAI: () => void;
  onOpenExport: () => void;
}

export const RecommendScreen: React.FC<RecommendScreenProps> = ({
  onAnalyze,
  isLoading,
  result,
  onOpenGraph,
  onOpenXAI,
  onOpenExport
}) => {
  return (
    <div className="space-y-6">
      {/* Input Hub */}
      <InputSection onAnalyze={onAnalyze} isLoading={isLoading} />

      {/* Skeleton Loading State matching final cards */}
      {isLoading && (
        <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
          <div className="text-center mb-2">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Evaluating BIS Standards Seed & AI Vector Index...
            </span>
          </div>
          <SkeletonCard />
        </div>
      )}

      {/* Results View */}
      {!isLoading && result && (
        <ResultsDashboard
          result={result}
          onOpenGraph={onOpenGraph}
          onOpenXAI={onOpenXAI}
          onOpenExport={onOpenExport}
        />
      )}
    </div>
  );
};
