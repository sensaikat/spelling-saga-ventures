
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

export interface GuideAppearance {
  id: string;
  name: string;
  avatarSrc: string;
  personality: string;
  terrainVariants?: Record<string, string>;
  animations?: Record<string, string>;
  greetings?: Record<string, Record<GreetingType, string>>;
}

export type GuideAppearances = Record<string, GuideAppearance>;
