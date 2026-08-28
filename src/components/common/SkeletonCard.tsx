import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm space-y-5 animate-pulse">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-28 bg-slate-200 rounded-full"></div>
          <div className="h-5 w-20 bg-slate-200 rounded-md"></div>
        </div>
        <div className="h-6 w-24 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-2.5">
        <div className="h-7 w-3/4 bg-slate-300 rounded-lg"></div>
        <div className="h-4 w-full bg-slate-200 rounded"></div>
        <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
      </div>

      {/* Confidence Score Progress Bar Skeleton */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-4 w-36 bg-slate-200 rounded"></div>
          <div className="h-4 w-12 bg-slate-300 rounded"></div>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-slate-300 w-2/3 rounded-full animate-shimmer"></div>
        </div>
      </div>

      {/* 3 Reasoning Bullets Skeleton */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="h-4 w-40 bg-slate-200 rounded"></div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <div className="h-3.5 w-full bg-slate-200 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <div className="h-3.5 w-4/5 bg-slate-200 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <div className="h-3.5 w-2/3 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
