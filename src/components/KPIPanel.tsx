import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface KPIPanelProps {
  results: any;
  scenario: any;
}

export const KPIPanel: React.FC<KPIPanelProps> = ({ results, scenario }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-3">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-primary">
              {results?.metrics?.lcot || '4.2'}
            </div>
            <div className="text-xs text-muted-foreground">LCOT ($/kg)</div>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-success">
              {results?.metrics?.totalCapex || '2,500'}
            </div>
            <div className="text-xs text-muted-foreground">CAPEX ($M)</div>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-accent">
              ${scenario.budget}M
            </div>
            <div className="text-xs text-muted-foreground">Budget</div>
          </CardContent>
        </Card>
        
        <Card className="p-3">
          <CardContent className="p-0">
            <div className="text-2xl font-bold text-hydrogen-storage">
              {results?.candidates?.length || 0}
            </div>
            <div className="text-xs text-muted-foreground">Sites</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};