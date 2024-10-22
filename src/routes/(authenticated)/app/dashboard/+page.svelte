<script lang="ts">
	import Board from '$lib/components/task-board/Board.svelte';

	let { data } = $props();
	let tasks = $state([...data.board!.tasks]);
</script>

<Board {tasks} title={data.board!.title} />
