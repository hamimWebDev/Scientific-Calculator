import React from 'react';
import { 
  Equal, Delete, Plus, Minus, X, Divide, Percent,
  Square, RotateCcw, ArrowUpDown
} from 'lucide-react';
import { ScientificButton } from './ScientificButton';

interface ButtonPadProps {
  onButtonClick: (value: string) => void;
  isShiftMode: boolean;
}

const ButtonPad: React.FC<ButtonPadProps> = ({ onButtonClick, isShiftMode }) => {
  const scientificButtons = [
    { label: 'sin', shiftLabel: 'asin', class: 'bg-indigo-600 hover:bg-indigo-700' },
    { label: 'cos', shiftLabel: 'acos', class: 'bg-indigo-600 hover:bg-indigo-700' },
    { label: 'tan', shiftLabel: 'atan', class: 'bg-indigo-600 hover:bg-indigo-700' },
    { label: 'ln', shiftLabel: 'log', class: 'bg-indigo-600 hover:bg-indigo-700' },
    { label: '(', class: 'bg-gray-600 hover:bg-gray-700' },
    { label: ')', class: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'π', class: 'bg-gray-600 hover:bg-gray-700' },
    { label: 'e', class: 'bg-gray-600 hover:bg-gray-700' },
  ];

  const mainButtons = [
    { label: 'AC', class: 'col-span-1 bg-red-500 hover:bg-red-600' },
    { label: '⌫', class: 'col-span-1 bg-orange-500 hover:bg-orange-600', icon: <Delete className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: 'SHIFT', class: 'col-span-1 bg-yellow-500 hover:bg-yellow-600', icon: <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: 'RAD/DEG', class: 'bg-blue-500 hover:bg-blue-600', icon: <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: '7', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '8', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '9', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '÷', class: 'bg-orange-500 hover:bg-orange-600', icon: <Divide className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: '4', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '5', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '6', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '×', class: 'bg-orange-500 hover:bg-orange-600', icon: <X className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: '1', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '2', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '3', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '-', class: 'bg-orange-500 hover:bg-orange-600', icon: <Minus className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: '0', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '.', class: 'bg-gray-700 hover:bg-gray-600' },
    { label: '^', class: 'bg-orange-500 hover:bg-orange-600' },
    { label: '+', class: 'bg-orange-500 hover:bg-orange-600', icon: <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: 'x²', class: 'bg-indigo-600 hover:bg-indigo-700', icon: <Square className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: '√', class: 'bg-indigo-600 hover:bg-indigo-700' },
    { label: '%', class: 'bg-indigo-600 hover:bg-indigo-700', icon: <Percent className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: '=', class: 'bg-green-500 hover:bg-green-600', icon: <Equal className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="grid grid-cols-4 gap-1.5 xs:gap-2">
        {scientificButtons.map((btn, index) => (
          <ScientificButton
            key={index}
            {...btn}
            isShiftMode={isShiftMode}
            onClick={onButtonClick}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1.5 xs:gap-2">
        {mainButtons.map((btn, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(btn.label)}
            className={`
              ${btn.class}
              aspect-square rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold
              transition-all duration-200 transform hover:scale-95
              flex items-center justify-center shadow-lg
              active:scale-90
            `}
          >
            {btn.icon || btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonPad;