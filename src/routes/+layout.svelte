<script lang="ts">
	import '../app.css';

	import Header from '../components/Header.svelte';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<div class="text-base w-4/5 mx-auto">
	<Header />
	<div class="md:grid md:grid-cols-3 grid-flow-row gap-2">
		<main class="col-span-2">
			<slot />
		</main>
		
		<Sidebar />
	</div>
</div>

