
import React from 'react';
import { motion } from 'framer-motion';
import { 
  getCurrentEvents, 
  getSeasonalWords,
  SeasonalEvent
} from '../../utils/seasonal/seasonalEvents';

interface SeasonalContentProps {
  languageId: string;
  className?: string;
}

export const SeasonalContent: React.FC<SeasonalContentProps> = ({ 
  languageId,
  className = ''
}) => {
  const activeEvents = getCurrentEvents().filter(event => 
    event.languages.includes(languageId) || event.languages.includes('all')
  );
  
  if (activeEvents.length === 0) {
    return null;
  }
  
  return (
    <div className={`seasonal-content ${className}`}>
      {activeEvents.map((event) => (
        <SeasonalEventCard 
          key={event.id} 
          event={event} 
          languageId={languageId}
        />
      ))}
    </div>
  );
};

interface SeasonalEventCardProps {
  event: SeasonalEvent;
  languageId: string;
}

const SeasonalEventCard: React.FC<SeasonalEventCardProps> = ({ 
  event,
  languageId
}) => {
  const Icon = event.icon;
  
  // Get one random item from each category to show
  const getRandomItem = (category: keyof SeasonalEvent['items']) => {
    const items = event.items[category];
    return items[Math.floor(Math.random() * items.length)];
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-4 rounded-lg p-4 ${event.colorClass} border border-gray-200`}
    >
      <div className="flex items-center mb-2">
        <Icon className="h-5 w-5 mr-2" />
        <h3 className="font-medium">{event.name}</h3>
      </div>
      
      <p className="text-sm mb-3">{event.description}</p>
      
      <div className="text-sm space-y-1">
        {event.items.food.length > 0 && (
          <p><span className="font-medium">Food:</span> {getRandomItem('food')}</p>
        )}
        
        {event.items.cultural.length > 0 && (
          <p><span className="font-medium">Cultural:</span> {getRandomItem('cultural')}</p>
        )}
        
        {event.items.places.length > 0 && (
          <p><span className="font-medium">Places:</span> {getRandomItem('places')}</p>
        )}
      </div>
    </motion.div>
  );
};

export default SeasonalContent;
