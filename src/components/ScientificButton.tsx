import React from 'react';

interface ScientificButtonProps {
  label: string;
  shiftLabel?: string;
  class: string;
  isShiftMode: boolean;
  onClick: (value: string) => void;
}

export const ScientificButton: React.FC<ScientificButtonProps> = ({
  label,
  shiftLabel,
  class: className,
  isShiftMode,
  onClick,
}) => {
  const displayLabel = isShiftMode && shiftLabel ? shiftLabel : label;

  return (
    <button
      onClick={() => onClick(displayLabel)}
      className={`
        ${className}
        aspect-square rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold
        transition-all duration-200 transform hover:scale-95
        flex items-center justify-center shadow-lg
        active:scale-90
      `}
    >
      {displayLabel}
    </button>
  );
};