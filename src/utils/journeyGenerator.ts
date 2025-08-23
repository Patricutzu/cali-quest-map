/**
 * Calisthenics Journey Map Generator
 * Ported from Python to TypeScript for web integration
 */

// List of landmark descriptors used to generate whimsical location names
export const LANDMARKS = [
  "Valley",
  "Bridge", 
  "Mountain",
  "Forest",
  "Canyon",
  "Plateau",
  "Tower",
  "Island",
  "Temple",
  "Lagoon",
  "Summit",
  "Cliffs",
  "Rapids",
  "Oasis",
  "Fortress"
] as const;

export type Landmark = typeof LANDMARKS[number];

/**
 * Combine each workout with a landmark descriptor
 */
export function generateLandmarkNames(workouts: string[]): string[] {
  const names: string[] = [];
  
  for (let idx = 0; idx < workouts.length; idx++) {
    // Normalize workout name: strip whitespace and title-case each word
    const cleanWorkout = workouts[idx]
      .split(/[-\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-');
    
    const landmark = LANDMARKS[idx % LANDMARKS.length];
    names.push(`${cleanWorkout} ${landmark}`);
  }
  
  return names;
}

/**
 * Generate a complete journey route description
 */
export function generateJourneyRoute(workouts: string[]): string {
  if (!workouts.length) return "No workouts provided.";
  
  const names = generateLandmarkNames(workouts);
  return names.join(" → ");
}

/**
 * Create workout IDs from landmark names
 */
export function generateWorkoutId(landmarkName: string): string {
  return landmarkName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Generate a basic workout structure from exercise names
 */
export function generateWorkout(exerciseName: string, index: number) {
  const landmarkNames = generateLandmarkNames([exerciseName]);
  const workoutName = landmarkNames[0];
  const workoutId = generateWorkoutId(workoutName);
  
  // Basic exercise variations based on common calisthenics patterns
  const exerciseVariations = generateExerciseVariations(exerciseName);
  
  return {
    id: workoutId,
    name: workoutName,
    type: 'strength' as const,
    difficulty: index < 2 ? 'beginner' as const : 
                index < 4 ? 'intermediate' as const : 'advanced' as const,
    description: `Embark on your journey through the ${workoutName.split(' ')[1].toLowerCase()} where warriors master the art of ${exerciseName}.`,
    exercises: exerciseVariations,
    prerequisites: index > 0 ? [generateWorkoutId(generateLandmarkNames([`workout-${index - 1}`])[0])] : undefined,
    rewards: [`${workoutName.split(' ')[1]} Badge`, `+${(index + 1) * 10} XP`]
  };
}

/**
 * Generate exercise variations for common movements
 */
function generateExerciseVariations(exerciseName: string) {
  const cleanName = exerciseName.toLowerCase().replace(/[-\s]/g, '');
  
  // Common exercise progressions
  if (cleanName.includes('pushup') || cleanName.includes('push')) {
    return [
      { name: 'Wall Push-ups', sets: 3, reps: 10, instructions: 'Stand arm\'s length from wall, lean in and push back' },
      { name: 'Incline Push-ups', sets: 3, reps: 8, instructions: 'Hands on elevated surface, body straight' },
      { name: 'Standard Push-ups', sets: 2, reps: 5, instructions: 'Full push-up with proper form' }
    ];
  } else if (cleanName.includes('pullup') || cleanName.includes('pull')) {
    return [
      { name: 'Dead Hangs', sets: 3, duration: '20 seconds', instructions: 'Hang from bar with straight arms' },
      { name: 'Negative Pull-ups', sets: 3, reps: 5, instructions: 'Start at top position, lower slowly' },
      { name: 'Assisted Pull-ups', sets: 2, reps: 3, instructions: 'Use resistance band or partner assistance' }
    ];
  } else if (cleanName.includes('squat')) {
    return [
      { name: 'Air Squats', sets: 3, reps: 15, instructions: 'Feet shoulder-width apart, squat down keeping chest up' },
      { name: 'Wall Sits', sets: 3, duration: '30 seconds', instructions: 'Back against wall, thighs parallel to ground' }
    ];
  } else {
    // Generic exercise structure
    return [
      { name: `Basic ${exerciseName}`, sets: 3, reps: 10, instructions: `Perform ${exerciseName} with proper form` },
      { name: `${exerciseName} Variations`, sets: 2, reps: 8, instructions: `Advanced variations of ${exerciseName}` }
    ];
  }
}

/**
 * Parse comma-separated workout string into array
 */
export function parseWorkoutInput(input: string): string[] {
  return input
    .split(',')
    .map(workout => workout.trim())
    .filter(workout => workout.length > 0);
}