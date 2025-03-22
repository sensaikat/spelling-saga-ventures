
import React from 'react';
import { GuideBubbleWrapper } from './bubble/GuideBubbleWrapper';
import { BubbleHeader } from './bubble/BubbleHeader';
import { QuickNavigation } from './bubble/QuickNavigation';
import { AdventureActions } from './bubble/AdventureActions';
import { TranslationHelper } from './bubble/TranslationHelper';
import { GuideAppearance } from '../types';
import { useNavigate } from 'react-router-dom';

interface GuideBubbleProps {
  showMessage: boolean;
  currentTip: string;
  guide: GuideAppearance;
  isAdventure?: boolean;
  onClose: () => void;
  onUseMagicItem: () => void;
  navigateTo?: (path: string) => void;
}

export const GuideBubble: React.FC<GuideBubbleProps> = ({
  showMessage,
  currentTip,
  guide,
  isAdventure = false,
  onClose,
  onUseMagicItem,
  navigateTo
}) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      navigateTo(path);
    } else {
      onClose();
      navigate(path);
    }
  };

  return (
    <GuideBubbleWrapper 
      showMessage={showMessage} 
      guide={guide}
    >
      <BubbleHeader
        guide={guide}
        currentTip={currentTip}
        onClose={onClose}
      />
      
      <QuickNavigation handleNavigate={handleNavigate} />
      
      <AdventureActions
        isAdventure={isAdventure}
        onUseMagicItem={onUseMagicItem}
      />
      
      <TranslationHelper currentTip={currentTip} />
    </GuideBubbleWrapper>
  );
};
