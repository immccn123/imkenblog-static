<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import UnderDevelopment from '../components/UnderDevelopment.svelte';
</script>

<div class="text-base px-5 mx-auto container max-w-[1200px]">
	<Header />

	<main class="col-span-2">
		<slot />
	</main>

	<Footer />
</div>

<UnderDevelopment />
