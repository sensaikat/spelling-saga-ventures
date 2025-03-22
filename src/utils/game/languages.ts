
import { Language } from './types';

// Available languages
export const languages: Language[] = [
  // Free tier languages listed first for better visibility
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { id: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { id: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
  
  // Premium languages
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { id: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { id: 'or', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { id: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { id: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { id: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { id: 'doi', name: 'Dogri', nativeName: 'डोगरी', flag: '🇮🇳' },
  { id: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { id: 'si', name: 'Sinhalese', nativeName: 'සිංහල', flag: '🇱🇰' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { id: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫' },
];
