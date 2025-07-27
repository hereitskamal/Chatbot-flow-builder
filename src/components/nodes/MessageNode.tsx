// Update each node component (example with MessageNode.tsx)
import { Handle, Position } from "@xyflow/react";
import { MessageSquare, X } from "lucide-react";
import { useFlowStore } from '../../store/flowStore';

interface MessageNodeProps {
  id: string; // Add id prop
  data: {
    label: string;
    message?: string;
  };
  selected?: boolean;
}

export function MessageNode({ id, data, selected }: MessageNodeProps) {
  const { deleteNode } = useFlowStore();
  const hasMessage = data.message && data.message.trim().length > 0;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div
      className={`relative group px-0 py-0 shadow-sm rounded-md border-2 transition-all duration-200 w-48 ${
        selected
          ? "border-blue-500 shadow-md shadow-blue-500/20 scale-105"
          : "border-blue-200 hover:border-blue-300 hover:shadow-md"
      } bg-white`}
    >
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
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1.5 rounded-t-md">
        <div className="flex items-center gap-1.5">
          <MessageSquare size={12} />
          <span className="font-medium text-xs">Message</span>
        </div>
      </div>

      {/* Rest of your existing code... */}
      <div className="p-2">
        <div
          className={`text-xs rounded p-1.5 border border-dashed transition-colors min-h-[1.5rem] flex items-center ${
            hasMessage
              ? "bg-gray-50 border-gray-200 text-gray-700"
              : "bg-blue-50 border-blue-200 text-blue-600"
          }`}
        >
          <div className="break-words w-full line-clamp-1 leading-tight">
            {hasMessage ? data.message : "Add message..."}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-2.5 h-2.5 bg-blue-500 border border-white shadow-sm hover:bg-blue-600 transition-colors"
        style={{ left: -5 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5 bg-blue-500 border border-white shadow-sm hover:bg-blue-600 transition-colors"
        style={{ right: -5 }}
      />

      {selected && (
        <div className="absolute -inset-0.5 bg-blue-400 rounded-md opacity-15 pointer-events-none"></div>
      )}
    </div>
  );
}
