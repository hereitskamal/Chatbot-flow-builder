// src/components/SmartHelp.tsx
import { useState, useEffect } from 'react';
import { HelpCircle, Lightbulb, X } from 'lucide-react';

interface HelpTip {
  id: string;
  title: string;
  content: string;
  trigger: string; // When to show this tip
  priority: number;
}

const helpTips: HelpTip[] = [
  {
    id: 'first-message',
    title: 'Add Your First Message',
    content: 'Drag a Message node from the left panel to start building your conversation flow.',
    trigger: 'no-message-nodes',
    priority: 1
  },
  {
    id: 'connect-nodes',
    title: 'Connect Your Nodes',
    content: 'Drag from the right handle (circle) of one node to the left handle of another to connect them.',
    trigger: 'disconnected-nodes',
    priority: 2
  },
  {
    id: 'add-content',
    title: 'Add Message Content',
    content: 'Click on a message node and use the Properties panel to add what your bot should say.',
    trigger: 'empty-message',
    priority: 3
  },
  {
    id: 'interactive-flow',
    title: 'Make It Interactive',
    content: 'Add Input and Condition nodes to create conversations that respond to user input.',
    trigger: 'linear-flow',
    priority: 4
  }
];

export function SmartHelp({ nodes, edges }: { nodes: any[], edges: any[] }) {
  const [currentTip, setCurrentTip] = useState<HelpTip | null>(null);
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);

  useEffect(() => {
    // Analyze current flow state and suggest appropriate tips
    const messageNodes = nodes.filter(n => n.type === 'messageNode');
    const connectedNodes = nodes.filter(n => 
      edges.some(e => e.source === n.id) || edges.some(e => e.target === n.id)
    );
    const emptyMessages = messageNodes.filter(n => !n.data?.message?.trim());

    let suggestedTip: HelpTip | null = null;

    if (messageNodes.length === 0 && !dismissedTips.includes('first-message')) {
      suggestedTip = helpTips.find(t => t.id === 'first-message') || null;
    } else if (nodes.length > 1 && connectedNodes.length < nodes.length && !dismissedTips.includes('connect-nodes')) {
      suggestedTip = helpTips.find(t => t.id === 'connect-nodes') || null;
    } else if (emptyMessages.length > 0 && !dismissedTips.includes('add-content')) {
      suggestedTip = helpTips.find(t => t.id === 'add-content') || null;
    } else if (messageNodes.length >= 2 && !nodes.some(n => n.type === 'inputNode') && !dismissedTips.includes('interactive-flow')) {
      suggestedTip = helpTips.find(t => t.id === 'interactive-flow') || null;
    }

    setCurrentTip(suggestedTip);
  }, [nodes, edges, dismissedTips]);

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => [...prev, tipId]);
    setCurrentTip(null);
  };

  if (!currentTip) return null;

  return (
    <div className="fixed bottom-20 left-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-sm shadow-lg z-40">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Lightbulb size={16} className="text-yellow-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-yellow-900 mb-1">{currentTip.title}</h4>
          <p className="text-yellow-800 text-sm">{currentTip.content}</p>
        </div>
        <button
          onClick={() => dismissTip(currentTip.id)}
          className="text-yellow-600 hover:text-yellow-800 flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
