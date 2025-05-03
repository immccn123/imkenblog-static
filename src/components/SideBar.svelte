<script lang="ts">
	import { onMount } from "svelte";
	import type { getRecentPosts } from "../utils/posts";

	let hitokoto = "获取中...";
	export let recentPosts: Awaited<ReturnType<typeof getRecentPosts>>;
	let klass: string = "";
	export { klass as class };

	onMount(async () => {
		try {
			const res = await fetch("https://v1.hitokoto.cn?c=d");
			const json = await res.json();
			hitokoto = json.hitokoto;
		} catch (e) {
			hitokoto = "无法加载一言";
		}
	});
</script>

<aside class="{klass} space-y-6" itemscope itemtype="https://schema.org/WPSidebar">
	<div>
		<p class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
			一言
		</p>
		<p id="hitokoto" class="text-sm text-gray-600 dark:text-gray-400">
			{hitokoto}
		</p>
	</div>

	<div>
		<h5 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
			近期文章
		</h5>
		<ul class="space-y-1 text-sm">
			{#each recentPosts as post}
				<li>
					<a class="text-link hover:underline" href={post.url}
						>{post.title}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</aside>
