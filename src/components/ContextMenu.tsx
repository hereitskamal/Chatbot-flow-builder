// src/components/ContextMenu.tsx
import { Trash2, Edit3, Copy } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';

interface ContextMenuProps {
  nodeId: string;
  x: number;
  y: number;
  onClose: () => void;
}

export function ContextMenu({ nodeId, x, y, onClose }: ContextMenuProps) {
  const { deleteNode, nodes } = useFlowStore();
  
  const node = nodes.find(n => n.id === nodeId);
  const canDelete = node?.type !== 'startNode';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(nodeId);
    onClose();
  };

  return (
    <div 
      className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[160px]"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700"
        onClick={() => onClose()}
      >
        <Edit3 size={14} />
        Edit Properties
      </button>
      
      <button
        className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700"
        onClick={() => onClose()}
      >
        <Copy size={14} />
        Duplicate
      </button>
      
      <hr className="my-1 border-slate-100" />
      
      <button
        className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 ${
          canDelete 
            ? 'hover:bg-red-50 text-red-600' 
            : 'text-slate-400 cursor-not-allowed'
        }`}
        onClick={canDelete ? handleDelete : undefined}
        disabled={!canDelete}
        title={!canDelete ? "Cannot delete start node" : "Delete node"}
      >
        <Trash2 size={14} />
        Delete Node
        {!canDelete && <span className="text-xs ml-auto">(Protected)</span>}
      </button>
    </div>
  );
}
