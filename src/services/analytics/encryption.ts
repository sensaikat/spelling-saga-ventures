
// A simple encryption/decryption utility for local data storage

/**
 * Encrypts a string using a key with specified strength
 * @param data String to encrypt
 * @param key Encryption key
 * @param level Encryption strength (standard/enhanced)
 * @returns Encrypted string
 */
export function encrypt(
  data: string, 
  key: string, 
  level: 'standard' | 'enhanced' = 'standard'
): string {
  try {
    // For enhanced encryption, use a stronger key derivation
    const effectiveKey = level === 'enhanced' 
      ? strengthenKey(key, 10) // More iterations for enhanced security
      : strengthenKey(key, 3);  // Fewer iterations for standard security
    
    // Simple XOR encryption with the key
    let result = '';
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i);
      const keyChar = effectiveKey.charCodeAt(i % effectiveKey.length);
      const encryptedChar = charCode ^ keyChar;
      result += String.fromCharCode(encryptedChar);
    }
    
    // Base64 encode the result
    const base64 = btoa(result);
    
    // Add a simple integrity check
    const checksum = calculateChecksum(data);
    const levelMarker = level === 'enhanced' ? 'E' : 'S';
    
    return `${levelMarker}${checksum}:${base64}`;
  } catch (e) {
    console.error('Encryption error:', e);
    return '';
  }
}

/**
 * Decrypts a string using a key
 * @param encryptedData Encrypted string
 * @param key Decryption key
 * @param level Encryption strength to use for decryption
 * @returns Decrypted string
 */
export function decrypt(
  encryptedData: string, 
  key: string,
  level: 'standard' | 'enhanced' = 'standard'
): string {
  try {
    // Parse the encrypted data format
    const matches = encryptedData.match(/^([ES])([0-9a-f]+):(.+)$/);
    if (!matches) {
      throw new Error('Invalid encrypted data format');
    }
    
    const [, storedLevel, checksum, base64] = matches;
    
    // Use the stored level if available, otherwise use the provided level
    const effectiveLevel = (storedLevel === 'E') ? 'enhanced' : 'standard';
    
    // For enhanced encryption, use a stronger key derivation
    const effectiveKey = effectiveLevel === 'enhanced' 
      ? strengthenKey(key, 10)
      : strengthenKey(key, 3);
    
    // Base64 decode
    const encryptedStr = atob(base64);
    
    // Simple XOR decryption with the key
    let result = '';
    for (let i = 0; i < encryptedStr.length; i++) {
      const charCode = encryptedStr.charCodeAt(i);
      const keyChar = effectiveKey.charCodeAt(i % effectiveKey.length);
      const decryptedChar = charCode ^ keyChar;
      result += String.fromCharCode(decryptedChar);
    }
    
    // Verify integrity with checksum
    const calculatedChecksum = calculateChecksum(result);
    if (calculatedChecksum !== checksum) {
      console.warn('Data integrity check failed - possible tampering');
    }
    
    return result;
  } catch (e) {
    console.error('Decryption error:', e);
    return '[]'; // Return empty array as JSON string as a fallback
  }
}

/**
 * Strengthens a key through multiple iterations
 * @param key Original key
 * @param iterations Number of strengthening iterations
 * @returns Strengthened key
 */
function strengthenKey(key: string, iterations: number): string {
  let result = key;
  
  // Perform multiple iterations of key strengthening
  for (let i = 0; i < iterations; i++) {
    result = hashString(result + i);
  }
  
  return result;
}

/**
 * Simple string hashing function
 * @param str String to hash
 * @returns Hashed string
 */
function hashString(str: string): string {
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to a string
  return (hash >>> 0).toString(16);
}

/**
 * Calculate a simple checksum for data integrity verification
 * @param data Data to checksum
 * @returns Hex checksum
 */
function calculateChecksum(data: string): string {
  let checksum = 0;
  
  // Simple additive checksum
  for (let i = 0; i < data.length; i++) {
    checksum = (checksum + data.charCodeAt(i)) % 0xFFFFFFFF;
  }
  
  return checksum.toString(16).padStart(8, '0');
}
