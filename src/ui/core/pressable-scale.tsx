import { Pressable, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

type PressableScaleProps = {
	children: React.ReactNode;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
} & ViewProps;

const SCALE_VALUE = 0.95;
const MAX_PRESS_DURATION = 4000;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PressableScale = ({ children, onPress, style }: PressableScaleProps) => {
	const active = useSharedValue(false);

	const gesture = Gesture.Tap()
		.maxDuration(MAX_PRESS_DURATION)
		.onTouchesDown(() => {
			active.value = true;
		})
		.onTouchesUp(() => {
			if (onPress != null) runOnJS(onPress)();
		})
		.onFinalize(() => {
			active.value = false;
		});

	const rAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: withTiming(active.value ? SCALE_VALUE : 1),
				},
			],
		};
	}, []);

	return (
		<GestureDetector gesture={gesture}>
			<AnimatedPressable style={[style, rAnimatedStyle]}>{children}</AnimatedPressable>
		</GestureDetector>
	);
};
