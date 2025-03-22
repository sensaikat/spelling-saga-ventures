
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
