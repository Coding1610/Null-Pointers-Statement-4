import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, MapPin, BarChart3, Settings, Shield, Globe2, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/components/auth/UserProfile';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">HydroNode</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10 text-white"
                  onClick={() => navigate('/map')}
                >
                  Launch Platform
                </Button>
                <UserProfile />
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10 text-white"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-map" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-background/10 border-white/20 text-white">
              <Zap className="mr-2 h-4 w-4" />
              Green Hydrogen Infrastructure Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Optimize Green Hydrogen
              <span className="block bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">
                Infrastructure
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              AI-powered mapping and optimization platform for green hydrogen production, storage, and distribution networks. 
              Make data-driven decisions for sustainable energy infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90 shadow-energy" 
                  onClick={() => navigate('/map')}
                >
                  Launch Map Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90 shadow-energy" 
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white">
                <Globe2 className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Comprehensive Infrastructure Intelligence
            </h2>
            <p className="text-xl text-muted-foreground">
              From site selection to network optimization, our platform provides end-to-end solutions for green hydrogen infrastructure planning.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-card transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Multi-Criteria Site Scoring</CardTitle>
                <CardDescription>
                  Evaluate optimal locations using weighted factors: renewable proximity, demand centers, grid connectivity, and regulatory incentives.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Proximity to renewable energy sources</li>
                  <li>• Distance to demand centers</li>
                  <li>• Grid connection feasibility</li>
                  <li>• Land costs and regulatory zones</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-card transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-energy rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Network Optimization</CardTitle>
                <CardDescription>
                  Facility location and p-median optimization to minimize transport costs while meeting capacity and budget constraints.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Production facility placement</li>
                  <li>• Pipeline route optimization</li>
                  <li>• Storage hub allocation</li>
                  <li>• Transport cost minimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-card transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-hydrogen-storage rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Interactive Scenario Planning</CardTitle>
                <CardDescription>
                  Compare multiple scenarios with different parameters, budgets, and constraints to find the optimal infrastructure strategy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Weight-based priority setting</li>
                  <li>• Budget constraint modeling</li>
                  <li>• Side-by-side comparisons</li>
                  <li>• NPV and LCOT calculations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Infrastructure Types */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Complete Infrastructure Mapping
            </h2>
            <p className="text-xl text-muted-foreground">
              Visualize and analyze all components of the green hydrogen value chain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-card border">
              <div className="w-16 h-16 bg-hydrogen-production/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-hydrogen-production" />
              </div>
              <h3 className="font-semibold mb-2">Production Plants</h3>
              <p className="text-sm text-muted-foreground">Electrolysis facilities, capacity planning, technology selection</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <div className="w-16 h-16 bg-hydrogen-storage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-hydrogen-storage" />
              </div>
              <h3 className="font-semibold mb-2">Storage Systems</h3>
              <p className="text-sm text-muted-foreground">Salt caverns, tanks, linepack, capacity optimization</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <div className="w-16 h-16 bg-hydrogen-transport/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-hydrogen-transport" />
              </div>
              <h3 className="font-semibold mb-2">Transport Networks</h3>
              <p className="text-sm text-muted-foreground">Pipelines, throughput analysis, routing optimization</p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border">
              <div className="w-16 h-16 bg-renewables/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe2 className="h-8 w-8 text-renewables" />
              </div>
              <h3 className="font-semibold mb-2">Demand Centers</h3>
              <p className="text-sm text-muted-foreground">Industrial hubs, mobility, power sector demand modeling</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-map" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Green Hydrogen Infrastructure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the transition to sustainable hydrogen economy with data-driven infrastructure planning.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-energy" onClick={() => navigate('/map')}>
            Start Planning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
export default Index;