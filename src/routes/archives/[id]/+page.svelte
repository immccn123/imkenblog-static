<script lang="ts">
	import MdiTag from '~icons/mdi/tag';
	import MdiCollection from '~icons/mdi/collection';
	import 'katex/dist/katex.css';

	export let data;
</script>

<article class="prose mx-auto">
	{#if data.headerImage}
		<img src={data.headerImage} alt="Header image of {data.title}" />
	{/if}
	<h1>{data.title}</h1>
	<div class="flex flex-row items-center gap-2">
		<MdiTag class="inline-block text-sm" />
		<span class="flex flex-row gap-1">
			{#if data.tags.length === 0}
				无标签
			{:else}
				{#each data.tags as tag, i}
					<span>
						<a class="link-hover" href="/tags/{tag}">{tag}</a>
						{#if i !== data.tags.length - 1}/{/if}
					</span>
				{/each}
			{/if}
		</span>
		<MdiCollection class="inline text-sm" />
		<span class="flex flex-row gap-1">
			{#if data.categories.length === 0}
				无分类
			{:else}
				{#each data.categories as category, i}
					<span>
						<a class="link-hover" href="/category/{category}">{category}</a>
						{#if i !== data.tags.length - 1}/{/if}
					</span>
				{/each}
			{/if}
		</span>
	</div>

	<div id="content">
		{@html data.html}
	</div>
</article>

<blockquote class="text-black my-3 border-l-4 pl-5">
	Copyright (C) Imken Luo<br />
	This post is licensed under
	<a class="text-link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed"
		>CC-BY-NC-SA 4.0</a
	>.
</blockquote>

<style>
	.prose {
		line-height: unset;
		font-size: inherit;
		max-width: 1024px;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}
</style>
