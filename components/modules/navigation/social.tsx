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
		<nav className="flex items-center justify-around md:justify-between gap-3">
			{socials.map(social => (
				<Button
					key={social.platform}
					variant="fade"
					size="icon"
					nativeButton={false}
					title={social.label}
					render={
						<a href={social.url} target="_blank" rel="noreferrer noopener">
							<span className="sr-only">{social.label}</span>
							<Icon icon={social.icon} size="size-5" />
						</a>
					}
				/>
			))}
			<Button
				variant="fade"
				size="icon"
				nativeButton={false}
				title={site.contact.email.label}
				render={
					<a
						href={site.contact.email.url}
						target="_blank"
						rel="noreferrer noopener"
					>
						<span className="sr-only">{site.contact.email.label}</span>
						<Icon icon={site.contact.email.icon} size="size-5" />
					</a>
				}
			/>
		</nav>
	);
};

export default NavSocial;
