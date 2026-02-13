import { createRequire } from 'node:module';
import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const require = createRequire(import.meta.url);
const legacyConfig = require('./.eslintrc.js');
const prettierPlugin = require('eslint-plugin-prettier');
const customRules = {
	...(legacyConfig.rules || {}),
	// Preserve legacy lint behavior from `.eslintrc.js`.
	'react-hooks/set-state-in-effect': 'off',
	'react-hooks/immutability': 'off'
};

const eslintConfig = [
	...nextConfig,
	prettierConfig,
	{
		name: 'project/custom',
		ignores: legacyConfig.ignorePatterns || [],
		settings: legacyConfig.settings || {},
		plugins: {
			prettier: prettierPlugin
		},
		rules: customRules
	}
];

export default eslintConfig;
