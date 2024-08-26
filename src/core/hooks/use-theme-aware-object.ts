import React from 'react';
import { type Theme, useTheme } from '../contexts/theme.context';

type Generator<T extends object> = (theme: Theme) => T;

export const useThemeAwareObject = <T extends object>(fn: Generator<T>) => {
	const { theme } = useTheme();

	const themedObject = React.useMemo(() => fn(theme), [fn, theme]);
	return themedObject;
};
