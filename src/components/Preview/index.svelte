<script>
	import bwipjs from 'bwip-js';
	import { onMount } from 'svelte';

	// handlers
	const generatePreview = async () => {
		try {
			error = '';
			svg = await bwipjs.toSVG({
				...options,
				alttext: options?.includetext === true ? text : '',
				text
			});
		} catch (e) {
			error = e;
		}
	};

	// props (external)
	export let options = {};
	export let text = '';

	// props (internal)
	let clientHeight;
	let clientWidth;
	let error = '';
	let svg = '';

	$: if (options || text) generatePreview();

	onMount(async () => {
		generatePreview();
	});
</script>

{#if error === ''}
	<div bind:clientHeight bind:clientWidth class="bg-white w-full flex items-center justify-center">
		{@html svg}
	</div>
	<!-- <div>{clientWidth} x {clientHeight}</div> -->
{:else}
	<div class="text-red-500">{error}</div>
{/if}
