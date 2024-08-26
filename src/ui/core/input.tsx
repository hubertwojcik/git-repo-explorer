import type { Theme } from '@/core/contexts/theme.context';
import { useThemeAwareObject } from '@/core/hooks/use-theme-aware-object';
import { horizontalScale } from '@/utils/scale';
import React from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

export const Input = (props: TextInputProps) => {
	const { style: inputStyles, secureTextEntry, ...inputProps } = props;

	const [isFocussed, setIsFocussed] = React.useState(false);

	const onBlur = React.useCallback(() => setIsFocussed(false), []);
	const onFocus = React.useCallback(() => setIsFocussed(true), []);

	const styles = useThemeAwareObject(createStyles);

	return <TextInput onBlur={onBlur} onFocus={onFocus} style={[styles.container]} {...inputProps} />;
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: horizontalScale(10),
			color: theme.colors.text,
		},
	});
