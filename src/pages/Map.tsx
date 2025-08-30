import React, { useState } from 'react';
import { MapContainer } from '@/components/MapContainer';
import { LayerControl } from '@/components/LayerControl';
import { ScenarioPanel } from '@/components/ScenarioPanel';
import { OptimizationPanel } from '@/components/OptimizationPanel';
import { KPIPanel } from '@/components/KPIPanel';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/components/auth/UserProfile';
import { 
  Menu, 
  Layers, 
  Settings, 
  BarChart3, 
  Zap,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface LayerState {
  id: string;
  name: string;
  visible: boolean;
  type: 'hydrogen' | 'renewables' | 'demand' | 'constraints';
  color: string;
  data?: any[];
}

export interface ScenarioConfig {
  id: string;
  name: string;
  weights: {
    renewables: number;
    demand: number;
    grid: number;
    cost: number;
    incentive: number;
    exclusion: number;
  };
  budget: number;
  constraints: any[];
}

const MapPage = () => {
  const navigate = useNavigate();
  const [activeLayers, setActiveLayers] = useState<LayerState[]>([
    { id: 'production', name: 'H₂ Production', visible: true, type: 'hydrogen', color: '#059669' },
    { id: 'storage', name: 'H₂ Storage', visible: true, type: 'hydrogen', color: '#0284c7' },
    { id: 'pipelines', name: 'Pipelines', visible: true, type: 'hydrogen', color: '#7c3aed' },
    { id: 'renewables', name: 'Renewables', visible: false, type: 'renewables', color: '#eab308' },
    { id: 'demand', name: 'Demand Centers', visible: false, type: 'demand', color: '#dc2626' },
  ]);

  const [currentScenario, setCurrentScenario] = useState<ScenarioConfig>({
    id: 'default',
    name: 'India 2030 Base Case',
    weights: {
      renewables: 0.25,
      demand: 0.25,
      grid: 0.15,
      cost: 0.15,
      incentive: 0.10,
      exclusion: 0.10
    },
    budget: 10000,
    constraints: []
  });

  const [optimizationRunning, setOptimizationRunning] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState<any>(null);
  const [searchFilters, setSearchFilters] = useState<any>(null);

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => 
      prev.map(layer => 
        layer.id === layerId 
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };

  const runOptimization = async (type: 'mcda' | 'facility') => {
    setOptimizationRunning(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        type,
        candidates: [
          { id: 1, lat: 23.0225, lng: 72.5714, score: 0.87, factors: { renewables: 0.9, demand: 0.8, cost: 0.85 } },
          { id: 2, lat: 22.3072, lng: 73.1812, score: 0.82, factors: { renewables: 0.85, demand: 0.75, cost: 0.9 } },
          { id: 3, lat: 21.1702, lng: 72.8311, score: 0.78, factors: { renewables: 0.8, demand: 0.7, cost: 0.85 } }
        ],
        metrics: {
          avgScore: 0.82,
          totalCapex: 2500,
          lcot: 4.2,
          npv: 1200
        }
      };
      setOptimizationResults(mockResults);
      setOptimizationRunning(false);
    }, 3000);
  };

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Green Hydrogen Infrastructure Platform</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden md:flex">
            {currentScenario.name}
          </Badge>
          
          {/* User Profile */}
          <UserProfile />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="space-y-6">
                <LayerControl 
                  layers={activeLayers}
                  onToggleLayer={toggleLayer}
                />
                <ScenarioPanel 
                  onSearch={handleSearch}
                />
                <OptimizationPanel 
                  onRunOptimization={runOptimization}
                  isRunning={optimizationRunning}
                  results={optimizationResults}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-80 border-r bg-card flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Layers & Controls</h2>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              <LayerControl 
                layers={activeLayers}
                onToggleLayer={toggleLayer}
              />
              
              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Scenario Configuration</h3>
                </div>
                <ScenarioPanel 
                  onSearch={handleSearch}
                />
              </div>
              
              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Optimization</h3>
                </div>
                <OptimizationPanel 
                  onRunOptimization={runOptimization}
                  isRunning={optimizationRunning}
                  results={optimizationResults}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Map and KPI Container */}
        <div className="flex-1 flex flex-col">
          {/* KPI Bar */}
          <div className="border-b bg-card">
            <KPIPanel 
              results={optimizationResults}
              scenario={currentScenario}
            />
          </div>
          
          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer 
              searchFilters={searchFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;