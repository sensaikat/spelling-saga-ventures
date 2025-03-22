
export interface AlphabetHelperProps {
  languageId: string;
  onCharacterClick: (char: string) => void;
  onPronounce?: (text: string) => void;
}

export interface AlphabetData {
  [key: string]: string[];
}

export interface LanguageAlphabets {
  [key: string]: AlphabetData;
}

export interface CategoryLabels {
  [key: string]: string;
}

export interface ScriptCategoryLabels {
  [key: string]: CategoryLabels;
}

export interface ScriptGroups {
  [key: string]: string[];
}
