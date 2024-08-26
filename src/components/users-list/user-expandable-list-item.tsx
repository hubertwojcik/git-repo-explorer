import { useUserRepositoriesQuery } from '@/api';
import { getElevation, moderateScale, normalize, verticalScale } from '@/utils';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type { GitHubUserType } from '@/api/types';
import { useExpandable } from '@/core';
import { type Theme, useTheme, useThemeAwareObject } from '@/core/';
import Entypo from '@expo/vector-icons/Entypo';
import { UserRepositoriesList } from '../repositories-list/user-repositories-list';

type UserExpandableListItemProps = {
	item: GitHubUserType;
};

export const UserExpandableListItem = ({ item }: UserExpandableListItemProps) => {
	const { isOpened, handleOpen, bodyHeight, rExpandableStyles, progress } = useExpandable();

	const { data, isLoading, isError, refetch } = useUserRepositoriesQuery({
		variables: {
			searchValue: item.login,
		},
		enabled: isOpened,
	});

	const rArrowContainerStyles = useAnimatedStyle(() => {
		const rotate = `-${progress.value * 180}deg`;
		return {
			transform: [{ rotate }],
		};
	});

	const styles = useThemeAwareObject(createStyles);

	const { theme } = useTheme();

	return (
		<View style={styles.userListItemContainer}>
			<Pressable onPress={handleOpen}>
				<View style={styles.userListItemHeader}>
					<Text style={styles.userListItemLogin}>{item.login}</Text>
					<Animated.View style={rArrowContainerStyles}>
						<Entypo name="chevron-down" size={verticalScale(24)} color={theme.colors.text} />
					</Animated.View>
				</View>
			</Pressable>
			<Animated.View style={[styles.userListItemContentContainer, rExpandableStyles]}>
				<View
					onLayout={(event) => {
						bodyHeight.value = event.nativeEvent.layout.height;
					}}
				>
					<UserRepositoriesList
						repositories={data}
						isLoading={isLoading}
						isError={isError}
						refetch={refetch}
					/>
				</View>
			</Animated.View>
		</View>
	);
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		userListItemContainer: {
			borderRadius: moderateScale(20),
			overflow: 'hidden',
			...getElevation({ elevation: 1 }),
		},
		userListItemContentContainer: {
			backgroundColor: theme.colors.background,
			overflow: 'hidden',
		},
		userListItemHeader: {
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'space-between',
			padding: moderateScale(16),
			backgroundColor: theme.colors.background,
		},
		userListItemLogin: {
			fontSize: normalize(16),
			fontWeight: '600',
			color: theme.colors.text,
		},
	});
