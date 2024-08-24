import { loadSelectedTheme, useSelectedTheme } from '@/core';
import { Button } from '@/ui/core';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

loadSelectedTheme();

export function App() {
	useEffect(() => {
		loadSelectedTheme();
	}, []);

	const { setSelectedTheme } = useSelectedTheme();
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View className="bg-red-200 dark:bg-red-800 flex-1 items-center justify-center">
				<Button
					label="DARK"
					variant="destructive"
					onPress={() => {
						setSelectedTheme('dark');
					}}
				/>
				<Button
					label="LIGHT"
					variant="destructive"
					onPress={() => {
						setSelectedTheme('light');
					}}
				/>
			</View>
		</GestureHandlerRootView>
	);
}
