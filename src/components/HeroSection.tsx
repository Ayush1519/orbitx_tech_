import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Telescope, Rocket, Globe, Sparkles } from "lucide-react";
import heroSpaceBg from "@/assets/hero-space-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroSpaceBg})` }}
      >
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 animate-float">
          <Globe className="h-8 w-8 text-primary/60" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <Sparkles className="h-6 w-6 text-accent/60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <Telescope className="h-10 w-10 text-secondary/60" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gradient animate-fade-in">
              OrbitX Tech
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
              NASA & ISRO Data at Your Fingertips
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Explore real-time space data, discover NASA's daily astronomy pictures, track missions from ISRO and NASA, and chat with Cosmo, your AI space guide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/solar-system">
              <Button className="btn-cosmic group">
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Exploring
              </Button>
            </Link>
            <Link to="/knowledge">
              <Button variant="outline" className="btn-outline-cosmic">
                <Telescope className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Planets</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-accent">5000+</div>
              <div className="text-sm text-muted-foreground">Exoplanets</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-secondary">100B+</div>
              <div className="text-sm text-muted-foreground">Galaxies</div>
            </div>
            <div className="planet-card text-center">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Discoveries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;