import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, MapPin, Target } from 'lucide-react';
import { Workout, WorkoutProgress } from '@/data/workouts';
import { cn } from '@/lib/utils';

interface WorkoutNodeProps {
  data: {
    workout: Workout;
    progress: WorkoutProgress;
    onWorkoutClick: (workout: Workout) => void;
  };
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case 'master':
      return <Crown className="h-4 w-4" />;
    case 'advanced':
      return <Target className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const WorkoutNode = memo(({ data }: WorkoutNodeProps) => {
  const { workout, progress, onWorkoutClick } = data;
  
  const getNodeStyle = () => {
    switch (progress.status) {
      case 'completed':
        return 'bg-completed/20 border-completed hover:bg-completed/30';
      case 'current':
        return 'bg-current/20 border-current hover:bg-current/30 shadow-glow';
      case 'available':
        return 'bg-card hover:bg-accent/50 border-border';
      case 'locked':
      default:
        return 'bg-muted/50 border-locked cursor-not-allowed opacity-60';
    }
  };

  const isClickable = progress.status !== 'locked';

  return (
    <div className="workout-node">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-trail-gold !border-earth-brown"
      />
      
      <Card
        className={cn(
          "p-4 min-w-[200px] max-w-[250px] cursor-pointer transition-all duration-200",
          getNodeStyle()
        )}
        onClick={() => isClickable && onWorkoutClick(workout)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {progress.status === 'locked' ? (
              <Lock className="h-4 w-4 text-locked" />
            ) : (
              getDifficultyIcon(workout.difficulty)
            )}
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs",
                workout.difficulty === 'master' && "bg-trail-gold/20 text-trail-gold",
                workout.difficulty === 'advanced' && "bg-mountain-blue/20 text-mountain-blue",
                workout.difficulty === 'intermediate' && "bg-accent/20 text-accent-foreground",
                workout.difficulty === 'beginner' && "bg-forest-green/20 text-forest-green"
              )}
            >
              {workout.difficulty}
            </Badge>
          </div>
          
          {progress.status === 'completed' && (
            <div className="w-3 h-3 bg-completed rounded-full flex-shrink-0" />
          )}
          {progress.status === 'current' && (
            <div className="w-3 h-3 bg-current rounded-full animate-pulse flex-shrink-0" />
          )}
        </div>

        <h3 className="font-bold text-sm mb-2 leading-tight">
          {workout.name}
        </h3>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {workout.description}
        </p>

        <div className="flex items-center justify-between text-xs">
          <Badge variant="outline" className="bg-background/50">
            {workout.type}
          </Badge>
          <span className="text-muted-foreground">
            {workout.exercises.length} exercises
          </span>
        </div>
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-trail-gold !border-earth-brown"
      />
    </div>
  );
});

WorkoutNode.displayName = 'WorkoutNode';

export default WorkoutNode;