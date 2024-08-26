import type { Theme } from '@/core';
import { useThemeAwareObject } from '@/core';
import { getElevation, horizontalScale, moderateScale, normalize, verticalScale } from '@/utils';
import AntDesign from '@expo/vector-icons/AntDesign';

import { StyleSheet, Text, View } from 'react-native';

type RepositoryProps = {
	repositoryName: string;
	repositoryDescription: string | null;
	repositoryFavAmount: number;
};

export const Repository = ({
	repositoryName,
	repositoryDescription,
	repositoryFavAmount,
}: RepositoryProps) => {
	const styles = useThemeAwareObject(createStyles);

	return (
		<View style={styles.repositoryContainer}>
			<View style={styles.repositoryNameContainer}>
				<Text style={styles.repositoryName}>{repositoryName}</Text>
				<View style={styles.repositoriesFavoritesContainer}>
					<Text style={styles.repositoriesFavoritesAmount}>{repositoryFavAmount}</Text>
					<AntDesign name="staro" size={normalize(14)} color="black" />
				</View>
			</View>
			{repositoryDescription && (
				<View>
					<Text numberOfLines={5} style={styles.repositoryDescription}>
						{repositoryDescription}
					</Text>
				</View>
			)}
		</View>
	);
};
const createStyles = (theme: Theme) =>
	StyleSheet.create({
		repositoryContainer: {
			backgroundColor: theme.colors.input,
			borderRadius: moderateScale(8),
			gap: verticalScale(8),
			paddingHorizontal: horizontalScale(16),
			paddingVertical: verticalScale(10),
			...getElevation({ elevation: 2 }),
		},
		repositoryNameContainer: {
			flexDirection: 'row',
		},
		repositoryDescription: {
			color: theme.colors.text,
			fontSize: normalize(14),
			fontWeight: '300',
		},
		repositoryName: {
			color: theme.colors.text,
			flex: 1,
			fontSize: normalize(16),
			fontWeight: '500',
		},
		repositoriesFavoritesContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			columnGap: horizontalScale(6),
		},
		repositoriesFavoritesAmount: {
			color: theme.colors.primary,
			fontSize: normalize(14),
		},
	});
