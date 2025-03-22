
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check, User, UserRound, Shirt, Languages, Palette } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { languages } from '../utils/game';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarCustomizerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (options: AvatarOptions) => void;
  initialOptions?: AvatarOptions;
}

export interface AvatarOptions {
  avatarType: string;
  languageCode: string;
  costume?: string;
  color?: string;
}

const avatarTypes = [
  { id: 'wizard', emoji: '🧙‍♂️', name: 'Wizzy', description: 'A wise and magical guide' },
  { id: 'explorer', emoji: '👧', name: 'Flora', description: 'An adventurous explorer' },
  { id: 'robot', emoji: '🤖', name: 'Beep', description: 'A logical and analytical companion' },
  { id: 'dragon', emoji: '🐉', name: 'Sparky', description: 'An energetic and fiery friend' },
  { id: 'alien', emoji: '👽', name: 'Nova', description: 'A curious visitor from another world' }
];

const costumes = [
  { id: 'default', name: 'Default', emoji: '👕' },
  { id: 'hero', name: 'Superhero', emoji: '🦸' },
  { id: 'school', name: 'School Uniform', emoji: '🎒' },
  { id: 'space', name: 'Space Suit', emoji: '👨‍🚀' },
  { id: 'pirate', name: 'Pirate', emoji: '🏴‍☠️' }
];

const colors = [
  { id: 'default', color: 'bg-gradient-to-r from-violet-100 to-blue-100' },
  { id: 'warm', color: 'bg-gradient-to-r from-orange-100 to-red-100' },
  { id: 'cool', color: 'bg-gradient-to-r from-blue-100 to-green-100' },
  { id: 'pastel', color: 'bg-gradient-to-r from-pink-100 to-purple-100' },
  { id: 'sunset', color: 'bg-gradient-to-r from-yellow-100 to-orange-100' }
];

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ 
  open, 
  onOpenChange, 
  onSave,
  initialOptions = { avatarType: 'wizard', languageCode: 'en' }
}) => {
  const [options, setOptions] = useState<AvatarOptions>(initialOptions);
  
  // Reset options when dialog opens with initial values
  useEffect(() => {
    if (open) {
      setOptions(initialOptions);
    }
  }, [open, initialOptions]);
  
  const handleSave = () => {
    if (onSave) {
      onSave(options);
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Your Guide</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="avatar" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="avatar">Avatar</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="costume">Costume</TabsTrigger>
            <TabsTrigger value="color">Color</TabsTrigger>
          </TabsList>
          
          {/* Avatar Selection Tab */}
          <TabsContent value="avatar" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {avatarTypes.map((avatar) => (
                <motion.div
                  key={avatar.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    options.avatarType === avatar.id 
                      ? 'bg-blue-100 border-2 border-blue-400' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOptions({...options, avatarType: avatar.id})}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2">{avatar.emoji}</span>
                    <h3 className="font-medium">{avatar.name}</h3>
                    <p className="text-xs text-gray-600">{avatar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Language Selection Tab */}
          <TabsContent value="language" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {languages.map((lang) => (
                <motion.div
                  key={lang.id}
                  className={`p-2 rounded-lg cursor-pointer flex items-center ${
                    options.languageCode === lang.id.split('-')[0]
                      ? 'bg-blue-100 border-2 border-blue-400' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOptions({...options, languageCode: lang.id.split('-')[0]})}
                >
                  <span className="text-2xl mr-2">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-sm">{lang.name}</div>
                    <div className="text-xs text-gray-500">{lang.nativeName}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Costume Selection Tab */}
          <TabsContent value="costume" className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {costumes.map((costume) => (
                <motion.div
                  key={costume.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    options.costume === costume.id 
                      ? 'bg-blue-100 border-2 border-blue-400' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOptions({...options, costume: costume.id})}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl mb-1">{costume.emoji}</span>
                    <p className="text-xs font-medium">{costume.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Costumes change how your guide appears in different scenes
            </p>
          </TabsContent>
          
          {/* Color Selection Tab */}
          <TabsContent value="color" className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {colors.map((colorOption) => (
                <motion.div
                  key={colorOption.id}
                  className={`h-16 rounded-lg cursor-pointer ${colorOption.color} ${
                    options.color === colorOption.id 
                      ? 'ring-2 ring-blue-500 ring-offset-2' 
                      : 'hover:opacity-90'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOptions({...options, color: colorOption.id})}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Colors change the appearance of your guide's message bubbles
            </p>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {avatarTypes.find(a => a.id === options.avatarType)?.emoji || '👤'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">
                {avatarTypes.find(a => a.id === options.avatarType)?.name || 'Guide'}
              </p>
              <p className="text-xs text-gray-500">
                {languages.find(l => l.id.split('-')[0] === options.languageCode)?.name || 'English'}
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => onOpenChange && onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Check className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCustomizer;
