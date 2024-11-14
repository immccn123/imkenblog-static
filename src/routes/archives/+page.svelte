<script lang="ts">
	export let data;

	let posts = data.sortedByDate;
</script>

<ol class="relative border-s border-gray-200 max-w-[1024px] mx-auto">
	{#each posts as { year, months }}
		<li class="mb-3 ms-4">
			<div
				class="absolute w-5 h-5 bg-gray-200 rounded-full mt-2.5 -start-2.5 border border-white dark:border-gray-900 dark:bg-gray-700"
			></div>
			<div class="text-2xl">{year} 年</div>
		</li>
		{#each months as { posts }}
			{#each posts as post}
				<li class="mb-3 ms-4">
					<div
						class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"
					></div>
					<time class="mb-1 leading-none">
						{post.date.toLocaleDateString()}
					</time>
					<a class="text-2xl font-semibold text-link link-hover block" href="/archives/{post.slug}">
						{post.title}
					</a>
				</li>
			{/each}
		{/each}
	{/each}
</ol>
