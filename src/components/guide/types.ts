
import { Language } from '../../utils/game/types';

export type GreetingType = 'hello' | 'goodbye' | 'wellDone';

export interface UseGuideCharacterProps {
  selectedAvatar?: string;
  terrain?: string;
  selectedLanguage?: string;
  proactiveMessage?: string;
  isAdventure?: boolean;
  navigateTo?: (path: string) => void;
}

export interface GuideCharacterProps {
  selectedAvatar?: string;
  terrain?: string;
  isAdventure?: boolean;
  proactiveMessage?: string;
  selectedLanguage?: string;
  navigateTo?: (path: string) => void;
}
