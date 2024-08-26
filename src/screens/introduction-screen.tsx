import type { AppStackParamList } from '@/navigation/root-navigation';

import { MultiActionButton, PaginationIndicator } from '@/components';
import { useFirstTimeStore } from '@/core';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	FadeInUp,
	runOnJS,
	useAnimatedReaction,
	useSharedValue,
} from 'react-native-reanimated';

import { Steps } from '@/components';
import { type Theme, useTheme } from '@/core/contexts/theme.context';
import { useThemeAwareObject } from '@/core/hooks/use-theme-aware-object';
import { verticalScale } from '@/utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
	{
		text: 'Find developers on GitHub by their usernames. Discover people with a passion for coding',
		asset: require('../../assets/search-lottie.json'),
	},
	{
		text: "Explore users' repositories and discover exciting projects. Get inspired by their code.",
		asset: require('../../assets/repositories-lottie.json'),
	},
	{
		text: 'Dive into the world of code. Discover new projects and learn from the best on GitHub.',
		asset: require('../../assets/explore-lottie.json'),
	},
] as { text: string; asset: string }[];

type IntroductionScreenProps = NativeStackScreenProps<AppStackParamList, 'Introduction'>;

export const IntroductionScreen = (_: IntroductionScreenProps) => {
	const { setIsFirstTime } = useFirstTimeStore();

	const activeIndex = useSharedValue(0);
	const [index, setIndex] = useState(0);
	const [isSplitted, setIsButtonSplitted] = useState(false);

	const increaseActiveIndex = useCallback(() => {
		activeIndex.value = (activeIndex.value + 1) % steps.length;
	}, [activeIndex]);

	useAnimatedReaction(
		() => activeIndex.value,
		(index) => {
			runOnJS(setIndex)(index);
		},
	);

	const isLastStep = index === steps.length - 1;

	const { theme } = useTheme();

	const mainAction = useMemo(
		() => ({
			label: 'Continue',
			labelColor: theme.colors.input,
			onPress: () => {
				increaseActiveIndex();
				setIsButtonSplitted(true);
			},
			backgroundColor: theme.colors.accent,
		}),
		[theme, increaseActiveIndex],
	);

	const leftAction = useMemo(
		() => ({
			label: 'Back',
			labelColor: theme.colors.input,
			onPress: () => {
				if (activeIndex.value === 1) {
					setIsButtonSplitted(false);
				}
				activeIndex.value = Math.max(0, activeIndex.value - 1);
			},
			backgroundColor: theme.colors.accent,
		}),
		[theme, activeIndex],
	);
	const rightLabel = useMemo(() => (isLastStep ? 'Explore' : 'Continue'), [isLastStep]);

	const rightAction = useMemo(
		() => ({
			label: rightLabel,
			labelColor: theme.colors.input,

			onPress: () => {
				if (isLastStep) {
					setIsButtonSplitted(false);
					setIsFirstTime(false);
				}
				increaseActiveIndex();
			},
			backgroundColor: theme.colors.primary,
		}),
		[theme, isLastStep, increaseActiveIndex, rightLabel, setIsFirstTime],
	);

	const styles = useThemeAwareObject(createStyles);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Animated.View entering={FadeInUp.delay(200).springify()} style={styles.wrapper}>
					<Steps activeIndex={activeIndex} steps={steps} />
				</Animated.View>
			</View>

			<View style={{ alignItems: 'center' }}>
				<Animated.View entering={FadeInUp.delay(400).springify()}>
					<PaginationIndicator activeIndex={activeIndex} count={steps.length} dotSize={10} />
				</Animated.View>
				<Animated.View entering={FadeInUp.delay(600).springify()} style={styles.buttonContainer}>
					<MultiActionButton
						splitted={isSplitted}
						mainAction={mainAction}
						leftAction={leftAction}
						rightAction={rightAction}
					/>
				</Animated.View>
			</View>
		</SafeAreaView>
	);
};

const createStyles = (theme: Theme) => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
			paddingBottom: verticalScale(30),
		},
		wrapper: { flex: 1 },
		buttonContainer: { marginTop: verticalScale(48) },
	});
	return styles;
};
