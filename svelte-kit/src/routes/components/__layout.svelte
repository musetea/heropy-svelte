<script>
    import CustomInput from './CustomInput.svelte';
    import Self from './Self.svelte';
    import WindowKey from './WindowKey.svelte';
    import Immutable from './Immutable.svelte';
    // 
    let components = [
        { name: "Inuutable", comp: Immutable},
        { name: 'Window', comp: WindowKey},
        { name: 'Self', comp: Self},
        { name: 'Component', comp: CustomInput},

    ];
    let select = components[0].comp;
    let index = 1
</script>
{#each components as {name, comp}, i (name) }
    <label>
        <input type="radio" 
            value={comp} 
            bind:group={select} 
            on:change={() => {  return index = i + 1}}
            />
        {name}
    </label>
{/each}

<hr />

<svelte:component this={select} {index}/>
<!-- 
{#if select === "Self"}
    <slot name="Self">
        <h1>svelte:self</h1>
        <Self />
    </slot>
{:else if select === "Component"}
    <CustomInput />
{/if} -->




