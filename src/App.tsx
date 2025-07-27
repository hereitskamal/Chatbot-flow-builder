// src/App.tsx
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "@xyflow/react";
import { useCallback, useState, useEffect } from "react";
import { useFlowStore } from "./store/flowStore";
import { Header } from "./components/Header";
import { NodesPanel } from "./components/NodesPanel";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { StartNode } from "./components/nodes/StartNode";
import { MessageNode } from "./components/nodes/MessageNode";
import { EndNode } from "./components/nodes/EndNode";
import { InputNode } from "./components/nodes/InputNode";
import { ConditionNode } from "./components/nodes/ConditionNode";
import { CustomEdge } from "./components/edges/CustomEdge";
import { ExamplesLibrary } from "./components/ExamplesLibrary";
import { Tutorial } from "./components/Tutorial";
import { SmartHelp } from "./components/SmartHelp";
import { ContextMenu } from "./components/ContextMenu";
import { Maximize2, Minimize2, Monitor, Smartphone, Tablet } from "lucide-react";
import type { Node, Edge } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  startNode: StartNode,
  messageNode: MessageNode,
  endNode: EndNode,
  inputNode: InputNode,
  conditionNode: ConditionNode,
};

const edgeTypes = {
  default: CustomEdge,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

// Mobile/Tablet Warning Component
function MobileWarning() {
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'tablet'>('mobile');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setCurrentDevice(width >= 640 ? 'tablet' : 'mobile');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Monitor size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Flow Builder</h1>
          <p className="text-indigo-100 text-sm">Professional Chatbot Designer</p>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${currentDevice === 'mobile' ? 'bg-red-100' : 'bg-orange-100'}`}>
                {currentDevice === 'mobile' ? (
                  <Smartphone size={24} className="text-red-600" />
                ) : (
                  <Tablet size={24} className="text-orange-600" />
                )}
              </div>
              <div className="text-slate-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Monitor size={24} className="text-green-600" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Desktop Experience Required
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Flow Builder is designed for desktop and large screens to provide the best visual editing experience. 
              The drag-and-drop interface and multiple panels require more screen real estate.
            </p>
          </div>

          {/* Features that need desktop */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <h3 className="font-medium text-slate-800 mb-3 text-sm">Features requiring desktop:</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Drag & Drop Nodes</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Multi-Panel Layout</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Flow Canvas</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Properties Panel</span>
              </div>
            </div>
          </div>

          {/* Minimum requirements */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2 text-sm">Minimum Requirements:</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <div className="flex items-center justify-between">
                <span>Screen Width:</span>
                <span className="font-semibold">≥ 1024px</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Resolution:</span>
                <span className="font-semibold">1024×768+</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Browser:</span>
                <span className="font-semibold">Modern Browser</span>
              </div>
            </div>
          </div>

          {/* Current screen info */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Current screen: <span className="font-semibold">{window.innerWidth}×{window.innerHeight}px</span>
              <br />
              Device type: <span className="font-semibold capitalize">{currentDevice}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>💻</span>
            <span>Switch to desktop for full experience</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowBuilder() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    nodeId: string;
    x: number;
    y: number;
  } | null>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNode,
    setNodes,
    setEdges,
  } = useFlowStore();

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = (event.target as Element)
        .closest(".react-flow")
        ?.getBoundingClientRect();

      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData("application/reactflow");
      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      const nodeLabels: { [key: string]: string } = {
        messageNode: "Message",
        inputNode: "Input",
        conditionNode: "Condition",
        endNode: "End",
      };

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: {
          label: nodeLabels[type] || type,
        },
      };

      addNode(newNode);
    },
    [addNode]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu({
        nodeId: node.id,
        x: event.clientX,
        y: event.clientY,
      });
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const loadExample = useCallback(
    (flowData: any) => {
      setNodes(flowData.nodes);
      setEdges(flowData.edges);
    },
    [setNodes, setEdges]
  );

  const defaultViewport = {
    x: 0,
    y: 0,
    zoom: 0.5,
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {!isFullscreen && <NodesPanel />}

        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <ExamplesLibrary onLoadExample={loadExample} />
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all text-slate-600 hover:text-slate-900"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              {isFullscreen ? "Exit" : "Focus"}
            </button>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onNodeContextMenu={onNodeContextMenu}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultViewport={defaultViewport}
            fitView
            className="bg-gradient-to-br from-slate-50 via-white to-slate-100"
          >
            <Controls
              className="!shadow-lg !border-slate-200 !bg-white"
              position="bottom-left"
            />
            <MiniMap
              nodeColor={(node) => {
                const colors = {
                  startNode: "#10b981",
                  messageNode: "#3b82f6",
                  inputNode: "#8b5cf6",
                  conditionNode: "#f97316",
                  endNode: "#ef4444",
                };
                return colors[node.type as keyof typeof colors] || "#64748b";
              }}
              className="!shadow-lg !border-slate-200 !rounded-lg !overflow-hidden !bg-white"
              position="bottom-right"
            />
            <Background variant="dots" gap={20} size={1} color="#e2e8f0" />
          </ReactFlow>

          {/* Context Menu */}
          {contextMenu && (
            <ContextMenu
              nodeId={contextMenu.nodeId}
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={closeContextMenu}
            />
          )}
        </div>

        {!isFullscreen && <PropertiesPanel />}
      </div>

      <Tutorial />
      <SmartHelp nodes={nodes} edges={edges} />
    </div>
  );
}

// Main App Component with Screen Size Detection
export default function App() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      // Using 1024px as the minimum width for desktop experience
      const minDesktopWidth = 1024;
      setIsDesktop(window.innerWidth >= minDesktopWidth);
    };

    // Check initial screen size
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show mobile warning for screens smaller than 1024px
  if (!isDesktop) {
    return <MobileWarning />;
  }

  // Show full app for desktop screens
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}
