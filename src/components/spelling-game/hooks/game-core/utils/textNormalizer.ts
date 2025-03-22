
/**
 * Utilities for text normalization and comparison in multi-language contexts
 */

/**
 * Normalizes text for comparison across different languages
 * Handles issues with diacritics, special characters, and other language-specific nuances
 * 
 * @param {string} text - The text to normalize
 * @param {string} languageId - Optional language identifier
 * @returns {string} Normalized text for comparison
 */
export const normalizeTextForComparison = (text: string, languageId?: string): string => {
  // Start with basic lowercase and trim
  let normalized = text.toLowerCase().trim();
  
  // For languages that don't differentiate certain characters in normal usage
  if (languageId === 'hi' || languageId === 'bn') {
    // In some Indic languages, remove nuqta dots and normalize similar looking characters
    normalized = normalized.replace(/\u093c/g, '');
  }
  
  // Remove spaces for languages where spaces might be optional or inconsistently used
  if (['zh', 'ja', 'th'].includes(languageId || '')) {
    normalized = normalized.replace(/\s+/g, '');
  }
  
  // Normalize special spacing for languages with complex combining marks
  normalized = normalized.normalize('NFC');
  
  return normalized;
};
