
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8390d50f01044786bcaa1953d8b8b9ed',
  appName: 'spelling-saga-ventures',
  webDir: 'dist',
  server: {
    url: 'https://8390d50f-0104-4786-bcaa-1953d8b8b9ed.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#fffbff",
      showSpinner: true,
      spinnerColor: "#6750A4",
      androidSpinnerStyle: "large"
    }
  }
};

export default config;
