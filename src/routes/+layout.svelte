<script>
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/stores';
	import { Header, Nav } from '$components';
	import { init } from '$lib/theme';
	import { theme } from '$stores';
	import '../app.postcss';

	// props (internal)
	const nav = [{ href: '/simple-text', text: 'Simple Text' }];
	init();
</script>

<div
	class="flex flex-col overflow-auto min-h-[100dvh] max-h-[100dvh] pt-[calc(env(safe-area-inset-top))] pr-[calc(env(safe-area-inset-right))] pb-[calc(env(safe-area-inset-bottom))] pl-[calc(env(safe-area-inset-left))]"
>
	<Header>
		<Nav>
			{#each nav as { href, text }}
				<a
					class={twMerge(
						$theme.button,
						'rounded-none',
						$page.url.pathname === href
							? ''
							: 'bg-transparent hover:bg-black/[.1] focus:bg-black/[.1] dark:hover:bg-white/[.1] dark:focus:bg-white/[.1]'
					)}
					{href}>{text}</a
				>
			{/each}
		</Nav>
	</Header>
	<div class="flex flex-col flex-grow overflow-auto p-[1rem]">
		<slot />
	</div>
</div>
