<script>
    export let address;
</script>
<ul>
    <li>
        {address.lable}
        {#if address.children}
            {#each address.children as address}
                <svelte:self {address} />
            {/each}
        {/if}
    </li>
</ul>