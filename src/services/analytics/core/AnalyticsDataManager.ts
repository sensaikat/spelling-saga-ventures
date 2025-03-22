
import { AnalyticsStorage } from '../storage';
import { AnalyticsSettings } from './AnalyticsSettings';

export class AnalyticsDataManager {
  private storage: AnalyticsStorage;
  private settings: AnalyticsSettings;
  
  constructor(
    storage: AnalyticsStorage,
    settings: AnalyticsSettings
  ) {
    this.storage = storage;
    this.settings = settings;
  }
  
  // Request immediate data deletion (right to be forgotten)
  public purgeAllData(): boolean {
    return this.storage.purgeAllData();
  }
  
  // Check if data should be purged (90 days of inactivity)
  public checkAndPurgeExpiredData(): void {
    this.storage.checkAndPurgeExpiredData();
  }
}
