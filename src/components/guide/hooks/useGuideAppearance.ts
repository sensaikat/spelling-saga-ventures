
import { useGameStore } from '../../../utils/game';

interface UseGuideAppearanceProps {
  selectedAvatar?: string;
  terrain?: string;
  selectedLanguage?: string;
}

export const useGuideAppearance = ({
  selectedAvatar,
  terrain = 'forest',
  selectedLanguage
}: UseGuideAppearanceProps = {}) => {
  const { selectedLanguage: gameLanguage } = useGameStore();
  
  const avatarKey = selectedAvatar || terrain;
  const languageCode = selectedLanguage || (gameLanguage ? gameLanguage.id.split('-')[0] : 'en');
  
  return {
    avatarKey,
    languageCode
  };
};
