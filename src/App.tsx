import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Knowledge from "./pages/Knowledge";
import MissionTimeline from "./pages/MissionTimeline";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import SolarSystem from "./pages/SolarSystem";
import Exoplanets from "./pages/Exoplanets";
import Galaxies from "./pages/Galaxies";
import View from "./pages/View";
// import SpaceAgriculture from "./pages/Agriculture";
import NearestCelestial from "./pages/NearestCelestial";
import AppFeedback from "./components/AppFeedback";




function DebrisDetector() {
  return (
    <iframe
      src="https://debris-sphere.vercel.app/"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Debris Detector"
    />
  );
}


function Hey() {
  return (
    <iframe
    className="-mt-12"
      src="https://verdant-parfait-13999e.netlify.app/"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Debris Detector"
    />
  );
}


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/missions" element={<MissionTimeline />} />
          <Route path="/quizzes" element={<Quiz />} />
          <Route path="/solar-system" element={<SolarSystem />} />
          <Route path="/exoplanets" element={<Exoplanets />} />
          <Route path="/galaxies" element={<Galaxies />} />
          <Route path="/Explore-the-Space" element={<View />} />
          <Route path="/Debries-Detector" element={<DebrisDetector />} />
          <Route path="/nearest" element={<NearestCelestial />} />
          {/* <Route path="/space" element={<SpotISS />} /> */}
          <Route path="/Spot-ISS" element={<Hey />} /> 

          <Route path="/feedback" element={<AppFeedback />} />
          {/* <Route path="/Space-Agriculture" element={<SpaceAgriculture />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
