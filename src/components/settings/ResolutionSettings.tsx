
import React from 'react';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { useResolutionContext } from '../../contexts/resolution/ResolutionContext';
import { RESOLUTION_SETTINGS, ResolutionTier } from '../../hooks/use-resolution';
import { InfoIcon } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const ResolutionSettings: React.FC = () => {
  const {
    resolutionTier,
    setResolutionTier,
    autoAdjustResolution,
    setAutoAdjustResolution
  } = useResolutionContext();
  
  const isMobile = useIsMobile();
  
  const resolutionTiers: ResolutionTier[] = ['low', 'medium', 'high', 'ultra'];
  const currentIndex = resolutionTiers.indexOf(resolutionTier);
  
  const handleSliderChange = (value: number[]) => {
    setResolutionTier(resolutionTiers[value[0]]);
  };

  const getSettingDescription = (tier: ResolutionTier) => {
    switch (tier) {
      case 'low':
        return 'Best for older devices and maximum battery life';
      case 'medium':
        return 'Balanced performance and visual quality';
      case 'high':
        return 'Enhanced visuals with good performance';
      case 'ultra':
        return 'Maximum visual quality for powerful devices';
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          Display & Performance
        </CardTitle>
        <CardDescription>
          Adjust visual quality based on your device
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-adjust" className="flex items-center gap-2">
              Auto-adjust for device
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
            </Label>
            <Switch
              id="auto-adjust"
              checked={autoAdjustResolution}
              onCheckedChange={setAutoAdjustResolution}
            />
          </div>
          
          <div className={autoAdjustResolution ? "opacity-50 pointer-events-none" : ""}>
            <div className="mb-1 mt-4">
              <Label htmlFor="resolution-quality">Visual Quality</Label>
              <div className="text-sm text-muted-foreground">
                {getSettingDescription(resolutionTier)}
              </div>
            </div>
            
            <Slider
              id="resolution-quality"
              disabled={autoAdjustResolution}
              value={[currentIndex]}
              max={resolutionTiers.length - 1}
              step={1}
              onValueChange={handleSliderChange}
              className="mt-2"
            />
            
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
              <span>Ultra</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
          <p className="mb-1">Current settings:</p>
          <ul className="space-y-1 pl-4 list-disc">
            <li>Effects: {RESOLUTION_SETTINGS[resolutionTier].effectsLevel}</li>
            <li>Texture quality: {RESOLUTION_SETTINGS[resolutionTier].textureQuality}</li>
            <li>Animation detail: {RESOLUTION_SETTINGS[resolutionTier].animationDetail}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResolutionSettings;
