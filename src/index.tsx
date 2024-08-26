import { loadSelectedTheme } from '@/core';

import * as SplashScreen from 'expo-splash-screen';

import { useCallback, useState } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from './api';
import { ThemeProvider } from './core/contexts/theme.context';
import { RootNavigator } from './navigation/root-navigation';

SplashScreen.preventAutoHideAsync();

loadSelectedTheme();

export function App() {
	const [appIsReady] = useState(true);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<ThemeProvider>
				<APIProvider>
					<RootNavigator />
				</APIProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
