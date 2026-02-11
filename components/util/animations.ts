import type { Variants } from 'motion/react';

export const fadeItemVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			damping: 30,
			stiffness: 80
		}
	}
};
