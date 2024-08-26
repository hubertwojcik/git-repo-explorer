import { type Theme, useTheme } from '@/core';
import { useThemeAwareObject } from '@/core/';
import { Input } from '@/ui/';
import { PressableScale } from '@/ui/core';
import { getElevation } from '@/utils';
import { horizontalScale, moderateScale, normalize, verticalScale } from '@/utils/scale';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	Extrapolation,
	FadeInUp,
	interpolate,
	useAnimatedStyle,
	type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SearchHeaderProps = {
	scrollY: SharedValue<number>;
	searchVal: string;
	onSearch: (val: string) => void;
};

const HeaderInitialPaddingVertical = verticalScale(16);
const HeaderEndPaddingVertical = verticalScale(8);
const HeaderInitialRowGap = verticalScale(16);
const HeaderEndRowGap = verticalScale(8);
const HeaderInputHeight = verticalScale(50);
const HeaderInitialTitleHeight = verticalScale(52);
const HeaderEndTitleHeight = verticalScale(32);
const HeaderInitialTitleFontSize = normalize(42);
const HeaderEndTitleFontSize = normalize(32);

export const SearchHeader = ({ scrollY, searchVal, onSearch }: SearchHeaderProps) => {
	const [value, setValue] = useState(searchVal);

	const { top } = useSafeAreaInsets();

	const HeaderInitHeight =
		HeaderInitialPaddingVertical +
		HeaderInputHeight +
		HeaderInitialTitleHeight +
		top / 2 +
		HeaderInitialRowGap;

	const HeaderEndHeight =
		2 * HeaderEndPaddingVertical +
		HeaderInputHeight +
		HeaderEndTitleHeight +
		top / 2 +
		HeaderEndRowGap;

	const rHeaderContainerStyles = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, 300],
				[HeaderInitHeight, HeaderEndHeight],
				Extrapolation.CLAMP,
			),
			rowGap: interpolate(
				scrollY.value,
				[0, 200],
				[HeaderInitialRowGap, HeaderEndRowGap],
				Extrapolation.CLAMP,
			),
			paddingVertical: interpolate(
				scrollY.value,
				[0, 200],
				[HeaderInitialPaddingVertical, HeaderEndPaddingVertical],
				Extrapolation.CLAMP,
			),
		};
	});

	const rTextStyles = useAnimatedStyle(() => {
		return {
			fontSize: interpolate(
				scrollY.value,
				[0, 200],
				[HeaderInitialTitleFontSize, HeaderEndTitleFontSize],
				Extrapolation.CLAMP,
			),
		};
	});

	const styles = useThemeAwareObject(createStyles);
	const { theme } = useTheme();

	return (
		<Animated.View style={[styles.screenHeader, rHeaderContainerStyles]}>
			<Animated.Text
				style={[styles.screenTitle, rTextStyles]}
				entering={FadeInUp.delay(50).springify()}
			>
				Search users
			</Animated.Text>
			<Animated.View style={styles.searchBarContainer} entering={FadeInUp.delay(250).springify()}>
				<Input
					placeholder="Search..."
					placeholderTextColor={theme.colors.text}
					value={value}
					onChangeText={(val) => setValue(val)}
				/>
				<PressableScale
					onPress={() => {
						onSearch(value);
					}}
					style={styles.searchButton}
				>
					<AntDesign name="search1" size={14} color={theme.colors.input} />
				</PressableScale>
			</Animated.View>
		</Animated.View>
	);
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		screenHeader: {
			rowGap: verticalScale(16),
			paddingHorizontal: moderateScale(16),
		},
		screenTitle: {
			fontSize: normalize(42),
			lineHeight: verticalScale(52),
			fontWeight: '400',
			color: theme.colors.text,
		},
		searchBarContainer: {
			paddingVertical: verticalScale(8),
			paddingHorizontal: horizontalScale(10),
			flexDirection: 'row',
			backgroundColor: theme.colors.input,
			columnGap: horizontalScale(12),
			borderRadius: moderateScale(40),
			...getElevation({ elevation: 3 }),
		},

		searchButton: {
			backgroundColor: theme.colors.accent,
			padding: moderateScale(10),
			borderRadius: moderateScale(20),
		},
	});
