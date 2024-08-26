import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { horizontalScale, moderateScale } from '@/utils';
import { Dot } from './dot';

type PaginationIndicatorProps = {
	count: number;
	activeIndex: SharedValue<number>;
	dotSize: number;
};

const dotSpacing = horizontalScale(20);
const externalSpacing = dotSpacing;

export const PaginationIndicator: React.FC<PaginationIndicatorProps> = React.memo(
	({ count, activeIndex, dotSize }) => {
		const height = dotSize + 20;

		const rBarStyle = useAnimatedStyle(() => {
			const activeWidth =
				(activeIndex.value + 1) * dotSize + activeIndex.value * dotSpacing + externalSpacing;

			return {
				width: withSpring(activeWidth, {
					mass: 0.5,
				}),
			};
		}, []);

		return (
			<View
				style={[
					{
						paddingHorizontal: externalSpacing / 2,
						gap: dotSpacing,
					},
					styles.container,
				]}
			>
				<Animated.View
					style={[
						{
							height,
						},
						styles.bar,
						rBarStyle,
					]}
				/>
				{new Array(count).fill(null).map((_, index) => {
					return (
						<Dot
							key={`${index}-${Math.random()}`}
							index={index}
							activeIndex={activeIndex}
							dotSize={dotSize}
						/>
					);
				})}
			</View>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	bar: {
		position: 'absolute',
		backgroundColor: '#66e070',
		borderRadius: moderateScale(100),
		borderCurve: 'continuous',
	},
});
