
import { categoryLabels, scriptGroups } from './alphabetData';

/**
 * Get category labels for a specific language
 * @param languageId The language ID (e.g., 'en', 'hi', 'zh')
 * @returns A record of category names to display labels
 */
export const getCategoryLabels = (languageId: string) => {
  if (languageId === 'bn') return categoryLabels.devanagari;
  if (languageId === 'or') return categoryLabels.devanagari;
  if (languageId === 'pa') return categoryLabels.gurmukhi;
  if (['ta', 'te', 'kn', 'ml'].includes(languageId)) return categoryLabels.dravidian;
  
  for (const [script, languages] of Object.entries(scriptGroups)) {
    if (languages.includes(languageId)) {
      return categoryLabels[script];
    }
  }
  return categoryLabels.latin; // Default to latin
};
