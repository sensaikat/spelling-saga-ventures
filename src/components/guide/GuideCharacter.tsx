
import React from 'react';
import { motion } from 'framer-motion';
import { guideAppearances } from './data/guideAppearances';
import { GuideCharacterProps } from './types';
import { useGuideCharacter } from './hooks/useGuideCharacter';
import { GuideBubble } from './components/GuideBubble';
import { MagicWand } from './components/MagicWand';
import { AvatarSelector } from './components/AvatarSelector';
import { GuideAvatar } from './components/GuideAvatar';

const GuideCharacter: React.FC<GuideCharacterProps> = ({ 
  terrain = 'forest',
  isAdventure = true,
  onUseMagicItem,
  selectedAvatar,
  selectedLanguage,
  onChangeAvatar,
  proactiveMessage
}) => {
  const {
    showMessage,
    setShowMessage,
    currentTip,
    magicItemUsed,
    avatarKey,
    handleUseMagicItem: handleUseMagicItemInternal,
    handleGuideClick,
    navigateTo
  } = useGuideCharacter({
    selectedAvatar,
    terrain,
    selectedLanguage,
    proactiveMessage,
    isAdventure
  });
  
  const guide = guideAppearances[avatarKey as keyof typeof guideAppearances] || guideAppearances.default;
  
  const handleMagicItemClick = () => {
    handleUseMagicItemInternal();
    if (onUseMagicItem) {
      onUseMagicItem();
    }
  };
  
  const guideVariants = {
    normal: { 
      scale: 1, 
      rotate: 0 
    },
    excited: { 
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={showMessage ? "excited" : "normal"}
        variants={guideVariants}
        transition={{ type: 'spring', delay: 1 }}
      >
        <div className="relative">
          {/* Magic Wand Button */}
          <MagicWand
            magicItemUsed={magicItemUsed}
            onUseMagicItem={handleMagicItemClick}
          />
          
          {/* Avatar Selector (if provided) */}
          {onChangeAvatar && (
            <AvatarSelector onChangeAvatar={onChangeAvatar} />
          )}
          
          {/* Guide Avatar */}
          <GuideAvatar
            guide={guide}
            showMessage={showMessage}
            onClick={handleGuideClick}
          />
        </div>
      </motion.div>
      
      {/* Guide Message Bubble */}
      <GuideBubble
        showMessage={showMessage}
        currentTip={currentTip}
        guide={guide}
        isAdventure={isAdventure}
        onClose={() => setShowMessage(false)}
        onUseMagicItem={handleMagicItemClick}
        navigateTo={navigateTo}
      />
    </>
  );
};

export default GuideCharacter;
