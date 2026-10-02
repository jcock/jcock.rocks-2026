'use client';

import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import { buttonVariants } from './button-variants';

const Button = React.forwardRef<
	HTMLButtonElement,
	ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
>(
	(
		{
			className,
			variant = 'default',
			size = 'default',
			hasUnderline,
			...props
		},
		ref
	) => {
		return (
			<ButtonPrimitive
				ref={ref}
				data-slot="button"
				className={cn(
					buttonVariants({ variant, size, hasUnderline, className })
				)}
				{...props}
			/>
		);
	}
);

Button.displayName = 'Button';

export { Button };
export { buttonVariants, buttonVariantsCn } from './button-variants';
