// src/components/nodes/InputNode.tsx
import { Handle, Position } from '@xyflow/react';
import { Keyboard, X } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

interface InputNodeProps {
  id: string; // Add id prop
  data: {
    label: string;
    prompt?: string;
    inputType?: 'text' | 'choice' | 'number';
    choices?: string[];
  };
  selected?: boolean;
}

export function InputNode({ id, data, selected }: InputNodeProps) {
  const { deleteNode } = useFlowStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div className={`relative group px-0 py-0 shadow-sm rounded-md border-2 transition-all duration-200 w-48 ${
      selected 
        ? 'border-purple-500 shadow-md shadow-purple-500/20 scale-105' 
        : 'border-purple-200 hover:border-purple-300 hover:shadow-md'
    } bg-white`}>
      
      {/* Delete button - only show when selected */}
      {selected && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors z-10"
          title="Delete node"
        >
          <X size={12} />
        </button>
      )}

      {/* Compact Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2 py-1.5 rounded-t-md">
        <div className="flex items-center gap-1.5">
          <Keyboard size={12} />
          <span className="font-medium text-xs">User Input</span>
        </div>
      </div>

      {/* Compact Content */}
      <div className="p-2">
        <div className="text-xs rounded p-1.5 border border-dashed border-purple-200 bg-purple-50 text-purple-800 min-h-[1.5rem] flex items-center">
          <div className="break-words w-full line-clamp-1 leading-tight">
            {data.prompt || 'Waiting for input...'}
          </div>
        </div>
        
        {/* Compact Input Type Indicator */}
        <div className="mt-1.5 flex items-center">
          <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
            {data.inputType || 'text'}
          </span>
        </div>
      </div>

      {/* Smaller Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2.5 h-2.5 bg-purple-500 border border-white shadow-sm"
        style={{ left: -5 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5 bg-purple-500 border border-white shadow-sm"
        style={{ right: -5 }}
      />

      {/* Subtle Selection Indicator */}
      {selected && (
        <div className="absolute -inset-0.5 bg-purple-400 rounded-md opacity-15 pointer-events-none"></div>
      )}
    </div>
  );
}
