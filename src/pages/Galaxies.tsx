import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Star, Telescope, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Galaxies = () => {
  const galaxies = [
    {
      name: "Andromeda Galaxy (M31)",
      distance: "2.537 million light-years",
      type: "Spiral Galaxy",
      diameter: "220,000 light-years",
      stars: "1 trillion stars",
      planetEvidence: "Theoretical",
      status: "Predicted",
      description: "Our nearest major galactic neighbor, expected to contain billions of planets based on stellar formation patterns.",
      facts: "Will collide with Milky Way in ~4.5 billion years"
    },
    {
      name: "M51 (Whirlpool Galaxy)",
      distance: "31 million light-years",
      type: "Spiral Galaxy",
      diameter: "76,000 light-years",
      stars: "100 billion stars",
      planetEvidence: "M51-ULS-1b (candidate)",
      status: "Candidate Detected",
      description: "Contains the first potential extragalactic planet candidate, detected through X-ray transit observations.",
      facts: "First possible planet found outside our galaxy"
    },
    {
      name: "Triangulum Galaxy (M33)",
      distance: "2.73 million light-years",
      type: "Spiral Galaxy",
      diameter: "60,000 light-years",
      stars: "40 billion stars",
      planetEvidence: "Statistical Probability",
      status: "Predicted",
      description: "Third-largest galaxy in our Local Group, statistically likely to host numerous planetary systems.",
      facts: "Part of our Local Group with Milky Way and Andromeda"
    },
    {
      name: "Large Magellanic Cloud",
      distance: "163,000 light-years",
      type: "Irregular Galaxy",
      diameter: "14,000 light-years",
      stars: "20 billion stars",
      planetEvidence: "Microlensing Candidates",
      status: "Under Investigation",
      description: "Satellite galaxy of the Milky Way with ongoing searches for planets using gravitational microlensing.",
      facts: "Visible to naked eye from Southern Hemisphere"
    },
    {
      name: "Centaurus A (NGC 5128)",
      distance: "13.7 million light-years",
      type: "Elliptical Galaxy",
      diameter: "60,000 light-years",
      stars: "100 billion stars",
      planetEvidence: "Active Research",
      status: "Under Study",
      description: "Active galaxy with intense star formation regions, potentially hosting numerous planetary systems.",
      facts: "Closest active galactic nucleus to Earth"
    },
    {
      name: "Sombrero Galaxy (M104)",
      distance: "31.1 million light-years",
      type: "Spiral Galaxy",
      diameter: "50,000 light-years",
      stars: "100 billion stars",
      planetEvidence: "Theoretical Models",
      status: "Predicted",
      description: "Distinctive galaxy with a large central bulge, theoretically capable of hosting stable planetary systems.",
      facts: "Named for its resemblance to a Mexican hat"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Candidate Detected": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Under Investigation": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Under Study": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Predicted": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
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
              Other Galaxies
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Journey beyond the Milky Way to explore potential planets in distant galaxies. 
              While challenging to detect, extragalactic planets represent the next frontier in astronomical discovery.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="planet-card text-center">
              <div className="text-3xl font-bold text-primary mb-2">100B+</div>
              <div className="text-sm text-muted-foreground">Observable Galaxies</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-3xl font-bold text-accent mb-2">1</div>
              <div className="text-sm text-muted-foreground">Candidate Found</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-3xl font-bold text-secondary mb-2">10²³</div>
              <div className="text-sm text-muted-foreground">Estimated Planets</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Methods Section */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            Detection Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="planet-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">X-ray Transit</h3>
              <p className="text-sm text-muted-foreground">
                Detecting planets as they pass in front of X-ray sources in distant galaxies
              </p>
            </div>
            
            <div className="planet-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Telescope className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Gravitational Microlensing</h3>
              <p className="text-sm text-muted-foreground">
                Using gravitational effects to detect planets in neighboring galaxies
              </p>
            </div>
            
            <div className="planet-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Statistical Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Predicting planetary populations based on stellar formation models
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galaxies Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Target Galaxies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galaxies.map((galaxy, index) => (
              <Card 
                key={galaxy.name}
                className="planet-card group hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="font-display text-lg group-hover:text-primary transition-colors leading-tight">
                      {galaxy.name}
                    </CardTitle>
                    <Badge className={`text-xs ${getStatusColor(galaxy.status)} border ml-2 flex-shrink-0`}>
                      {galaxy.status}
                    </Badge>
                  </div>
                  
                  {/* Galaxy Type */}
                  <div className="text-sm text-accent font-medium mb-4">
                    {galaxy.type}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Galaxy Stats */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium text-right">{galaxy.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diameter:</span>
                      <span className="font-medium">{galaxy.diameter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stars:</span>
                      <span className="font-medium">{galaxy.stars}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Planet Evidence:</span>
                      <span className="font-medium text-right">{galaxy.planetEvidence}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {galaxy.description}
                    </p>
                    
                    {/* Fun Fact */}
                    <div className="flex items-start text-sm">
                      <Info className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{galaxy.facts}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Future Prospects Section */}
          <div className="mt-20 planet-card">
            <h3 className="font-display text-2xl font-bold text-center mb-6">
              The Future of Extragalactic Planet Discovery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-display text-lg font-semibold mb-3 text-primary">Next-Generation Telescopes</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The James Webb Space Telescope and future extremely large telescopes will revolutionize 
                  our ability to detect and study planets in nearby galaxies, potentially confirming 
                  thousands of extragalactic worlds.
                </p>
              </div>
              <div>
                <h4 className="font-display text-lg font-semibold mb-3 text-accent">Detection Challenges</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Extragalactic planet detection faces enormous challenges due to vast distances, 
                  requiring innovative techniques and unprecedented precision in astronomical observations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Galaxies;