
import { alphabetData, scriptCategoryLabels, scriptGroups } from './alphabetData';

export const getLanguageAlphabet = (languageId: string) => {
  // Map language codes to script groups
  const scriptForLanguage = Object.entries(scriptGroups).find(
    ([, languages]) => languages.includes(languageId)
  )?.[0];

  if (!scriptForLanguage) return null;

  // Return the alphabet data for the script
  return alphabetData[scriptForLanguage];
};

export const getCategoryLabel = (languageId: string, category: string): string => {
  // Map language codes to script groups
  const scriptForLanguage = Object.entries(scriptGroups).find(
    ([, languages]) => languages.includes(languageId)
  )?.[0];

  if (!scriptForLanguage || !scriptCategoryLabels[scriptForLanguage]) {
    return category;
  }

  return scriptCategoryLabels[scriptForLanguage][category] || category;
};

// Function to get English category label
export const getEnglishCategoryLabel = (category: string): string => {
  // Standard English translations for common category names
  const englishLabels: Record<string, string> = {
    'Vowels': 'Vowels',
    'Consonants': 'Consonants',
    'Matras': 'Vowel Marks',
    'Half Forms': 'Half Forms',
    'Common Conjuncts': 'Conjuncts',
    'Numbers': 'Numbers',
    'Vowel Marks': 'Vowel Marks',
    'Combined': 'Combined',
    'Letters': 'Letters',
    'Positional Forms': 'Positions',
    'Diacritics': 'Diacritics',
    'Common Ligatures': 'Ligatures',
    'Common': 'Common',
    'Basics': 'Basics',
    'German Special': 'German',
    'French Special': 'French',
    'Spanish Special': 'Spanish',
    'Polish Special': 'Polish',
    'Romanian Special': 'Romanian'
  };

  return englishLabels[category] || category;
};
