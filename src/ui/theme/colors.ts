export type ColorTheme = {
	text: string;
	background: string;
	input: string;
	primary: string;
	secondary: string;
	accent: string;
};

export const LIGHT_COLORS_THEME: ColorTheme = {
	text: '#010318',
	background: '#f6f7fe',
	input: '#fff',
	primary: '#2442f0',
	secondary: '#f78290',
	accent: '#f39b49',
};

export const DARK_COLORS_THEME: ColorTheme = {
	text: '#e7e9fe',
	background: '#010209',
	input: '#191c35',
	primary: '#0f2edb',
	secondary: '#7d0816',
	accent: '#b65e0c',
};
