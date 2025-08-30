import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface PlantLocation {
  id: string;
  name: string;
  type: string;
  state: string;
  city: string;
  coordinates: [number, number];
  capacity: string;
  status: 'operational' | 'planned' | 'construction';
}

interface MapContainerProps {
  searchFilters: any;
}

// Mock plant data for demonstration - 50+ locations across Indian states
const mockPlantData: PlantLocation[] = [
  // Gujarat - 5 plants
  { id: '1', name: 'Gujarat Green Hydrogen Hub', type: 'Hydrogen Production', state: 'Gujarat', city: 'Jamnagar', coordinates: [70.0667, 22.4707], capacity: '100 MW', status: 'operational' },
  { id: '2', name: 'Adani H2 Production Plant', type: 'Hydrogen Production', state: 'Gujarat', city: 'Kutch', coordinates: [69.8597, 23.7337], capacity: '200 MW', status: 'construction' },
  { id: '3', name: 'Gujarat Storage Terminal', type: 'Hydrogen Storage', state: 'Gujarat', city: 'Ahmedabad', coordinates: [72.5714, 23.0225], capacity: '100 tonnes', status: 'operational' },
  { id: '4', name: 'Surat Distribution Hub', type: 'Distribution Hub', state: 'Gujarat', city: 'Surat', coordinates: [72.8311, 21.1702], capacity: '150 tonnes/day', status: 'operational' },
  { id: '5', name: 'Gujarat Refueling Network', type: 'Refueling Station', state: 'Gujarat', city: 'Vadodara', coordinates: [73.2081, 22.3072], capacity: '500 kg/day', status: 'planned' },

  // Rajasthan - 4 plants
  { id: '6', name: 'Rajasthan Solar H2 Plant', type: 'Hydrogen Production', state: 'Rajasthan', city: 'Jodhpur', coordinates: [73.0243, 26.2389], capacity: '150 MW', status: 'planned' },
  { id: '7', name: 'Thar Desert H2 Hub', type: 'Hydrogen Production', state: 'Rajasthan', city: 'Jaisalmer', coordinates: [70.9083, 26.9157], capacity: '250 MW', status: 'construction' },
  { id: '8', name: 'Jaipur Distribution Center', type: 'Distribution Hub', state: 'Rajasthan', city: 'Jaipur', coordinates: [75.7873, 26.9124], capacity: '120 tonnes/day', status: 'operational' },
  { id: '9', name: 'Udaipur Storage Facility', type: 'Hydrogen Storage', state: 'Rajasthan', city: 'Udaipur', coordinates: [73.7125, 24.5854], capacity: '80 tonnes', status: 'planned' },

  // Tamil Nadu - 4 plants
  { id: '10', name: 'Tamil Nadu Storage Facility', type: 'Hydrogen Storage', state: 'Tamil Nadu', city: 'Chennai', coordinates: [80.2707, 13.0827], capacity: '50 tonnes', status: 'construction' },
  { id: '11', name: 'Coimbatore H2 Production', type: 'Hydrogen Production', state: 'Tamil Nadu', city: 'Coimbatore', coordinates: [76.9558, 11.0168], capacity: '120 MW', status: 'operational' },
  { id: '12', name: 'Madurai Pipeline Hub', type: 'Pipeline Network', state: 'Tamil Nadu', city: 'Madurai', coordinates: [78.1198, 9.9252], capacity: '180 km', status: 'planned' },
  { id: '13', name: 'Tuticorin Port H2 Terminal', type: 'Distribution Hub', state: 'Tamil Nadu', city: 'Tuticorin', coordinates: [78.1348, 8.7642], capacity: '300 tonnes/day', status: 'construction' },

  // Maharashtra - 4 plants
  { id: '14', name: 'Maharashtra Distribution Hub', type: 'Distribution Hub', state: 'Maharashtra', city: 'Mumbai', coordinates: [72.8777, 19.0760], capacity: '200 tonnes/day', status: 'operational' },
  { id: '15', name: 'Pune H2 Production Plant', type: 'Hydrogen Production', state: 'Maharashtra', city: 'Pune', coordinates: [73.8567, 18.5204], capacity: '180 MW', status: 'operational' },
  { id: '16', name: 'Nagpur Storage Complex', type: 'Hydrogen Storage', state: 'Maharashtra', city: 'Nagpur', coordinates: [79.0882, 21.1458], capacity: '150 tonnes', status: 'planned' },
  { id: '17', name: 'Aurangabad Refueling Station', type: 'Refueling Station', state: 'Maharashtra', city: 'Aurangabad', coordinates: [75.3433, 19.8762], capacity: '400 kg/day', status: 'construction' },

  // Karnataka - 3 plants
  { id: '18', name: 'Karnataka Pipeline Network', type: 'Pipeline Network', state: 'Karnataka', city: 'Bangalore', coordinates: [77.5946, 12.9716], capacity: '300 km', status: 'planned' },
  { id: '19', name: 'Mysore H2 Production', type: 'Hydrogen Production', state: 'Karnataka', city: 'Mysore', coordinates: [76.6394, 12.2958], capacity: '140 MW', status: 'operational' },
  { id: '20', name: 'Hubli Distribution Center', type: 'Distribution Hub', state: 'Karnataka', city: 'Hubli', coordinates: [75.1240, 15.3647], capacity: '100 tonnes/day', status: 'construction' },

  // Andhra Pradesh - 3 plants
  { id: '21', name: 'Visakhapatnam H2 Hub', type: 'Hydrogen Production', state: 'Andhra Pradesh', city: 'Visakhapatnam', coordinates: [83.2185, 17.6868], capacity: '220 MW', status: 'planned' },
  { id: '22', name: 'Vijayawada Storage', type: 'Hydrogen Storage', state: 'Andhra Pradesh', city: 'Vijayawada', coordinates: [80.6480, 16.5062], capacity: '90 tonnes', status: 'operational' },
  { id: '23', name: 'Tirupati Pipeline Network', type: 'Pipeline Network', state: 'Andhra Pradesh', city: 'Tirupati', coordinates: [79.4192, 13.6288], capacity: '150 km', status: 'construction' },

  // Telangana - 2 plants
  { id: '24', name: 'Hyderabad Tech Hub', type: 'Hydrogen Production', state: 'Telangana', city: 'Hyderabad', coordinates: [78.4867, 17.3850], capacity: '160 MW', status: 'operational' },
  { id: '25', name: 'Warangal Distribution', type: 'Distribution Hub', state: 'Telangana', city: 'Warangal', coordinates: [79.5941, 17.9689], capacity: '80 tonnes/day', status: 'planned' },

  // Kerala - 2 plants
  { id: '26', name: 'Kochi Port H2 Terminal', type: 'Distribution Hub', state: 'Kerala', city: 'Kochi', coordinates: [76.2673, 9.9312], capacity: '250 tonnes/day', status: 'operational' },
  { id: '27', name: 'Thiruvananthapuram Storage', type: 'Hydrogen Storage', state: 'Kerala', city: 'Thiruvananthapuram', coordinates: [76.9366, 8.5241], capacity: '60 tonnes', status: 'construction' },

  // Madhya Pradesh - 3 plants
  { id: '28', name: 'Bhopal H2 Production', type: 'Hydrogen Production', state: 'Madhya Pradesh', city: 'Bhopal', coordinates: [77.4126, 23.2599], capacity: '130 MW', status: 'planned' },
  { id: '29', name: 'Indore Distribution Hub', type: 'Distribution Hub', state: 'Madhya Pradesh', city: 'Indore', coordinates: [75.8577, 22.7196], capacity: '110 tonnes/day', status: 'operational' },
  { id: '30', name: 'Gwalior Pipeline', type: 'Pipeline Network', state: 'Madhya Pradesh', city: 'Gwalior', coordinates: [78.1828, 26.2183], capacity: '120 km', status: 'construction' },

  // Uttar Pradesh - 3 plants
  { id: '31', name: 'Lucknow H2 Hub', type: 'Hydrogen Production', state: 'Uttar Pradesh', city: 'Lucknow', coordinates: [80.9462, 26.8467], capacity: '170 MW', status: 'operational' },
  { id: '32', name: 'Kanpur Storage Facility', type: 'Hydrogen Storage', state: 'Uttar Pradesh', city: 'Kanpur', coordinates: [80.3319, 26.4499], capacity: '120 tonnes', status: 'planned' },
  { id: '33', name: 'Agra Refueling Station', type: 'Refueling Station', state: 'Uttar Pradesh', city: 'Agra', coordinates: [78.0081, 27.1767], capacity: '350 kg/day', status: 'construction' },

  // West Bengal - 2 plants
  { id: '34', name: 'Kolkata Port H2 Terminal', type: 'Distribution Hub', state: 'West Bengal', city: 'Kolkata', coordinates: [88.3639, 22.5726], capacity: '280 tonnes/day', status: 'operational' },
  { id: '35', name: 'Durgapur H2 Production', type: 'Hydrogen Production', state: 'West Bengal', city: 'Durgapur', coordinates: [87.3119, 23.5204], capacity: '110 MW', status: 'planned' },

  // Odisha - 2 plants
  { id: '36', name: 'Bhubaneswar H2 Hub', type: 'Hydrogen Production', state: 'Odisha', city: 'Bhubaneswar', coordinates: [85.8245, 20.2961], capacity: '140 MW', status: 'construction' },
  { id: '37', name: 'Paradip Port Terminal', type: 'Distribution Hub', state: 'Odisha', city: 'Paradip', coordinates: [86.6970, 20.3217], capacity: '200 tonnes/day', status: 'operational' },

  // Haryana - 2 plants
  { id: '38', name: 'Gurgaon H2 Production', type: 'Hydrogen Production', state: 'Haryana', city: 'Gurgaon', coordinates: [77.0266, 28.4595], capacity: '100 MW', status: 'operational' },
  { id: '39', name: 'Faridabad Storage', type: 'Hydrogen Storage', state: 'Haryana', city: 'Faridabad', coordinates: [77.3178, 28.4089], capacity: '70 tonnes', status: 'planned' },

  // Punjab - 2 plants
  { id: '40', name: 'Ludhiana H2 Plant', type: 'Hydrogen Production', state: 'Punjab', city: 'Ludhiana', coordinates: [75.8573, 30.9010], capacity: '90 MW', status: 'construction' },
  { id: '41', name: 'Amritsar Refueling Hub', type: 'Refueling Station', state: 'Punjab', city: 'Amritsar', coordinates: [74.8723, 31.6340], capacity: '300 kg/day', status: 'planned' },

  // Bihar - 1 plant
  { id: '42', name: 'Patna H2 Distribution', type: 'Distribution Hub', state: 'Bihar', city: 'Patna', coordinates: [85.1376, 25.5941], capacity: '90 tonnes/day', status: 'planned' },

  // Jharkhand - 1 plant
  { id: '43', name: 'Ranchi H2 Production', type: 'Hydrogen Production', state: 'Jharkhand', city: 'Ranchi', coordinates: [85.3096, 23.3441], capacity: '120 MW', status: 'construction' },

  // Chhattisgarh - 1 plant
  { id: '44', name: 'Raipur Storage Hub', type: 'Hydrogen Storage', state: 'Chhattisgarh', city: 'Raipur', coordinates: [81.6296, 21.2514], capacity: '85 tonnes', status: 'operational' },

  // Himachal Pradesh - 1 plant
  { id: '45', name: 'Shimla Green H2 Plant', type: 'Hydrogen Production', state: 'Himachal Pradesh', city: 'Shimla', coordinates: [77.1025, 31.1048], capacity: '60 MW', status: 'planned' },

  // Uttarakhand - 1 plant
  { id: '46', name: 'Dehradun H2 Hub', type: 'Hydrogen Production', state: 'Uttarakhand', city: 'Dehradun', coordinates: [78.0322, 30.3165], capacity: '80 MW', status: 'construction' },

  // Assam - 1 plant
  { id: '47', name: 'Guwahati H2 Terminal', type: 'Distribution Hub', state: 'Assam', city: 'Guwahati', coordinates: [91.7362, 26.1445], capacity: '70 tonnes/day', status: 'planned' },

  // Goa - 1 plant
  { id: '48', name: 'Panaji Port H2 Station', type: 'Refueling Station', state: 'Goa', city: 'Panaji', coordinates: [73.8278, 15.4909], capacity: '200 kg/day', status: 'operational' },

  // Delhi - 1 plant
  { id: '49', name: 'Delhi H2 Mobility Hub', type: 'Refueling Station', state: 'Delhi', city: 'New Delhi', coordinates: [77.2090, 28.6139], capacity: '600 kg/day', status: 'operational' },

  // Jammu & Kashmir - 1 plant
  { id: '50', name: 'Srinagar Green H2 Plant', type: 'Hydrogen Production', state: 'Jammu & Kashmir', city: 'Srinagar', coordinates: [74.7973, 34.0837], capacity: '50 MW', status: 'planned' }
];

