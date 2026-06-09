/** @type { import('accept-md-runtime').NextMarkdownConfig } */
module.exports = {
	include: ['/**'],
	exclude: ['/api/**', '/_next/**'],
	cleanSelectors: ['nav', 'footer', '.no-markdown'],
	outputMode: 'markdown',
	cache: true,
	transformers: [],
	baseUrl: process.env.NEXT_PUBLIC_HOST
		? `https://${process.env.NEXT_PUBLIC_HOST}`
		: undefined
};
