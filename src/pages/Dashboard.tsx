
// Site.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

// Import leaflet.heat plugin
import "leaflet.heat";

// Check if the plugin is available
const heatPlugin = (L as any).heatLayer;

// ------------------ Dummy Data ------------------
const siteScoreDistribution = [
  { name: "High Suitability", value: 4 },
  { name: "Medium Suitability", value: 3 },
  { name: "Low Suitability", value: 3 },
];
const pieColors = ["#28a745", "#82e0aa", "#c1f2d5"];

const recommendations = [
  { name: "Site A", score: 0.85, reason: "Near renewable source & permitted zone", lat: 28.61, lng: 77.22 },
  { name: "Site B", score: 0.65, reason: "Moderate proximity to demand", lat: 28.63, lng: 77.24 },
  { name: "Site C", score: 0.45, reason: "Restricted zone, low renewable proximity", lat: 28.62, lng: 77.25 },
  { name: "Site D", score: 0.75, reason: "Good infrastructure access", lat: 28.64, lng: 77.23 },
  { name: "Site E", score: 0.35, reason: "Remote location, high costs", lat: 28.60, lng: 77.26 },
  // Additional surrounding points for better heatmap spread
  { name: "Site A-1", score: 0.80, reason: "Near Site A", lat: 28.615, lng: 77.225 },
  { name: "Site A-2", score: 0.75, reason: "Near Site A", lat: 28.605, lng: 77.215 },
  { name: "Site D-1", score: 0.70, reason: "Near Site D", lat: 28.645, lng: 77.235 },
  { name: "Site B-1", score: 0.60, reason: "Near Site B", lat: 28.635, lng: 77.245 },
  { name: "Site C-1", score: 0.40, reason: "Near Site C", lat: 28.625, lng: 77.255 },
];

// ------------------ Heatmap Layer Component ------------------
interface HeatmapProps {
  data: [number, number, number][];
}

const DemandHeatmap: React.FC<HeatmapProps> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    try {
      console.log('Creating heatmap with data:', data);
      
      // Check if heatmap plugin is available
      if (heatPlugin) {
        console.log('Using heatmap plugin');
        // Create heatmap layer with better spread and visibility
        const heatLayer = heatPlugin(data, {
          radius: 120,        // Increased radius for wider spread
          blur: 45,           // Increased blur for smoother transitions
          maxZoom: 18,
          minOpacity: 0.2,   // Lower minimum opacity for better visibility
          maxIntensity: 1.0,
          gradient: { 
            0.0: "#ffffff",   // White for no data
            0.1: "#fef3c7",   // Very light yellow for low scores
            0.3: "#fde68a",   // Light yellow
            0.5: "#f59e0b",   // Orange for medium scores
            0.7: "#dc2626",   // Red for high scores
            0.9: "#7f1d1d"   // Dark red for very high scores
          },
        });

        // Add the heatmap layer to the map
        heatLayer.addTo(map);
        console.log('Heatmap layer added to map');

        // Add markers to show the actual data points for debugging
        data.forEach(([lat, lng, intensity]) => {
          const color = intensity >= 0.7 ? '#dc2626' : 
                       intensity >= 0.5 ? '#f59e0b' : 
                       intensity >= 0.3 ? '#fde68a' : '#fef3c7';
          
          L.circleMarker([lat, lng], {
            radius: 6,
            fillColor: color,
            color: '#000',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.7
          }).addTo(map);
        });

        return () => {
          heatLayer.remove();
          // Clean up markers
          map.eachLayer((layer: any) => {
            if (layer instanceof L.CircleMarker) {
              layer.remove();
            }
          });
        };
      } else {
        console.log('Heatmap plugin not available, showing markers only');
        // Fallback: just show colored markers
        data.forEach(([lat, lng, intensity]) => {
          const color = intensity >= 0.7 ? '#dc2626' : 
                       intensity >= 0.5 ? '#f59e0b' : 
                       intensity >= 0.3 ? '#fde68a' : '#fef3c7';
          
          L.circleMarker([lat, lng], {
            radius: 12,
            fillColor: color,
            color: '#000',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(map);
        });

        return () => {
          // Clean up markers
          map.eachLayer((layer: any) => {
            if (layer instanceof L.CircleMarker) {
              layer.remove();
            }
          });
        };
      }
    } catch (error) {
      console.error('Error creating heatmap:', error);
    }
  }, [data, map]);

  return null;
};

// ------------------ Site Component ------------------
const Site: React.FC = () => {
  const navigate = useNavigate();
  
  // Convert recommendations to heatmap data format [lat, lng, intensity]
  const heatmapData: [number, number, number][] = recommendations.map(rec => [
    rec.lat,
    rec.lng,
    rec.score
  ]);

  // Debug logging
  console.log('Heatmap data:', heatmapData);
  console.log('Recommendations:', recommendations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-8">
          {/* Back to Home Button */}
          <div className="flex justify-start mb-4">
            <button
              onClick={() => navigate('/')}
              className="bg-white hover:bg-white text-primary hover:text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              ← Back to Home
            </button>
          </div>
          <h1 className="text-4xl font-bold text-center mb-2">
            🌟 Hydrogen Ecosystem Dashboard
          </h1>
          <p className="text-center text-green-100 text-lg">
            Advanced Site Suitability Analysis & Recommendations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pie Chart Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-8 transform hover:scale-102 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-green-800">
                Site Suitability Distribution
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={siteScoreDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={50}
                  paddingAngle={6}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {siteScoreDistribution.map((entry, index) => (
                    <Cell key={index} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value} sites`, name]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #d1fae5',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Heatmap Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-6 transform hover:scale-102 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-800">
                  Site Suitability Heatmap
                </h2>
                <p className="text-sm text-gray-600 mt-1">Darker colors indicate higher suitability scores</p>
              </div>
            </div>
            <div className="relative">
              <MapContainer
                center={[28.62, 77.23]}
                zoom={12}
                style={{ height: "320px", width: "100%", borderRadius: "16px" }}
                className="shadow-md"
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <DemandHeatmap data={heatmapData} />
              </MapContainer>
              {/* Heatmap Legend */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md border border-green-100">
                <div className="text-xs font-semibold text-gray-700 mb-2">Suitability Score</div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
                    <span className="text-xs">High (0.7-1.0)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                    <span className="text-xs">Medium (0.5-0.7)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                    <span className="text-xs">Low (0.3-0.5)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-8 transform hover:scale-102 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold text-green-800">
              Candidate Site Recommendations
            </h2>
          </div>
          
          <div className="overflow-hidden rounded-xl border border-green-100">
            <table className="min-w-full">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider border-b border-green-200">
                    Site Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider border-b border-green-200">
                    Suitability Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider border-b border-green-200">
                    Key Factors
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-100">
                {recommendations.slice(0, 5).map((rec, index) => (
                  <tr
                    key={index}
                    className="hover:bg-green-50/50 transition-all duration-200 cursor-pointer group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          rec.score >= 0.7 ? 'bg-green-500' : 
                          rec.score >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                          {rec.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          rec.score >= 0.7
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : rec.score >= 0.5
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}>
                          {rec.score.toFixed(2)}
                        </div>
                        <div className="ml-3 w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              rec.score >= 0.7 ? 'bg-green-500' : 
                              rec.score >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${rec.score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      {rec.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;