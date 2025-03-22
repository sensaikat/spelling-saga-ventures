
import { TerrainType } from '../../contexts/adventure/types';

export type GreetingType = 'hello' | 'wellDone' | 'goodbye';

export interface GuideAppearance {
  emoji: string;
  name: string;
  color: string;
  personality?: string;
  greetings?: {
    [key: string]: {
      hello: string;
      wellDone: string;
      goodbye: string;
    };
  };
}

export interface GuideAppearances {
  wizard: GuideAppearance;
  explorer: GuideAppearance;
  robot: GuideAppearance;
  dragon: GuideAppearance;
  alien: GuideAppearance;
  forest: GuideAppearance;
  desert: GuideAppearance;
  river: GuideAppearance;
  mountain: GuideAppearance;
  castle: GuideAppearance;
  space: GuideAppearance;
  default: GuideAppearance;
  [key: string]: GuideAppearance;
}

export interface GuideCharacterProps {
  terrain?: TerrainType;
  isAdventure?: boolean;
  onUseMagicItem?: () => void;
  selectedAvatar?: string;
  selectedLanguage?: string;
  onChangeAvatar?: () => void;
  proactiveMessage?: string;
}

export interface GuideTip {
  text: string;
  category: 'general' | 'spelling' | 'vocabulary' | 'grammar';
}
