
import React from 'react';
import { motion } from 'framer-motion';
import SettingsHeader from '../components/settings/SettingsHeader';
import LanguageSettings from '../components/settings/LanguageSettings';
import AppSettings from '../components/settings/AppSettings';
import AboutSection from '../components/settings/AboutSection';
import ParentalControlsSettings from '../components/settings/ParentalControlsSettings';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <SettingsHeader />
        
        <div className="max-w-2xl mx-auto">
          <ParentalControlsSettings />
          <LanguageSettings />
          <AppSettings />
          <AboutSection />
        </div>
      </div>
    </div>
  );
};

export default Settings;
