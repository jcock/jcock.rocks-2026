'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { Toggle } from '~/components/modules/core/toggle';
import Icon from '~/components/modules/icon';

const ToggleViewMode = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDarkMode = mounted && resolvedTheme === 'dark';
	const ariaLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
	const handlePressedChange = () => {
		if (!mounted) return;
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<Toggle
			aria-label={ariaLabel}
			pressed={isDarkMode}
			onPressedChange={handlePressedChange}
			disabled={!mounted}
			className="pointer-events-auto"
		>
			<Icon icon={isDarkMode ? 'ph:moon-bold' : 'ph:sun-bold'} />
		</Toggle>
	);
};

export default ToggleViewMode;
