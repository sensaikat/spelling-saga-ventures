
import React from 'react';
import { Location } from '../../contexts/adventure';
import LocationCard from './LocationCard';

interface LocationGridProps {
  locations: Location[];
  currentLocationId: string;
  onLocationSelect: (locationId: string) => void;
  credits: number;
}

const LocationGrid: React.FC<LocationGridProps> = ({ 
  locations,
  currentLocationId,
  onLocationSelect,
  credits = 0 // Provide default value for credits
}) => {
  // Safely handle empty locations array
  if (!locations || locations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No adventure locations available</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          onClick={() => onLocationSelect(location.id)}
          isActive={location.id === currentLocationId}
          credits={credits}
        />
      ))}
    </div>
  );
};

export default LocationGrid;
