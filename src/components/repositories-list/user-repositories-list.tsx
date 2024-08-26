import type { RepositoryType } from '@/api/types';
import { PressableScale } from '@/ui';
import { horizontalScale, moderateScale, verticalScale } from '@/utils';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Repository } from './repository';

type UserRepositoriesListProps = {
	repositories: RepositoryType[] | undefined;
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
};

export const UserRepositoriesList = ({
	repositories,
	isLoading,
	isError,
	refetch,
}: UserRepositoriesListProps) => {
	if (isLoading) {
		return (
			<View style={styles.actionContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	if (repositories?.length === 0) {
		return (
			<View style={styles.actionContainer}>
				<Text>User has no repositories</Text>
			</View>
		);
	}

	if (isError || !repositories) {
		return (
			<PressableScale onPress={() => refetch()} style={styles.actionContainer}>
				<Text>Something went wrong, press here to retry</Text>
			</PressableScale>
		);
	}

	return (
		<View style={styles.userRepositoriesContainer}>
			{repositories.map((repo, index) => (
				<Animated.View
					key={index.toString() + Math.random()}
					entering={ZoomIn.delay(100 + index).duration(200)}
				>
					<Repository
						repositoryName={repo.name}
						repositoryDescription={repo.description}
						repositoryFavAmount={repo.stargazers_count}
					/>
				</Animated.View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	userRepositoriesContainer: {
		flexGrow: 1,
		marginVertical: verticalScale(16),
		marginHorizontal: horizontalScale(10),
		gap: verticalScale(16),
	},
	actionContainer: {
		padding: moderateScale(10),
	},
});
