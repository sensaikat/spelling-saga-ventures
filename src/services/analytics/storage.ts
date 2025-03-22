import { AnonymizedLearningData, PrivacyPreferences } from './types';
import { encrypt, decrypt } from './encryption';

export class AnalyticsStorage {
  private encryptionKey: string;
  
  constructor(encryptionKey: string) {
    this.encryptionKey = encryptionKey;
  }
  
  // Store encrypted analytics data locally
  public storeLocalAnalytics(data: AnonymizedLearningData, preferences: PrivacyPreferences): void {
    try {
      // Get existing data
      const encryptedData = localStorage.getItem('local-analytics');
      let analyticsArray: AnonymizedLearningData[] = [];
      
      if (encryptedData) {
        // Decrypt the existing data based on the encryption level
        const decryptedData = decrypt(
          encryptedData, 
          this.encryptionKey, 
          preferences.encryptionLevel
        );
        analyticsArray = JSON.parse(decryptedData);
      }
      
      // Add new data and limit array size
      analyticsArray.push(data);
      if (analyticsArray.length > 100) {
        analyticsArray.shift(); // Remove oldest entry
      }
      
      // Encrypt and save back to localStorage
      const jsonData = JSON.stringify(analyticsArray);
      const encrypted = encrypt(
        jsonData, 
        this.encryptionKey, 
        preferences.encryptionLevel
      );
      
      localStorage.setItem('local-analytics', encrypted);
      
      // Set expiry for data purging (90 days)
      const expiryTime = new Date();
      expiryTime.setDate(expiryTime.getDate() + 90);
      localStorage.setItem('analytics-expiry', expiryTime.toISOString());
      
    } catch (e) {
      console.error('Error storing local analytics:', e);
    }
  }
  
  // Get local analytics data
  public getLocalAnalyticsData(preferences: PrivacyPreferences): AnonymizedLearningData[] {
    try {
      const encryptedData = localStorage.getItem('local-analytics');
      if (!encryptedData) return [];
      
      // Decrypt based on the encryption level
      const decryptedData = decrypt(
        encryptedData, 
        this.encryptionKey, 
        preferences.encryptionLevel
      );
      
      return JSON.parse(decryptedData);
    } catch (e) {
      console.error('Error retrieving local analytics:', e);
      return [];
    }
  }
  
  // Delete all stored analytics data
  public purgeAllData(): boolean {
    try {
      localStorage.removeItem('local-analytics');
      localStorage.removeItem('analytics-expiry');
      // Keep anonymization keys for consistent hashing
      
      console.log('All analytics data has been purged');
      return true;
    } catch (e) {
      console.error('Error purging analytics data:', e);
      return false;
    }
  }
  
  // Check if data should be purged (90 days of inactivity)
  public checkAndPurgeExpiredData(): void {
    try {
      const expiryStr = localStorage.getItem('analytics-expiry');
      if (!expiryStr) return;
      
      const expiry = new Date(expiryStr);
      const now = new Date();
      
      if (now > expiry) {
        this.purgeAllData();
      }
    } catch (e) {
      console.error('Error checking data expiry:', e);
    }
  }
}
