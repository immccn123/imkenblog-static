<script>
	import { page } from '$app/stores';
</script>

{#if $page.error?.message === 'Not Found'}
	<h1 class="text-3xl font-semibold">404 Not Found</h1>
	<p>找不到所请求的页面，请检查访问的 URL 是否正确。</p>
{:else}
	<h1 class="text-3xl font-semibold">Internal Error</h1>
{/if}
