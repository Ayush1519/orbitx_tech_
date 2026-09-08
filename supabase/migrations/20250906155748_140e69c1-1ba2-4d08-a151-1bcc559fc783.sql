-- Create planets table
CREATE TABLE public.planets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  planet_type TEXT, -- solar_system, exoplanet, etc.
  distance_from_earth TEXT,
  size_comparison TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create missions table
CREATE TABLE public.missions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  agency TEXT NOT NULL, -- ISRO, NASA, ESA
  mission_date DATE,
  objective TEXT,
  status TEXT DEFAULT 'planned', -- planned, ongoing, completed, failed
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  category TEXT DEFAULT 'general', -- planets, missions, space_tech
  difficulty TEXT DEFAULT 'medium', -- easy, medium, hard
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_results table
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_logs table
CREATE TABLE public.chat_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  language TEXT DEFAULT 'english', -- english, hindi
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.planets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for planets (public read)
CREATE POLICY "Planets are viewable by everyone" 
ON public.planets FOR SELECT USING (true);

-- Create policies for missions (public read)
CREATE POLICY "Missions are viewable by everyone" 
ON public.missions FOR SELECT USING (true);

-- Create policies for quizzes (public read)
CREATE POLICY "Quizzes are viewable by everyone" 
ON public.quizzes FOR SELECT USING (true);

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for quiz_results
CREATE POLICY "Users can view their own quiz results" 
ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results" 
ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for chat_logs
CREATE POLICY "Users can view their own chat logs" 
ON public.chat_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat logs" 
ON public.chat_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'name',
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for planets
INSERT INTO public.planets (name, description, image_url, planet_type, distance_from_earth, size_comparison) VALUES
('Mercury', 'The smallest planet and closest to the Sun', '/api/placeholder/400/300', 'solar_system', '77 million km', '38% of Earth'),
('Venus', 'The hottest planet with a thick, toxic atmosphere', '/api/placeholder/400/300', 'solar_system', '261 million km', '95% of Earth'),
('Earth', 'Our home planet, the only known planet with life', '/api/placeholder/400/300', 'solar_system', '0 km', '100% (reference)'),
('Mars', 'The Red Planet, potential for future human colonization', '/api/placeholder/400/300', 'solar_system', '401 million km', '53% of Earth'),
('Jupiter', 'The largest planet, a gas giant with many moons', '/api/placeholder/400/300', 'solar_system', '965 million km', '1,120% of Earth'),
('Saturn', 'Known for its beautiful ring system', '/api/placeholder/400/300', 'solar_system', '1.6 billion km', '945% of Earth'),
('Uranus', 'An ice giant tilted on its side', '/api/placeholder/400/300', 'solar_system', '3.2 billion km', '400% of Earth'),
('Neptune', 'The windiest planet in our solar system', '/api/placeholder/400/300', 'solar_system', '4.7 billion km', '388% of Earth');

-- Insert sample missions
INSERT INTO public.missions (name, agency, mission_date, objective, status, description) VALUES
('Chandrayaan-3', 'ISRO', '2023-07-14', 'Lunar south pole landing', 'completed', 'Successful soft landing on Moon''s south pole'),
('Mars Orbiter Mission', 'ISRO', '2013-11-05', 'Mars orbit insertion', 'completed', 'India''s first interplanetary mission'),
('Apollo 11', 'NASA', '1969-07-16', 'First human Moon landing', 'completed', 'Historic first human landing on the Moon'),
('Artemis III', 'NASA', '2026-12-31', 'Return humans to Moon', 'planned', 'First crewed lunar landing since Apollo'),
('Gaganyaan', 'ISRO', '2025-12-31', 'First Indian crewed spaceflight', 'planned', 'India''s first human spaceflight mission'),
('James Webb Space Telescope', 'NASA', '2021-12-25', 'Deep space observation', 'ongoing', 'Revolutionary space telescope studying the universe');

-- Insert sample quiz questions
INSERT INTO public.quizzes (question, option_a, option_b, option_c, option_d, correct_option, category) VALUES
('Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'B', 'planets'),
('What was the first Indian mission to Mars called?', 'Chandrayaan-1', 'Mars Orbiter Mission', 'Mangalyaan', 'Aditya-L1', 'B', 'missions'),
('Which is the largest planet in our solar system?', 'Saturn', 'Neptune', 'Jupiter', 'Uranus', 'C', 'planets'),
('Who was the first human to walk on the Moon?', 'Buzz Aldrin', 'Neil Armstrong', 'Michael Collins', 'John Glenn', 'B', 'missions'),
('How many moons does Mars have?', '1', '2', '3', '4', 'B', 'planets'),
('Which space agency launched Chandrayaan-3?', 'NASA', 'ESA', 'ISRO', 'ROSCOSMOS', 'C', 'missions');