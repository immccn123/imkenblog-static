<script lang="ts">
	import MdiTag from "~icons/mdi/tag";
	import MdiCollection from "~icons/mdi/collection";
	import FormattedDate from "./FormattedDate.svelte";
	import { generateDescriptionFromHtml } from "../utils/description";

	export let description: string,
		title: string,
		href: string,
		date: Date,
		tags: string[] = [],
		header: string | undefined = undefined,
		categories: string[] = [],
		html: string = "";
</script>

<div class="post-link mb-5 border-b border-gray-100 p-2">
	{#if header}
		<img class="pb-2" src={header} alt="Header image of {title}" />
	{/if}
	<div>
		<FormattedDate {date} />
		<h2 class="text-link text-3xl link-hover">
			<a {href}>
				<strong>{title}</strong>
			</a>
		</h2>
		<div class="flex flex-row items-center gap-2 mt-3 text-sm">
			<MdiTag class="inline-block" />
			<span class="flex flex-row gap-1">
				{#if tags.length !== 0}
					{#each tags as tag, i}
						<span>
							<a class="link-hover" href="/tags/{tag}">{tag}</a>
							{#if i !== tags.length - 1}/{/if}
						</span>
					{/each}
				{:else}
					无标签
				{/if}
			</span>
			<MdiCollection class="inline" />
			<span class="flex flex-row gap-1">
				{#if categories.length !== 0}
					{#each categories as category, i}
						<span>
							<a class="link-hover" href="/category/{category}"
								>{category}</a
							>
							{#if i !== tags.length - 1}/{/if}
						</span>
					{/each}
				{:else}
					无分类
				{/if}
			</span>
		</div>
		<p class="mt-2 text-content">
			{description ?? generateDescriptionFromHtml(html)}
		</p>
	</div>
</div>
