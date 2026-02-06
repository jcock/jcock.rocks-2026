import type { ComponentPropsWithoutRef, ComponentType } from 'react';

type MdxComponentMap = Record<string, ComponentType<any>>;

type UseMdxComponents = (
	components: MdxComponentMap
) => Record<string, ComponentType<any>>;

export const useMDXComponents: UseMdxComponents = components => {
	return {
		h1: (props: ComponentPropsWithoutRef<'h1'>) => (
			<h1 className="mt-0 mb-6 text-3xl font-bold text-pretty" {...props} />
		),
		h2: (props: ComponentPropsWithoutRef<'h2'>) => (
			<h2
				className="mt-10 mb-4 text-2xl font-semibold text-pretty"
				{...props}
			/>
		),
		h3: (props: ComponentPropsWithoutRef<'h3'>) => (
			<h3 className="mt-8 mb-3 text-xl font-semibold text-pretty" {...props} />
		),
		p: (props: ComponentPropsWithoutRef<'p'>) => (
			<p
				className="my-4 leading-relaxed text-pretty text-foreground/90"
				{...props}
			/>
		),
		ul: (props: ComponentPropsWithoutRef<'ul'>) => (
			<ul className="my-4 list-disc pl-6" {...props} />
		),
		ol: (props: ComponentPropsWithoutRef<'ol'>) => (
			<ol className="my-4 list-decimal pl-6" {...props} />
		),
		li: (props: ComponentPropsWithoutRef<'li'>) => (
			<li className="my-1 leading-relaxed" {...props} />
		),
		blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
			<blockquote
				className="my-6 border-l-4 border-primary/40 pl-4 italic text-foreground/80"
				{...props}
			/>
		),
		a: (props: ComponentPropsWithoutRef<'a'>) => (
			<a
				className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
				{...props}
			/>
		),
		code: (props: ComponentPropsWithoutRef<'code'>) => (
			<code
				className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground"
				{...props}
			/>
		),
		pre: (props: ComponentPropsWithoutRef<'pre'>) => (
			<pre
				className="my-6 overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm"
				{...props}
			/>
		),
		hr: (props: ComponentPropsWithoutRef<'hr'>) => (
			<hr className="my-8 border-border" {...props} />
		),
		...components
	};
};
