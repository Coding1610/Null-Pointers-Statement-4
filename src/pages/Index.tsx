import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, MapPin, BarChart3, Settings, Shield, Globe2, LogIn, Menu, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/components/auth/UserProfile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 md:h-8 md:w-8 text-white" />
            <span className="text-lg md:text-xl font-bold text-white">HydroNode</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-primary hover:text-black hover:bg-white"
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
                  className="border-white/20 bg-white text-primary hover:bg-white"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white hover:bg-white text-primary hover:text-black">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <div className="space-y-6 pt-6">
                  {user ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full bg-white hover:bg-white text-primary hover:text-black"
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
                        className="w-full text-primary hover:text-black hover:bg-white"
                        onClick={() => navigate('/auth')}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="w-full bg-white hover:bg-white text-primary hover:text-black"
                        onClick={() => navigate('/auth')}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-map" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 md:mb-6 bg-background/10 border-white/20 text-white text-xs md:text-sm">
              <Zap className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Green Hydrogen Infrastructure Platform
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
              Optimize Green Hydrogen
              <span className="block bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">
                Infrastructure
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-700 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              AI-powered mapping and optimization platform for green hydrogen production, storage, and distribution networks. 
              Make data-driven decisions for sustainable energy infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              {user ? (
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white hover:bg-white text-primary hover:text-black shadow-energy w-full sm:w-auto" 
                  onClick={() => navigate('/map')}
                >
                  Launch Map Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white hover:bg-white text-primary hover:text-black shadow-energy w-full sm:w-auto" 
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button size="lg" variant="outline" className="bg-white hover:bg-white text-primary hover:text-black w-full sm:w-auto">
                <Globe2 className="mr-2 h-5 w-5" />
                View Demo
              </Button>
              <Button size="lg" variant="outline" className="bg-white hover:bg-white text-primary hover:text-black w-full sm:w-auto"  onClick={() => navigate('/dashboard')}>
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Comprehensive Infrastructure Intelligence
            </h2>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              From site selection to network optimization, our platform provides end-to-end solutions for green hydrogen infrastructure planning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Complete Infrastructure Mapping
            </h2>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              Visualize and analyze all components of the green hydrogen value chain
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
      <section className="py-16 md:py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-map" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 px-4">
            Ready to Optimize Your Green Hydrogen Infrastructure?
          </h2>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Join the transition to sustainable hydrogen economy with data-driven infrastructure planning.
          </p>
          <Button size="lg" variant="secondary" className="bg-white hover:bg-white text-primary hover:text-black shadow-energy w-full sm:w-auto max-w-xs" onClick={() => navigate('/map')}>
            Start Planning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">HydroNode</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Leading the transition to sustainable hydrogen economy through AI-powered infrastructure planning and optimization.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Blog & Insights
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Site Selection
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Route Optimization
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Cost Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Scenario Planning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    Regulatory Compliance
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">123 Innovation Drive</p>
                    <p className="text-gray-300 text-sm">Tech District, CA 90210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@hydronode.com" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    yp.70010@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+1-555-123-4567" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    +91 9879570010
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 HydroNode. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Index;