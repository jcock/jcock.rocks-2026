'use client';

import type { ComponentProps } from 'react';
import { Link } from 'next-transition-router';

type TransitionLinkProps = ComponentProps<typeof Link>;

const TransitionLink = (props: TransitionLinkProps) => {
	return <Link {...props} />;
};

export default TransitionLink;