export const MapContainer: React.FC<MapContainerProps> = ({ searchFilters }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [filteredPlants, setFilteredPlants] = useState<PlantLocation[]>([]);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // Filter plants based on search criteria
    const filtered = mockPlantData.filter(plant => {
      if (searchFilters?.state && plant.state !== searchFilters.state) return false;
      if (searchFilters?.city && !plant.city.toLowerCase().includes(searchFilters.city.toLowerCase())) return false;
      if (searchFilters?.plantType && plant.type !== searchFilters.plantType) return false;
      return true;
    });
    setFilteredPlants(filtered);
  }, [searchFilters]);

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    // Fix Leaflet default marker icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
    
    map.current = L.map(mapContainer.current).setView([20.5937, 78.9629], 5);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers after map initialization
    addPlantMarkers();
  };

  const addPlantMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    filteredPlants.forEach(plant => {
      // Create custom icon
      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: ${getPlantColor(plant.type)};
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            cursor: pointer;
          ">
            ${getPlantIcon(plant.type)}
          </div>
        `,
        className: 'plant-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([plant.coordinates[1], plant.coordinates[0]], { icon: customIcon })
        .addTo(map.current!)
        .bindPopup(`
          <div class="p-3">
            <h3 class="font-semibold text-lg">${plant.name}</h3>
            <p class="text-sm text-gray-600">${plant.type}</p>
            <p class="text-sm"><strong>Location:</strong> ${plant.city}, ${plant.state}</p>
            <p class="text-sm"><strong>Capacity:</strong> ${plant.capacity}</p>
            <p class="text-sm"><strong>Status:</strong> ${plant.status}</p>
          </div>
        `);

      markersRef.current.push(marker);
    });
  };

  const getPlantColor = (type: string) => {
    switch (type) {
      case 'Hydrogen Production': return '#059669';
      case 'Hydrogen Storage': return '#0284c7';
      case 'Pipeline Network': return '#7c3aed';
      case 'Distribution Hub': return '#dc2626';
      case 'Refueling Station': return '#eab308';
      default: return '#6b7280';
    }
  };

  const getPlantIcon = (type: string) => {
    switch (type) {
      case 'Hydrogen Production': return '⚡';
      case 'Hydrogen Storage': return '🏭';
      case 'Pipeline Network': return '🔗';
      case 'Distribution Hub': return '📍';
      case 'Refueling Station': return '⛽';
      default: return '📍';
    }
  };

  useEffect(() => {
    if (!map.current) {
      initializeMap();
    } else {
      addPlantMarkers();
    }
  }, [filteredPlants]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      {filteredPlants.length > 0 && (
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <h4 className="font-semibold text-sm mb-2">Found {filteredPlants.length} plants</h4>
          <div className="space-y-1 text-xs">
            {Object.entries(
              filteredPlants.reduce((acc, plant) => {
                acc[plant.type] = (acc[plant.type] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([type, count]) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getPlantColor(type) }}
                />
                <span>{type}: {count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};