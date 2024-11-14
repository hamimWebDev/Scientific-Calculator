const evaluateExpression = (expression: string): number => {
  // Handle empty expression
  if (!expression.trim()) {
    return 0;
  }

  try {
    // Replace mathematical constants and functions
    let processedExpression = expression
      .replace(/π/g, Math.PI.toString())
      .replace(/e/g, Math.E.toString())
      // Handle square root
      .replace(/√\s*(\d+\.?\d*|\([^)]+\))/g, (_, num) => {
        const value = num.startsWith('(') ? evaluateExpression(num.slice(1, -1)) : parseFloat(num);
        return Math.sqrt(value).toString();
      })
      // Handle percentage calculations
      .replace(/(\d+\.?\d*)\s*%\s*$/g, '($1/100)')
      .replace(/(\d+\.?\d*)\s*%\s*([+\-×÷])/g, '($1/100)$2')
      .replace(/(\d+\.?\d*)\s*%\s*of\s*(\d+\.?\d*)/g, '($1/100)*$2')
      // Handle exponentiation
      .replace(/(\d+\.?\d*)\s*\^y/g, '$1**')
      .replace(/x\^y/g, '**')
      // Handle multiplication and division
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Validate expression before evaluation
    if (!/^[0-9+\-*/().πe\s\^]*$/.test(processedExpression)) {
      throw new Error('Invalid characters in expression');
    }

    const result = Function('"use strict";return (' + processedExpression + ')')();

    if (!Number.isFinite(result)) {
      throw new Error('Invalid result');
    }

    return result;
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

const applyTrigFunction = (func: string, value: number, isRadians: boolean): number => {
  // Convert to radians if in degree mode
  const angle = isRadians ? value : (value * Math.PI) / 180;
  
  try {
    switch (func) {
      case 'sin': return Math.sin(angle);
      case 'cos': return Math.cos(angle);
      case 'tan': return Math.tan(angle);
      case 'asin': return isRadians ? Math.asin(value) : (Math.asin(value) * 180) / Math.PI;
      case 'acos': return isRadians ? Math.acos(value) : (Math.acos(value) * 180) / Math.PI;
      case 'atan': return isRadians ? Math.atan(value) : (Math.atan(value) * 180) / Math.PI;
      default: throw new Error('Unknown function');
    }
  } catch (error) {
    throw new Error('Invalid trigonometric calculation');
  }
};

export const calculateResult = (equation: string, isRadians: boolean): string => {
  try {
    // Handle empty equation
    if (!equation.trim()) {
      return '0';
    }

    // Handle special functions
    let processedEquation = equation
      .replace(/sin\((.*?)\)/g, (_, p1) => applyTrigFunction('sin', evaluateExpression(p1), isRadians).toString())
      .replace(/cos\((.*?)\)/g, (_, p1) => applyTrigFunction('cos', evaluateExpression(p1), isRadians).toString())
      .replace(/tan\((.*?)\)/g, (_, p1) => applyTrigFunction('tan', evaluateExpression(p1), isRadians).toString())
      .replace(/asin\((.*?)\)/g, (_, p1) => applyTrigFunction('asin', evaluateExpression(p1), isRadians).toString())
      .replace(/acos\((.*?)\)/g, (_, p1) => applyTrigFunction('acos', evaluateExpression(p1), isRadians).toString())
      .replace(/atan\((.*?)\)/g, (_, p1) => applyTrigFunction('atan', evaluateExpression(p1), isRadians).toString())
      .replace(/ln\((.*?)\)/g, (_, p1) => Math.log(evaluateExpression(p1)).toString())
      .replace(/log\((.*?)\)/g, (_, p1) => Math.log10(evaluateExpression(p1)).toString())
      .replace(/x²/g, '^2')
      .replace(/\^/g, '**');

    const result = evaluateExpression(processedEquation);
    
    // Format the result
    if (Math.abs(result) < 1e-10) return '0';
    if (Math.abs(result) >= 1e10) return result.toExponential(4);
    return Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
  } catch (error) {
    return 'Error';
  }
};