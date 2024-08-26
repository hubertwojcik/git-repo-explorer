import { useUsersQuery } from '@/api';
import { SearchHeader, UsersList } from '@/components';
import type { Theme } from '@/core';
import { useThemeAwareObject } from '@/core/';
import { getElevation } from '@/utils/';
import { SCREEN_HEIGHT, moderateScale } from '@/utils/scale';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
} from 'react-native-reanimated';
import type { ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
	const [searchVal, setValue] = useState('');

	const { data, isLoading, isError, refetch } = useUsersQuery({
		variables: { searchValue: searchVal },
		enabled: !!searchVal,
	});

	const scrollY = useSharedValue(0);

	const translationY = useSharedValue(SCREEN_HEIGHT);

	useEffect(() => {
		translationY.value = withDelay(
			200,
			withSpring(0, {
				damping: 5000,
			}),
		);
	}, [translationY]);

	const handleListScroll = (e: ReanimatedScrollEvent) => {
		'worklet';
		scrollY.value = e.contentOffset.y;
	};

	const rStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translationY.value }],
		};
	});

	const styles = useThemeAwareObject(createStyles);

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<SearchHeader
				scrollY={scrollY}
				onSearch={(val) => {
					setValue(val);
				}}
				searchVal={searchVal}
			/>

			<Animated.View style={[styles.listWrapper, rStyles]}>
				<UsersList
					data={data}
					handleListScroll={handleListScroll}
					isError={isError}
					isLoading={isLoading}
					refetch={refetch}
				/>
			</Animated.View>
		</SafeAreaView>
	);
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		listWrapper: {
			flexGrow: 1,
			backgroundColor: theme.colors.input,
			borderTopLeftRadius: moderateScale(40),
			borderTopRightRadius: moderateScale(40),
			padding: moderateScale(20),
			...getElevation({ elevation: 10 }),
		},
	});
