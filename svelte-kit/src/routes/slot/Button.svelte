<script>
    export let block;
    export let color;
</script>


<button 
    class:block={block}
    style="background-color: {color}; color:{color ? '#FFF' : '#000'};"
    >
    <slot>
        Button!!!
    </slot>
</button>

<style>
    button{
        margin: 10px;
        padding: 10px 20px;
        background: lightblue;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: .2s;
    }
    button:hover {
        text-decoration: underline;
    }
    button:active {
        transform: scale(1.05);
    }
    button.block{
        width: 100%;
        display: block;
    }
</style>