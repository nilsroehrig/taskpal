<script>
	import { SquareCheckBig } from 'lucide-svelte';

	let { children } = $props();
</script>

<div class="wrapper">
	<header>
		<div class="container">
			<nav>
				<ul>
					<li class="brand"><SquareCheckBig size="32" /> <strong>Taskpal</strong></li>
				</ul>
			</nav>
		</div>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<div class="container">&copy; 2024 Taskpal</div>
	</footer>
</div>

<style>
	.wrapper {
		background: url('/hero.webp') no-repeat center;
		background-size: cover;
		height: 100vh;
		display: grid;
		place-items: center;
		grid-template-rows: min-content auto min-content;
	}

	header,
	footer {
		backdrop-filter: blur(10px);
		background: color-mix(in srgb, var(--pico-background-color) 70%, transparent);
		width: 100%;
	}

	footer {
		text-align: center;
		padding: var(--pico-spacing) 0;
	}

	main {
		width: 100%;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: calc(var(--pico-spacing) / 2);
	}
</style>
