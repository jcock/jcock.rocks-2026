export type WorkSampleMetadata = {
	title: string;
	publishedAt: string;
	client: string;
	summary: string;
	image?: string;
	roles: string[];
	color: string;
};

export type WorkSample = {
	slug: string;
	metadata: WorkSampleMetadata;
	content: string;
};
