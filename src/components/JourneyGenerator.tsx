import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Wand2, Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  generateLandmarkNames, 
  generateJourneyRoute, 
  parseWorkoutInput,
  generateWorkoutId 
} from '@/utils/journeyGenerator';

export default function JourneyGenerator() {
  const [workoutInput, setWorkoutInput] = useState('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [journeyRoute, setJourneyRoute] = useState('');

  const handleGenerate = () => {
    if (!workoutInput.trim()) {
      toast({
        title: "No workouts provided",
        description: "Please enter some workout names to generate your journey.",
        variant: "destructive"
      });
      return;
    }

    const workouts = parseWorkoutInput(workoutInput);
    const names = generateLandmarkNames(workouts);
    const route = generateJourneyRoute(workouts);
    
    setGeneratedNames(names);
    setJourneyRoute(route);
    
    toast({
      title: "Journey Generated! 🗺️",
      description: `Created a ${names.length}-stop adventure path.`
    });
  };

  const handleCopyRoute = async () => {
    try {
      await navigator.clipboard.writeText(journeyRoute);
      toast({
        title: "Copied to clipboard!",
        description: "Journey route copied successfully."
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleExportData = () => {
    const workouts = parseWorkoutInput(workoutInput);
    const exportData = {
      originalWorkouts: workouts,
      landmarkNames: generatedNames,
      journeyRoute: journeyRoute,
      workoutIds: generatedNames.map(name => generateWorkoutId(name)),
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calisthenics-journey.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Journey exported!",
      description: "Downloaded as calisthenics-journey.json"
    });
  };

  const clearAll = () => {
    setWorkoutInput('');
    setGeneratedNames([]);
    setJourneyRoute('');
  };

  return (
    <Card className="p-6 bg-card/95 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-trail-gold/10">
              <Wand2 className="h-5 w-5 text-trail-gold" />
            </div>
          <div>
            <h2 className="text-xl font-semibold">Journey Map Generator</h2>
            <p className="text-muted-foreground text-sm">
              Transform your workouts into an epic adventure path
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="workout-input">
              Enter your workouts (comma-separated)
            </Label>
            <Input
              id="workout-input"
              placeholder="push-up, pull-up, squat, handstand, muscle-up"
              value={workoutInput}
              onChange={(e) => setWorkoutInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Example: push-up, pull-up, squat, handstand, muscle-up
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} className="flex-1">
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Journey
            </Button>
            {generatedNames.length > 0 && (
              <Button variant="outline" onClick={clearAll}>
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {generatedNames.length > 0 && (
          <div className="space-y-4">
            <Separator />
            
            {/* Landmark Names */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-forest-green" />
                Adventure Landmarks
              </h3>
              <div className="flex flex-wrap gap-2">
                {generatedNames.map((name, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-trail-gold/10 text-trail-gold border-trail-gold/20"
                  >
                    {name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Journey Route */}
            <div>
              <h3 className="font-medium mb-3">Your Journey Route</h3>
              <Textarea
                value={journeyRoute}
                readOnly
                className="font-mono text-sm bg-muted/50"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopyRoute} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy Route
              </Button>
              <Button variant="outline" onClick={handleExportData} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}