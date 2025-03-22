
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
  credits
}) => {
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
