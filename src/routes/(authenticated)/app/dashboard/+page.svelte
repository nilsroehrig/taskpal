<script>
	import { Circle, CircleCheck, LoaderCircle } from 'lucide-svelte';
</script>

<article class="board">
	<header class="board-header">
		<h1>Task Board</h1>
		<form role="search">
			<input name="filter" type="search" placeholder="Filter" />
		</form>
	</header>
	<div class="grid">
		<article class="status-column">
			<header>
				<strong role="heading" aria-level="2">To Do</strong>
			</header>
			<article class="card">
				<header><strong role="heading" aria-level="3">Wash Dishes</strong> <Circle /></header>
				<p>The sink is full of last week's dishes. They need to be cleaned up.</p>
				<ul class="inline-list">
					<li class="badge badge-small pico-background-sand">Chores</li>
				</ul>
			</article>
			<article class="card">
				<header><strong role="heading" aria-level="3">Start New Project</strong> <Circle /></header>
				<p>Need to start a new project for work.</p>
				<ul class="inline-list">
					<li class="badge badge-small pico-background-sand">Work</li>
					<li class="badge badge-small pico-background-sand">Project</li>
				</ul>
			</article>
		</article>
		<article class="status-column">
			<header>
				<strong role="heading" aria-level="2">In Progress</strong>
			</header>
			<article class="card">
				<header>
					<strong role="heading" aria-level="3">Write Blog Post</strong>
					<LoaderCircle class="pico-color-blue-500" />
				</header>
				<p>Need to write a blog post about the new project.</p>
				<ul class="inline-list">
					<li class="badge badge-small pico-background-sand">Writing</li>
				</ul>
			</article>
			<article class="card">
				<header>
					<strong role="heading" aria-level="3">Exercise</strong>
					<LoaderCircle class="pico-color-blue-500" />
				</header>
				<p>Need to exercise for the day.</p>
				<ul class="inline-list">
					<li class="badge badge-small pico-background-sand">Health</li>
				</ul>
			</article>
			<article class="card">
				<header>
					<strong role="heading" aria-level="3">Read Book</strong>
					<LoaderCircle class="pico-color-blue-500" />
				</header>
				<p>Need to read a book for the day.</p>
				<ul class="inline-list">
					<li class="badge badge-small pico-background-sand">Reading</li>
				</ul>
			</article>
		</article>
		<article class="status-column">
			<header>
				<strong role="heading" aria-level="2">Done</strong>
			</header>
			<article class="card">
				<header>
					<strong role="heading" aria-level="3">Buy Groceries</strong>
					<CircleCheck class="pico-color-green-500" />
				</header>
				<p>
					Need to buy groceries for the week. This includes a lot, like tomatoes, gherkins, cheese,
					sausage, bread, coffee beans, frozen pizza and breakfast cereals. Remember to buy organic
					and local goods if available.
				</p>
				<ul class="inline-list">
					<li class="badge badge-small pico-background-sand">Shopping</li>
				</ul>
			</article>
			<article class="card">
				<header>
					<strong role="heading" aria-level="3">Clean Room</strong>
					<CircleCheck class="pico-color-green-500" />
				</header>
				<p>Need to clean the room.</p>
				<ul class="inline-list">
					<li class="badge badge-small pico-background-sand">Chores</li>
				</ul>
			</article>
		</article>
	</div>
</article>

<style>
    .board {
        margin: calc(var(--pico-spacing) * 3) auto;
        max-width: calc(100% - var(--pico-spacing) * 6);

        header {
            display: grid;
            grid-template-columns: 2fr 1fr;
            align-items: center;

            > * {
                margin-bottom: 0;
            }
        }

        .grid > * {
            margin-bottom: 0;
        }
    }

    .inline-list {
        display: flex;
        flex-wrap: wrap;
        gap: calc(var(--pico-spacing) / 2);
        padding: 0;

        li {
            list-style: none;
            margin: 0;
        }
    }

    .badge {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-weight: 500;
    }

    .badge-small {
        padding: 0.125rem 0.25rem;
        font-size: smaller;
    }

    .card {
        font-size: smaller;

        > :last-child {
            margin-bottom: 0;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        p {
            height: 2lh;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }

    .status-column {
        background-color: var(--pico-background-color);

        > :last-child {
            margin-bottom: 0;
        }
    }
</style>