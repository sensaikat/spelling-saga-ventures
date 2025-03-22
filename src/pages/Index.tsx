
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, MapIcon, UserCog, Settings, Globe, Gamepad, BookOpen } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { useGameStore } from '../utils/game';
import GuideCharacter from '../components/guide';
import FreemiumFeatureGate from '../components/subscription/FreemiumFeatureGate';
import LanguageFeatureGate from '../components/subscription/LanguageFeatureGate';
import { useSubscriptionStore } from '../utils/subscription';
import AvatarCustomizer from '../components/AvatarCustomizer';

// Define AvatarOptions type
interface AvatarOptions {
  avatarType: string;
  languageCode: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { selectLanguage, checkAndUpdateStreak, selectedLanguage } = useGameStore();
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(() => {
    const savedOptions = localStorage.getItem('spelling-saga-avatar-options');
    return savedOptions ? JSON.parse(savedOptions) : { avatarType: 'wizard', languageCode: 'en' };
  });
  
  useEffect(() => {
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);
  
  const handleLanguageSelect = (language: any) => {
    selectLanguage(language);
    navigate('/game-mode');
  };
  
  const handleMultiLanguageSelect = () => {
    navigate('/multi-language');
  };
  
  const handleGameModeNavigate = (path: string) => {
    navigate(path);
  };
  
  const handleAvatarOptionsSave = (options: AvatarOptions) => {
    setAvatarOptions(options);
    localStorage.setItem('spelling-saga-avatar-options', JSON.stringify(options));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="flex justify-end mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/progress')}
              aria-label="View Progress"
            >
              <Book size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/adventure')}
              aria-label="Adventure Mode"
            >
              <MapIcon size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setShowAvatarCustomizer(true)}
              aria-label="Customize Avatar"
            >
              <UserCog size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/settings')}
              aria-label="Settings"
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </motion.div>
      
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-800 mb-4">
            Spelling Saga
          </h1>
          <p className="text-xl text-gray-600">Choose your adventure and start learning!</p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mb-12"
        >
          <Tabs defaultValue="game-type" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="game-type" className="text-lg py-3">
                <Gamepad className="mr-2" size={20} />
                Game Type
              </TabsTrigger>
              <TabsTrigger value="language" className="text-lg py-3">
                <Globe className="mr-2" size={20} />
                Language
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="game-type" className="p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  variants={itemVariants}
                  className="glass-panel p-6 border border-purple-100 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-game-purple/10 flex items-center justify-center">
                      <Gamepad size={32} className="text-game-purple" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-medium mb-4 text-center">Single Game Mode</h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Practice your spelling skills with individual games and challenges
                  </p>
                  <Button 
                    className="w-full bg-game-purple hover:bg-purple-600"
                    onClick={() => handleGameModeNavigate('/game-mode')}
                  >
                    Start Single Game
                  </Button>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="glass-panel p-6 border border-blue-100 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-game-blue/10 flex items-center justify-center">
                      <MapIcon size={32} className="text-game-blue" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-medium mb-4 text-center">Adventure Mode</h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Embark on a story-driven journey while learning vocabulary and spelling
                  </p>
                  <Button 
                    className="w-full bg-game-blue hover:bg-blue-600"
                    onClick={() => handleGameModeNavigate('/adventure')}
                  >
                    Start Adventure
                  </Button>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="language" className="p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  variants={itemVariants}
                  className="glass-panel p-6 border border-green-100 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-game-green/10 flex items-center justify-center">
                      <Globe size={32} className="text-game-green" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-medium mb-4 text-center">Single Language Mode</h2>
                  <p className="text-gray-600 mb-4 text-center">
                    Focus on mastering vocabulary in one language at a time
                  </p>
                  <LanguageSelector onSelect={handleLanguageSelect} />
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="glass-panel p-6 border border-red-100 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-game-red/10 flex items-center justify-center">
                      <BookOpen size={32} className="text-game-red" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-medium mb-4 text-center">Multi-Language Mode</h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Challenge yourself with vocabulary from multiple languages at once
                  </p>
                  <Button 
                    className="w-full bg-game-red hover:bg-red-600"
                    onClick={handleMultiLanguageSelect}
                  >
                    Start Multi-Language Mode
                  </Button>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>Learn vocabulary in multiple languages with interactive games</p>
          <p className="mt-1">© 2023 Spelling Saga</p>
        </motion.div>
      </div>
      
      <GuideCharacter 
        selectedAvatar={avatarOptions.avatarType}
        selectedLanguage={avatarOptions.languageCode}
        onChangeAvatar={() => setShowAvatarCustomizer(true)}
        isAdventure={false}
      />
      
      {showAvatarCustomizer && (
        <AvatarCustomizer
          open={showAvatarCustomizer}
          onOpenChange={setShowAvatarCustomizer}
          onSave={handleAvatarOptionsSave}
          initialOptions={avatarOptions}
        />
      )}
    </div>
  );
};

export default Index;
