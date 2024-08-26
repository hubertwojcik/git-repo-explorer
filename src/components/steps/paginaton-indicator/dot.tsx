import { useTheme } from '@/core';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type DotProps = {
	index: number;
	activeIndex: SharedValue<number>;
	dotSize: number;
};

export const Dot: React.FC<DotProps> = ({ index, activeIndex, dotSize }) => {
	const { theme } = useTheme();

	const rDotStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(
				activeIndex.value >= index ? theme.colors.input : 'rgba(0,0,0,0.25)',
				{
					duration: 200,
				},
			),
		};
	}, [index]);

	return (
		<Animated.View
			key={index}
			style={[
				{
					width: dotSize,
					height: dotSize,
					borderRadius: dotSize / 2,
				},
				rDotStyle,
			]}
		/>
	);
};
