import List from '~/components/modules/text/list';
import Link from '~/components/modules/navigation/transition-link';
import { formatDate } from '~/app/work/utils';
import type { WorkSample } from '~/app/work/types';

interface WorkSamplesListProps {
	className?: string;
	samples: ReadonlyArray<WorkSample>;
}

const WorkSamplesList = ({ className, samples }: WorkSamplesListProps) => {
	return (
		<List className={className ?? ''}>
			{[...samples]
				.sort((a, b) => {
					if (
						new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
					) {
						return -1;
					}
					return 1;
				})
				.map(sample => (
					<List.Item key={sample.slug} showIcon={false}>
						<Link
							href={`/work/${sample.slug}`}
							className="group block space-y-0.5"
						>
							<span className="block text-lg font-sans font-semibold transition group-hover:text-primary/70">
								{sample.metadata.title}
							</span>
							<span className="block text-2xs text-muted-foreground tabular-nums">
								{formatDate(sample.metadata.publishedAt, false)}
								{' / '}
								{sample.metadata.client}
							</span>
						</Link>
					</List.Item>
				))}
		</List>
	);
};

export default WorkSamplesList;
