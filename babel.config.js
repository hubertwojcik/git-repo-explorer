module.exports = (api) => {
	api.cache(true);
	return {
		presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'@': './src',
						'@env': './src/env.js',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
