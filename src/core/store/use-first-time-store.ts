import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '../zustand-storage';

type FirstTimeStore = {
	isFirstTime: boolean;
	setIsFirstTime: (value: boolean) => void;
};

export const useFirstTimeStore = create<FirstTimeStore>()(
	persist(
		(set, get) => ({
			isFirstTime: true,
			setIsFirstTime: (val) => set({ isFirstTime: val }),
		}),
		{
			name: 'storage',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
