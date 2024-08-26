import { type ColorTheme, DARK_COLORS_THEME, LIGHT_COLORS_THEME } from '@/ui/theme/colors';
import React, { createContext } from 'react';
import { getItem, setItem } from '../storage';

export type Theme = {
	colors: ColorTheme;
};
export type ColorSchemeType = 'light' | 'dark' | 'system';

type ThemeContextValue = {
	theme: Theme;
	setTheme: (newTheme: 'light' | 'dark' | 'system') => void;
};

const SELECTED_THEME = 'SELECTED_THEME';

const ThemeContext = createContext<ThemeContextValue>({
	theme: {
		colors: LIGHT_COLORS_THEME,
	},
	setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = React.useState<ColorSchemeType>('system');

	React.useEffect(() => {
		const loadTheme = async () => {
			const storedTheme = await getItem<ColorSchemeType>(SELECTED_THEME);

			if (storedTheme) {
				setTheme(storedTheme);
			}
		};
		loadTheme();
	}, []);

	const setSelectedTheme = React.useCallback(async (t: ColorSchemeType) => {
		try {
			setTheme(t);
			await setItem(SELECTED_THEME, t);
		} catch (error) {
			console.log('🚀 ~ error:', error);
		}
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				theme: {
					colors: theme === 'dark' ? DARK_COLORS_THEME : LIGHT_COLORS_THEME,
				},
				setTheme: setSelectedTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => React.useContext(ThemeContext);
