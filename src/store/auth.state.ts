import { createState } from '@/utils';

interface InitialState {
  authToken?: string;
  setAuthToken(token: string): void;
}

export const useAuthStore = createState<InitialState>('auth', (set) => ({
  setAuthToken(token: string) {
    set({ authToken: token });
  },
}));
