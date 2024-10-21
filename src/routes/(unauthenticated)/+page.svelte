<script>
	import { ArrowRight, SquareCheckBig } from 'lucide-svelte';

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
		<div class="container hero">
			<div class="hero-content">
				<hgroup>
					<h1>Organize Your Tasks with Ease</h1>
					<p>Stay on top of your work and get things done.</p>
				</hgroup>
				<p>
					With Taskpal, you can create, organize, and manage your tasks with ease. Get started today!
				</p>
				<a href="/app/dashboard" role="button">Get Started <ArrowRight /></a>
			</div>
		</div>
	</main>

	<footer>
		<div class="container">&copy; 2024 Taskpal</div>
	</footer>
</div>

<style>
		/* layout styles */
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

		/* page styles */
    .hero {
        display: flex;
        align-items: center;
    }

    .hero h1 {
        font-size: 3em;
    }

    .hero-content {
        max-width: 50%;
        padding: calc(var(--pico-spacing) * 2);
        background: color-mix(in srgb, var(--pico-background-color) 70%, transparent);
        border-radius: var(--pico-border-radius);
        backdrop-filter: blur(10px);
    }
</style>
