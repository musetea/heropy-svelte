<script>
    import { afterUpdate} from 'svelte';
    export let fruit;
    export let age = 46;

    let callCount = 0;

    afterUpdate(()=>{
        callCount += 1;
    })

</script>

<svelte:options immutable accessors />


<div>({callCount}). {fruit}</div>