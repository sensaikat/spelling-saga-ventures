
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
      .replace(/\u200c/g, '') // Remove zero-width non-joiner
      
      // Accept both forms of vowel sounds (independent/dependent)
      .replace(/[\u093e-\u094c]/g, '') // Hindi vowel signs
      .replace(/[\u09be-\u09cc]/g, '') // Bengali vowel signs
      .replace(/[\u0abe-\u0acc]/g, '') // Gujarati vowel signs
      .replace(/[\u0a3e-\u0a4c]/g, '') // Punjabi vowel signs
      .replace(/[\u0b3e-\u0b4c]/g, '') // Oriya vowel signs
      .replace(/[\u0bbe-\u0bcc]/g, '') // Tamil vowel signs
      .replace(/[\u0c3e-\u0c4c]/g, '') // Telugu vowel signs
      
      // Special Bengali normalizations
      .replace(/\u09df/g, '\u09af') // YYA to YA 
      .replace(/\u09a2\u09bc/g, '\u09dd') // DDHA+NUKTA to RHA
      .replace(/\u09a1\u09bc/g, '\u09dc') // DDA+NUKTA to RRA
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
  
  // For Chinese, Japanese - ignore whitespace
  if (['zh', 'ja', 'th'].includes(languageId || '')) {
    normalized = normalized.replace(/\s+/g, '');
  }
  
  // For Latin-based languages - accept with or without diacritics
  if (['es', 'fr', 'pt', 'de', 'it', 'pl'].includes(languageId || '')) {
    normalized = normalized
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
  }
  
  // Special handling for Bengali animal names - common variations
  if (languageId === 'bn') {
    // Handle common spelling variations in Bengali animal names
    normalized = normalized
      .replace(/বিড়াল/g, 'বিড়াল') // Standardize cat
      .replace(/কুকুর/g, 'কুকুর')   // Standardize dog
      .replace(/হাতী/g, 'হাতি')    // Alternative spelling for elephant
      .replace(/বাঘ/g, 'বাঘ')      // Standardize tiger
  }
  
  // Normalize special spacing for languages with complex combining marks
  normalized = normalized.normalize('NFC');
  
  return normalized;
};
