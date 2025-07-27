// src/components/NodesPanel.tsx
import {
  GitBranch,
  HelpCircle,
  Keyboard,
  MessageSquare,
  Square,
  Zap,
} from "lucide-react";

export function NodesPanel() {

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypes = [
    {
      type: "messageNode",
      label: "Message",
      icon: MessageSquare,
      color: "blue",
      description: "Send text messages",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      type: "inputNode", 
      label: "User Input",
      icon: Keyboard,
      color: "purple",
      description: "Collect user responses",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200", 
      textColor: "text-purple-900",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      type: "conditionNode",
      label: "Condition",
      icon: GitBranch,
      color: "orange",
      description: "Branch based on responses",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-900", 
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      type: "endNode",
      label: "End Flow",
      icon: Square,
      color: "red",
      description: "Terminate conversation",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-900",
      iconBg: "bg-red-100", 
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Header - Reduced padding */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Node Library</h3>
            <p className="text-xs text-slate-500">Building blocks for your flow</p>
          </div>
        </div>
      </div>

      {/* Node List - Compact version */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className={`group relative flex items-center gap-3 p-3 border ${node.borderColor} ${node.bgColor} rounded-lg cursor-grab hover:shadow-sm hover:scale-[1.01] transition-all duration-150 active:scale-95`}
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
            data-node-type={node.type}
          >
            <div className={`w-8 h-8 ${node.iconBg} rounded-md flex items-center justify-center flex-shrink-0`}>
              <node.icon size={16} className={node.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className={`${node.textColor} font-medium text-sm`}>
                {node.label}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {node.description}
              </div>
            </div>

            {/* Drag indicator - smaller */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-0.5">
              <div className="w-0.5 h-0.5 bg-slate-400 rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-slate-400 rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Section - More compact */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={14} className="text-slate-600" />
          <h4 className="font-medium text-slate-700 text-sm">Quick Guide</h4>
        </div>
        
        <div className="space-y-2 text-xs text-slate-600">
          {[
            "Drag nodes to canvas",
            "Connect via handles", 
            "Click to edit properties"
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-indigo-600">{index + 1}</span>
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
