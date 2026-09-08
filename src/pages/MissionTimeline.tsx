import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Rocket, Target, Globe, FileText, Filter, CheckCircle2, Clock, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import FloatingChatbot from "@/components/FloatingChatbot";
import { motion } from "framer-motion";

interface Mission {
  id: string;
  name: string;
  agency: string;
  mission_date: string;
  destination: string;
  objective: string;
  status: "completed" | "ongoing" | "planned" | "failed" | string;
  description: string;
}

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: "chandrayaan-3",
    name: "Chandrayaan-3",
    agency: "ISRO",
    mission_date: "2023-07-14",
    destination: "Moon (Lunar South Pole)",
    objective: "Demonstrate safe soft-landing and rover roving capabilities on lunar terrain.",
    status: "completed",
    description:
      "Historic mission making India the first nation to touch down near the lunar south pole. The Vikram lander and Pragyan rover successfully conducted in-situ soil thermophysical, elemental, and seismic experiments.",
  },
  {
    id: "aditya-l1",
    name: "Aditya-L1",
    agency: "ISRO",
    mission_date: "2023-09-02",
    destination: "Sun-Earth L1 Lagrange Point",
    objective: "Observe the solar corona, chromospheric dynamics, and coronal mass ejections.",
    status: "ongoing",
    description:
      "India's first dedicated space-based solar observatory, orbiting the Sun-Earth L1 Lagrangian point (1.5 million km from Earth) to provide uninterrupted 24/7 solar observations and space weather data.",
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    agency: "NASA",
    mission_date: "2021-12-25",
    destination: "Sun-Earth L2 Lagrange Point",
    objective: "Observe cosmic dawn, early galaxy formation, star birth, and alien atmospheres.",
    status: "ongoing",
    description:
      "The premier infrared space observatory deployed with a 6.5-meter gold-coated mirror and ultra-cryogenic instruments, unveiling unprecedented details of deep galaxies, nebulae, and exoplanet atmospheric compositions.",
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    agency: "NASA",
    mission_date: "2024-10-14",
    destination: "Jupiter (Europa)",
    objective: "Investigate the habitability and subsurface ocean of Jupiter's icy moon Europa.",
    status: "ongoing",
    description:
      "NASA's largest planetary spacecraft to date, equipped with ice-penetrating radar, spectrometers, and thermal imagers to determine whether conditions beneath Europa's frozen crust could support extraterrestrial life.",
  },
  {
    id: "artemis-1",
    name: "Artemis I",
    agency: "NASA",
    mission_date: "2022-11-16",
    destination: "Moon Orbit & Return",
    objective: "Validate the Space Launch System (SLS) mega-rocket and Orion spacecraft in deep space.",
    status: "completed",
    description:
      "Inaugural flight of NASA's Artemis program, executing a flawless 25.5-day uncrewed lunar voyage covering 1.4 million miles to certify hardware and heat-shield systems for future crewed landings.",
  },
  {
    id: "perseverance",
    name: "Mars 2020 (Perseverance & Ingenuity)",
    agency: "NASA",
    mission_date: "2020-07-30",
    destination: "Mars (Jezero Crater)",
    objective: "Search for ancient signs of biosignatures and collect sealed geological samples.",
    status: "ongoing",
    description:
      "State-of-the-art robotic rover exploring an ancient Martian lakebed. Deployed the historic Ingenuity helicopter, the first powered rotorcraft to achieve controlled aerodynamic flight on another planet.",
  },
  {
    id: "gaganyaan-1",
    name: "Gaganyaan-1 (Uncrewed Test)",
    agency: "ISRO",
    mission_date: "2025-06-20",
    destination: "Low Earth Orbit (400 km)",
    objective: "Qualify human-rated HLVM3 launch vehicle, life support systems, and crew module recovery.",
    status: "planned",
    description:
      "India's landmark uncrewed orbital flight test carrying the humanoid robot Vyommitra to validate environmental control, parachute decelerations, and sea-recovery protocols ahead of crewed spaceflights.",
  },
  {
    id: "juice",
    name: "JUICE (Jupiter Icy Moons Explorer)",
    agency: "ESA",
    mission_date: "2023-04-14",
    destination: "Jupiter & Moons (Ganymede, Callisto)",
    objective: "Study the emergence of habitable worlds around gas giants and characterize Ganymede.",
    status: "ongoing",
    description:
      "European Space Agency flagship mission traveling to Jupiter to conduct detailed flybys of Europa and Callisto before entering orbit around Ganymede—the solar system's largest moon.",
  },
  {
    id: "starship-ift",
    name: "Starship Integrated Flight Tests",
    agency: "SpaceX",
    mission_date: "2024-03-14",
    destination: "Low Earth Orbit & Lunar Surface",
    objective: "Develop a fully reusable super-heavy launch system for lunar and Martian missions.",
    status: "ongoing",
    description:
      "Next-generation 120-meter heavy-lift launch system undergoing orbital test flights, selected by NASA as the human landing system (HLS) to return astronauts to the Moon for the Artemis III mission.",
  },
  {
    id: "xposat",
    name: "XPoSat (X-ray Polarimeter Satellite)",
    agency: "ISRO",
    mission_date: "2024-01-01",
    destination: "Low Earth Orbit (650 km)",
    objective: "Measure polarization of cosmic X-rays from black holes, pulsars, and neutron stars.",
    status: "ongoing",
    description:
      "ISRO's dedicated astrophysics satellite and only the world's second orbital observatory built to measure X-ray polarization, shedding new light on extreme relativistic celestial phenomena.",
  },
  {
    id: "slim",
    name: "SLIM (Smart Lander for Investigating Moon)",
    agency: "JAXA",
    mission_date: "2023-09-07",
    destination: "Moon (Shioli Crater)",
    objective: "Demonstrate high-precision pinpoint lunar touchdown within 100 meters of target.",
    status: "completed",
    description:
      "Japan Aerospace Exploration Agency's 'Moon Sniper' achieved an unprecedented 55-meter accuracy lunar touchdown on cratered slope terrain and survived multiple harsh two-week lunar nights.",
  },
  {
    id: "mangalyaan",
    name: "Mars Orbiter Mission (Mangalyaan)",
    agency: "ISRO",
    mission_date: "2013-11-05",
    destination: "Mars Orbit",
    objective: "Interplanetary transit capabilities and study of Martian surface features & atmosphere.",
    status: "completed",
    description:
      "India's historic first interplanetary expedition, entering Mars orbit on its maiden attempt with exceptional budget efficiency and functioning continuously for more than seven years.",
  },
  {
    id: "bepicolombo",
    name: "BepiColombo",
    agency: "ESA",
    mission_date: "2018-10-20",
    destination: "Mercury Orbit",
    objective: "Analyze Mercury's structure, interior composition, magnetic field, and exosphere.",
    status: "ongoing",
    description:
      "Joint European-Japanese mission consisting of the Mercury Planetary Orbiter and Mercury Magnetospheric Orbiter, utilizing complex planetary gravity assists to unravel the secrets of the innermost planet.",
  },
  {
    id: "voyager-1",
    name: "Voyager 1",
    agency: "NASA",
    mission_date: "1977-09-05",
    destination: "Interstellar Space",
    objective: "Explore outer Jovian/Saturnian systems and the boundary of the heliosphere.",
    status: "ongoing",
    description:
      "The farthest human-made object in history, currently transmitting scientific telemetry from interstellar space more than 24 billion kilometers away from Earth.",
  },
];

