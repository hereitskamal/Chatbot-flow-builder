/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'border-blue-300',
    'border-blue-500',
    'bg-blue-100', 
    'text-blue-600',
    'text-blue-800',
    'border-red-300',
    'border-red-500',
    'bg-red-100',
    'text-red-600',
    'text-red-800',
    'border-green-300',
    'border-green-500',
    'bg-green-100',
    'text-green-600',
    'text-green-800',
  ]
}
