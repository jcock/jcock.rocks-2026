import { Button } from '~/components/modules/core/button';
import Icon from '~/components/modules/icon';

import site from '~/data/site.json';

type SocialLink = {
	platform: string;
	url: string;
	label: string;
	icon: string;
};

const NavSocial = () => {
	const socials = site.social as SocialLink[];

	return (
		<nav className="flex items-center justify-between md:justify-self-center gap-3 md:w-2/3 py-[2.5vh] px-4 border-t border-border">
			{socials.map(social => (
				<Button
					key={social.platform}
					variant="ghost"
					size="icon"
					nativeButton={false}
					render={
						<a href={social.url} target="_blank" rel="noreferrer noopener">
							<span className="sr-only">{social.label}</span>
							<Icon icon={social.icon} size="size-5" />
						</a>
					}
				/>
			))}
		</nav>
	);
};

export default NavSocial;
