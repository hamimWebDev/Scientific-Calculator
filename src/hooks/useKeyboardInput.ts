import { useEffect } from 'react';

export const useKeyboardInput = (handleButtonClick: (value: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key === 'Enter') handleButtonClick('=');
      else if (key === 'Backspace') handleButtonClick('⌫');
      else if (key === 'Escape') handleButtonClick('AC');
      else if (key === '*') handleButtonClick('×');
      else if (key === '/') handleButtonClick('÷');
      else if (/[\d+\-.]/.test(key)) handleButtonClick(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleButtonClick]);
};