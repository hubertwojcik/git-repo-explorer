const SHADOW_OFFSET_WIDTH_COEFFICIENT = 0.3;
const SHADOW_OFFSET_HEIGHT_COEFFICIENT = 0.3;
const SHADOW_OPACITY_COEFFICIENT = 0.2;
const SHADOW_RADIUS_COEFFICIENT = 0.7;
const SHADOW_COLOR = 'black';

type Elevation = {
	elevation: number;
	widthShadowOffset?: number;
	heightShadowOffset?: number;
	shadowOpacity?: number;
	shadowRadius?: number;
	shadowColor?: string;
};

export const getElevation = ({
	elevation,
	widthShadowOffset = SHADOW_OFFSET_WIDTH_COEFFICIENT,
	heightShadowOffset = SHADOW_OFFSET_HEIGHT_COEFFICIENT,
	shadowOpacity = SHADOW_OPACITY_COEFFICIENT,
	shadowRadius = SHADOW_RADIUS_COEFFICIENT,
	shadowColor = SHADOW_COLOR,
}: Elevation) => {
	return {
		elevation,
		shadowColor: shadowColor,
		shadowOffset: {
			width: widthShadowOffset * elevation,
			height: heightShadowOffset * elevation,
		},
		shadowOpacity: shadowOpacity,
		shadowRadius: shadowRadius * elevation,
	};
};
