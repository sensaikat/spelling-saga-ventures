
import React from 'react';
import { motion } from 'framer-motion';
import SettingsHeader from '../components/settings/SettingsHeader';
import AppSettings from '../components/settings/AppSettings';
import LanguageSettings from '../components/settings/LanguageSettings';
import ParentalControlsSettings from '../components/settings/ParentalControlsSettings';
import TimerSettings from '../components/settings/TimerSettings';
import ResolutionSettings from '../components/settings/ResolutionSettings';
import AboutSection from '../components/settings/AboutSection';

const Settings = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <SettingsHeader />
        
        <motion.div 
          className="space-y-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AppSettings />
          <LanguageSettings />
          <TimerSettings />
          <ParentalControlsSettings />
          <ResolutionSettings />
          <AboutSection />
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