export default function MissionTimeline() {
  const [missions, setMissions] = useState<Mission[]>(DEFAULT_MISSIONS);
  const [loading, setLoading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const { data, error } = await supabase
          .from("missions")
          .select("*")
          .order("mission_date", { ascending: false });

        if (error) {
          console.warn("Supabase fetch notice (using rich default mission database):", error.message);
          setMissions(DEFAULT_MISSIONS);
        } else if (data && data.length > 0) {
          // Format Supabase data if available, ensuring destination is populated
          const formatted = data.map((item: any) => ({
            ...item,
            destination: item.destination || item.objective?.slice(0, 30) || "Deep Space",
          }));
          setMissions(formatted);
        } else {
          setMissions(DEFAULT_MISSIONS);
        }
      } catch (err) {
        console.warn("Using fallback default mission dataset:", err);
        setMissions(DEFAULT_MISSIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return {
          label: "Completed",
          classes: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          icon: CheckCircle2,
        };
      case "ongoing":
        return {
          label: "Ongoing",
          classes: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
          icon: Clock,
        };
      case "planned":
        return {
          label: "Planned",
          classes: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          icon: Sparkles,
        };
      case "failed":
        return {
          label: "Failed",
          classes: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          icon: Target,
        };
      default:
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          classes: "bg-gray-500/20 text-gray-300 border-gray-500/40",
          icon: Rocket,
        };
    }
  };

  const getAgencyColor = (agency: string) => {
    switch (agency.toUpperCase()) {
      case "ISRO":
        return "bg-orange-500/25 text-orange-300 border-orange-500/40 shadow-sm shadow-orange-500/20";
      case "NASA":
        return "bg-blue-500/25 text-blue-300 border-blue-500/40 shadow-sm shadow-blue-500/20";
      case "ESA":
        return "bg-purple-500/25 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/20";
      case "SPACEX":
        return "bg-rose-500/25 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/20";
      case "JAXA":
        return "bg-emerald-500/25 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20";
      default:
        return "bg-gray-500/25 text-gray-300 border-gray-500/40";
    }
  };

  // Filter missions by Agency and Status
  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      const matchAgency =
        selectedAgency === "All" || m.agency.toUpperCase() === selectedAgency.toUpperCase();
      const matchStatus =
        selectedStatus === "All" || m.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchAgency && matchStatus;
    });
  }, [missions, selectedAgency, selectedStatus]);

  const agencies = ["All", "ISRO", "NASA", "ESA", "SpaceX", "JAXA"];
  const statuses = ["All", "Completed", "Ongoing", "Planned"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 p-4 flex items-center justify-center">
        <motion.div
          className="rounded-full h-12 w-12 border-b-2 border-primary"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-slate-950 text-foreground">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Rocket className="h-3.5 w-3.5" />
              Chronicles of Spaceflight
            </div>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text text-transparent">
                Mission Timeline
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore pivotal human and robotic missions charting our journey through the solar system and beyond.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            className="mb-12 bg-card/60 backdrop-blur-md border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/40 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Agency Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mr-1 font-display">
                  <Filter className="h-3.5 w-3.5 text-primary" /> Agency:
                </span>
                {agencies.map((agency) => (
                  <Button
                    key={agency}
                    variant={selectedAgency === agency ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAgency(agency)}
                    className={`text-xs rounded-lg transition-all ${
                      selectedAgency === agency
                        ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/30"
                        : "border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/40 bg-background/50"
                    }`}
                  >
                    {agency}
                  </Button>
                ))}
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mr-1 font-display">
                  Status:
                </span>
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className={`text-xs rounded-lg transition-all ${
                      selectedStatus === status
                        ? "bg-accent/20 text-accent border border-accent/40 font-semibold"
                        : "border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/40 bg-background/50"
                    }`}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <div className="relative">
            {/* Center Timeline Spine */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10 shadow-sm shadow-primary/50" />
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10" />

            <div className="space-y-10 sm:space-y-12">
              {filteredMissions.map((mission, index) => {
                const statusInfo = getStatusBadge(mission.status);
                const StatusIcon = statusInfo.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={mission.id || index}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    {/* Timeline Node Dot (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-card border-2 border-primary shadow-lg shadow-primary/40 z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    </div>

                    {/* Timeline Node Dot (Mobile) */}
                    <div className="md:hidden absolute left-4 transform -translate-x-1/2 top-6 flex items-center justify-center w-6 h-6 rounded-full bg-card border-2 border-primary z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>

                    {/* Mission Card Container */}
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] ${
                        isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                      } pl-10 md:pl-0`}
                    >
                      <Card className="bg-card/70 backdrop-blur-md border border-primary/25 hover:border-primary/60 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 rounded-2xl overflow-hidden group">
                        {/* Header */}
                        <CardHeader className="pb-3 border-b border-primary/10 bg-primary/5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <CardTitle className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                                {mission.name}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Calendar className="h-3.5 w-3.5 text-primary" />
                                {new Date(mission.mission_date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </CardDescription>
                            </div>
                            <Badge className={`${getAgencyColor(mission.agency)} font-display font-semibold text-xs px-2.5 py-1 border`}>
                              {mission.agency}
                            </Badge>
                          </div>
                        </CardHeader>

                        {/* Content */}
                        <CardContent className="pt-4 space-y-4 text-sm">
                          {/* Status & Destination row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/50">
                            <Badge
                              variant="outline"
                              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 font-medium ${statusInfo.classes}`}
                            >
                              <StatusIcon className="h-3.5 w-3.5" />
                              {statusInfo.label}
                            </Badge>

                            {mission.destination && (
                              <div className="flex items-center gap-1.5 text-xs text-accent font-medium bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                                <Globe className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                                <span className="line-clamp-1">{mission.destination}</span>
                              </div>
                            )}
                          </div>

                          {/* Objective */}
                          {mission.objective && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider font-display">
                                <Target className="h-3.5 w-3.5 text-primary" />
                                <span>Objective</span>
                              </div>
                              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pl-5">
                                {mission.objective}
                              </p>
                            </div>
                          )}

                          {/* Description */}
                          {mission.description && (
                            <div className="space-y-1 bg-muted/40 p-3 rounded-xl border border-primary/10">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display">
                                <FileText className="h-3.5 w-3.5 text-primary/70" />
                                <span>Overview</span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {mission.description}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {filteredMissions.length === 0 && (
            <motion.div
              className="text-center py-16 px-4 bg-card/40 border border-primary/20 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Rocket className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-display font-semibold">No missions match your filter</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try selecting "All" for agency and status to see the full timeline.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-primary/40 text-primary"
                onClick={() => {
                  setSelectedAgency("All");
                  setSelectedStatus("All");
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}

          {/* Statistics Section */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/70 backdrop-blur-sm border border-emerald-500/30 text-center hover:scale-[1.02] transition-transform">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold font-orbitron text-emerald-400">
                  {missions.filter((m) => m.status.toLowerCase() === "completed").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-display">
                  Completed Missions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 backdrop-blur-sm border border-cyan-500/30 text-center hover:scale-[1.02] transition-transform">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold font-orbitron text-cyan-400">
                  {missions.filter((m) => m.status.toLowerCase() === "ongoing").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-display">
                  Active in Space
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 backdrop-blur-sm border border-amber-500/30 text-center hover:scale-[1.02] transition-transform">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold font-orbitron text-amber-400">
                  {missions.filter((m) => m.status.toLowerCase() === "planned").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-display">
                  Upcoming Launches
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 backdrop-blur-sm border border-orange-500/30 text-center hover:scale-[1.02] transition-transform">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold font-orbitron text-orange-400">
                  {missions.filter((m) => m.agency.toUpperCase() === "ISRO").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-display">
                  ISRO Flagships
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
}
