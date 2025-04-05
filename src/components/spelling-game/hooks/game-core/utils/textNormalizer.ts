
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
  if (languageId === 'hi' || languageId === 'bn' || languageId === 'ta' || 
      languageId === 'te' || languageId === 'ml' || languageId === 'kn' || 
      languageId === 'gu' || languageId === 'or' || languageId === 'pa' || 
      languageId === 'as' || languageId === 'doi') {
    // In Indic languages, remove nuqta dots and normalize similar looking characters
    normalized = normalized
      .replace(/\u093c/g, '') // Hindi nuqta
      .replace(/\u09bc/g, '') // Bengali nuqta
      .replace(/\u0a3c/g, '') // Punjabi nuqta
      .replace(/\u0abc/g, '') // Gujarati nuqta
      .replace(/\u0b3c/g, '') // Oriya nuqta
      
      // Normalize visually similar characters
      .replace(/[\u0964\u0965]/g, '.') // Danda/double danda to period
      .replace(/\u200c/g, ''); // Remove zero-width non-joiner
  }
  
  // For Arabic-based scripts (Arabic, Urdu)
  if (languageId === 'ar' || languageId === 'ur' || languageId === 'ps') {
    // Remove diacritics (harakat)
    normalized = normalized
      .replace(/[\u064b-\u065f\u0670]/g, '')
      // Normalize alif variants
      .replace(/[\u0622\u0623\u0625]/g, '\u0627')
      // Normalize ya variants
      .replace(/[\u064a\u06cc\u06d2]/g, '\u064a');
  }
  
  // Remove spaces for languages where spaces might be optional or inconsistently used
  if (['zh', 'ja', 'th'].includes(languageId || '')) {
    normalized = normalized.replace(/\s+/g, '');
  }
  
  // Normalize special spacing for languages with complex combining marks
  normalized = normalized.normalize('NFC');
  
  return normalized;
};
