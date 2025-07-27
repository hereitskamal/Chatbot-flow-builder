// src/components/nodes/EndNode.tsx
import { Handle, Position } from '@xyflow/react';
import { Square } from 'lucide-react';

interface EndNodeProps {
  data: {
    label: string;
  };
  selected?: boolean;
}

export function EndNode({ data, selected }: EndNodeProps) {
  return (
    <div className={`px-6 py-4 shadow-lg rounded-xl border-2 transition-all duration-200 ${
      selected ? 'border-red-500 shadow-xl shadow-red-500/20 scale-105' : 'border-red-300 hover:border-red-400 hover:shadow-xl'
    } bg-gradient-to-br from-red-50 to-red-100`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <Square size={16} className="text-white" />
        </div>
        <div>
          <div className="text-red-800 font-semibold text-sm">End</div>
          <div className="text-red-600 text-xs">Flow termination</div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 bg-red-500 border-2 border-white shadow-md hover:bg-red-600 transition-colors"
        style={{ left: -8 }}
      />
      
      {selected && (
        <div className="absolute -inset-1 bg-red-500 rounded-xl opacity-20 pointer-events-none animate-pulse"></div>
      )}
    </div>
  );
}
