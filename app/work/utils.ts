import fs from 'node:fs';
import path from 'node:path';

export type WorkSampleMetadata = {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
};

export type WorkSample = {
	slug: string;
	metadata: WorkSampleMetadata;
	content: string;
};

const WORK_SAMPLES_DIR = path.join(process.cwd(), 'app', 'work', 'samples');

const parseFrontmatter = (fileContent: string) => {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);

	if (!match) {
		return {
			metadata: {} as WorkSampleMetadata,
			content: fileContent.trim()
		};
	}

	const frontmatterBlock = match[1] || '';
	const content = fileContent.replace(frontmatterRegex, '').trim();
	const frontmatterLines = frontmatterBlock.trim().split('\n').filter(Boolean);
	const metadata: Partial<WorkSampleMetadata> = {};

	for (const line of frontmatterLines) {
		const [rawKey, ...rawValue] = line.split(':');
		if (!rawKey) {
			continue;
		}
		const key = rawKey.trim() as keyof WorkSampleMetadata;
		let value = rawValue.join(':').trim();
		value = value.replace(/^['"](.*)['"]$/, '$1');
		metadata[key] = value;
	}

	return {
		metadata: metadata as WorkSampleMetadata,
		content
	};
};

const getMDXFiles = (directory: string) => {
	if (!fs.existsSync(directory)) {
		return [];
	}

	return fs
		.readdirSync(directory)
		.filter(file => path.extname(file).toLowerCase() === '.mdx');
};

const readMDXFile = (filePath: string) => {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
};

const normalizeMetadata = (
	metadata: Partial<WorkSampleMetadata>,
	slug: string
): WorkSampleMetadata => {
	return {
		title: metadata.title || slug,
		publishedAt: metadata.publishedAt || new Date(0).toISOString(),
		summary: metadata.summary || '',
		image: metadata.image
	};
};

export const getWorkSamples = () => {
	const mdxFiles = getMDXFiles(WORK_SAMPLES_DIR);

	return mdxFiles
		.map(file => {
			const filePath = path.join(WORK_SAMPLES_DIR, file);
			const { metadata, content } = readMDXFile(filePath);
			const slug = path.basename(file, path.extname(file));

			return {
				slug,
				metadata: normalizeMetadata(metadata, slug),
				content
			};
		})
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
		);
};

export const getWorkSampleBySlug = (slug: string) => {
	return getWorkSamples().find(sample => sample.slug === slug) || null;
};

export const getWorkSampleSlugs = () => {
	return getWorkSamples().map(sample => sample.slug);
};

export const formatDate = (date: string, includeRelative = false) => {
	const currentDate = new Date();
	let normalizedDate = date;

	if (!normalizedDate.includes('T')) {
		normalizedDate = `${normalizedDate}T00:00:00`;
	}

	const targetDate = new Date(normalizedDate);
	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let relativeDate = 'Today';

	if (yearsAgo > 0) {
		relativeDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		relativeDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		relativeDate = `${daysAgo}d ago`;
	}

	const fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${relativeDate})`;
};
