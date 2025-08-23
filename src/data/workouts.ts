export interface Workout {
  id: string;
  name: string;
  type: 'strength' | 'endurance' | 'skill';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  description: string;
  exercises: Exercise[];
  prerequisites?: string[];
  rewards: string[];
}

export interface Exercise {
  name: string;
  reps?: number;
  sets?: number;
  duration?: string;
  instructions: string;
}

export interface WorkoutProgress {
  workoutId: string;
  status: 'locked' | 'available' | 'current' | 'completed';
  completedAt?: Date;
  bestScore?: number;
}

export const workouts: Workout[] = [
  {
    id: 'pushup-valley',
    name: 'Push-up Valley',
    type: 'strength',
    difficulty: 'beginner',
    description: 'Begin your journey in the peaceful valley where warriors first learn to push against the earth.',
    exercises: [
      {
        name: 'Wall Push-ups',
        sets: 3,
        reps: 10,
        instructions: 'Stand arm\'s length from wall, lean in and push back'
      },
      {
        name: 'Incline Push-ups',
        sets: 3,
        reps: 8,
        instructions: 'Hands on elevated surface, body straight'
      },
      {
        name: 'Knee Push-ups',
        sets: 2,
        reps: 5,
        instructions: 'On knees, maintain straight line from knees to head'
      }
    ],
    rewards: ['Valley Badge', '+10 Strength XP']
  },
  {
    id: 'squat-plains',
    name: 'Squat Plains',
    type: 'strength',
    difficulty: 'beginner',
    description: 'Cross the vast plains where nomads built legendary leg strength through endless squats.',
    exercises: [
      {
        name: 'Air Squats',
        sets: 3,
        reps: 15,
        instructions: 'Feet shoulder-width apart, squat down keeping chest up'
      },
      {
        name: 'Wall Sits',
        sets: 3,
        duration: '30 seconds',
        instructions: 'Back against wall, thighs parallel to ground'
      }
    ],
    prerequisites: ['pushup-valley'],
    rewards: ['Plains Explorer', '+15 Endurance XP']
  },
  {
    id: 'pullup-bridge',
    name: 'Pull-up Bridge',
    type: 'strength',
    difficulty: 'intermediate',
    description: 'The ancient bridge where only those who can lift their own weight may pass.',
    exercises: [
      {
        name: 'Dead Hangs',
        sets: 3,
        duration: '20 seconds',
        instructions: 'Hang from bar with straight arms'
      },
      {
        name: 'Negative Pull-ups',
        sets: 3,
        reps: 5,
        instructions: 'Start at top position, lower slowly'
      },
      {
        name: 'Assisted Pull-ups',
        sets: 2,
        reps: 3,
        instructions: 'Use resistance band or partner assistance'
      }
    ],
    prerequisites: ['pushup-valley', 'squat-plains'],
    rewards: ['Bridge Guardian', '+20 Strength XP']
  },
  {
    id: 'core-caverns',
    name: 'Core Caverns',
    type: 'strength',
    difficulty: 'intermediate',
    description: 'Deep underground caverns where miners developed iron-strong cores through constant tension.',
    exercises: [
      {
        name: 'Plank',
        sets: 3,
        duration: '45 seconds',
        instructions: 'Hold straight line from head to heels'
      },
      {
        name: 'Mountain Climbers',
        sets: 3,
        reps: 20,
        instructions: 'Alternate bringing knees to chest quickly'
      },
      {
        name: 'Hollow Body Hold',
        sets: 3,
        duration: '30 seconds',
        instructions: 'Lie on back, press lower back to ground'
      }
    ],
    prerequisites: ['squat-plains'],
    rewards: ['Cave Explorer', '+25 Core XP']
  },
  {
    id: 'handstand-heights',
    name: 'Handstand Heights',
    type: 'skill',
    difficulty: 'advanced',
    description: 'Towering cliffs where acrobats learned to see the world upside down.',
    exercises: [
      {
        name: 'Wall Handstand',
        sets: 3,
        duration: '30 seconds',
        instructions: 'Feet against wall, hands shoulder-width apart'
      },
      {
        name: 'Crow Pose',
        sets: 3,
        duration: '15 seconds',
        instructions: 'Balance on hands with knees on upper arms'
      },
      {
        name: 'Pike Push-ups',
        sets: 3,
        reps: 8,
        instructions: 'In downward dog position, lower head to ground'
      }
    ],
    prerequisites: ['pullup-bridge', 'core-caverns'],
    rewards: ['Heights Master', '+30 Balance XP']
  },
  {
    id: 'muscleup-mountain',
    name: 'Muscle-up Mountain',
    type: 'skill',
    difficulty: 'master',
    description: 'The legendary peak where only true masters can combine pull and push in perfect harmony.',
    exercises: [
      {
        name: 'Transition Practice',
        sets: 5,
        reps: 3,
        instructions: 'Practice the transition from pull-up to dip position'
      },
      {
        name: 'High Pull-ups',
        sets: 3,
        reps: 5,
        instructions: 'Pull higher than normal, chest to bar'
      },
      {
        name: 'False Grip Hangs',
        sets: 3,
        duration: '20 seconds',
        instructions: 'Hang with wrists over the bar'
      }
    ],
    prerequisites: ['handstand-heights', 'pullup-bridge'],
    rewards: ['Mountain Conqueror', '+50 Master XP', 'Legendary Status']
  }
];

export const initialProgress: WorkoutProgress[] = [
  { workoutId: 'pushup-valley', status: 'available' },
  { workoutId: 'squat-plains', status: 'locked' },
  { workoutId: 'pullup-bridge', status: 'locked' },
  { workoutId: 'core-caverns', status: 'locked' },
  { workoutId: 'handstand-heights', status: 'locked' },
  { workoutId: 'muscleup-mountain', status: 'locked' }
];