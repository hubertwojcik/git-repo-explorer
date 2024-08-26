import type { GitHubSearchUsersResponse } from '@/api/types';
import { type Theme, useThemeAwareObject } from '@/core';
import { PressableScale } from '@/ui';
import { moderateScale, verticalScale } from '@/utils';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, {
	FadeInDown,
	SlideInLeft,
	useAnimatedScrollHandler,
} from 'react-native-reanimated';
import type { ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';
import { UserExpandableListItem } from './user-expandable-list-item';

const LIST_BOTTOM_OFFSET = verticalScale(200);

type UsersListProps = {
	data: GitHubSearchUsersResponse | undefined;
	isLoading: boolean;
	isError: boolean;
	handleListScroll: (event: ReanimatedScrollEvent) => void;
	refetch: () => void;
};

export const UsersList = ({
	data,
	isError,
	isLoading,
	handleListScroll,
	refetch,
}: UsersListProps) => {
	const scrollHandler = useAnimatedScrollHandler((event) => {
		handleListScroll(event);
	});

	const styles = useThemeAwareObject(createStyles);

	if (isLoading) {
		return (
			<View style={styles.wrapper}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!data) {
		return (
			<View style={styles.wrapper}>
				<LottieView
					autoPlay
					style={styles.lottieAnimation}
					source={require('../../../assets/background-lottie.json')}
				/>
			</View>
		);
	}

	if (data?.items.length === 0) {
		return (
			<View style={styles.spacer}>
				<Text style={styles.text}>There are no result for given username</Text>
			</View>
		);
	}

	if (isError) {
		return (
			<View style={styles.spacer}>
				<PressableScale onPress={() => refetch()}>
					<Text>Something went wrong, press here to retry</Text>
				</PressableScale>
			</View>
		);
	}

	return (
		<Animated.FlatList
			onScroll={scrollHandler}
			showsVerticalScrollIndicator={false}
			bounces={false}
			data={data?.items}
			scrollEventThrottle={16}
			contentContainerStyle={styles.usersListContainerStyle}
			renderItem={({ item, index }) => (
				<Animated.View
					entering={FadeInDown.delay(100 * index)}
					exiting={SlideInLeft.delay((data.items.length - index) * 100)}
					key={index}
				>
					<UserExpandableListItem item={item} />
				</Animated.View>
			)}
		/>
	);
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
		spacer: {
			padding: moderateScale(20),
		},
		text: {
			color: theme.colors.text,
		},
		usersListContainerStyle: {
			rowGap: verticalScale(20),
			paddingBottom: LIST_BOTTOM_OFFSET,
		},
		lottieAnimation: { height: 200, width: 200 },
	});
