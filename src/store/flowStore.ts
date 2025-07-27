// src/store/flowStore.ts
import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import type {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  updateNode: (nodeId: string, data: any) => void;
  deleteEdge: (edgeId: string) => void;
  deleteNode: (nodeId: string) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (node: Node | null) => void;
  validateFlow: () => { isValid: boolean; errors: string[] };
  saveFlow: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [
    {
      id: "start-1",
      type: "startNode",
      position: { x: 100, y: 100 },
      data: { label: "Start" },
    },
  ],
  edges: [],
  selectedNode: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    const { edges } = get();

    // Enhanced connection validation for condition nodes
    const existingEdge = edges.find(
      (edge) =>
        edge.source === connection.source &&
        edge.sourceHandle === connection.sourceHandle
    );

    // Allow multiple connections for condition nodes with different handles
    if (existingEdge) {
      const sourceNode = get().nodes.find(
        (node) => node.id === connection.source
      );
      if (sourceNode?.type !== "conditionNode") {
        alert("Each node can only have one outgoing connection");
        return;
      }
    }

    set({
      edges: addEdge(connection, edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },

  setEdges: (edges) => {
    set({ edges });
  },

  addNode: (node) => {
    // Enhanced node data initialization based on type
    const enhancedNode = {
      ...node,
      data: {
        ...node.data,
        // Initialize specific data based on node type
        ...(node.type === "messageNode" && { message: "" }),
        ...(node.type === "inputNode" && {
          prompt: "",
          inputType: "text",
          placeholder: "Enter your response...",
        }),
        ...(node.type === "conditionNode" && {
          conditions: [],
          rules: "",
          branches: [],
        }),
      },
    };

    set((state) => ({
      nodes: [...state.nodes, enhancedNode],
    }));
  },

  updateNode: (nodeId, newData) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    }));
  },

  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },

  validateFlow: () => {
    const { nodes, edges } = get();
    const errors: string[] = [];

    // Check for start node
    const startNodes = nodes.filter((node) => node.type === "startNode");
    if (startNodes.length === 0) {
      errors.push("Flow must have a Start node");
    } else if (startNodes.length > 1) {
      errors.push("Flow can only have one Start node");
    }

    // Check for end node
    const endNodes = nodes.filter((node) => node.type === "endNode");
    if (endNodes.length === 0) {
      errors.push("Flow must have an End node");
    }

    // Enhanced validation for different node types
    nodes.forEach((node) => {
      // Check for orphaned nodes (except end nodes)
      if (node.type !== "endNode") {
        const hasOutgoingEdge = edges.some((edge) => edge.source === node.id);
        if (!hasOutgoingEdge) {
          errors.push(
            `Node "${node.data.label || node.id}" has no outgoing connection`
          );
        }
      }

      // Validate message nodes
      if (node.type === "messageNode") {
        if (!node.data.message || node.data.message.trim().length === 0) {
          errors.push(`Message node "${node.data.label || node.id}" is empty`);
        }
      }

      // Validate input nodes
      if (node.type === "inputNode") {
        if (!node.data.prompt || node.data.prompt.trim().length === 0) {
          errors.push(
            `Input node "${node.data.label || node.id}" needs a prompt question`
          );
        }
      }

      // Validate condition nodes
      if (node.type === "conditionNode") {
        const outgoingEdges = edges.filter((edge) => edge.source === node.id);
        if (outgoingEdges.length < 2) {
          errors.push(
            `Condition node "${
              node.data.label || node.id
            }" should have at least 2 outgoing paths`
          );
        }
      }
    });

    // Check for unreachable nodes
    const reachableNodes = new Set<string>();
    const startNode = startNodes[0];

    if (startNode) {
      const traverse = (nodeId: string) => {
        if (reachableNodes.has(nodeId)) return;
        reachableNodes.add(nodeId);

        edges
          .filter((edge) => edge.source === nodeId)
          .forEach((edge) => traverse(edge.target));
      };

      traverse(startNode.id);

      nodes.forEach((node) => {
        if (!reachableNodes.has(node.id) && node.type !== "startNode") {
          errors.push(
            `Node "${node.data.label || node.id}" is unreachable from start`
          );
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  saveFlow: () => {
    const { validateFlow, nodes, edges } = get();
    const validation = validateFlow();

    if (!validation.isValid) {
      const errorMessage =
        "Cannot save flow. Please fix these issues:\n\n" +
        validation.errors
          .map((error, index) => `${index + 1}. ${error}`)
          .join("\n");
      alert(errorMessage);
      return;
    }

    const flowData = {
      nodes,
      edges,
      metadata: {
        created: new Date().toISOString(),
        version: "1.0.0",
        nodeCount: nodes.length,
        edgeCount: edges.length,
      },
    };

    const dataStr = JSON.stringify(flowData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `chatbot-flow-${
      new Date().toISOString().split("T")[0]
    }.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    console.log("Flow saved:", flowData);

    // Show success message with flow statistics
    const stats = `Flow saved successfully!\n\n📊 Statistics:\n• ${nodes.length} nodes\n• ${edges.length} connections\n• Flow is valid ✅`;
    alert(stats);
  },

  deleteEdge: (edgeId) => {
    console.log("Deleting edge:", edgeId);
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    }));
  },

  deleteNode: (nodeId) => {
    console.log("Deleting node:", nodeId);

    // Prevent deletion of the start node
    const nodeToDelete = get().nodes.find((node) => node.id === nodeId);
    if (nodeToDelete?.type === "startNode") {
      alert("Cannot delete the start node. Every flow needs a start point.");
      return;
    }

    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode:
        state.selectedNode?.id === nodeId ? null : state.selectedNode,
    }));
  },
}));
