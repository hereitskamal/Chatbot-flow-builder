// src/components/nodes/ConditionNode.tsx
import { Handle, Position } from '@xyflow/react';
import { GitBranch, Zap, X } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

interface ConditionNodeProps {
  id: string;
  data: {
    label: string;
    condition?: string;
    conditions?: string[]; // Array of condition strings
    branches?: { condition: string; label: string }[];
  };
  selected?: boolean;
}

export function ConditionNode({ id, data, selected }: ConditionNodeProps) {
  const { deleteNode } = useFlowStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  // Get conditions from either conditions array or branches array
  const conditions = data.conditions || [];
  const branches = data.branches || [];
  const totalBranches = Math.max(conditions.length, branches.length, 2); // Minimum 2 outputs

  // Generate dynamic handle positions
  const generateHandlePositions = (count: number) => {
    if (count === 1) return [50];
    
    const positions = [];
    const spacing = 70 / (count + 1); // Distribute evenly with padding
    
    for (let i = 0; i < count; i++) {
      positions.push(15 + (spacing * (i + 1))); // Start at 15% with even spacing
    }
    return positions;
  };

  const handlePositions = generateHandlePositions(totalBranches);

  return (
    <div className={`relative group px-0 py-0 shadow-lg rounded-xl border-2 transition-all duration-200 w-72 ${
      selected 
        ? 'border-orange-500 shadow-xl shadow-orange-500/20 scale-105' 
        : 'border-orange-200 hover:border-orange-300 hover:shadow-xl'
    } bg-white`}>
      
      {/* Delete button */}
      {selected && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors z-10"
          title="Delete node"
        >
          <X size={12} />
        </button>
      )}

      {/* Node Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch size={16} />
            <span className="font-medium text-sm">Condition</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs opacity-70">{totalBranches} paths</span>
            <Zap size={14} className="opacity-70" />
          </div>
        </div>
      </div>

      {/* Condition Content */}
      <div className="p-4">
        <div className="text-sm rounded-lg p-3 border-2 border-dashed border-orange-200 bg-orange-50 text-orange-800 min-h-[3rem]">
          {data.condition || '🔀 Add conditions for branching...'}
        </div>
        
        {/* Show condition previews */}
        {conditions.length > 0 && (
          <div className="mt-3 space-y-1">
            <div className="text-xs font-medium text-slate-600 mb-1">Conditions:</div>
            {conditions.map((condition, index) => (
              <div key={index} className="text-xs bg-gray-100 rounded px-2 py-1 flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `hsl(${(index * 360) / conditions.length}, 60%, 50%)` }}
                ></div>
                <span className="truncate">{condition || `Condition ${index + 1}`}</span>
              </div>
            ))}
          </div>
        )}

        {/* Show branch previews */}
        {branches.length > 0 && (
          <div className="mt-3 space-y-1">
            <div className="text-xs font-medium text-slate-600 mb-1">Branches:</div>
            {branches.map((branch, index) => (
              <div key={index} className="text-xs bg-blue-100 rounded px-2 py-1 flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `hsl(${(index * 360) / branches.length}, 70%, 60%)` }}
                ></div>
                <span className="truncate">{branch.label || `Branch ${index + 1}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 bg-orange-500 border-2 border-white shadow-md"
        style={{ left: -8 }}
      />
      
      {/* Dynamic Output Handles */}
      {handlePositions.map((position, index) => {
        const isDefault = index === totalBranches - 1;
        const handleId = isDefault ? 'default' : `branch-${index}`;
        const color = isDefault ? '#f97316' : `hsl(${(index * 360) / totalBranches}, 60%, 50%)`;
        
        return (
          <Handle
            key={handleId}
            type="source"
            position={Position.Right}
            id={handleId}
            className="w-4 h-4 border-2 border-white shadow-md transition-colors hover:scale-110"
            style={{ 
              right: -8, 
              top: `${position}%`,
              backgroundColor: color
            }}
            title={
              isDefault 
                ? 'Default/Else path' 
                : conditions[index] || branches[index]?.label || `Branch ${index + 1}`
            }
          />
        );
      })}

      {/* Selection indicator */}
      {selected && (
        <div className="absolute -inset-0.5 bg-orange-400 rounded-xl opacity-15 pointer-events-none"></div>
      )}
    </div>
  );
}
