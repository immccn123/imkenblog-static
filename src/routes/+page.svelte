<script lang="ts">
	import PostLink from '../components/PostLink.svelte';

	export let data;
</script>

<div id="post-list">
	{#each data.posts as post}
		<PostLink href="/archives/{post.slug}" {...post} />
	{/each}
</div>

<div class="paginator"></div>
