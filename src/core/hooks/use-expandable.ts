import { useState } from 'react';
import {
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

export const useExpandable = () => {
	const [isOpened, setIsOpened] = useState(false);
	const animatedHeightValue = useSharedValue(0);
	const bodyHeight = useSharedValue(0);
	const progress = useSharedValue(0);

	const handleOpen = () => {
		setIsOpened(!isOpened);
		progress.value = withTiming(isOpened ? 0 : 1, { duration: 300 });
		animatedHeightValue.value = withTiming(isOpened ? 0 : 1, {
			duration: 0,
		});
	};

	const heightProgress = useDerivedValue(() =>
		isOpened ? withTiming(1, { duration: 200 }) : withTiming(0, { duration: 200 }),
	);

	const rExpandableStyles = useAnimatedStyle(() => {
		const height = interpolate(
			animatedHeightValue.value,
			[0, 1],
			[0, bodyHeight.value * heightProgress.value + 3],
		);

		return {
			height,
		};
	});

	return { isOpened, handleOpen, rExpandableStyles, bodyHeight, progress };
};
