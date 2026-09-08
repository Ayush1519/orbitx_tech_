import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QuickNavigation from "@/components/QuickNavigation";
import NASAImage from "@/components/NASAImage";
import RecentMissions from "@/components/RecentMissions";
import FloatingChatbot from "@/components/FloatingChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-cosmic">
      <Navigation />
      <main>
        <HeroSection />
        
        {/* NASA Daily Image Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* <NASAImage /> */}
            <img src="https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?cs=srgb&dl=pexels-pixabay-41162.jpg&fm=jpg" alt="" 
            className="w-full"
            />
          </div>
        </section>

        {/* Recent Missions Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <RecentMissions />
          </div>
        </section>

        <QuickNavigation />
      </main>
      
      <FloatingChatbot />
    </div>
  );
};

export default Index;
