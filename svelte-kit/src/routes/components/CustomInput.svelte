<script>
    export let index;
    import TextField from './TextField.svelte';
    let id = '';
    let pw = '';
</script>


<h1>{index}. Component</h1>
<TextField bind:value={id} 
    type="email" 
    placeholder="ID !!!!"
    color="red"
    />

<TextField bind:value={pw} 
    type="password"
    placeholder="PASSWORD !!!" 
    color="blue"
    />