import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Moon, Thermometer, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import solarSystemImage from "@/assets/solar-system.jpg";

const SolarSystem = () => {
  const planets = [
    {
      name: "Mercury",
      type: "Terrestrial",
      distance: "57.9 million km",
      diameter: "4,879 km",
      temperature: "427°C (day) / -173°C (night)",
      moons: 0,
      facts: "Smallest planet, closest to the Sun",
      color: "from-gray-400 to-yellow-600"
    },
    {
      name: "Venus",
      type: "Terrestrial",
      distance: "108.2 million km",
      diameter: "12,104 km",
      temperature: "462°C",
      moons: 0,
      facts: "Hottest planet, thick atmosphere",
      color: "from-orange-400 to-yellow-500"
    },
    {
      name: "Earth",
      type: "Terrestrial",
      distance: "149.6 million km",
      diameter: "12,756 km",
      temperature: "15°C (average)",
      moons: 1,
      facts: "The only known planet with life",
      color: "from-blue-500 to-green-400"
    },
    {
      name: "Mars",
      type: "Terrestrial",
      distance: "227.9 million km",
      diameter: "6,792 km",
      temperature: "-87°C to -5°C",
      moons: 2,
      facts: "Red planet, polar ice caps",
      color: "from-red-500 to-orange-600"
    },
    {
      name: "Jupiter",
      type: "Gas Giant",
      distance: "778.5 million km",
      diameter: "142,984 km",
      temperature: "-110°C",
      moons: 95,
      facts: "Largest planet, Great Red Spot",
      color: "from-orange-300 to-amber-600"
    },
    {
      name: "Saturn",
      type: "Gas Giant",
      distance: "1.43 billion km",
      diameter: "120,536 km",
      temperature: "-140°C",
      moons: 146,
      facts: "Beautiful ring system",
      color: "from-yellow-300 to-orange-400"
    },
    {
      name: "Uranus",
      type: "Ice Giant",
      distance: "2.87 billion km",
      diameter: "51,118 km",
      temperature: "-195°C",
      moons: 27,
      facts: "Rotates on its side",
      color: "from-cyan-400 to-blue-500"
    },
    {
      name: "Neptune",
      type: "Ice Giant",
      distance: "4.50 billion km",
      diameter: "49,528 km",
      temperature: "-200°C",
      moons: 16,
      facts: "Windiest planet, deep blue color",
      color: "from-blue-600 to-indigo-700"
    }
  ];

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
              Our Solar System
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the eight planets orbiting our Sun, each with unique characteristics, 
              atmospheres, and fascinating features that make them truly extraordinary.
            </p>
          </div>

          {/* Solar System Overview Image */}
          <div className="mb-16 rounded-xl overflow-hidden">
            <img 
              src={solarSystemImage} 
              alt="Solar System planets in order from the Sun"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Planets Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {planets.map((planet, index) => (
              <Card 
                key={planet.name}
                className="planet-card group hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">
                      {planet.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {planet.type}
                    </Badge>
                  </div>
                  
                  {/* Planet Visual Representation */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full animate-float"
                       style={{
                         background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                         backgroundImage: `linear-gradient(135deg, ${planet.color.split(' ')[1]}, ${planet.color.split(' ')[3]})`
                       }}>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Planet Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Ruler className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-muted-foreground">Distance: </span>
                      <span className="ml-1 font-medium">{planet.distance}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Ruler className="h-4 w-4 mr-2 text-secondary" />
                      <span className="text-muted-foreground">Diameter: </span>
                      <span className="ml-1 font-medium">{planet.diameter}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Thermometer className="h-4 w-4 mr-2 text-accent" />
                      <span className="text-muted-foreground">Temp: </span>
                      <span className="ml-1 font-medium">{planet.temperature}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Moon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Moons: </span>
                      <span className="ml-1 font-medium">{planet.moons}</span>
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

          {/* Dwarf Planets Section */}
          <div className="mt-20">
            <h2 className="font-display text-3xl font-bold text-center mb-8">
              Dwarf Planets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Pluto", distance: "5.9 billion km", moons: 5 },
                { name: "Ceres", distance: "413.7 million km", moons: 0 },
                { name: "Eris", distance: "10.1 billion km", moons: 1 }
              ].map((dwarf) => (
                <Card key={dwarf.name} className="planet-card hover-lift">
                  <CardHeader>
                    <CardTitle className="font-display text-lg">{dwarf.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <span>{dwarf.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Moons:</span>
                        <span>{dwarf.moons}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarSystem;