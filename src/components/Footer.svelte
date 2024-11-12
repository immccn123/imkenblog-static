<script lang="ts">
	import MdiArrowUp from '~icons/mdi/arrow-up';
</script>

<footer class="border-t text-base mt-5 py-5">
	<div>
		<a
			class="rounded-full h-8 w-8 block bg-black text-white"
			href="#header"
			on:click|preventDefault={() => window.scrollTo({ top: 0, behavior: 'instant' })}
		>
			<MdiArrowUp class="w-full h-full" />
		</a>
	</div>

	<div class="p-5 mt-5">
		<div class="one">
			<a class="text-link" href="https://icp.gov.moe/?keyword=20221474" target="_blank">
				萌 ICP 备 20221474 号
			</a>
			|
			<a class="text-link" href="https://www.travellings.cn/go.html" target="_blank">开往</a>
			|
			<a
				style="color:#e77c8e;"
				href="https://travel.moe/go.html?travel=on"
				title="异次元之旅-跃迁-我们一起去萌站成员的星球旅行吧！"
				target="_blank"
			>
				<img
					style="width:24px;height:24px"
					height="64"
					width="64"
					decoding="async"
					class="inline"
					alt=""
					src="https://travel.moe/images/icon/icon64pink.png"
				/>
				异次元之旅
			</a> <br />
			友情链接（排名不分先后）：
			<div id="friend-link" style="max-width: 450px">
				{#await import(/* @vite-ignore */ String.raw`https://data.imken.moe/links.js`)}
					正在加载……
				{:then links}
					{@html links.default
						.map(
							(e: any) =>
								`<span style="display: inline-block"><a class="text-link" href="${e.url}" target="_blank">${e.name}</a> |</span>`
						)
						.join(' ') +
						`<br><a class="text-link" href="https://shared.imken.moe/links/exchange" target="_blank">添加你的站点！</a>`}
				{/await}
			</div>
		</div>

		<div class="two">
			<br />All posts on this site are licensed under
			<a
				class="text-link"
				href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed"
				target="_blank noreferer"
			>
				CC-BY-NC-SA 4.0
			</a>.
			<br />Copyright (C) 2020 - 2024 Imken Luo
		</div>
	</div>
</footer>
