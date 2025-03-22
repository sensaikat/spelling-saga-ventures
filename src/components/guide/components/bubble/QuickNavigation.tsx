
import React from 'react';
import { Home, Gamepad, MapIcon, Book, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickNavigationProps {
  handleNavigate: (path: string) => void;
}

export const QuickNavigation: React.FC<QuickNavigationProps> = ({
  handleNavigate
}) => {
  return (
    <div className="mt-3 pt-2 border-t border-white/30">
      <p className="text-xs mb-2">Quick Navigation:</p>
      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleNavigate('/')}
          title="Home"
        >
          <Home size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleNavigate('/game')}
          title="Games"
        >
          <Gamepad size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleNavigate('/adventure')}
          title="Adventure"
        >
          <MapIcon size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleNavigate('/progress')}
          title="Progress"
        >
          <Book size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleNavigate('/settings')}
          title="Settings"
        >
          <Settings size={14} />
        </Button>
      </div>
    </div>
  );
};
