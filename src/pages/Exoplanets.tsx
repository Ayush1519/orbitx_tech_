import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Globe, Star, Telescope, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import exoplanetsImage from "@/assets/exoplanets.jpg";

const Exoplanets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const exoplanets = [
    {
      name: "Kepler-452b",
      type: "Super-Earth",
      hostStar: "Kepler-452",
      distance: "1,402 light-years",
      radius: "1.6 × Earth",
      orbitalPeriod: "385 days",
      temperature: "5°C (estimated)",
      discovered: "2015",
      facts: "Earth's cousin in the habitable zone"
    },
    {
      name: "Proxima Centauri b",
      type: "Terrestrial",
      hostStar: "Proxima Centauri",
      distance: "4.24 light-years",
      radius: "1.1 × Earth",
      orbitalPeriod: "11.2 days",
      temperature: "-39°C (estimated)",
      discovered: "2016",
      facts: "Closest known exoplanet to Earth"
    },
    {
      name: "TRAPPIST-1e",
      type: "Terrestrial",
      hostStar: "TRAPPIST-1",
      distance: "40 light-years",
      radius: "0.91 × Earth",
      orbitalPeriod: "6.1 days",
      temperature: "-22°C (estimated)",
      discovered: "2017",
      facts: "Part of 7-planet system, potentially habitable"
    },
    {
      name: "K2-18b",
      type: "Sub-Neptune",
      hostStar: "K2-18",
      distance: "124 light-years",
      radius: "2.3 × Earth",
      orbitalPeriod: "33 days",
      temperature: "-73°C (estimated)",
      discovered: "2015",
      facts: "Water vapor detected in atmosphere"
    },
    {
      name: "HD 209458b",
      type: "Hot Jupiter",
      hostStar: "HD 209458",
      distance: "159 light-years",
      radius: "1.38 × Jupiter",
      orbitalPeriod: "3.5 days",
      temperature: "1000°C",
      discovered: "1999",
      facts: "First exoplanet with detected atmosphere"
    },
    {
      name: "55 Cancri e",
      type: "Super-Earth",
      hostStar: "55 Cancri A",
      distance: "40 light-years",
      radius: "2.0 × Earth",
      orbitalPeriod: "18 hours",
      temperature: "2000°C",
      discovered: "2004",
      facts: "Possible diamond planet with extreme heat"
    },
    {
      name: "TOI-715b",
      type: "Super-Earth",
      hostStar: "TOI-715",
      distance: "137 light-years",
      radius: "1.55 × Earth",
      orbitalPeriod: "19.3 days",
      temperature: "-5°C (estimated)",
      discovered: "2024",
      facts: "Recent discovery in the habitable zone"
    },
    {
      name: "LHS 1140b",
      type: "Super-Earth",
      hostStar: "LHS 1140",
      distance: "48 light-years",
      radius: "1.7 × Earth",
      orbitalPeriod: "25 days",
      temperature: "-43°C (estimated)",
      discovered: "2017",
      facts: "Dense rocky planet, excellent for atmosphere study"
    }
  ];

  const planetTypes = ["all", "Terrestrial", "Super-Earth", "Sub-Neptune", "Hot Jupiter"];

  const filteredExoplanets = exoplanets.filter(planet => {
    const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         planet.hostStar.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || planet.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Terrestrial": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Super-Earth": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Sub-Neptune": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Hot Jupiter": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-cosmic">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
              Exoplanets
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover thousands of planets orbiting distant stars across the Milky Way galaxy. 
              From Earth-like worlds to exotic gas giants, each exoplanet tells a unique story.
            </p>
          </div>

          {/* Exoplanets Overview Image */}
          <div className="mb-16 rounded-xl overflow-hidden">
            <img 
              src={exoplanetsImage} 
              alt="Artist's impression of various exoplanets"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exoplanets or host stars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {planetTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">Confirmed Exoplanets</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-accent">3000+</div>
              <div className="text-sm text-muted-foreground">Host Stars</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-secondary">500+</div>
              <div className="text-sm text-muted-foreground">Multi-Planet Systems</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Potentially Habitable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Exoplanets Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExoplanets.map((planet, index) => (
              <Card 
                key={planet.name}
                className="planet-card group hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="font-display text-lg group-hover:text-primary transition-colors">
                      {planet.name}
                    </CardTitle>
                    <Badge className={`text-xs ${getTypeColor(planet.type)} border`}>
                      {planet.type}
                    </Badge>
                  </div>
                  
                  {/* Visual representation */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <Globe className="h-12 w-12 text-primary animate-float" />
                      <Star className="h-4 w-4 text-accent absolute -top-1 -right-1" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Planet Stats */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Host Star:</span>
                      <span className="font-medium">{planet.hostStar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium">{planet.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Radius:</span>
                      <span className="font-medium">{planet.radius}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orbital Period:</span>
                      <span className="font-medium">{planet.orbitalPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className="font-medium">{planet.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discovered:</span>
                      <span className="font-medium">{planet.discovered}</span>
                    </div>
                  </div>

                  {/* Fun Fact */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-start text-sm">
                      <Info className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{planet.facts}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExoplanets.length === 0 && (
            <div className="text-center py-12">
              <Telescope className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">No exoplanets found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Exoplanets;