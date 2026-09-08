import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Trophy, MessageSquare, Calendar, Edit } from "lucide-react";
import { AuthForm } from "@/components/AuthForm";

interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface QuizResult {
  id: string;
  score: number;
  total_questions: number;
  submitted_at: string;
}

interface ChatLog {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  language: string;
}

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProfile();
      fetchQuizResults();
      fetchChatLogs();
    }
  }, [isAuthenticated, user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setName(data.name || "");
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user?.id)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setQuizResults(data || []);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    }
  };

  const fetchChatLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      setChatLogs(data || []);
    } catch (error) {
      console.error('Error fetching chat logs:', error);
    }
  };

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, name } : null);
      setEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return <AuthForm onSuccess={() => window.location.reload()} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-space pt-20 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalQuizzes = quizResults.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round((quizResults.reduce((sum, result) => sum + (result.score / result.total_questions), 0) / totalQuizzes) * 100)
    : 0;
  const bestScore = totalQuizzes > 0 
    ? Math.max(...quizResults.map(result => Math.round((result.score / result.total_questions) * 100)))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-space pt-20 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Your Profile
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your learning journey through space exploration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {editing ? (
                    <div className="space-y-2">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                      <div className="flex gap-2">
                        <Button onClick={updateProfile} size="sm">Save</Button>
                        <Button onClick={() => setEditing(false)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{profile?.name || "Space Explorer"}</p>
                        <p className="text-sm text-muted-foreground">{profile?.email}</p>
                      </div>
                      <Button onClick={() => setEditing(true)} variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(profile?.created_at || "").toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Statistics */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                Quiz Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{totalQuizzes}</div>
                    <div className="text-sm text-muted-foreground">Quizzes Taken</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{averageScore}%</div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{bestScore}%</div>
                    <div className="text-sm text-muted-foreground">Best Score</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Quiz Results</h4>
                  {quizResults.slice(0, 5).map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-3 bg-primary/10 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {result.score}/{result.total_questions}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(result.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant={result.score >= result.total_questions * 0.8 ? "default" : "secondary"}
                      >
                        {Math.round((result.score / result.total_questions) * 100)}%
                      </Badge>
                    </div>
                  ))}
                  {quizResults.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No quiz results yet. Take your first quiz!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat History */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Chat History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{chatLogs.length}</div>
                  <div className="text-sm text-muted-foreground">Questions Asked</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Questions</h4>
                  {chatLogs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-primary/10 rounded-lg"
                    >
                      <p className="text-sm font-medium truncate">{log.question}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {log.language}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {chatLogs.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No chat history yet. Start a conversation!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badges */}
        <div className="mt-12">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron">Achievements</CardTitle>
              <CardDescription>
                Unlock badges by exploring and learning about space
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`text-center p-4 border rounded-lg ${
                  totalQuizzes >= 1 ? 'border-primary bg-primary/10' : 'border-muted-foreground/20'
                }`}>
                  <Trophy className={`h-8 w-8 mx-auto mb-2 ${
                    totalQuizzes >= 1 ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <h4 className="font-semibold text-sm">First Quiz</h4>
                  <p className="text-xs text-muted-foreground">Complete your first quiz</p>
                </div>
                
                <div className={`text-center p-4 border rounded-lg ${
                  averageScore >= 80 ? 'border-primary bg-primary/10' : 'border-muted-foreground/20'
                }`}>
                  <Trophy className={`h-8 w-8 mx-auto mb-2 ${
                    averageScore >= 80 ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <h4 className="font-semibold text-sm">Space Expert</h4>
                  <p className="text-xs text-muted-foreground">80%+ average quiz score</p>
                </div>

                <div className={`text-center p-4 border rounded-lg ${
                  chatLogs.length >= 10 ? 'border-primary bg-primary/10' : 'border-muted-foreground/20'
                }`}>
                  <MessageSquare className={`h-8 w-8 mx-auto mb-2 ${
                    chatLogs.length >= 10 ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <h4 className="font-semibold text-sm">Curious Explorer</h4>
                  <p className="text-xs text-muted-foreground">Ask 10+ questions</p>
                </div>

                <div className={`text-center p-4 border rounded-lg ${
                  totalQuizzes >= 10 ? 'border-primary bg-primary/10' : 'border-muted-foreground/20'
                }`}>
                  <Trophy className={`h-8 w-8 mx-auto mb-2 ${
                    totalQuizzes >= 10 ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <h4 className="font-semibold text-sm">Quiz Master</h4>
                  <p className="text-xs text-muted-foreground">Complete 10+ quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}