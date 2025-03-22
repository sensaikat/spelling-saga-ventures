
import React from 'react';
import { X, Lightbulb, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GuideAppearance } from '../../types';

interface BubbleHeaderProps {
  guide: GuideAppearance;
  currentTip: string;
  onClose: () => void;
  translatedTip: string | null;
}

export const BubbleHeader: React.FC<BubbleHeaderProps> = ({
  guide,
  currentTip,
  onClose,
  translatedTip
}) => {
  return (
    <>
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-1 right-1 h-6 w-6"
        onClick={onClose}
      >
        <X size={12} />
      </Button>
      
      <div className="flex items-start gap-2">
        <div className="pt-1">
          {(guide.personality === 'wise') ? (
            <Lightbulb className="text-yellow-600 h-5 w-5" />
          ) : (
            <MessageCircle className="text-blue-600 h-5 w-5" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium mb-1">{guide.name} says:</p>
          <p className="text-sm">{currentTip}</p>
          {translatedTip && (
            <p className="text-sm mt-1 italic text-gray-700 dark:text-gray-300">"{translatedTip}"</p>
          )}
        </div>
      </div>
    </>
  );
};
