import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Zap } from 'lucide-react';

interface OptimizationPanelProps {
  onRunOptimization: (type: 'mcda' | 'facility') => void;
  isRunning: boolean;
  results: any;
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({ 
  onRunOptimization, 
  isRunning, 
  results 
}) => {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 gap-2 md:gap-3">
        <Button
          onClick={() => onRunOptimization('mcda')}
          disabled={isRunning}
          className="w-full h-10 md:h-10"
          variant="default"
        >
          <Play className="mr-2 h-4 w-4" />
          Run Site Scoring
        </Button>
        
        <Button
          onClick={() => onRunOptimization('facility')}
          disabled={isRunning}
          variant="outline"
          className="w-full h-10 md:h-10"
        >
          <Zap className="mr-2 h-4 w-4" />
          Network Optimization
        </Button>
      </div>

      {isRunning && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Running optimization...</div>
          <Progress value={66} className="w-full" />
        </div>
      )}

      {results && (
        <div className="text-sm space-y-1">
          <div className="font-medium">Results Available</div>
          <div className="text-muted-foreground">
            {results.candidates?.length} sites found
          </div>
        </div>
      )}
    </div>
  );
};