<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type StatusColumnProps = HTMLAttributes<HTMLElement> & {
		children?: Snippet;
		status: string;
	};

	let { children, status, ...restProps }: StatusColumnProps = $props();
</script>

<article class="status-column" data-status={status} {...restProps}>
	<header>
		<strong role="heading" aria-level="2">To Do</strong>
	</header>

	{@render children?.()}
</article>

<style>
	.status-column {
		background-color: var(--pico-background-color);

		> :last-child {
			margin-bottom: 0;
		}
	}
</style>
