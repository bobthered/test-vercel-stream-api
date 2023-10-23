<script>
	import { saveAs } from 'file-saver';
	import { DateTime } from 'luxon';
	import { Button, Card } from '$components';

	// handlers
	const clickHandler = async () => {
		blob = null;
		chunks = [];
		status = null;
		submitted = true;
		const response = await fetch(window.location.href);
		const reader = response.body?.getReader();
		const textDecoder = new TextDecoder();
		while (true) {
			const { done, value } = await reader?.read();
			if (done) break;
			try {
				const textValue = textDecoder.decode(value);
				const obj = JSON.parse(textValue);
				status = obj;
			} catch (error) {
				chunks = [...chunks, value];
			}
		}
		blob = new Blob(chunks);
		const date = DateTime.now().toFormat('yyyyMMddhhmmss');
		saveAs(blob, `${date}.zip`);
		submitted = false;
	};

	// props (internal)
	/** @type {Blob | null}*/
	let blob = null;
	/** @type {Uint8Array | BlobPart[]}*/
	let chunks = [];
	/** @type {null | {completed:number, total:number}}*/
	let status = null;
	let submitted = false;
</script>

<Button class="self-start" disabled={submitted ? 'disabled' : undefined} on:click={clickHandler}
	>Start Download</Button
>
<Card class="flex-grow overflow-auto">
	<div class="flex flex-col space-y-[1rem] flex-grow overflow-auto">
		{#if blob !== null}
			<div>File downloaded successfully</div>
		{:else if chunks.length > 0}
			<div>Creating ZIP file...</div>
		{:else if status !== null}
			<div>Created PDF {status?.completed} of {status?.total}</div>
			<div class="h-[.25rem] w-full bg-black/[.1] dark:bg-white/[.1] rounded-full overflow-hidden">
				<div
					class="h-full bg-primary-500 transition duration-200"
					style="width:{(status.completed * 100) / status.total}%;"
				/>
			</div>
		{/if}
	</div>
</Card>
