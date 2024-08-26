import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { type Theme, useThemeAwareObject } from '@/core';
import { PressableScale } from '@/ui';
import { horizontalScale, moderateScale, normalize, verticalScale } from '@/utils';
import { useMemo } from 'react';

type ButtonAction = {
	label: string;
	labelColor?: string;
	onPress: () => void;
	backgroundColor: string;
};

type MultiActionButtonProps = {
	splitted: boolean;
	mainAction: ButtonAction;
	leftAction: ButtonAction;
	rightAction: ButtonAction;
};

const ButtonHeight = verticalScale(60);
const paddingHorizontal = horizontalScale(20);
const gap = moderateScale(10);

export const MultiActionButton: React.FC<MultiActionButtonProps> = ({
	splitted,
	mainAction,
	leftAction,
	rightAction,
}) => {
	const { width: windowWidth } = useWindowDimensions();

	const splittedOffset = windowWidth * 0.45;

	const secondaryButtonWidth = useMemo(
		() => (windowWidth - paddingHorizontal * 2 - gap - splittedOffset) / 2,
		[windowWidth, splittedOffset],
	);

	const tertiaryButtonWidth = useMemo(
		() => (windowWidth - paddingHorizontal * 2 - gap + splittedOffset) / 2,
		[windowWidth, splittedOffset],
	);

	const animatedSecondaryButtonStyle = useAnimatedStyle(() => {
		const leftButtonWidth = splitted ? secondaryButtonWidth : 0;
		return {
			width: withTiming(leftButtonWidth),
			opacity: withTiming(splitted ? 1 : 0),
		};
	}, [splitted]);

	const animatedSecondaryTextStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(splitted ? 1 : 0, {
				duration: 150,
			}),
		};
	}, [splitted]);

	const animatedPrimaryButtonStyle = useAnimatedStyle(() => {
		const mainButtonWidth = splitted
			? tertiaryButtonWidth
			: secondaryButtonWidth + tertiaryButtonWidth;
		return {
			width: withTiming(mainButtonWidth),
			marginLeft: withTiming(splitted ? gap : 0),
			backgroundColor: withTiming(
				splitted ? rightAction.backgroundColor : mainAction.backgroundColor,
			),
		};
	}, [splitted]);

	const animatedPrimaryTextStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(splitted ? 0 : 1),
		};
	}, [splitted]);

	const animatedTertiaryTextStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(splitted ? 1 : 0),
		};
	}, [splitted]);

	const styles = useThemeAwareObject(createStyles);

	return (
		<View style={styles.container}>
			<PressableScale
				onPress={leftAction.onPress}
				style={[
					{
						backgroundColor: leftAction.backgroundColor,
					},
					animatedSecondaryButtonStyle,
					styles.button,
				]}
			>
				<Animated.Text
					numberOfLines={1}
					style={[
						styles.label,
						animatedSecondaryTextStyle,
						{
							color: leftAction.labelColor,
						},
					]}
				>
					{leftAction.label}
				</Animated.Text>
			</PressableScale>
			<PressableScale
				onPress={splitted ? rightAction.onPress : mainAction.onPress}
				style={[animatedPrimaryButtonStyle, styles.button]}
			>
				<Animated.Text
					style={[
						styles.label,
						animatedPrimaryTextStyle,
						{
							color: mainAction.labelColor,
						},
					]}
				>
					{mainAction.label}
				</Animated.Text>
				<Animated.Text
					style={[
						styles.label,
						animatedTertiaryTextStyle,
						{
							color: rightAction.labelColor,
						},
					]}
				>
					{rightAction.label}
				</Animated.Text>
			</PressableScale>
		</View>
	);
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			width: '100%',
			height: ButtonHeight,
			paddingHorizontal: 20,
			flexDirection: 'row',
		},
		label: {
			fontSize: normalize(18),
			color: 'white',
			position: 'absolute',
			overflow: 'visible',
			letterSpacing: 0.5,
		},
		button: {
			height: ButtonHeight,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: moderateScale(30),
			borderCurve: 'continuous',
			flexDirection: 'row',
		},
	});
