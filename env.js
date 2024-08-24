const path = require('node:path');
const z = require('zod');

// Determine the environment (default to development)
const APP_ENV = process.env.APP_ENV ?? 'development';

const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
	path: envPath,
});

const BUNDLE_ID = 'com.gitrepoexplorer';
const PACKAGE = 'com.gitrepoexplorer';
const NAME = 'Git Repositories Explorer';
const SLUG = 'git-repos-explorer'; // app name

/**
 * function withEnvSuffix that will add a suffix to the variable name based on the APP_ENV
 * Add a suffix to variable env based on APP_ENV
 * @param {string} name
 * @returns  {string}
 */

const withEnvSuffix = (name) => (APP_ENV === 'production' ? name : `${name}.${APP_ENV}`);

// Client-side variables schemas
const client = z.object({
	APP_ENV: z.enum(['development', 'staging', 'production']),
	NAME: z.string(),
	API_URL: z.string(),
});

// Build time variables schemas
const buildTime = z.object({
	SLUG: z.string(),
	BUNDLE_ID: z.string(),
	PACKAGE: z.string(),
});

/**
 * @type {Record<keyof z.infer<typeof client> , string | undefined>}
 */
const _clientEnv = {
	APP_ENV,
	NAME: withEnvSuffix(NAME),
	API_URL: process.env.API_URL,
};

/**
 * @type {Record<keyof z.infer<typeof buildTime> , string | undefined>}
 */
const _buildTimeEnv = {
	BUNDLE_ID,
	SLUG,
	PACKAGE,
};

// 4. Merge and validate environment variables
const _env = {
	..._clientEnv,
	..._buildTimeEnv,
};

const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
	console.error(
		'❌ Invalid environment variables:',
		parsed.error.flatten().fieldErrors,

		`\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
		`\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`,
	);
	throw new Error('Invalid environment variables, Check terminal for more details ');
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
	Env,
	ClientEnv,
};
