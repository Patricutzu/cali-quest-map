import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Trophy, Star } from 'lucide-react';
import WorkoutNode from './WorkoutNode';
import WorkoutModal from './WorkoutModal';
import { workouts, initialProgress, Workout, WorkoutProgress } from '@/data/workouts';
import { toast } from '@/hooks/use-toast';

const nodeTypes = {
  workout: WorkoutNode,
};

// Create initial nodes and edges for the journey map
const createInitialNodes = (workouts: Workout[], progress: WorkoutProgress[]): Node[] => {
  return workouts.map((workout, index) => {
    const workoutProgress = progress.find(p => p.workoutId === workout.id) || { workoutId: workout.id, status: 'locked' as const };
    
    // Position nodes in a winding path
    const x = 200 + (index % 2) * 400 + Math.sin(index) * 100;
    const y = 100 + index * 150;

    return {
      id: workout.id,
      type: 'workout',
      position: { x, y },
      data: {
        workout,
        progress: workoutProgress,
        onWorkoutClick: () => {}, // Will be set in the component
      },
    };
  });
};

const createInitialEdges = (workouts: Workout[]): Edge[] => {
  const edges: Edge[] = [];
  
  workouts.forEach((workout) => {
    if (workout.prerequisites) {
      workout.prerequisites.forEach((prereqId) => {
        edges.push({
          id: `${prereqId}-${workout.id}`,
          source: prereqId,
          target: workout.id,
          type: 'smoothstep',
          style: { 
            stroke: 'hsl(var(--trail-gold))', 
            strokeWidth: 3,
            strokeDasharray: '5,5'
          },
          animated: false,
        });
      });
    }
  });

  return edges;
};

export default function JourneyMap() {
  const [progress, setProgress] = useState<WorkoutProgress[]>(initialProgress);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    createInitialNodes(workouts, progress)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    createInitialEdges(workouts)
  );

  // Update nodes when progress changes
  useEffect(() => {
    setNodes(nodes => 
      nodes.map(node => {
        const workoutProgress = progress.find(p => p.workoutId === node.id);
        return {
          ...node,
          data: {
            ...node.data,
            progress: workoutProgress,
            onWorkoutClick: handleWorkoutClick,
          },
        };
      })
    );
  }, [progress, setNodes]);

  // Update stats
  useEffect(() => {
    const completed = progress.filter(p => p.status === 'completed').length;
    setCompletedCount(completed);
    setTotalXP(completed * 25); // Simple XP calculation
  }, [progress]);

  const handleWorkoutClick = useCallback((workout: Workout) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  }, []);

  const updateProgress = useCallback((workoutId: string, newStatus: WorkoutProgress['status']) => {
    setProgress(currentProgress => {
      const updated = currentProgress.map(p => 
        p.workoutId === workoutId 
          ? { ...p, status: newStatus, completedAt: newStatus === 'completed' ? new Date() : p.completedAt }
          : p
      );

      // Unlock next workouts if this one is completed
      if (newStatus === 'completed') {
        const workout = workouts.find(w => w.id === workoutId);
        if (workout) {
          // Find workouts that have this as a prerequisite
          workouts.forEach(nextWorkout => {
            if (nextWorkout.prerequisites?.includes(workoutId)) {
              const nextProgress = updated.find(p => p.workoutId === nextWorkout.id);
              if (nextProgress?.status === 'locked') {
                // Check if all prerequisites are completed
                const allPrereqsCompleted = nextWorkout.prerequisites?.every(prereqId =>
                  updated.find(p => p.workoutId === prereqId)?.status === 'completed'
                );
                
                if (allPrereqsCompleted) {
                  const index = updated.findIndex(p => p.workoutId === nextWorkout.id);
                  if (index !== -1) {
                    updated[index] = { ...updated[index], status: 'available' };
                  }
                }
              }
            }
          });
        }
      }

      return updated;
    });
  }, []);

  const handleStartWorkout = useCallback((workoutId: string) => {
    updateProgress(workoutId, 'current');
    toast({
      title: "Workout Started!",
      description: "Good luck on your training journey!",
    });
    setIsModalOpen(false);
  }, [updateProgress]);

  const handleCompleteWorkout = useCallback((workoutId: string) => {
    updateProgress(workoutId, 'completed');
    const workout = workouts.find(w => w.id === workoutId);
    toast({
      title: "Workout Completed! 🏆",
      description: `Congratulations! You've conquered ${workout?.name}!`,
    });
    setIsModalOpen(false);
  }, [updateProgress]);

  const getSelectedWorkoutProgress = () => {
    if (!selectedWorkout) return null;
    return progress.find(p => p.workoutId === selectedWorkout.id);
  };

  const selectedProgress = getSelectedWorkoutProgress();

  return (
    <div className="h-screen w-full relative">
      {/* Stats Panel */}
      <Card className="absolute top-4 left-4 z-10 p-4 bg-card/95 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-trail-gold" />
            <span className="font-semibold">{totalXP} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-forest-green" />
            <span>{completedCount}/{workouts.length} Completed</span>
          </div>
          <Badge variant="outline" className="bg-background/50">
            <Star className="h-3 w-3 mr-1" />
            Adventurer
          </Badge>
        </div>
      </Card>

      {/* Journey Map */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-background"
      >
        <Background 
          gap={20} 
          size={1} 
          color="hsl(var(--border))" 
        />
        <Controls 
          position="bottom-right"
          className="!bg-card !border-border"
        />
        <MiniMap 
          position="bottom-left"
          className="!bg-card !border-border"
          nodeColor={(node) => {
            const progress = node.data?.progress as WorkoutProgress | undefined;
            switch (progress?.status) {
              case 'completed': return 'hsl(var(--completed))';
              case 'current': return 'hsl(var(--current))';
              case 'available': return 'hsl(var(--accent))';
              default: return 'hsl(var(--locked))';
            }
          }}
        />
      </ReactFlow>

      {/* Workout Modal */}
      <WorkoutModal
        workout={selectedWorkout}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartWorkout={handleStartWorkout}
        onCompleteWorkout={handleCompleteWorkout}
        isCompleted={selectedProgress?.status === 'completed'}
        isCurrent={selectedProgress?.status === 'current'}
      />
    </div>
  );
}