import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Brain, CheckCircle, XCircle, Rocket, RotateCcw, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import FloatingChatbot from '@/components/FloatingChatbot';

interface QuizQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  category: string;
  difficulty: string;
  created_at: string;
}

const Quiz = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      loadRandomQuestions();
    }
  }, [quizStarted]);

  const fallbackQuestions: QuizQuestion[] = [
    // 🔥 50 curated questions
    {
    id: '1',
    question: 'Which planet is known as the Red Planet?',
    option_a: 'Venus',
    option_b: 'Mars',
    option_c: 'Jupiter',
    option_d: 'Saturn',
    correct_option: 'option_b',
    category: 'planets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    question: 'What is the largest planet in our solar system?',
    option_a: 'Earth',
    option_b: 'Saturn',
    option_c: 'Jupiter',
    option_d: 'Neptune',
    correct_option: 'option_c',
    category: 'planets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    question: 'Which space agency launched the Chandrayaan missions?',
    option_a: 'NASA',
    option_b: 'ESA',
    option_c: 'ISRO',
    option_d: 'SpaceX',
    correct_option: 'option_c',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    question: 'What is the closest star to Earth?',
    option_a: 'Sirius',
    option_b: 'Alpha Centauri',
    option_c: 'The Sun',
    option_d: 'Betelgeuse',
    correct_option: 'option_c',
    category: 'stars',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    question: 'Which planet has the most moons?',
    option_a: 'Jupiter',
    option_b: 'Saturn',
    option_c: 'Neptune',
    option_d: 'Mars',
    correct_option: 'option_b',
    category: 'planets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    question: 'Who was the first person to walk on the Moon?',
    option_a: 'Yuri Gagarin',
    option_b: 'Neil Armstrong',
    option_c: 'Buzz Aldrin',
    option_d: 'Alan Shepard',
    correct_option: 'option_b',
    category: 'missions',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    question: 'Which planet is famous for its rings?',
    option_a: 'Jupiter',
    option_b: 'Uranus',
    option_c: 'Neptune',
    option_d: 'Saturn',
    correct_option: 'option_d',
    category: 'planets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    question: 'Which galaxy do we live in?',
    option_a: 'Andromeda',
    option_b: 'Whirlpool',
    option_c: 'Milky Way',
    option_d: 'Sombrero',
    correct_option: 'option_c',
    category: 'galaxies',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    question: 'What does NASA stand for?',
    option_a: 'National Aeronautics and Space Administration',
    option_b: 'North American Space Agency',
    option_c: 'National Air and Space Agency',
    option_d: 'New Age Space Administration',
    correct_option: 'option_a',
    category: 'agencies',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    question: 'What is the hottest planet in our solar system?',
    option_a: 'Mercury',
    option_b: 'Venus',
    option_c: 'Mars',
    option_d: 'Jupiter',
    correct_option: 'option_b',
    category: 'planets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '11',
    question: 'Which telescope was launched in 1990 and orbits Earth?',
    option_a: 'Spitzer',
    option_b: 'James Webb',
    option_c: 'Kepler',
    option_d: 'Hubble',
    correct_option: 'option_d',
    category: 'technology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '12',
    question: 'Who was the first human in space?',
    option_a: 'Neil Armstrong',
    option_b: 'Yuri Gagarin',
    option_c: 'Valentina Tereshkova',
    option_d: 'John Glenn',
    correct_option: 'option_b',
    category: 'missions',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '13',
    question: 'Which planet is known as the Morning Star?',
    option_a: 'Venus',
    option_b: 'Mercury',
    option_c: 'Mars',
    option_d: 'Jupiter',
    correct_option: 'option_a',
    category: 'planets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '14',
    question: 'What is the name of the first artificial satellite?',
    option_a: 'Sputnik 1',
    option_b: 'Apollo 11',
    option_c: 'Voyager 1',
    option_d: 'Hubble',
    correct_option: 'option_a',
    category: 'missions',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '15',
    question: 'What is the largest moon of Saturn?',
    option_a: 'Ganymede',
    option_b: 'Titan',
    option_c: 'Io',
    option_d: 'Europa',
    correct_option: 'option_b',
    category: 'moons',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '16',
    question: 'Which space agency launched the James Webb Space Telescope?',
    option_a: 'NASA, ESA, CSA',
    option_b: 'ISRO',
    option_c: 'JAXA',
    option_d: 'Roscosmos',
    correct_option: 'option_a',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '17',
    question: 'What protects Earth from harmful solar radiation?',
    option_a: 'Ozone Layer',
    option_b: 'Magnetic Field',
    option_c: 'Atmosphere',
    option_d: 'Clouds',
    correct_option: 'option_b',
    category: 'earth',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '18',
    question: 'Which mission first landed humans on the Moon?',
    option_a: 'Apollo 11',
    option_b: 'Apollo 13',
    option_c: 'Apollo 8',
    option_d: 'Luna 2',
    correct_option: 'option_a',
    category: 'missions',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '19',
    question: 'Which planet rotates on its side?',
    option_a: 'Neptune',
    option_b: 'Uranus',
    option_c: 'Saturn',
    option_d: 'Mercury',
    correct_option: 'option_b',
    category: 'planets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '20',
    question: 'Which Indian satellite was the first to be launched?',
    option_a: 'INSAT-1A',
    option_b: 'Aryabhata',
    option_c: 'GSAT-1',
    option_d: 'IRS-1A',
    correct_option: 'option_b',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '21',
    question: 'What is the speed of light?',
    option_a: '3 × 10^8 m/s',
    option_b: '1.5 × 10^8 m/s',
    option_c: '3 × 10^6 m/s',
    option_d: '1.5 × 10^6 m/s',
    correct_option: 'option_a',
    category: 'physics',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
  },
  {
    id: '22',
    question: 'Which space company developed the Falcon 9 rocket?',
    option_a: 'NASA',
    option_b: 'Blue Origin',
    option_c: 'SpaceX',
    option_d: 'ULA',
    correct_option: 'option_c',
    category: 'rockets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '23',
    question: 'Which is the densest planet in our solar system?',
    option_a: 'Venus',
    option_b: 'Earth',
    option_c: 'Mars',
    option_d: 'Neptune',
    correct_option: 'option_b',
    category: 'planets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '24',
    question: 'Which planet has the Great Red Spot?',
    option_a: 'Jupiter',
    option_b: 'Saturn',
    option_c: 'Neptune',
    option_d: 'Mars',
    correct_option: 'option_a',
    category: 'planets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '25',
    question: 'Which Indian mission reached Mars in 2014?',
    option_a: 'Mangalyaan (MOM)',
    option_b: 'Chandrayaan-1',
    option_c: 'Chandrayaan-2',
    option_d: 'PSLV-C37',
    correct_option: 'option_a',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '26',
    question: 'Which star is known as the North Star?',
    option_a: 'Sirius',
    option_b: 'Polaris',
    option_c: 'Betelgeuse',
    option_d: 'Rigel',
    correct_option: 'option_b',
    category: 'stars',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '27',
    question: 'Which rocket carried the first humans to the Moon?',
    option_a: 'Saturn V',
    option_b: 'Falcon Heavy',
    option_c: 'Soyuz',
    option_d: 'Ariane 5',
    correct_option: 'option_a',
    category: 'rockets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '28',
    question: 'Which country launched the first woman into space?',
    option_a: 'USA',
    option_b: 'Russia (USSR)',
    option_c: 'China',
    option_d: 'India',
    correct_option: 'option_b',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '29',
    question: 'What is the most common type of star in the universe?',
    option_a: 'Neutron stars',
    option_b: 'Red dwarfs',
    option_c: 'Supergiants',
    option_d: 'White dwarfs',
    correct_option: 'option_b',
    category: 'stars',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
  },
  {
    id: '30',
    question: 'What type of galaxy is the Milky Way?',
    option_a: 'Elliptical',
    option_b: 'Irregular',
    option_c: 'Spiral',
    option_d: 'Ring',
    correct_option: 'option_c',
    category: 'galaxies',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '31',
    question: 'Which NASA rover landed on Mars in 2021?',
    option_a: 'Curiosity',
    option_b: 'Perseverance',
    option_c: 'Spirit',
    option_d: 'Opportunity',
    correct_option: 'option_b',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '32',
    question: 'Which is the coldest planet in our solar system?',
    option_a: 'Neptune',
    option_b: 'Uranus',
    option_c: 'Pluto',
    option_d: 'Saturn',
    correct_option: 'option_b',
    category: 'planets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '33',
    question: 'Which Indian astronaut flew aboard Soyuz T-11 in 1984?',
    option_a: 'Rakesh Sharma',
    option_b: 'Kalpana Chawla',
    option_c: 'Sunita Williams',
    option_d: 'Abdul Kalam',
    correct_option: 'option_a',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '34',
    question: 'Which moon is the largest in the solar system?',
    option_a: 'Titan',
    option_b: 'Europa',
    option_c: 'Ganymede',
    option_d: 'Io',
    correct_option: 'option_c',
    category: 'moons',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '35',
    question: 'Which planet takes the longest time to orbit the Sun?',
    option_a: 'Neptune',
    option_b: 'Uranus',
    option_c: 'Jupiter',
    option_d: 'Saturn',
    correct_option: 'option_a',
    category: 'planets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '36',
    question: 'What does ISRO stand for?',
    option_a: 'Indian Space Research Organisation',
    option_b: 'International Space Rocket Organization',
    option_c: 'Indian Science Research Office',
    option_d: 'Institute of Space Research Organisation',
    correct_option: 'option_a',
    category: 'agencies',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '37',
    question: 'Which spacecraft carried the Golden Record?',
    option_a: 'Voyager 1 and 2',
    option_b: 'Pioneer 10',
    option_c: 'Apollo 17',
    option_d: 'Cassini',
    correct_option: 'option_a',
    category: 'missions',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
  },
  {
    id: '38',
    question: 'Which is the brightest planet as seen from Earth?',
    option_a: 'Mars',
    option_b: 'Venus',
    option_c: 'Jupiter',
    option_d: 'Saturn',
    correct_option: 'option_b',
    category: 'planets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '39',
    question: 'Which is the smallest planet in the solar system?',
    option_a: 'Mercury',
    option_b: 'Mars',
    option_c: 'Venus',
    option_d: 'Pluto',
    correct_option: 'option_a',
    category: 'planets',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '40',
    question: 'Which Indian mission attempted a soft landing on the Moon in 2019?',
    option_a: 'Chandrayaan-1',
    option_b: 'Chandrayaan-2',
    option_c: 'Chandrayaan-3',
    option_d: 'Mangalyaan',
    correct_option: 'option_b',
    category: 'missions',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '41',
    question: 'What type of star is the Sun?',
    option_a: 'Red Giant',
    option_b: 'White Dwarf',
    option_c: 'Yellow Dwarf (G-type)',
    option_d: 'Neutron Star',
    correct_option: 'option_c',
    category: 'stars',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
  },
  {
    id: '42',
    question: 'Which is the nearest galaxy to the Milky Way?',
    option_a: 'Whirlpool Galaxy',
    option_b: 'Andromeda Galaxy',
    option_c: 'Triangulum Galaxy',
    option_d: 'Cartwheel Galaxy',
    correct_option: 'option_b',
    category: 'galaxies',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '43',
    question: 'What does PSLV stand for in ISRO’s rockets?',
    option_a: 'Polar Satellite Launch Vehicle',
    option_b: 'Planetary Space Launch Vehicle',
    option_c: 'Payload Satellite Launch Vehicle',
    option_d: 'Primary Satellite Launch Vehicle',
    correct_option: 'option_a',
    category: 'rockets',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
  },
  {
    id: '44',
    question: 'Which is the farthest human-made object from Earth?',
    option_a: 'Voyager 1',
    option_b: 'Voyager 2',
    option_c: 'Pioneer 10',
    option_d: 'New Horizons',
    correct_option: 'option_a',
    category: 'missions',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
  },
  {
    id: '45',
    question: 'Which moon has a subsurface ocean and geysers?',
    option_a: 'Titan',
    option_b: 'Europa',
    option_c: 'Io',
    option_d: 'Callisto',
    correct_option: 'option_b',
    category: 'moons',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
  },
    // ... add up to 50 (planets, missions, rockets, space agencies, astronomy)
  ];

  const loadRandomQuestions = async () => {
    try {
      const { data: allQuizzes, error } = await supabase
        .from('quizzes')
        .select('*');

      if (error) throw error;

      if (allQuizzes && allQuizzes.length >= 50) {
        const shuffled = [...allQuizzes].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, 5));
      } else {
        const shuffled = [...fallbackQuestions].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      const shuffled = [...fallbackQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    const score = calculateScore();
    setShowResults(true);

    toast({
      title: 'Quiz Completed!',
      description: `You scored ${score}/${questions.length}!`,
    });
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index]?.correct_option ? 1 : 0);
    }, 0);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
    setLoading(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setLoading(true);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-cosmic">
        
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-6">
                Space Quizzes
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Test your knowledge about space, planets, missions, and cosmic phenomena. 
                New questions every time you play!
              </p>
              <Card className="planet-card max-w-lg mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                    Ready to Test Your Knowledge?
                  </CardTitle>
                  <CardDescription>
                    5 randomized questions from a pool of 50+
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-left space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Questions about planets, missions, and astronomy</li>
                    <li>• Randomized each time you play</li>
                    <li>• Instant feedback on answers</li>
                  </ul>
                  <Button onClick={startQuiz} className="btn-cosmic w-full">
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <FloatingChatbot />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic">
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="planet-card">
              <CardContent className="py-16">
                <div className="text-center">
                  <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                  <h2 className="text-xl font-semibold mb-2">Loading Questions...</h2>
                  <p className="text-muted-foreground">Preparing your space quiz</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <FloatingChatbot />
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-cosmic">
        <Navigation />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="planet-card">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-display text-gradient mb-2">
                  Quiz Complete!
                </CardTitle>
                <CardDescription>Here&apos;s how you did</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">
                    {score}/{questions.length}
                  </div>
                  <Badge
                    variant={
                      percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'outline'
                    }
                    className="text-lg px-4 py-2"
                  >
                    {percentage}%
                  </Badge>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">Review Your Answers</h3>
                  {questions.map((q, index) => {
                    const isCorrect = selectedAnswers[index] === q.correct_option;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-lg border ${
                          isCorrect
                            ? 'border-green-500/50 bg-green-500/10'
                            : 'border-red-500/50 bg-red-500/10'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-2">{q.question}</p>
                            <p className="text-sm text-muted-foreground">
                              Correct answer: {q[q.correct_option as keyof QuizQuestion]}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button onClick={resetQuiz} className="btn-cosmic w-full">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Try Again with New Questions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <FloatingChatbot />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-cosmic">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="planet-card">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{question?.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <Progress value={progress} className="mb-4" />
              <CardTitle className="text-xl">{question?.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion] || ''}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {['option_a', 'option_b', 'option_c', 'option_d'].map((option, index) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="flex-1 cursor-pointer">
                      <span className="font-medium text-primary mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {question?.[option as keyof QuizQuestion]}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                Previous
              </Button>
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={submitQuiz}
                  disabled={!selectedAnswers[currentQuestion]}
                  className="btn-cosmic"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  disabled={!selectedAnswers[currentQuestion]}
                  className="btn-cosmic"
                >
                  Next
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
};

export default Quiz;
