<script lang="ts">
	import MdiTag from '~icons/mdi/tag';
	import MdiCollection from '~icons/mdi/collection';

	export let description = '',
		title = '',
		href = '',
		date: Date | string = 'unknown',
		tags: string[] = [],
		categories: string[] = [];
</script>

<div class="post-link">
	<time datetime={typeof date === 'string' ? date : date.toDateString()}>
		{typeof date === 'string' ? date : date.toLocaleDateString()}
	</time>
	<h2 class="text-link text-3xl link-hover">
		<a {href}>
			<strong>{title}</strong>
		</a>
	</h2>
	<div class="flex flex-row items-center gap-2">
		<MdiTag class="inline-block text-sm" />
		<span class="flex flex-row gap-1">
			{#each tags as tag, i}
				<span>
					<a class="link-hover" href="/tags/{tag}">{tag}</a>
					{#if i !== tags.length - 1}/{/if}
				</span>
			{/each}
		</span>
		<MdiCollection class="inline text-sm" />
		<span class="flex flex-row gap-1">
			{#each categories as category, i}
				<span>
					<a class="link-hover" href="/category/{category}">{category}</a>
					{#if i !== tags.length - 1}/{/if}
				</span>
			{/each}
		</span>
	</div>
	<p>{description}</p>
</div>
