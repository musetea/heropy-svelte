<script>
    import AudioPlayer from '../player/AudioPlayer.svelte';
    import Button from '../slot/Button.svelte';
    import Address from './Address.svelte';

    export let value = "";
    export let color;
    // $$props
    // $$restProps
</script>

<div class="my-custom-ipnut">
    <input bind:value 
        style="color: {color}"
        {...$$restProps}  >
</div>

<style>
    .my-custom-ipnut input{
        padding: 10px 20px;
        border-radius: 100px;
    }
</style>