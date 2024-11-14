<script lang="ts">
	import PostLink from '../components/PostLink.svelte';
	import MdiChevronLeft from '~icons/mdi/chevron-left';
	import MdiChevronRight from '~icons/mdi/chevron-right';
	import MdiChevronDoubleLeft from '~icons/mdi/chevron-double-left';
	import MdiChevronDoubleRight from '~icons/mdi/chevron-double-right';

	export let data;

	const getDisplayedPages = () => {
		let start = Math.max(1, data.page - 1);
		let end = Math.min(data.totalPages, data.page + 2);

		if (end - start < 3) {
			if (start === 1) {
				end = Math.min(4, data.totalPages);
			} else if (end === data.totalPages) {
				start = Math.max(1, data.totalPages - 3);
			}
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};
</script>

<div id="post-list">
	{#each data.posts as post}
		<PostLink href="/archives/{post.slug}" {...post} />
	{/each}
</div>

<div class="paginator">
	<div class="flex justify-end space-x-2 mt-4">
		{#if data.page > 1}
			<a class="bg-black text-white w-6 h-6 text-center rounded-full disabled:bg-gray-400" href="/">
				<MdiChevronDoubleLeft class="inline" />
			</a>

			<a
				class="bg-black text-white text-center w-6 h-6 rounded-full disabled:bg-gray-400"
				href={data.page === 2 ? '/' : `/page/${data.page - 1}`}
			>
				<MdiChevronLeft class="inline" />
			</a>
		{/if}

		{#each getDisplayedPages() as p}
			<a
				class="rounded-full text-center w-6 h-6 {data.page !== p
					? 'text-white bg-black'
					: 'text-black'}"
				href={p === 1 ? '/' : `/page/${p}`}
			>
				{p}
			</a>
		{/each}

		{#if data.page < data.totalPages}
			<a
				class="bg-black text-white w-6 h-6 text-center rounded-full disabled:bg-gray-400"
				href={data.page === data.totalPages - 1 ? '/' : `/page/${data.page + 1}`}
			>
				<MdiChevronRight class="inline" />
			</a>

			<a
				class="bg-black text-white w-6 h-6 text-center rounded-full disabled:bg-gray-400"
				href="/page/{data.totalPages}"
			>
				<MdiChevronDoubleRight class="inline" />
			</a>
		{/if}
	</div>
</div>
