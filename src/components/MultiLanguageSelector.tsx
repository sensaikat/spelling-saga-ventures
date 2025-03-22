import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Languages } from 'lucide-react';
import { languages, useGameStore } from '../utils/game';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { Language } from '../utils/game/types';

interface MultiLanguageSelectorProps {
  selectedLanguages?: Language[];
  onLanguagesChange?: (languages: Language[]) => void;
  onSelect?: () => void;
  maxLanguages?: number;
}

const MultiLanguageSelector: React.FC<MultiLanguageSelectorProps> = ({
  selectedLanguages = [],
  onLanguagesChange,
  onSelect,
  maxLanguages = 3
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedLanguages, setLocalSelectedLanguages] = useState<Language[]>(selectedLanguages);

  const handleAddLanguage = (language: Language) => {
    if (localSelectedLanguages.some(lang => lang.id === language.id)) {
      return;
    }

    if (localSelectedLanguages.length >= maxLanguages) {
      toast({
        title: "Maximum languages reached",
        description: `You can select up to ${maxLanguages} languages at once.`,
        variant: "destructive"
      });
      return;
    }

    const newSelectedLanguages = [...localSelectedLanguages, language];
    setLocalSelectedLanguages(newSelectedLanguages);
    
    if (onLanguagesChange) {
      onLanguagesChange(newSelectedLanguages);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...localSelectedLanguages];
    newLanguages.splice(index, 1);
    setLocalSelectedLanguages(newLanguages);
    
    if (onLanguagesChange) {
      onLanguagesChange(newLanguages);
    }
  };

  // If onSelect is provided, we're in the simple mode
  if (onSelect) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-gray-600 mb-4">
          Challenge yourself with vocabulary from multiple languages at once.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-game-purple hover:bg-purple-600 text-white px-6 py-3 rounded-full text-lg"
          onClick={onSelect}
        >
          Start Multi-Language Mode
        </motion.button>
      </div>
    );
  }

  // Otherwise, render the language selector UI
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Selected Languages ({localSelectedLanguages.length}/{maxLanguages})</h3>
        
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              disabled={localSelectedLanguages.length >= maxLanguages}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              <span>Add Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Choose a language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {languages.map(lang => (
                <DropdownMenuItem
                  key={lang.id}
                  disabled={localSelectedLanguages.some(selected => selected.id === lang.id)}
                  onClick={() => handleAddLanguage(lang)}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg mr-1">{lang.flag}</span>
                  <span>{lang.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">{lang.nativeName}</span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {localSelectedLanguages.length === 0 ? (
          <div className="text-sm text-gray-500 italic">
            No languages selected. Add at least one language to continue.
          </div>
        ) : (
          localSelectedLanguages.map((lang, index) => (
            <Badge
              key={index}
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              <button
                onClick={() => handleRemoveLanguage(index)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </Badge>
          ))
        )}
      </div>
    </div>
  );
};

export default MultiLanguageSelector;
