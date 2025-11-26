export enum Gender {
  MALE = 'Men',
  FEMALE = 'Women'
}

export enum ShoeCategory {
  SOCCER = 'Soccer',
  BASKETBALL = 'Basketball',
  RUNNING = 'Running',
  CASUAL = 'Casual/Skate',
  HEELS = 'High Heels',
  CROCS = 'Clogs',
  SANDALS = 'Flip-Flops/Sandals',
  LUXURY = 'Luxury'
}

export interface ShoeOption {
  id: string;
  name: string;
  category: ShoeCategory;
  description: string; // The prompt sent to AI
  thumbnailColor: string; // CSS color for UI visualization
  icon?: string;
}

export interface ProcessingState {
  status: 'idle' | 'camera' | 'review' | 'processing' | 'complete' | 'error';
  errorMessage?: string;
}