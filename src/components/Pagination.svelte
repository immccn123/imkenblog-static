<script lang="ts">
	import PostLink from "./PostLink.svelte";
	import MdiChevronLeft from "~icons/mdi/chevron-left";
	import MdiChevronRight from "~icons/mdi/chevron-right";
	import MdiChevronDoubleLeft from "~icons/mdi/chevron-double-left";
	import MdiChevronDoubleRight from "~icons/mdi/chevron-double-right";

	export let posts;
	export let page;
	export let totalPages;
	export let hidePaginator: boolean = false;

	const getDisplayedPages = () => {
		let start = Math.max(1, page - 1);
		let end = Math.min(totalPages, page + 2);

		if (end - start < 3) {
			if (start === 1) {
				end = Math.min(4, totalPages);
			} else if (end === totalPages) {
				start = Math.max(1, totalPages - 3);
			}
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};
</script>

<div id="post-list">
	{#each posts as post}
		<PostLink
			href="/archives/{post.id}"
			{...post.data}
			html={post.rendered.html}
		/>
	{/each}
</div>

{#if !hidePaginator}
	<div class="paginator">
		<div class="flex justify-end space-x-2 mt-4">
			{#if page > 1}
				<a
					class="bg-black text-white w-6 h-6 text-center rounded-full"
					href="/"
				>
					<MdiChevronDoubleLeft class="inline-block" />
				</a>

				<a
					class="bg-black text-white text-center w-6 h-6 rounded-full"
					href={page === 2 ? "/" : `/page/${page - 1}`}
				>
					<MdiChevronLeft class="inline-block" />
				</a>
			{/if}

			{#each getDisplayedPages() as p}
				<a
					class="rounded-full text-center w-6 h-6 {page !== p
						? 'text-white bg-black'
						: 'text-black'}"
					href={p === 1 ? "/" : `/page/${p}`}
				>
					{p}
				</a>
			{/each}

			{#if page < totalPages}
				<a
					class="bg-black text-white w-6 h-6 text-center rounded-full"
					href={`/page/${page + 1}`}
				>
					<MdiChevronRight class="inline-block" />
				</a>

				<a
					class="bg-black text-white w-6 h-6 text-center rounded-full"
					href={`/page/${totalPages}`}
				>
					<MdiChevronDoubleRight class="inline-block" />
				</a>
			{/if}
		</div>
	</div>
{:else}
	没有更多内容了哦
{/if}
