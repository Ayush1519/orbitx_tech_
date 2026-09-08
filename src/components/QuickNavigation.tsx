import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sun, 
  Globe, 
  Telescope, 
  BookOpen, 
  ArrowRight,
  Orbit,
  Sparkles,
  Brain
} from "lucide-react";

const QuickNavigation = () => {
  const navigationCards = [
    {
      title: "Solar System",
      description: "Explore the 8 planets, dwarf planets, and moons in our cosmic neighborhood",
      icon: Sun,
      path: "/solar-system",
      gradient: "bg-stellar",
      stats: "8 Planets • 200+ Moons"
    },
    {
      title: "Exoplanets",
      description: "Discover thousands of planets orbiting distant stars across the Milky Way",
      icon: Globe,
      path: "/exoplanets",
      gradient: "bg-nebula",
      stats: "5000+ Confirmed • Growing Daily"
    },
    {
      title: "Other Galaxies",
      description: "Journey beyond the Milky Way to explore potential planets in distant galaxies",
      icon: Sparkles,
      path: "/galaxies",
      gradient: "bg-planet",
      stats: "100B+ Galaxies • Infinite Possibilities"
    },
    {
      title: "Knowledge Hub",
      description: "Learn about planetary science, take quizzes, and expand your cosmic knowledge",
      icon: BookOpen,
      path: "/knowledge",
      gradient: "bg-cosmic",
      stats: "Articles • Quizzes • FAQs"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your
            <span className="text-gradient"> Cosmic Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your destination in the vast universe. Each path offers unique discoveries and insights into the cosmos.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={card.title} 
                className="group planet-card relative overflow-hidden h-full animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <CardContent className="p-6 relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="text-xs text-primary/70 mb-6 font-medium">
                      {card.stats}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={card.path} className="w-full">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Orbit className="h-8 w-8 text-primary animate-orbit" />
            </div>
            <h3 className="font-display text-lg font-semibold">Interactive Exploration</h3>
            <p className="text-muted-foreground text-sm">
              Discover planets through interactive visualizations and detailed information cards
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
              <Telescope className="h-8 w-8 text-secondary animate-pulse-glow" />
            </div>
            <h3 className="font-display text-lg font-semibold">Latest Discoveries</h3>
            <p className="text-muted-foreground text-sm">
              Stay updated with the newest exoplanet findings and space exploration missions
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <Brain className="h-8 w-8 text-accent animate-float" />
            </div>
            <h3 className="font-display text-lg font-semibold">Educational Content</h3>
            <p className="text-muted-foreground text-sm">
              Learn through articles, quizzes, and comprehensive guides about planetary science
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickNavigation;