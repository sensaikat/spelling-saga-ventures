
export class AnalyticsSecurity {
  private primaryAnonymizationKey: string;
  private secondaryAnonymizationKey: string;
  
  constructor(primaryKey: string, secondaryKey: string) {
    this.primaryAnonymizationKey = primaryKey;
    this.secondaryAnonymizationKey = secondaryKey;
  }
  
  // Generate a random key for user anonymization
  public generateAnonymizationKey(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  // Generate a device-specific encryption key
  public generateEncryptionKey(): string {
    // Generate a device-specific encryption key
    const navigatorInfo = 
      navigator.userAgent + 
      navigator.language + 
      (navigator.languages || []).join(',');
    
    // Simple hash function
    const hash = Array.from(navigatorInfo)
      .reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
      }, 0);
    
    return hash.toString(16) + Math.random().toString(36).slice(2);
  }
  
  // Double anonymize user data for maximum privacy
  public anonymizeUserId(userId: string): string {
    // First level hashing with primary key
    const firstLevel = this.hashWithSalt(userId, this.primaryAnonymizationKey);
    
    // Second level hashing with secondary key for additional security
    return this.hashWithSalt(firstLevel, this.secondaryAnonymizationKey);
  }
  
  // Simple HMAC-like hash with salt
  private hashWithSalt(data: string, salt: string): string {
    const input = data + salt;
    let hash = 0;
    
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to base64-like string
    return btoa(hash.toString()).replace(/[+/=]/g, '').slice(0, 24);
  }
}
