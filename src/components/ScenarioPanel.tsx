import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchFilters {
  state: string;
  city: string;
  budget: string;
  population: string;
  plantType: string;
}

interface ScenarioPanelProps {
  onSearch: (filters: SearchFilters) => void;
}

export const ScenarioPanel: React.FC<ScenarioPanelProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    state: '',
    city: '',
    budget: '',
    population: '',
    plantType: ''
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const plantTypes = [
    'Hydrogen Production', 'Hydrogen Storage', 'Pipeline Network', 
    'Distribution Hub', 'Refueling Station'
  ];

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div>
        <Label className="text-sm font-medium">State</Label>
        <Select onValueChange={(value) => handleInputChange('state', value)}>
          <SelectTrigger className="mt-2 h-10 md:h-10">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {indianStates.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">City</Label>
        <Input
          placeholder="Enter city name"
          value={filters.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="mt-2 h-10 md:h-10"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Budget (in Crores)</Label>
        <Input
          placeholder="Enter budget"
          type="number"
          value={filters.budget}
          onChange={(e) => handleInputChange('budget', e.target.value)}
          className="mt-2 h-10 md:h-10"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Population of State</Label>
        <Input
          placeholder="Enter population"
          type="number"
          value={filters.population}
          onChange={(e) => handleInputChange('population', e.target.value)}
          className="mt-2 h-10 md:h-10"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Plant Type</Label>
        <Select onValueChange={(value) => handleInputChange('plantType', value)}>
          <SelectTrigger className="mt-2 h-10 md:h-10">
            <SelectValue placeholder="Select Plant Type" />
          </SelectTrigger>
          <SelectContent>
            {plantTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleSearch} 
        className="w-full mt-4 md:mt-6 h-10 md:h-10"
        disabled={!filters.state}
      >
        <Search className="h-4 w-4 mr-2" />
        Search Plants
      </Button>
    </div>
  );
};