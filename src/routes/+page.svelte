<script>
	import { Button, Card } from '$components';

	// handlers
	const clickHandler = async () => {
		const response = await fetch(`/`);
		const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
		while (true) {
			const { done, value } = await reader?.read();
			if (done) {
				chunks = [...chunks, 'done'];
				break;
			}
			chunks = [...chunks, value];
		}
	};

	// props (internal)
	let chunks = [];
</script>

<div class="flex flex-col overflow-auto flex-grow space-y-[1rem]">
	<Button class="self-start" on:click={clickHandler}>Start Stream</Button>
	<Card class="flex-grow overflow-auto">
		<div class="font-semibold">Chunks</div>
		<div class="flex flex-col flex-grow overflow-auto">
			{#each chunks as chunk}
				<div>{chunk}</div>
			{/each}
		</div>
	</Card>
</div>
