<script>
	import { init } from '$lib/theme';
	import '../app.postcss';

	init();
</script>

<div
	class="flex flex-col overflow-auto min-h-[100dvh] max-h-[100dvh] pt-[calc(1rem_+_env(safe-area-inset-top))] pr-[calc(1rem_+_env(safe-area-inset-right))] pb-[calc(1rem_+_env(safe-area-inset-bottom))] pl-[calc(1rem_+_env(safe-area-inset-left))]"
>
	<slot />
</div>
