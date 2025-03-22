
import { useState } from 'react';

export const useGameHints = () => {
  const [showHint, setShowHint] = useState(false);
  const [showHintButton, setShowHintButton] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);
  const maxHints = 3;
  
  const handleShowHint = () => {
    setShowHintButton(false);
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };
  
  const resetHints = () => {
    setShowHint(false);
    setShowHintButton(true);
    setHintsUsed(0);
  };
  
  return {
    showHint,
    showHintButton,
    handleShowHint,
    resetHints,
    hintsUsed,
    maxHints
  };
};
