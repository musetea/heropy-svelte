<script>
    console.log($$slots);
</script>

<div class="card">
    <slot name="name"><!-- optional fallback --></slot>
    {#if $$slots.age}
        <hr />
        <slot name="age"><!-- optional fallback --></slot>
    {/if}
    {#if $$slots.email}
        <hr />
        <slot name="email"><!-- optional fallback --></slot>
    {/if}
</div>

<style>
    .card {
        width: 300px;
        margin: 20px 10px;
        padding: 0 10px 20px;
        border: 4px solid lightgray;
        border-radius: 5px;
        box-shadow: 5px 5px rgba(0,0,0,0.03);
        position: relative;
    }
    .card::after{
        content: "";
        position: absolute;
        top: 6px;
        right: 6px;
        background-color: yellowgreen;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
</style>