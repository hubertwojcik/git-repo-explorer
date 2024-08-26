import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavContainer } from './navigation-container';

import { useFirstTimeStore } from '@/core';
import { IntroductionScreen } from '@/screens/introduction-screen';

import { HomeScreen } from '@/screens';

export type AppStackParamList = {
	Introduction: undefined;
	Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const Root = () => {
	const { isFirstTime } = useFirstTimeStore();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isFirstTime ? (
				<Stack.Screen name="Introduction" component={IntroductionScreen} />
			) : (
				<Stack.Screen name="Home" component={HomeScreen} />
			)}
		</Stack.Navigator>
	);
};

export const RootNavigator = () => {
	return (
		<NavContainer>
			<Root />
		</NavContainer>
	);
};
