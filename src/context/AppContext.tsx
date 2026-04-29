import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProgress {
  projectId: number;
  codeCompleted: boolean;
  codeSubmission: string;
}

interface AppState {
  progress: Record<number, UserProgress>;
  updateProgress: (projectId: number, updates: Partial<UserProgress>) => void;
  getProgress: (projectId: number) => UserProgress | undefined;
  getCompletedCount: () => number;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  projectId: 0,
  codeCompleted: false,
  codeSubmission: ''
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      progress: {},
      
      updateProgress: (projectId, updates) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [projectId]: {
              ...defaultProgress,
              ...state.progress[projectId],
              projectId,
              ...updates
            }
          }
        }));
      },
      
      getProgress: (projectId) => {
        return get().progress[projectId];
      },
      
      getCompletedCount: () => {
        const progress = get().progress;
        return Object.values(progress).filter((p) => p.codeCompleted).length;
      },
      
      resetProgress: () => {
        set({ progress: {} });
      }
    }),
    {
      name: 'data-analysis-progress'
    }
  )
);
