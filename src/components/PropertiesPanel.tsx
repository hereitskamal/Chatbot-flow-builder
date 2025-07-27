// src/components/PropertiesPanel.tsx
import { useFlowStore } from "../store/flowStore";
import {
  X,
  Settings,
  MessageSquare,
  Palette,
  Info,
  Keyboard,
  GitBranch,
  Play,
  Square,
} from "lucide-react";
import { useState, useEffect } from "react";

export function PropertiesPanel() {
  const { selectedNode, updateNode, setSelectedNode } = useFlowStore(); // Removed deleteNode
  const [activeTab, setActiveTab] = useState("content");
  const [localMessage, setLocalMessage] = useState<string>("");
  const [localInputPrompt, setLocalInputPrompt] = useState<string>("");
  const [localConditionRules, setLocalConditionRules] = useState<string>("");

  // Enhanced useEffect with comprehensive type checking for all node types
  useEffect(() => {
    if (!selectedNode) {
      setLocalMessage("");
      setLocalInputPrompt("");
      setLocalConditionRules("");
      return;
    }

    // Handle message nodes
    const messageData = selectedNode.data?.message;
    const messageString = typeof messageData === "string" ? messageData : "";
    setLocalMessage(messageString);

    // Handle input nodes
    const promptData = selectedNode.data?.prompt;
    const promptString = typeof promptData === "string" ? promptData : "";
    setLocalInputPrompt(promptString);

    // Handle condition nodes - get from conditions array or fallback to string
    const conditionsArray = selectedNode.data?.conditions;
    if (Array.isArray(conditionsArray) && conditionsArray.length > 0) {
      const joinedConditions = conditionsArray.filter(c => c && c.trim()).join('\n');
      setLocalConditionRules(joinedConditions);
    } else {
      const rulesData = selectedNode.data?.rules || selectedNode.data?.condition || "";
      const rulesString = typeof rulesData === "string" ? rulesData : "";
      setLocalConditionRules(rulesString);
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-gray-400" />
            <h3 className="font-semibold text-gray-900">Properties</h3>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center text-center p-6">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Settings size={24} className="text-gray-400" />
            </div>
            <h4 className="font-medium text-gray-700">No Node Selected</h4>
            <p className="text-sm text-gray-500 max-w-48">
              Select a node from the canvas to edit its properties and customize
              its behavior.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "content", label: "Content", icon: MessageSquare },
    { id: "appearance", label: "Style", icon: Palette },
    { id: "info", label: "Info", icon: Info },
  ];

  // Enhanced message change handler
  const handleMessageChange = (value: string) => {
    setLocalMessage(value);
    updateNode(selectedNode.id, { message: value });
  };

  // Input prompt change handler
  const handleInputPromptChange = (value: string) => {
    setLocalInputPrompt(value);
    updateNode(selectedNode.id, { prompt: value });
  };

  // Simplified condition rules change handler - ONLY uses main textarea
  const handleConditionRulesChange = (value: string) => {
    setLocalConditionRules(value);
    // Convert each line to a condition
    const conditions = value.split('\n').filter(rule => rule.trim()).map(rule => rule.trim());
    updateNode(selectedNode.id, { 
      rules: value,
      condition: value,
      conditions: conditions.length > 0 ? conditions : [''] // Ensure at least one condition
    });
  };

  // Simplified condition properties - ONLY main textarea
  const renderConditionProperties = () => {
    const conditions = selectedNode.data.conditions || [];
    const conditionCount = conditions.filter(c => c && c.trim()).length;

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition Logic
          </label>
          <textarea
            value={localConditionRules}
            onChange={(e) => handleConditionRulesChange(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm font-mono"
            rows={6}
            placeholder={`Enter conditions (one per line):

help
pricing
support
technical issue
billing question

Press Enter to add new conditions...`}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              🔀 Each line creates a separate branch path. Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> for new conditions.
            </p>
            <span className="text-xs text-gray-400">
              {conditionCount} condition{conditionCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output Handles Preview ({conditionCount + 1} total)
          </label>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 max-h-48 overflow-y-auto">
            <div className="text-sm text-gray-700 space-y-2">
              {conditions.map((condition, index) => (
                condition && condition.trim() && (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `hsl(${(index * 360) / Math.max(conditions.length, 1)}, 60%, 50%)` }}
                    ></div>
                    <code className="bg-orange-100 px-2 py-1 rounded text-xs flex-1">
                      "{condition.trim()}"
                    </code>
                    <span className="text-xs text-gray-500">
                      → Handle {index + 1}
                    </span>
                  </div>
                )
              ))}
              
              {/* Default path */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                <div className="w-3 h-3 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="text-xs text-orange-600 font-medium">Default/Else path</span>
                <span className="text-xs text-gray-500 ml-auto">
                  When no conditions match
                </span>
              </div>
              
              {conditionCount === 0 && (
                <div className="text-gray-400 text-xs text-center py-2">
                  No conditions defined - add conditions above to see output handles
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Quick Tips:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Each line = one output handle</li>
            <li>• Empty lines are ignored</li>
            <li>• Duplicate conditions are allowed</li>
            <li>• Always includes a default path</li>
          </ul>
        </div>
      </div>
    );
  };

  // Helper function to get node icon and colors
  const getNodeIcon = (nodeType: string) => {
    switch (nodeType) {
      case "startNode":
        return { icon: Play, color: "green" };
      case "messageNode":
        return { icon: MessageSquare, color: "blue" };
      case "inputNode":
        return { icon: Keyboard, color: "purple" };
      case "conditionNode":
        return { icon: GitBranch, color: "orange" };
      case "endNode":
        return { icon: Square, color: "red" };
      default:
        return { icon: Settings, color: "gray" };
    }
  };

  const getNodeTypeDisplay = (type: string) => {
    switch (type) {
      case "startNode":
        return { name: "Start Node", description: "Entry point of the flow" };
      case "messageNode":
        return { name: "Message Node", description: "Sends text to users" };
      case "inputNode":
        return { name: "Input Node", description: "Collects user input" };
      case "conditionNode":
        return {
          name: "Condition Node",
          description: "Branches based on conditions",
        };
      case "endNode":
        return { name: "End Node", description: "Terminates the flow" };
      default:
        return { name: "Unknown Node", description: "Node type" };
    }
  };

  const nodeInfo = getNodeTypeDisplay(selectedNode.type || "");
  const { icon: NodeIcon, color } = getNodeIcon(selectedNode.type || "");

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">Properties</h3>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close properties panel"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100">
        <div className="flex">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeTab === id
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* MESSAGE NODE CONTENT */}
        {activeTab === "content" && selectedNode.type === "messageNode" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <div className="relative">
                <textarea
                  value={localMessage}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  rows={4}
                  placeholder="Enter your message here..."
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {localMessage.length}/500
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 This message will be displayed to users when they reach this
                node.
              </p>
            </div>

            {/* Message Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs text-sm">
                  {localMessage || "Your message will appear here..."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INPUT NODE CONTENT */}
        {activeTab === "content" && selectedNode.type === "inputNode" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Prompt
              </label>
              <textarea
                value={localInputPrompt}
                onChange={(e) => handleInputPromptChange(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                rows={3}
                placeholder="What question should the bot ask?"
              />
              <p className="text-xs text-gray-500 mt-2">
                💬 This prompt will ask users for input.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Type
              </label>
              <select
                value={String(selectedNode.data.inputType || "text")}
                onChange={(e) =>
                  updateNode(selectedNode.id, { inputType: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Placeholder Text
              </label>
              <input
                type="text"
                value={String(selectedNode.data.placeholder || "")}
                onChange={(e) =>
                  updateNode(selectedNode.id, { placeholder: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                placeholder="Enter placeholder text..."
              />
            </div>

            {/* Input Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-2">
                <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs text-sm">
                  {localInputPrompt || "Your question will appear here..."}
                </div>
                <input
                  placeholder={String(selectedNode.data.placeholder || "User input...")}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        {/* CONDITION NODE CONTENT - Simplified to only use main textarea */}
        {activeTab === "content" && selectedNode.type === "conditionNode" && 
          renderConditionProperties()
        }

        {/* START AND END NODES INFO */}
        {activeTab === "content" &&
          (selectedNode.type === "startNode" ||
            selectedNode.type === "endNode") && (
            <div className="space-y-4">
              <div
                className={`${
                  selectedNode.type === "startNode"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                } p-4 rounded-lg border`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <NodeIcon size={20} className={`text-${color}-600`} />
                  <span className="font-medium text-gray-900">
                    {nodeInfo.name}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    selectedNode.type === "startNode"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {selectedNode.type === "startNode"
                    ? "This is the entry point of your chatbot flow. Every flow must have exactly one start node."
                    : "This marks the end of a conversation path. Users will reach this point when the flow completes."}
                </p>
              </div>
            </div>
          )}

        {/* INFO TAB */}
        {activeTab === "info" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Node Type
              </label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div
                  className={`w-8 h-8 bg-${color}-100 rounded-lg flex items-center justify-center`}
                >
                  <NodeIcon size={16} className={`text-${color}-600`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {nodeInfo.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {nodeInfo.description}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Node ID
              </label>
              <code className="block p-2 bg-gray-900 text-green-400 rounded text-xs font-mono">
                {selectedNode.id}
              </code>
            </div>

            {/* Node Statistics */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Node Statistics
              </label>
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Position:</span>
                  <span className="font-mono text-xs">
                    ({Math.round(selectedNode.position.x)},{" "}
                    {Math.round(selectedNode.position.y)})
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-mono text-xs">{selectedNode.type}</span>
                </div>
                {selectedNode.type === "conditionNode" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conditions:</span>
                    <span className="font-mono text-xs">
                      {(selectedNode.data.conditions || []).filter(c => c && c.trim()).length} defined
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
