import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Repeat, Trophy } from 'lucide-react';
import { Workout, Exercise } from '@/data/workouts';
import { cn } from '@/lib/utils';

interface WorkoutModalProps {
  workout: Workout | null;
  isOpen: boolean;
  onClose: () => void;
  onStartWorkout: (workoutId: string) => void;
  onCompleteWorkout: (workoutId: string) => void;
  onUndoStart: (workoutId: string) => void;
  onRetry: (workoutId: string) => void;
  isCompleted: boolean;
  isCurrent: boolean;
}

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => (
  <Card className="p-4 bg-card/50">
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-semibold text-sm">{exercise.name}</h4>
      <div className="flex gap-2 text-xs text-muted-foreground">
        {exercise.sets && (
          <div className="flex items-center gap-1">
            <Repeat className="h-3 w-3" />
            {exercise.sets}
          </div>
        )}
        {exercise.reps && (
          <div className="flex items-center gap-1">
            <span>×</span>
            {exercise.reps}
          </div>
        )}
        {exercise.duration && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {exercise.duration}
          </div>
        )}
      </div>
    </div>
    <p className="text-sm text-muted-foreground">{exercise.instructions}</p>
  </Card>
);

export default function WorkoutModal({
  workout,
  isOpen,
  onClose,
  onStartWorkout,
  onCompleteWorkout,
  onUndoStart,
  onRetry,
  isCompleted,
  isCurrent
}: WorkoutModalProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  if (!workout) return null;

  const handleStartWorkout = async () => {
    setIsStarting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
    onStartWorkout(workout.id);
    setIsStarting(false);
  };

  const handleCompleteWorkout = async () => {
    setIsCompleting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
    onCompleteWorkout(workout.id);
    setIsCompleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <DialogTitle className="text-xl font-bold">{workout.name}</DialogTitle>
            <Badge 
              variant="secondary"
              className={cn(
                workout.difficulty === 'master' && "bg-trail-gold/20 text-trail-gold",
                workout.difficulty === 'advanced' && "bg-mountain-blue/20 text-mountain-blue",
                workout.difficulty === 'intermediate' && "bg-accent/20 text-accent-foreground",
                workout.difficulty === 'beginner' && "bg-forest-green/20 text-forest-green"
              )}
            >
              {workout.difficulty}
            </Badge>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            {workout.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-4 text-sm">
            <Badge variant="outline" className="bg-background/50">
              {workout.type}
            </Badge>
            <span className="text-muted-foreground">
              {workout.exercises.length} exercises
            </span>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Repeat className="h-4 w-4" />
              Exercises
            </h3>
            <div className="space-y-3">
              {workout.exercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} />
              ))}
            </div>
          </div>

          {workout.rewards.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Rewards
              </h3>
              <div className="flex flex-wrap gap-2">
                {workout.rewards.map((reward, index) => (
                  <Badge key={index} variant="outline" className="bg-trail-gold/10 text-trail-gold border-trail-gold/30">
                    {reward}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="flex gap-3 pt-2">
            {isCompleted ? (
              <>
                <div className="flex-1 flex items-center justify-center gap-2 py-3 text-completed">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Completed!</span>
                </div>
                <Button
                  onClick={() => onRetry(workout.id)}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Retry
                </Button>
              </>
            ) : isCurrent ? (
              <>
                <Button
                  onClick={handleCompleteWorkout}
                  disabled={isCompleting}
                  className="flex-1 bg-completed hover:bg-completed/90"
                >
                  {isCompleting ? "Completing..." : "Mark Complete"}
                </Button>
                <Button
                  onClick={() => onUndoStart(workout.id)}
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Undo Start
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStartWorkout}
                disabled={isStarting}
                className="flex-1 bg-current hover:bg-current/90"
              >
                {isStarting ? "Starting..." : "Start Workout"}
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}