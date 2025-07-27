// src/components/Tutorial.tsx
import { useState } from 'react';
import { ArrowRight, CheckCircle, BookOpen, X } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector to highlight
  action: string;
  example?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Chatbot Flow Builder',
    description: 'Learn how to create interactive chatbot conversations in just a few minutes!',
    target: '.tutorial-canvas',
    action: 'Click "Start Tutorial" to begin',
  },
  {
    id: 'nodes-panel',
    title: 'Node Library',
    description: 'This panel contains all the building blocks for your chatbot. Each node type serves a different purpose.',
    target: '.nodes-panel',
    action: 'Look at the different node types available',
    example: 'Message nodes send text, Input nodes collect responses'
  },
  {
    id: 'drag-message',
    title: 'Add Your First Message',
    description: 'Drag a Message node from the library to the canvas to create your first bot response.',
    target: '[data-node-type="messageNode"]',
    action: 'Drag the Message node to the canvas',
    example: 'Try dragging it next to the Start node'
  },
  {
    id: 'connect-nodes',
    title: 'Connect Nodes',
    description: 'Connect nodes by dragging from the right handle of one node to the left handle of another.',
    target: '.react-flow__handle',
    action: 'Connect the Start node to your Message node',
    example: 'Click and drag from the green circle to the blue circle'
  },
  {
    id: 'edit-message',
    title: 'Edit Message Content',
    description: 'Click on a node to select it, then use the Properties panel to edit its content.',
    target: '.properties-panel',
    action: 'Click your Message node and add some text',
    example: 'Try writing: "Hello! Welcome to our chatbot"'
  },
  {
    id: 'add-input',
    title: 'Collect User Input',
    description: 'Input nodes let your bot ask questions and collect user responses.',
    target: '[data-node-type="inputNode"]',
    action: 'Drag an Input node to the canvas',
    example: 'Connect it after your message to ask users a question'
  },
  {
    id: 'add-condition',
    title: 'Smart Branching',
    description: 'Condition nodes analyze user responses and route to different paths.',
    target: '[data-node-type="conditionNode"]',
    action: 'Add a Condition node after your Input node',
    example: 'This will check what the user said and respond accordingly'
  }
];

export function Tutorial() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStepData = tutorialSteps[currentStep];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startTutorial = () => {
    setIsActive(true);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const closeTutorial = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  if (!isActive) {
    return (
      <button
        onClick={startTutorial}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
      >
        <BookOpen size={16} />
        Start Tutorial
      </button>
    );
  }

  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tutorial Complete! 🎉</h3>
          <p className="text-gray-600 mb-6">
            You've learned the basics of building chatbot flows. Now create your own interactive conversation!
          </p>
          <button
            onClick={closeTutorial}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Start Building
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Tutorial Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
      
      {/* Tutorial Card */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-xl p-6 max-w-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{currentStep + 1}</span>
            </div>
            <span className="text-sm text-gray-500">of {tutorialSteps.length}</span>
          </div>
          <button
            onClick={closeTutorial}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">{currentStepData.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{currentStepData.description}</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-800 text-sm font-medium mb-1">Action:</p>
          <p className="text-blue-700 text-sm">{currentStepData.action}</p>
          {currentStepData.example && (
            <>
              <p className="text-blue-800 text-sm font-medium mt-2 mb-1">Example:</p>
              <p className="text-blue-700 text-sm italic">{currentStepData.example}</p>
            </>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
          >
            Next
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mt-4">
          <div 
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}
