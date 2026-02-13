import type { MDXComponents } from 'mdx/types';
import { getMDXComponents } from '~/components/modules/mdx';

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
	return getMDXComponents(components);
};
