
import { PrivacyPreferences } from '../types';
import { AnalyticsSecurity } from '../security';

export class AnalyticsSettings {
  private isEnabled: boolean = true;
  private userConsent: boolean = false;
  private encryptionKey: string = '';
  private primaryKey: string = '';
  private secondaryKey: string = '';
  private privacyPreferences: PrivacyPreferences = {
    shareDemographics: false,
    allowPersonalization: true,
    encryptionLevel: 'standard'
  };
  
  constructor() {
    this.loadSettings();
  }
  
  private loadSettings(): void {
    try {
      // Load user consent from localStorage
      const consent = localStorage.getItem('analytics-consent');
      this.userConsent = consent === 'true';
      
      // Load privacy preferences
      const preferences = localStorage.getItem('privacy-preferences');
      if (preferences) {
        this.privacyPreferences = JSON.parse(preferences);
      }
      
      // Generate or load anonymization keys
      this.primaryKey = localStorage.getItem('user-anon-key-primary') || '';
      this.secondaryKey = localStorage.getItem('user-anon-key-secondary') || '';
      
      if (!this.primaryKey || !this.secondaryKey) {
        const security = new AnalyticsSecurity('', '');
        this.primaryKey = security.generateAnonymizationKey();
        this.secondaryKey = security.generateAnonymizationKey();
        localStorage.setItem('user-anon-key-primary', this.primaryKey);
        localStorage.setItem('user-anon-key-secondary', this.secondaryKey);
      }
      
      // Set encryption key based on device fingerprint (or create new one)
      this.encryptionKey = localStorage.getItem('encryption-key') || 
                          new AnalyticsSecurity('', '').generateEncryptionKey();
      
      if (!localStorage.getItem('encryption-key')) {
        localStorage.setItem('encryption-key', this.encryptionKey);
      }
    } catch (e) {
      console.error('Error loading analytics settings:', e);
      this.userConsent = false;
    }
  }
  
  public setUserConsent(consent: boolean): void {
    this.userConsent = consent;
    localStorage.setItem('analytics-consent', consent.toString());
  }
  
  public hasUserConsent(): boolean {
    return this.userConsent;
  }
  
  public setUserPreferences(preferences: Partial<PrivacyPreferences>): void {
    this.privacyPreferences = {
      ...this.privacyPreferences,
      ...preferences
    };
    localStorage.setItem('privacy-preferences', JSON.stringify(this.privacyPreferences));
  }
  
  public getUserPreferences(): PrivacyPreferences {
    return this.privacyPreferences;
  }
  
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
  
  public isAnalyticsEnabled(): boolean {
    return this.isEnabled && this.userConsent;
  }
  
  public getEncryptionKey(): string {
    return this.encryptionKey;
  }
  
  public getPrimaryKey(): string {
    return this.primaryKey;
  }
  
  public getSecondaryKey(): string {
    return this.secondaryKey;
  }
}
