export interface Choice {
  id: string;
  text: string;
  effect: 'neutral' | 'positive' | 'negative' | 'ending_reject' | 'ending_fling' | 'ending_romance';
  nextNodeId?: string; // Optional: ID of the specific node to jump to
  isHeartbeat?: boolean; // New: Triggers heartbeat animation on the button
  requiredMinAffinity?: number; // New: Minimum affinity required to unlock
  requiredMaxAffinity?: number; // New: Maximum affinity allowed to unlock
}

export interface GeneratedSceneResponse {
  narrative: string;
  choices: Choice[];
}

export interface StoryNode {
  id: string;
  title: string;
  location: string; // New: Location name for the scene
  text: string; // Static narrative text
  backgroundImage: string; // URL keyword for picsum
  choices: Choice[];
}

export interface GameState {
  currentNodeIndex: number;
  history: string[]; 
  affinity: number; // 0-100 tracking romance level
  currentText: string;
  currentLocation: string; // New: Current location to display
  currentChoices: Choice[];
  inventory: string[]; // New: List of items obtained
  isEnding: boolean;
  endingType?: 'reject' | 'fling' | 'romance';
  // History tracking for Undo/Back functionality
  nodeHistory: number[]; 
  affinityHistory: number[];
  inventoryHistory: string[][]; // New: To undo inventory changes
}