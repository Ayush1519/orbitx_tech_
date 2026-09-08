import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, User, Globe } from "lucide-react";
import { AuthForm } from "@/components/AuthForm";

interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  language: string;
}

interface KnowledgeBase {
  planets: any[];
  missions: any[];
}

export default function Chatbot() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>({ planets: [], missions: [] });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchChatHistory();
      fetchKnowledgeBase();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: true })
        .limit(20);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const fetchKnowledgeBase = async () => {
    try {
      const [planetsResponse, missionsResponse] = await Promise.all([
        supabase.from('planets').select('*'),
        supabase.from('missions').select('*')
      ]);

      setKnowledgeBase({
        planets: planetsResponse.data || [],
        missions: missionsResponse.data || []
      });
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
    }
  };

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Greeting and introduction
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('cosmo')) {
      return "Hello there, space explorer! 🚀 I'm Cosmo, your friendly AI space assistant! I'm here to guide you through the wonders of our incredible universe. What cosmic mystery would you like to explore today?";
    }

    // Planet-related questions
    if (lowerQuestion.includes('planet')) {
      const planets = knowledgeBase.planets;
      if (lowerQuestion.includes('mars')) {
        const mars = planets.find(p => p.name.toLowerCase() === 'mars');
        return mars ? `🔴 Mars - The Red Planet! ${mars.description} Fun fact: Mars has the largest volcano in our solar system - Olympus Mons, which is 3 times taller than Mount Everest! ${mars.distance_from_earth} away, Mars continues to fascinate us with its potential for past life.` 
                   : "🔴 Mars - The Red Planet! This fascinating world is our celestial neighbor, with rusty iron oxide giving it that distinctive red color. Mars has polar ice caps, massive canyons, and evidence of ancient rivers. Could it have harbored life? That's what we're trying to discover!";
      }
      if (lowerQuestion.includes('earth')) {
        const earth = planets.find(p => p.name.toLowerCase() === 'earth');
        return earth ? `🌍 Earth - Our Beautiful Blue Marble! ${earth.description} What makes Earth special? It's in the perfect 'Goldilocks Zone' - not too hot, not too cold, but just right for liquid water and life to flourish!` 
                    : "🌍 Earth - Our Beautiful Blue Marble! The only known planet with life, Earth is a cosmic oasis with vast oceans, diverse ecosystems, and a protective atmosphere. We're incredibly lucky to call this spinning rock our home!";
      }
      if (lowerQuestion.includes('jupiter')) {
        const jupiter = planets.find(p => p.name.toLowerCase() === 'jupiter');
        return jupiter ? `🪐 Jupiter - The King of Planets! ${jupiter.description} This gas giant acts as our solar system's protector, using its massive gravity to deflect asteroids and comets away from Earth. It has over 80 moons, including the four amazing Galilean moons!` 
                      : "🪐 Jupiter - The King of Planets! This massive gas giant could fit all other planets inside it! With its Great Red Spot (a storm larger than Earth) and 80+ moons, Jupiter is like a mini solar system of its own.";
      }
      return `Our solar system family has 8 incredible planets: ${knowledgeBase.planets.map(p => p.name).join(', ')}. Each one tells a unique story of cosmic evolution! Which planet's secrets would you like me to reveal? 🌟`;
    }

    // Galaxy and cosmic structure questions
    if (lowerQuestion.includes('galaxy') || lowerQuestion.includes('milky way')) {
      return "🌌 Galaxies are island universes of stars! Our home, the Milky Way, contains over 200 billion stars and is spiraling through space at 600 km/s! We're neighbors with Andromeda Galaxy, which is speeding toward us for a cosmic collision in 4.5 billion years - don't worry, it'll be spectacular, not destructive!";
    }

    // Stars and stellar phenomena
    if (lowerQuestion.includes('star') || lowerQuestion.includes('sun') || lowerQuestion.includes('supernova')) {
      return "⭐ Stars are cosmic furnaces where hydrogen becomes helium, creating the light and energy that powers our universe! Our Sun is a middle-aged star that's been shining for 4.6 billion years. When massive stars die, they explode as supernovas - cosmic fireworks that scatter elements needed for planets and life!";
    }

    // Black holes
    if (lowerQuestion.includes('black hole')) {
      return "🕳️ Black holes are the universe's ultimate mysteries! These cosmic vacuum cleaners have gravity so strong that nothing - not even light - can escape. But here's the mind-bending part: they're not actually holes, they're incredibly dense objects that warp spacetime itself! The supermassive black hole at our galaxy's center is 4 million times heavier than our Sun!";
    }

    // Big Bang and cosmology
    if (lowerQuestion.includes('big bang') || lowerQuestion.includes('universe')) {
      return "💥 The Big Bang wasn't an explosion in space - it was an explosion OF space! 13.8 billion years ago, our entire universe started smaller than a dot and expanded faster than light. Today, we can still detect the afterglow of that moment as cosmic microwave background radiation. Mind-blowing, right?";
    }

    // Exoplanets
    if (lowerQuestion.includes('exoplanet') || lowerQuestion.includes('other worlds')) {
      return "🪐 Exoplanets are worlds beyond our solar system, and we've discovered over 5,000 of them! Some orbit in the 'habitable zone' where liquid water could exist. The James Webb Space Telescope is analyzing their atmospheres, searching for signs of life. We might not be alone in this vast cosmic ocean!";
    }

    // Mission-related questions
    if (lowerQuestion.includes('mission') || lowerQuestion.includes('isro') || 
        lowerQuestion.includes('nasa') || lowerQuestion.includes('chandrayaan')) {
      const missions = knowledgeBase.missions;
      if (lowerQuestion.includes('chandrayaan')) {
        const chandrayaan = missions.find(m => m.name.toLowerCase().includes('chandrayaan'));
        return chandrayaan ? `🇮🇳 ${chandrayaan.name} - India's incredible lunar achievement! Launched by ${chandrayaan.agency} on ${new Date(chandrayaan.mission_date).toLocaleDateString()}. ${chandrayaan.description} This mission made India the fourth country to soft-land on the Moon and the first to reach the lunar south pole!` 
                          : "🇮🇳 Chandrayaan-3 - India's historic Moon mission! This incredible achievement made India the first nation to successfully land near the Moon's south pole, where water ice might be hiding in permanently shadowed craters. A proud moment for space exploration!";
      }
      if (lowerQuestion.includes('isro')) {
        const isroMissions = missions.filter(m => m.agency === 'ISRO');
        return `🇮🇳 ISRO (Indian Space Research Organisation) is doing amazing work! Their missions include: ${isroMissions.map(m => m.name).join(', ')}. From Mars missions to lunar landings, ISRO proves that great science knows no boundaries. Which mission would you like to explore?`;
      }
      return `🚀 Space missions are humanity's greatest adventures! Here are some incredible journeys: ${missions.slice(0, 3).map(m => `${m.name} (${m.agency})`).join(', ')}. Each mission expands our cosmic horizon and inspires the next generation of explorers!`;
    }

    // ISS questions
    if (lowerQuestion.includes('iss') || lowerQuestion.includes('space station')) {
      return "🛰️ The International Space Station is humanity's outpost in space! Orbiting 408 km above us at 28,000 km/h, it completes one orbit every 90 minutes. Astronauts conduct incredible experiments in microgravity that help us understand everything from medicine to materials science. Wave when it passes over! 👋";
    }

    // Space exploration general
    if (lowerQuestion.includes('space') || lowerQuestion.includes('exploration')) {
      return "🚀 Space exploration is humanity's greatest adventure! From Sputnik's first beep to rovers on Mars, from lunar footsteps to images from the edge of the observable universe - we're constantly pushing the boundaries of what's possible. Every mission teaches us something new about our cosmic neighborhood and our place in it!";
    }

    // Quiz questions
    if (lowerQuestion.includes('quiz') || lowerQuestion.includes('test')) {
      return "🧠 Ready to test your cosmic knowledge? Our interactive quiz has mind-bending questions about planets, missions, and space phenomena! Challenge yourself and see how much you've learned about our amazing universe. Head to the Quiz section and let's see if you're ready for astronaut training! 🎯";
    }

    // Default responses with Cosmo personality
    const cosmoResponses = [
      "🌟 That's a fascinating question, fellow space explorer! I love curiosity like yours. I can guide you through planets, stars, galaxies, black holes, space missions, and cosmic phenomena. What corner of the universe shall we explore together?",
      "✨ Excellent question! As your space guide, I'm here to help you discover the wonders of our universe - from tiny particles to massive galaxies, from Earth's backyard to the cosmic horizon. What cosmic mystery intrigues you most?",
      "🚀 Great question, space adventurer! I'm equipped with knowledge about planets, stellar evolution, space missions from NASA and ISRO, cosmic phenomena, and so much more. Let's embark on a journey through space and time - where would you like to start?",
      "🌌 I love your curiosity! The universe is full of incredible stories - from the birth of stars to the dance of galaxies, from robotic explorers on Mars to the search for life beyond Earth. What aspect of our cosmic story would you like me to share?"
    ];
    
    return cosmoResponses[Math.floor(Math.random() * cosmoResponses.length)];
  };

  const translateToHindi = (text: string): string => {
    // Basic translation mapping for common space terms
    const translations: { [key: string]: string } = {
      'planet': 'ग्रह',
      'planets': 'ग्रह',
      'Mars': 'मंगल',
      'Earth': 'पृथ्वी',
      'Jupiter': 'बृहस्पति',
      'mission': 'मिशन',
      'space': 'अंतरिक्ष',
      'Moon': 'चांद',
      'Sun': 'सूर्य',
      'satellite': 'उपग्रह',
      'ISRO': 'इसरो',
      'NASA': 'नासा',
    };

    let translatedText = text;
    for (const [english, hindi] of Object.entries(translations)) {
      translatedText = translatedText.replace(new RegExp(english, 'gi'), hindi);
    }

    // Add Hindi prefix for common responses
    if (text.includes('Mars')) {
      translatedText = `मंगल ग्रह के बारे में: ${translatedText}`;
    } else if (text.includes('mission')) {
      translatedText = `अंतरिक्ष मिशन: ${translatedText}`;
    }

    return translatedText;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = input;
    setInput("");

    try {
      // Generate response based on knowledge base
      let response = generateResponse(userMessage);
      
      // Translate to Hindi if selected
      if (language === "hindi") {
        response = translateToHindi(response);
      }

      // Save to database
      const { data, error } = await supabase
        .from('chat_logs')
        .insert({
          user_id: user?.id,
          question: userMessage,
          answer: response,
          language: language,
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      setMessages(prev => [...prev, data]);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAuthenticated) {
    return <AuthForm onSuccess={() => window.location.reload()} />;
  }

  return (
    <div className=" bg-gradient-space pt-20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Cosmo 🚀
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your friendly AI space assistant - exploring the universe together, one question at a time!
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 h-[600px] flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-orbitron flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                Cosmo - Space Assistant
              </CardTitle>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-background border border-primary/20 rounded px-2 py-1 text-sm"
                >
                  <option value="english">English</option>
                  <option value="hindi">हिंदी</option>
                </select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <div className="h-auto bg-red-400 space-y-4 mb-4 pr-2">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === "hindi" 
                      ? "नमस्ते! मैं कॉस्मो हूं, आपका मित्रवत अंतरिक्ष सहायक! 🚀 ब्रह्मांड के रहस्यों को जानें!"
                      : "Hello! I'm Cosmo, your friendly space assistant! 🚀 Let's explore the wonders of the universe together!"}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 max-w-md mx-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInput("Tell me about Mars")}
                    >
                      About Mars
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInput("What is ISRO?")}
                    >
                      About ISRO
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInput("ISS location")}
                    >
                      ISS Info
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInput("Space missions")}
                    >
                      Missions
                    </Button>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    {/* User Message */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-primary/20 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">{message.question}</p>
                      </div>
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                    
                    {/* Bot Response */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 max-w-xs lg:max-w-md">
                        <p className="text-sm">{message.answer}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {message.language}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === "hindi" ? "अपना प्रश्न यहाँ लिखें..." : "Type your question here..."}
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center">
            <CardContent className="pt-6">
              <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold">AI Powered</h4>
              <p className="text-sm text-muted-foreground">Smart responses based on our space database</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center">
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold">Multilingual</h4>
              <p className="text-sm text-muted-foreground">Available in English and Hindi</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center">
            <CardContent className="pt-6">
              <User className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold">Personal History</h4>
              <p className="text-sm text-muted-foreground">Your chat history is saved and secure</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}