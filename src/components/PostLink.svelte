<script lang="ts">
	import MdiTag from '~icons/mdi/tag';
	import MdiCollection from '~icons/mdi/collection';

	export let description = '',
		title: string,
		href: string,
		date: Date | string = 'unknown',
		tags: string[] = [],
		headerImage: string | undefined = undefined,
		categories: string[] = [];
</script>

<div class="post-link mb-5 {headerImage ? 'lg:grid lg:grid-cols-2 lg:gap-4' : ''}">
	{#if headerImage}
		<img src={headerImage} alt="Header image of {title}" />
	{/if}
	<div>
		<time class="mb-2" datetime={typeof date === 'string' ? date : date.toDateString()}>
			{typeof date === 'string' ? date : date.toLocaleDateString()}
		</time>
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
							<a class="link-hover" href="/category/{category}">{category}</a>
							{#if i !== tags.length - 1}/{/if}
						</span>
					{/each}
				{:else}
					无分类
				{/if}
			</span>
		</div>
		<p class="mt-2">{description}</p>
	</div>
</div>
