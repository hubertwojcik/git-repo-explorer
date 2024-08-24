import { colorScheme } from 'nativewind';
import React from 'react';
import { getItem, setItem } from '../storage';

const SELECTED_THEME = 'SELECTED_THEME';
export type ColorSchemeType = 'light' | 'dark' | 'system';

export const useSelectedTheme = () => {
	const [theme, setTheme] = React.useState<ColorSchemeType>('system');

	React.useEffect(() => {
		const loadTheme = async () => {
			const storedTheme = await getItem<ColorSchemeType>(SELECTED_THEME);

			if (storedTheme) {
				setTheme(storedTheme);
				colorScheme.set(storedTheme);
			}
		};
		loadTheme();
	}, []);

	const setSelectedTheme = React.useCallback(async (t: ColorSchemeType) => {
		try {
			colorScheme.set(t);

			setTheme(t);
			await setItem(SELECTED_THEME, t);
		} catch (error) {
			console.log('🚀 ~ error:', error);
		}
	}, []);

	return { selectedTheme: theme, setSelectedTheme } as const;
};

export const loadSelectedTheme = async () => {
	const theme = await getItem<ColorSchemeType>(SELECTED_THEME);

	if (theme) {
		colorScheme.set(theme);
	}
};
