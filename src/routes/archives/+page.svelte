<script lang="ts">
	export let data;
</script>

{#each data.posts as post}
	<article class="prose">
        <h1>{post.title}</h1>
		{@html post.html}
	</article>
{/each}
