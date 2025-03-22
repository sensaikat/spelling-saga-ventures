
import React from 'react';
import { X } from 'lucide-react';
import { GuideAppearance } from '../../types';

interface BubbleHeaderProps {
  guide: GuideAppearance;
  currentTip: string;
  onClose: () => void;
}

export const BubbleHeader: React.FC<BubbleHeaderProps> = ({
  guide,
  currentTip,
  onClose
}) => {
  return (
    <div className="flex items-start mb-3">
      <div className="flex-1">
        <div className="font-medium text-white">{guide.name || 'Guide'}</div>
        <p className="text-white/90 mt-1">{currentTip}</p>
      </div>
      <button
        onClick={onClose}
        className="rounded-full p-1 hover:bg-white/20 transition-colors"
        aria-label="Close guide"
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};
