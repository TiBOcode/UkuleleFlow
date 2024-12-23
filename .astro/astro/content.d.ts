declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"flows": {
"flow1.md": {
	id: "flow1.md";
  slug: "flow1";
  body: string;
  collection: "flows";
  data: InferEntrySchema<"flows">
} & { render(): Render[".md"] };
"less-is-more.md": {
	id: "less-is-more.md";
  slug: "less-is-more";
  body: string;
  collection: "flows";
  data: InferEntrySchema<"flows">
} & { render(): Render[".md"] };
};
"notes": {
"Improvisation-Stories-on-Ukulele.md": {
	id: "Improvisation-Stories-on-Ukulele.md";
  slug: "improvisation-stories-on-ukulele";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"a-flow-is-a-story.md": {
	id: "a-flow-is-a-story.md";
  slug: "a-flow-is-a-story";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"break-conventions.md": {
	id: "break-conventions.md";
  slug: "break-conventions";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"creative-freedom.md": {
	id: "creative-freedom.md";
  slug: "creative-freedom";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"deliberate-practice.md": {
	id: "deliberate-practice.md";
  slug: "deliberate-practice";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"engage-all-the-senses.md": {
	id: "engage-all-the-senses.md";
  slug: "engage-all-the-senses";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"flow-state-in-music.md": {
	id: "flow-state-in-music.md";
  slug: "flow-state-in-music";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"least-effort-possible.md": {
	id: "least-effort-possible.md";
  slug: "least-effort-possible";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"mindful-music-making.md": {
	id: "mindful-music-making.md";
  slug: "mindful-music-making";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"simple-structures.md": {
	id: "simple-structures.md";
  slug: "simple-structures";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"trust-the-process.md": {
	id: "trust-the-process.md";
  slug: "trust-the-process";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"what-is-flow.md": {
	id: "what-is-flow.md";
  slug: "what-is-flow";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"why-i-play-blindfolded.md": {
	id: "why-i-play-blindfolded.md";
  slug: "why-i-play-blindfolded";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"yes-you-can-close-your-eyes-but-blindfolded-is-different.md": {
	id: "yes-you-can-close-your-eyes-but-blindfolded-is-different.md";
  slug: "yes-you-can-close-your-eyes-but-blindfolded-is-different";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
