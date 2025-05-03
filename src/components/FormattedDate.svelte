<script lang="ts">
	export let date: Date;
</script>

<time datetime={date.toISOString()}>
	{date.toLocaleString("zh-cn", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})}
</time>
