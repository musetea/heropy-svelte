<script context="module">
    const players = new Set();

    const stopAllPlayer = () => {
        players.forEach(p => p.pause())
    }

</script>

<script>
    import { onMount } from 'svelte';

    export let src;
    let player;

    onMount(() => {
        players.add(player)
    });

</script>

<div>
    <audio bind:this={player}
        src={src}
        controls
    >
        <track kind="captions" /> 
    </audio>
</div>