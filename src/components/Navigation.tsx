import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Rocket,
  Home,
  BookOpen,
  HelpCircle,
  Sparkles,
  Radio,
  Library,
  Satellite,
  MessageSquareHeart,
  Sun,
  Globe,
  Milestone,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      description: "Return to main cosmic gateway",
    },
    {
      name: "Knowledge Hub",
      path: "/knowledge",
      icon: BookOpen,
      description: "Learn space science & discoveries",
    },
    {
      name: "Mission Timeline",
      path: "/missions",
      icon: Milestone,
      description: "Explore past & future space missions",
    },
    {
      name: "Quizzes",
      path: "/quizzes",
      icon: HelpCircle,
      description: "Test your space & planetary knowledge",
    },
    {
      name: "Explore-the-Space",
      path: "/Explore-the-Space",
      icon: Sparkles,
      description: "Interactive 3D cosmic exploration",
    },
    {
      name: "Debris Detector",
      path: "/Debries-Detector",
      icon: Radio,
      description: "Real-time orbital space debris radar",
    },
    {
      name: "Libraries",
      path: "/nearest",
      icon: Library,
      description: "Nearest celestial catalogs & records",
    },
    {
      name: "Spot-ISS",
      path: "/Spot-ISS",
      icon: Satellite,
      description: "Live International Space Station tracker",
    },
    {
      name: "Feedback",
      path: "/feedback",
      icon: MessageSquareHeart,
      description: "Share your thoughts & suggestions",
    },
  ];

  const deepSpaceItems = [
    { name: "Solar System", path: "/solar-system", icon: Sun },
    { name: "Exoplanets", path: "/exoplanets", icon: Globe },
    { name: "Galaxies", path: "/galaxies", icon: Sparkles },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-primary/20 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/25 transition-all duration-300">
              <Rocket className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-300 animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-sm -z-10 group-hover:blur-md transition-all" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-display font-bold text-gradient tracking-wide">
                OrbitX Tech
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
                Cosmic Exploration Portal
              </span>
            </div>
          </Link>

          {/* Hamburger Menu in the top-right corner */}
          <div className="flex items-center space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="flex items-center gap-2 border-primary/30 bg-primary/10 hover:bg-primary/20 text-foreground hover:text-primary hover:border-primary/60 rounded-xl px-3 sm:px-4 py-2 transition-all duration-300 shadow-sm hover:shadow-primary/20"
                  aria-label="Open Navigation Menu"
                >
                  <span className="text-xs font-semibold tracking-wider uppercase font-display hidden sm:inline text-primary">
                    Menu
                  </span>
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-card/95 backdrop-blur-2xl border-l border-primary/30 p-0 text-foreground flex flex-col h-full shadow-2xl shadow-primary/10"
              >
                {/* Drawer Header */}
                <SheetHeader className="p-6 border-b border-primary/15 bg-background/50">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/20 border border-primary/40">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <SheetTitle className="text-xl font-display font-bold text-gradient">
                        OrbitX Tech
                      </SheetTitle>
                      <p className="text-xs text-muted-foreground">
                        Navigate the Space Universe
                      </p>
                    </div>
                  </div>
                </SheetHeader>

                {/* Navigation Items List */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-thin scrollbar-thumb-primary/20">
                  {/* Main Nav Items */}
                  <div className="space-y-1.5">
                    <p className="px-3 text-[11px] font-semibold text-primary uppercase tracking-wider font-display mb-2">
                      Main Navigation
                    </p>
                    {mainNavItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 border ${
                            active
                              ? "bg-primary/15 border-primary/50 text-primary shadow-sm shadow-primary/20"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:border-primary/20"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-lg transition-colors duration-200 ${
                                active
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "bg-muted/60 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="text-left">
                              <p
                                className={`text-sm font-medium ${
                                  active
                                    ? "text-primary font-semibold"
                                    : "text-foreground group-hover:text-primary transition-colors"
                                }`}
                              >
                                {item.name}
                              </p>
                              <p className="text-[11px] text-muted-foreground line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <ChevronRight
                            className={`h-4 w-4 transition-transform duration-200 ${
                              active
                                ? "text-primary translate-x-0.5"
                                : "text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Deep Space Explorations */}
                  <div className="pt-2 border-t border-primary/15 space-y-2">
                    <p className="px-3 text-[11px] font-semibold text-accent uppercase tracking-wider font-display mb-2">
                      Cosmic Worlds
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {deepSpaceItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all border ${
                              active
                                ? "bg-accent/15 border-accent/40 text-accent font-semibold"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/5 hover:border-accent/20"
                            }`}
                          >
                            <Icon className="h-4 w-4 text-accent" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-primary/15 bg-background/50 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>OrbitX Network Online</span>
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Close Menu
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;