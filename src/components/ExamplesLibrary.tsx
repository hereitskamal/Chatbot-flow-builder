// src/components/ExamplesLibrary.tsx
import { useState } from 'react';
import { BookOpen, Play} from 'lucide-react';

interface FlowExample {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  preview: string;
  flowData: any;
}

const flowExamples: FlowExample[] = [
  {
    id: 'simple-greeting',
    title: 'Simple Greeting Bot',
    description: 'A basic welcome message flow perfect for beginners',
    difficulty: 'Beginner',
    category: 'Getting Started',
    preview: 'Start → "Welcome!" → "How can I help?" → End',
    flowData: {
      nodes: [
        { id: 'start', type: 'startNode', position: { x: 100, y: 100 }, data: { label: 'Start' }},
        { id: 'welcome', type: 'messageNode', position: { x: 300, y: 100 }, data: { label: 'Welcome', message: 'Hello! Welcome to our service.' }},
        { id: 'help', type: 'messageNode', position: { x: 500, y: 100 }, data: { label: 'Help', message: 'How can I help you today?' }},
        { id: 'end', type: 'endNode', position: { x: 700, y: 100 }, data: { label: 'End' }}
      ],
      edges: [
        { source: 'start', target: 'welcome', id: 'e1' },
        { source: 'welcome', target: 'help', id: 'e2' },
        { source: 'help', target: 'end', id: 'e3' }
      ]
    }
  },
  {
    id: 'customer-support',
    title: 'Customer Support Bot',
    description: 'Interactive support bot with user input and branching',
    difficulty: 'Intermediate',
    category: 'Customer Service',
    preview: 'Start → Welcome → Input → Condition → Different Responses',
    flowData: {
      nodes: [
        { id: 'start', type: 'startNode', position: { x: 100, y: 200 }, data: { label: 'Start' }},
        { id: 'welcome', type: 'messageNode', position: { x: 300, y: 200 }, data: { message: 'Hi! I\'m here to help you.' }},
        { id: 'input', type: 'inputNode', position: { x: 500, y: 200 }, data: { prompt: 'What do you need help with?' }},
        { id: 'condition', type: 'conditionNode', position: { x: 700, y: 200 }, data: { rules: 'refund\nsupport\nbilling' }},
        { id: 'refund', type: 'messageNode', position: { x: 900, y: 100 }, data: { message: 'I can help you with refunds. Let me transfer you to our refund team.' }},
        { id: 'support', type: 'messageNode', position: { x: 900, y: 200 }, data: { message: 'For technical support, I\'ll connect you with our tech team.' }},
        { id: 'billing', type: 'messageNode', position: { x: 900, y: 300 }, data: { message: 'For billing questions, let me get your account details.' }}
      ],
      edges: [
        { source: 'start', target: 'welcome' },
        { source: 'welcome', target: 'input' },
        { source: 'input', target: 'condition' },
        { source: 'condition', target: 'refund', sourceHandle: 'condition1' },
        { source: 'condition', target: 'support', sourceHandle: 'condition2' },
        { source: 'condition', target: 'billing', sourceHandle: 'condition3' }
      ]
    }
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation Bot',
    description: 'Collect customer information and qualify leads',
    difficulty: 'Advanced',
    category: 'Sales & Marketing',
    preview: 'Qualification → Data Collection → Lead Scoring → Follow-up',
    flowData: {
      // More complex flow with multiple inputs and conditions
    }
  }
];

export function ExamplesLibrary({ onLoadExample }: { onLoadExample: (flowData: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(flowExamples.map(ex => ex.category)))];
  const filteredExamples = selectedCategory === 'All' 
    ? flowExamples 
    : flowExamples.filter(ex => ex.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <BookOpen size={16} />
        Examples
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Flow Examples</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 mt-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid gap-4">
                {filteredExamples.map(example => (
                  <div key={example.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{example.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                            {example.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{example.description}</p>
                        <div className="bg-gray-50 rounded p-2 mb-3">
                          <span className="text-xs text-gray-500 font-medium">Flow Preview:</span>
                          <p className="text-xs text-gray-700 font-mono">{example.preview}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            onLoadExample(example.flowData);
                            setIsOpen(false);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                        >
                          <Play size={14} />
                          Load
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
