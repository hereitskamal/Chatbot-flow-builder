// src/components/nodes/StartNode.tsx
import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';

interface StartNodeProps {
  data: {
    label: string;
  };
  selected?: boolean;
}

export function StartNode({ selected }: StartNodeProps) {
  return (
    <div className={`px-6 py-4 shadow-lg rounded-xl border-2 transition-all duration-200 ${
      selected ? 'border-green-500 shadow-xl shadow-green-500/20 scale-105' : 'border-green-300 hover:border-green-400 hover:shadow-xl'
    } bg-gradient-to-br from-green-50 to-green-100`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Play size={16} className="text-white ml-0.5" />
        </div>
        <div>
          <div className="text-green-800 font-semibold text-sm">Start</div>
          <div className="text-green-600 text-xs">Flow entry point</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 bg-green-500 border-2 border-white shadow-md hover:bg-green-600 transition-colors"
        style={{ right: -8 }}
      />
      
      {selected && (
        <div className="absolute -inset-1 bg-green-500 rounded-xl opacity-20 pointer-events-none animate-pulse"></div>
      )}
    </div>
  );
}
