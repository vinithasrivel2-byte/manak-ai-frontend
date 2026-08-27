import React from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { X, Network, Info } from 'lucide-react';
import { GraphNodeData, GraphEdgeData } from '../types/standards';

interface KnowledgeGraphViewProps {
  nodesData: GraphNodeData[];
  edgesData: GraphEdgeData[];
  onClose: () => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  nodesData,
  edgesData,
  onClose,
}) => {
  const initialNodes = nodesData.map((node, index) => {
    const isPrimary = node.type === 'primary';
    const angle = (index / (nodesData.length - 1)) * 2 * Math.PI;
    const radius = 220;

    const x = isPrimary ? 250 : 250 + radius * Math.cos(angle);
    const y = isPrimary ? 200 : 200 + radius * Math.sin(angle);

    let bgColor = 'bg-white border-slate-300';
    let badgeColor = 'bg-slate-100 text-slate-700';

    if (node.type === 'primary') {
      bgColor = 'bg-amber-500 text-white border-amber-600 shadow-xl ring-4 ring-amber-400/30';
      badgeColor = 'bg-white text-amber-900 font-extrabold';
    } else if (node.type === 'safety') {
      bgColor = 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-md';
      badgeColor = 'bg-emerald-200 text-emerald-900';
    } else if (node.type === 'testing') {
      bgColor = 'bg-blue-50 border-blue-400 text-blue-950 shadow-md';
      badgeColor = 'bg-blue-200 text-blue-900';
    } else if (node.type === 'regulatory') {
      bgColor = 'bg-red-50 border-red-400 text-red-950 shadow-md';
      badgeColor = 'bg-red-200 text-red-900';
    }

    return {
      id: node.id,
      position: { x, y },
      data: {
        label: (
          <div className={`p-3 rounded-xl border text-center transition-all duration-200 ${bgColor}`}>
            <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold mb-1 inline-block ${badgeColor}`}>
              {node.type}
            </span>
            <div className="font-bold text-xs font-mono">{node.label}</div>
            {node.sublabel && (
              <div className="text-[10px] opacity-80 mt-0.5 font-sans">{node.sublabel}</div>
            )}
          </div>
        ),
      },
    };
  });

  const initialEdges = edgesData.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: true,
    style: { stroke: '#0284c7', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#0284c7',
    },
    labelStyle: { fontSize: 10, fill: '#475569', fontWeight: 600 },
  }));

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="px-6 py-4 bg-doca-900 text-white flex items-center justify-between border-b border-doca-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500 text-doca-950 rounded-lg">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">BIS Standards Knowledge Graph (Interactive)</h3>
              <p className="text-xs text-slate-400">
                Visual representation of normative references, safety clauses, and statutory mandates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-doca-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="font-medium text-slate-700">Primary Standard</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-700">Safety Reference</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="font-medium text-slate-700">Testing Protocol</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="font-medium text-slate-700">Statutory / QCO Order</span>
            </span>
          </div>
          <div className="text-slate-500 text-[11px] flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>Drag nodes to rearrange or zoom using scroll wheel</span>
          </div>
        </div>

        <div className="flex-1 bg-slate-100">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background gap={12} size={1} color="#cbd5e1" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};
