<script lang="ts">
	import type { getTimeline } from "../utils/posts";
	import FormattedDate from "./FormattedDate.svelte";

	export let timeline: Awaited<ReturnType<typeof getTimeline>>;
</script>

<ol class="relative border-s border-gray-200 max-w-[1024px] mx-auto">
	{#each timeline as { year, months }}
		<li class="ml-6 mb-3 ms-4">
			<div
				class="absolute w-5 h-5 bg-gray-200 rounded-full mt-1.5 -start-2.5 border border-white dark:border-gray-900 dark:bg-gray-700"
			></div>
			<div class="text-2xl">{year} 年</div>
		</li>
		{#each months as { month, posts }}
			<ol class="ml-6">
				<div
					class="absolute w-5 h-3 rounded bg-gray-200 mt-2 -start-2.5 border border-white dark:border-gray-900 dark:bg-gray-700"
				></div>

				<div class="text-xl mb-4">{month} 月</div>
				{#each posts as post}
					<li class="mb-3 ms-4">
						<div
							class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"
						></div>
						<span class="mb-1 leading-none">
							<FormattedDate date={post.data.date} />
						</span>
						<a
							class="text-2xl font-semibold text-link link-hover block"
							href={`/archives/${post.id}`}
						>
							{post.data.title}
						</a>
					</li>
				{/each}
			</ol>
		{/each}
	{/each}
</ol>
