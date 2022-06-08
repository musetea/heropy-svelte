<script>
    import Header from '@components/Header.svelte';
    function Action(node){
        //console.log(node);
        // node.style.backgroundColor = 'darkgray';
        // node.style.backgroundImage = "url('/images/bg.jpg')";
        // node.style.backgroundSize = 'cover';
        load(node);
    }

    
    function load(node){
        
        Object.assign(node.style, {
            backgroundColor: 'darkgray',
            backgroundImage: "url('/images/bg.jpg')",
            backgroundSize:'cover',
        })
    }

</script>

<svelte:head>
    <title>TRELLO CLON</title>
</svelte:head>

<svelte:body use:Action />

<Header />
<slot></slot>


<!-- <style> 
    @charset "UTF-8";
    :global(*){
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style> -->