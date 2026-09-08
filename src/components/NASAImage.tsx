import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface APODData {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
  hdurl?: string;
}

const NASAImage = () => {
  const [apod, setApod] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAPOD();
  }, []);

  const fetchAPOD = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch NASA APOD');
      }
      
      const data = await response.json();
      setApod(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="planet-card">
        <CardHeader>
          <div className="h-6 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !apod) {
    return (
      <Card className="planet-card">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading NASA Image</CardTitle>
          <CardDescription>
            Unable to fetch today's astronomy picture. Please try again later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchAPOD} variant="outline" className="w-full">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="planet-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="mb-2">
            NASA Astronomy Picture of the Day
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(apod.date).toLocaleDateString()}
          </div>
        </div>
        <CardTitle className="text-xl">{apod.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {apod.media_type === 'image' ? (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img 
              src={apod.url} 
              alt={apod.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="aspect-video">
            <iframe 
              src={apod.url} 
              title={apod.title}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        )}
        
        <CardDescription className="text-sm leading-relaxed">
          {apod.explanation}
        </CardDescription>
        
        {apod.hdurl && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(apod.hdurl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View High Resolution
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default NASAImage;