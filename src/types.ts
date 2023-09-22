export interface PhaseProps {
  phaseNumber: number;
  title: string;
  tasks: { title: string; isCompleted: boolean }[];
  onComplete: () => void;
  onTaskComplete: (index: number) => void;
  onTaskReopen: (index: number) => void;
  isPhaseCompleted: boolean;
  isPreviousPhaseCompleted: boolean;
}

export interface TaskProps {
  title: string;
  isCompleted: boolean;
  onComplete: () => void;
  onReopen: () => void;
}
