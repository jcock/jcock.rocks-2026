export type WorkSampleMetadata = {
	title: string;
	publishedAt: string;
	client: string;
	summary: string;
	image?: string;
};

export type WorkSample = {
	slug: string;
	metadata: WorkSampleMetadata;
	content: string;
};
