<script lang="ts">
	import { onMount } from 'svelte';

	let isOpen = false;
	onMount(() => {
		if (!sessionStorage.getItem('::underDevOpen')) {
			isOpen = true;
		}
	});
</script>

{#if isOpen}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
		<div class="bg-white p-6 w-80">
			<h2 class="text-xl font-bold text-center text-gray-800 mb-4">网站正在开发中</h2>
			<p class="text-center text-gray-600 mb-6">
				目前此网站正在开发阶段，部分功能尚未完善。本站理应是 <a
					class="text-link"
					href="https://blog.imken.moe"
					target="_blank">Imken 发电厂</a
				>的静态替代，但是还没写完（
			</p>
			<p class="text-center text-gray-500 text-sm mb-6">
				在预览版中，某些功能可能不可用。敬请谅解。
			</p>
			<div class="mt-4 flex justify-center space-x-4">
				<button
					on:click={() => ((isOpen = false), sessionStorage.setItem('::underDevOpen', '1'))}
					class="bg-impink text-white px-6 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
				>
					关闭（本次会话中不再显示）
				</button>
			</div>
		</div>
	</div>
{/if}
