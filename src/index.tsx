import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View />
		</GestureHandlerRootView>
	);
}
