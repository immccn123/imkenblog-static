<script lang="ts">
	import MdiRssBox from '~icons/mdi/rss-box';
	import MdiMenu from '~icons/mdi/menu';

	const navLinks = [
		{ text: 'Archives', href: '/archives' },
		{ text: 'Changelog', href: '/changelog' },
		{ text: 'Highlights', href: '/special' },
		{ text: 'Travelling', href: 'https://www.travellings.cn/go.html', target: '_blank' }
	];

	let showNav = false;
</script>

<div id="header" class="my-5">
	<header>
		<div id="site-meta">
			<div id="site-logo" class="text-4xl text-link">
				<a href="/">
					<span>Imken 发电厂</span>
				</a>
			</div>
			<div id="site-desc" class="mt-2 my-6">你好呀！</div>
		</div>
		<button
			class="px-2 py-1 bg-gray-200 rounded text-lg md:hidden"
			on:click={() => (showNav = !showNav)}
		>
			<MdiMenu />
		</button>
		<div
			class="max-md:fixed max-md:bg-white max-md:border max-md:p-3 max-md:rounded z-50"
			class:max-md:hidden={!showNav}
		>
			<ul id="main-nav" class="flex flex-col md:flex-row md:gap-5 gap-2">
				{#each navLinks as link}
					<li>
						<a class="text-link px-2 py-1" href={link.href} target={link.target}>{link.text}</a>
					</li>
				{/each}
				<li class="grow max-md:hidden"></li>
				<li>
					<a class="text-link px-2 py-1" href="/feed" target="_blank">
						<MdiRssBox class="inline" /> RSS
					</a>
				</li>
			</ul>
		</div>
		<hr class="gray-200 mt-2" />
	</header>
</div>
