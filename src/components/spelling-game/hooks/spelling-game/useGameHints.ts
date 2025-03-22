
import { useState } from 'react';

export const useGameHints = () => {
  const [showHint, setShowHint] = useState(false);
  const [showHintButton, setShowHintButton] = useState(true);
  
  const handleShowHint = () => {
    setShowHintButton(false);
    setShowHint(true);
  };
  
  const resetHints = () => {
    setShowHint(false);
    setShowHintButton(true);
  };
  
  return {
    showHint,
    showHintButton,
    handleShowHint,
    resetHints
  };
};
