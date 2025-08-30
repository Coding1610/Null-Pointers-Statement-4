import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface LayerControlProps {
  layers: any[];
  onToggleLayer: (layerId: string) => void;
}

export const LayerControl: React.FC<LayerControlProps> = ({ layers, onToggleLayer }) => {
  return (
    <div className="space-y-3">
      {layers.map((layer) => (
        <div key={layer.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div 
              className="w-3 h-3 md:w-4 md:h-4 rounded flex-shrink-0" 
              style={{ backgroundColor: layer.color }}
            />
            <span className="text-sm font-medium truncate">{layer.name}</span>
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {layer.type}
            </Badge>
          </div>
          <Switch
            checked={layer.visible}
            onCheckedChange={() => onToggleLayer(layer.id)}
            className="flex-shrink-0 ml-2"
          />
        </div>
      ))}
    </div>
  );
};