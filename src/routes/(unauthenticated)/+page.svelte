<script>
	import { ArrowRight } from 'lucide-svelte';
</script>

<div class="container hero">
	<div class="hero-content">
		<hgroup>
			<h1>Organize Your Tasks with Ease</h1>
			<p>Stay on top of your work and get things done.</p>
		</hgroup>
		<p>
			With Taskpal, you can create, organize, and manage your tasks with ease. Get started today!
		</p>
		<a href="/signup" role="button">Get Started <ArrowRight /></a>
	</div>
</div>

<style>
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
