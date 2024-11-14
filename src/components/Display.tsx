import React from 'react';

interface DisplayProps {
  display: string;
  equation: string;
  isRadians: boolean;
  isShiftMode: boolean;
}

const Display: React.FC<DisplayProps> = ({ display, equation, isRadians, isShiftMode }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs sm:text-sm">
        <div className="space-x-2">
          <span className={`px-2 py-1 rounded ${isRadians ? 'bg-blue-500' : 'bg-gray-600'} text-white`}>
            {isRadians ? 'RAD' : 'DEG'}
          </span>
          <span className={`px-2 py-1 rounded ${isShiftMode ? 'bg-yellow-500' : 'bg-gray-600'} text-white`}>
            SHIFT
          </span>
        </div>
      </div>
      <div className="text-right space-y-2">
        <div className="text-gray-400 text-xs sm:text-sm h-4 break-all">{equation}</div>
        <div className="text-white text-2xl xs:text-3xl sm:text-4xl font-light tracking-wider break-all">
          {display}
        </div>
      </div>
    </div>
  );
};

export default Display;