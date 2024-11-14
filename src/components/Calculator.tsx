import React, { useState } from 'react';
import Display from './Display';
import ButtonPad from './ButtonPad';
import { calculateResult } from '../utils/calculations';
import { useKeyboardInput } from '../hooks/useKeyboardInput';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isRadians, setIsRadians] = useState(true);
  const [isShiftMode, setIsShiftMode] = useState(false);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [openParenCount, setOpenParenCount] = useState(0);

  const handleButtonClick = (value: string) => {
    if (value === 'AC') {
      setDisplay('0');
      setEquation('');
      setShouldResetDisplay(false);
      setOpenParenCount(0);
    } else if (value === '⌫') {
      if (shouldResetDisplay) {
        setDisplay('0');
        setEquation('');
        setShouldResetDisplay(false);
        setOpenParenCount(0);
      } else {
        const lastChar = display.slice(-1);
        if (lastChar === '(') setOpenParenCount(prev => prev - 1);
        if (lastChar === ')') setOpenParenCount(prev => prev + 1);
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        setEquation(prev => prev.length > 1 ? prev.slice(0, -1) : '');
      }
    } else if (value === '=') {
      if (openParenCount > 0) {
        // Auto-close parentheses
        const closingParens = ')'.repeat(openParenCount);
        const finalEquation = equation + closingParens;
        try {
          const result = calculateResult(finalEquation, isRadians);
          if (result === 'Error') {
            setDisplay('Error');
            setTimeout(() => {
              setDisplay(display);
              setShouldResetDisplay(false);
            }, 1000);
          } else {
            setDisplay(result);
            setEquation(result);
            setShouldResetDisplay(true);
            setOpenParenCount(0);
          }
        } catch (error) {
          setDisplay('Error');
          setTimeout(() => {
            setDisplay(display);
            setShouldResetDisplay(false);
          }, 1000);
        }
      } else {
        try {
          const result = calculateResult(equation, isRadians);
          if (result === 'Error') {
            setDisplay('Error');
            setTimeout(() => {
              setDisplay(display);
              setShouldResetDisplay(false);
            }, 1000);
          } else {
            setDisplay(result);
            setEquation(result);
            setShouldResetDisplay(true);
          }
        } catch (error) {
          setDisplay('Error');
          setTimeout(() => {
            setDisplay(display);
            setShouldResetDisplay(false);
          }, 1000);
        }
      }
    } else if (value === 'RAD/DEG') {
      setIsRadians(!isRadians);
    } else if (value === 'SHIFT') {
      setIsShiftMode(!isShiftMode);
    } else if (value === '√') {
      if (shouldResetDisplay || display === '0' || display === 'Error') {
        setDisplay('√(');
        setEquation('√(');
        setShouldResetDisplay(false);
        setOpenParenCount(1);
      } else {
        setDisplay(prev => prev + '√(');
        setEquation(prev => prev + '√(');
        setOpenParenCount(prev => prev + 1);
      }
    } else if (value === '(') {
      if (shouldResetDisplay || display === '0' || display === 'Error') {
        setDisplay('(');
        setEquation('(');
        setShouldResetDisplay(false);
      } else {
        setDisplay(prev => prev + '(');
        setEquation(prev => prev + '(');
      }
      setOpenParenCount(prev => prev + 1);
    } else if (value === ')') {
      if (openParenCount > 0 && !shouldResetDisplay && display !== 'Error') {
        setDisplay(prev => prev + ')');
        setEquation(prev => prev + ')');
        setOpenParenCount(prev => prev - 1);
      }
    } else {
      if (shouldResetDisplay || display === 'Error') {
        setDisplay(value);
        setEquation(value);
        setShouldResetDisplay(false);
        setOpenParenCount(0);
      } else {
        const newDisplay = display === '0' ? value : display + value;
        setDisplay(newDisplay);
        setEquation(prev => prev + value);
      }
    }
  };

  useKeyboardInput(handleButtonClick);

  return (
    <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-102">
      <div className="p-4 xs:p-5 sm:p-6 space-y-4 sm:space-y-6">
        <Display 
          display={display} 
          equation={equation} 
          isRadians={isRadians}
          isShiftMode={isShiftMode}
        />
        <ButtonPad 
          onButtonClick={handleButtonClick}
          isShiftMode={isShiftMode}
        />
      </div>
    </div>
  );
};

export default Calculator;