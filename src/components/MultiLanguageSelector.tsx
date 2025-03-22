
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
  selectedLanguages: Language[];
  onLanguagesChange: (languages: Language[]) => void;
  maxLanguages?: number;
}

const MultiLanguageSelector: React.FC<MultiLanguageSelectorProps> = ({
  selectedLanguages,
  onLanguagesChange,
  maxLanguages = 3
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddLanguage = (language: Language) => {
    if (selectedLanguages.some(lang => lang.id === language.id)) {
      return;
    }

    if (selectedLanguages.length >= maxLanguages) {
      toast({
        title: "Maximum languages reached",
        description: `You can select up to ${maxLanguages} languages at once.`,
        variant: "destructive"
      });
      return;
    }

    onLanguagesChange([...selectedLanguages, language]);
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...selectedLanguages];
    newLanguages.splice(index, 1);
    onLanguagesChange(newLanguages);
  };

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Selected Languages ({selectedLanguages.length}/{maxLanguages})</h3>
        
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              disabled={selectedLanguages.length >= maxLanguages}
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
                  disabled={selectedLanguages.some(selected => selected.id === lang.id)}
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
        {selectedLanguages.length === 0 ? (
          <div className="text-sm text-gray-500 italic">
            No languages selected. Add at least one language to continue.
          </div>
        ) : (
          selectedLanguages.map((lang, index) => (
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
