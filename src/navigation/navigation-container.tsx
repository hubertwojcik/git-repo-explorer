import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const NavContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>{children}</NavigationContainer>
		</SafeAreaProvider>
	);
};
