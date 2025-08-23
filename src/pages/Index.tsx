import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, Target, Trophy, ChevronRight } from 'lucide-react';
import JourneyMap from '@/components/JourneyMap';
import JourneyGenerator from '@/components/JourneyGenerator';
import heroBackground from '@/assets/hero-background.jpg';

export default function Index() {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return <JourneyMap />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-trail-gold/20 text-trail-gold border-trail-gold/30 hover:bg-trail-gold/30">
            <Map className="h-4 w-4 mr-2" />
            Epic Calisthenics Adventure
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-forest-green via-mountain-blue to-trail-gold bg-clip-text text-transparent">
            Calisthenics Journey Map
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your workout routine into an epic adventure. Progress through mystical locations from
            <span className="text-forest-green font-semibold"> Push-up Valley</span> to
            <span className="text-mountain-blue font-semibold"> Muscle-up Mountain</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setShowMap(true)}
              className="bg-forest-green hover:bg-forest-green/90 text-primary-foreground shadow-adventure text-lg px-8 py-6"
            >
              Begin Your Journey
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-mountain-blue text-mountain-blue hover:bg-mountain-blue/10 text-lg px-8 py-6"
            >
              <Target className="mr-2 h-5 w-5" />
              View Features
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-forest-green/20 rounded-lg">
                  <Map className="h-6 w-6 text-forest-green" />
                </div>
                <h3 className="font-bold text-lg">Interactive Map</h3>
              </div>
              <p className="text-muted-foreground">
                Navigate through beautifully designed workout locations on an adventure-themed map.
              </p>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-mountain-blue/20 rounded-lg">
                  <Target className="h-6 w-6 text-mountain-blue" />
                </div>
                <h3 className="font-bold text-lg">Progressive Training</h3>
              </div>
              <p className="text-muted-foreground">
                Unlock new challenges as you complete workouts and build strength systematically.
              </p>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-trail-gold/20 rounded-lg">
                  <Trophy className="h-6 w-6 text-trail-gold" />
                </div>
                <h3 className="font-bold text-lg">Gamified Progress</h3>
              </div>
              <p className="text-muted-foreground">
                Earn XP, unlock achievements, and track your journey from beginner to master.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Journey Generator Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Create Your Own Journey</h2>
          <p className="text-muted-foreground">
            Transform any list of exercises into an epic adventure map with mystical landmarks.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <JourneyGenerator />
        </div>
      </section>
    </div>
  );
}