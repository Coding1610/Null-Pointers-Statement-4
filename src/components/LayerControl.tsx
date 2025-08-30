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
        <div key={layer.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: layer.color }}
            />
            <span className="text-sm font-medium">{layer.name}</span>
            <Badge variant="outline" className="text-xs">
              {layer.type}
            </Badge>
          </div>
          <Switch
            checked={layer.visible}
            onCheckedChange={() => onToggleLayer(layer.id)}
          />
        </div>
      ))}
    </div>
  );
};