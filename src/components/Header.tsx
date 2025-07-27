// src/components/Header.tsx
import {
  Save,
  Download,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Workflow,
  User,
  X,
  Mail,
  Phone,
  Code,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useFlowStore } from "../store/flowStore";
import { useState, useEffect } from "react";

export function Header() {
  const { saveFlow, validateFlow } = useFlowStore();
  const validation = validateFlow();
  const [showAbout, setShowAbout] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Add periodic glow effect to attract attention
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }, 8000); // Glow every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Workflow size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Chatbot Flow Builder
                </h1>
                <p className="text-sm text-gray-500">
                  Design your conversation flow
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Validation Status */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                validation.isValid
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {validation.isValid ? (
                <>
                  <CheckCircle size={16} />
                  <span>Ready to save</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  <span>
                    {validation.errors.length} issue
                    {validation.errors.length !== 1 ? "s" : ""} found
                  </span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Enhanced Interactive About Button */}
              <div className="relative">
                <button
                  onClick={() => setShowAbout(true)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className={`relative group p-2 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    isGlowing
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg animate-pulse"
                      : "text-slate-500 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg"
                  }`}
                  title="Meet the Developer"
                >
                  {/* Sparkle effect overlay */}
                  {isGlowing && (
                    <div className="absolute -top-1 -right-1">
                      <Sparkles
                        size={12}
                        className="text-yellow-300 animate-spin"
                      />
                    </div>
                  )}

                  {/* Notification dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce">
                    <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  </div>

                  <User size={20} className="relative z-10" />

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                </button>

                {/* Interactive Tooltip */}
                {showTooltip && (
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in-up">
                      <div className="flex items-center gap-2">
                        <span>👋</span>
                        <span>Meet the Developer!</span>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Help & Documentation"
              >
                <HelpCircle size={20} />
              </button>

              <button
                onClick={saveFlow}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                  validation.isValid
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
                disabled={!validation.isValid}
              >
                <Save size={16} />
                Save Flow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced About Modal with Entrance Animation */}
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-2xl animate-slide-in-up">
            {/* Animated Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 text-white relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="animate-bounce">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <h3 className="text-lg font-semibold">Meet the Developer</h3>
                </div>
                <button
                  onClick={() => setShowAbout(false)}
                  className="text-white hover:text-gray-200 transition-colors hover:rotate-90 transform duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content with staggered animations */}
            <div className="p-6">
              {/* Profile Section */}
              <div className="text-center mb-6 animate-fade-in-delayed">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-in">
                  <span className="text-2xl font-bold text-white">KS</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Kamal Sharma
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-gray-600 text-sm">Full Stack Developer</p>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Contact Information with hover effects */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-200 cursor-pointer group">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Mail size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:itskamalofficial@gmail.com"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors group-hover:underline"
                    >
                      itskamalofficial@gmail.com
                    </a>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-gray-400 group-hover:text-blue-600 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 hover:scale-105 transition-all duration-200 cursor-pointer group">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Phone size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <a
                      href="tel:+919754177313"
                      className="text-sm text-green-600 hover:text-green-800 transition-colors group-hover:underline"
                    >
                      +91 9754177313
                    </a>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-gray-400 group-hover:text-green-600 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 hover:scale-105 transition-all duration-200 cursor-pointer group">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Code size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Specialization
                    </p>
                    <p className="text-sm text-gray-600">
                      MERN Stack & Next.js Developer
                    </p>
                  </div>
                  <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    🚀
                  </div>
                </div>
              </div>

              {/* Animated Skills Tags */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Node.js",
                    "MongoDB",
                    "Express",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                  ].map((skill, index) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium hover:bg-indigo-200 hover:scale-110 transition-all duration-200 cursor-pointer animate-fade-in-delayed"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer with pulse effect */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  Built with{" "}
                  <span className="text-red-500 animate-pulse text-sm">❤️</span>{" "}
                  using React & TypeScript
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.4s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in-up 0.5s ease-out 0.2s both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out 0.3s both;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}
