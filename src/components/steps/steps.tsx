import { SCREEN_WIDTH, horizontalScale, normalize, verticalScale } from '@/utils';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	type SharedValue,
} from 'react-native-reanimated';

import { type Theme, useThemeAwareObject } from '@/core';

type Props = {
	activeIndex: SharedValue<number>;
	steps: { text: string; asset: string }[];
};

export const Steps = ({ activeIndex, steps }: Props) => {
	const translationX = useSharedValue(0);

	useEffect(() => {
		translationX.value = withSpring(-SCREEN_WIDTH * activeIndex.value);
	}, [activeIndex.value, translationX]);

	const rStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translationX.value }],
		};
	});
	const styles = useThemeAwareObject(createStyles);

	return (
		<View style={styles.wrapper}>
			<Animated.View style={[styles.stepsWrapper, { width: SCREEN_WIDTH * steps.length }, rStyles]}>
				{steps.map((i) => {
					return (
						<View key={Math.random()} style={styles.stepContainer}>
							<View style={styles.stepContent}>
								<Text style={styles.stepText}>{i.text}</Text>
								<LottieView autoPlay style={styles.stepAnimationContent} source={i.asset} />
							</View>
						</View>
					);
				})}
			</Animated.View>
		</View>
	);
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		wrapper: {
			flex: 1,
			justifyContent: 'flex-end',
		},
		stepsWrapper: {
			position: 'absolute',
			flexDirection: 'row',
		},
		stepContainer: {
			width: SCREEN_WIDTH,
		},
		stepContent: {
			alignItems: 'center',
			marginVertical: verticalScale(60),
			rowGap: verticalScale(24),
			paddingHorizontal: horizontalScale(30),
		},
		stepAnimationContent: {
			width: horizontalScale(300),
			height: verticalScale(200),
		},
		stepText: {
			color: theme.colors.text,
			fontSize: normalize(24),
			textAlign: 'center',
		},
	});
