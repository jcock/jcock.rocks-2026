import fs from 'node:fs';
import path from 'node:path';
import type { WorkSample, WorkSampleMetadata } from '~/app/work/types';

const WORK_SAMPLES_DIR = path.join(process.cwd(), 'app', 'work', 'samples');

const parseArrayValue = (value: string) => {
	const normalizedValue = value.trim();
	if (!normalizedValue) {
		return [];
	}

	const quotedValueMatches = Array.from(
		normalizedValue.matchAll(/['"]([^'"]+)['"]/g)
	)
		.map(match => match[1]?.trim() ?? '')
		.filter(Boolean);

	if (quotedValueMatches.length > 0) {
		return quotedValueMatches;
	}

	return normalizedValue
		.replace(/^\[/, '')
		.replace(/\]$/, '')
		.split(',')
		.map(entry => entry.trim().replace(/^['"](.*)['"]$/, '$1'))
		.filter(Boolean);
};

const isStringMetadataKey = (
	key: string
): key is Exclude<keyof WorkSampleMetadata, 'roles'> => {
	return (
		key === 'title' ||
		key === 'publishedAt' ||
		key === 'client' ||
		key === 'summary' ||
		key === 'siteUrl' ||
		key === 'featuredImage' ||
		key === 'color'
	);
};

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

	for (let lineIndex = 0; lineIndex < frontmatterLines.length; lineIndex += 1) {
		const line = frontmatterLines[lineIndex];
		if (!line) {
			continue;
		}

		const separatorIndex = line.indexOf(':');
		if (separatorIndex === -1) {
			continue;
		}
		const key = line.slice(0, separatorIndex).trim();
		let value = line.slice(separatorIndex + 1).trim();

		if (key === 'roles') {
			if (!value && frontmatterLines[lineIndex + 1]?.trim().startsWith('-')) {
				const blockArrayValues: string[] = [];

				while (lineIndex + 1 < frontmatterLines.length) {
					const nextLine = frontmatterLines[lineIndex + 1]?.trim() || '';
					if (!nextLine.startsWith('-')) {
						break;
					}

					lineIndex += 1;
					const listEntry = nextLine
						.replace(/^-\s*/, '')
						.trim()
						.replace(/^['"](.*)['"]$/, '$1');

					if (listEntry) {
						blockArrayValues.push(listEntry);
					}
				}

				metadata[key] = blockArrayValues;
				continue;
			}

			if (!value && frontmatterLines[lineIndex + 1]?.trim().startsWith('[')) {
				lineIndex += 1;
				value = frontmatterLines[lineIndex]?.trim() || '';
			}

			if (value.startsWith('[') && !value.includes(']')) {
				while (lineIndex + 1 < frontmatterLines.length) {
					lineIndex += 1;
					const arrayLine = frontmatterLines[lineIndex]?.trim() || '';
					value = `${value} ${arrayLine}`.trim();
					if (arrayLine.includes(']')) {
						break;
					}
				}
			}

			metadata[key] = parseArrayValue(value);
			continue;
		}

		value = value.replace(/^['"](.*)['"]$/, '$1');

		if (isStringMetadataKey(key)) {
			metadata[key] = value;
		}
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
		client: metadata.client || '',
		summary: metadata.summary || '',
		siteUrl: metadata.siteUrl || '',
		image: metadata.image,
		roles: metadata.roles || [],
		color: metadata.color || '#2095f0',
		featuredImage: metadata.featuredImage || ''
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
