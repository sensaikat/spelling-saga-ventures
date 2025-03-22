
import React from 'react';

interface TranslationHelperProps {
  currentTip: string;
}

export const TranslationHelper: React.FC<TranslationHelperProps> = ({ currentTip }) => {
  // For now, we'll just return the original tip
  // In a real implementation, this would call a translation service
  const translatedTip = currentTip;

  return (
    <div className="mt-2 text-sm opacity-80 italic">
      {translatedTip !== currentTip && (
        <div className="border-t border-white/20 pt-2 mt-2">
          {translatedTip}
        </div>
      )}
    </div>
  );
};
