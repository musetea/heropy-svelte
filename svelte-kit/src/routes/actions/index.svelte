<script>
    import Zoom from './Zoom.svelte';
    let toggle = true
    let width = 100;
    let height = 100;
    let scale = 0.7;

    function divControlFn(node, options = {}){
        const { width, height, color} = options;

        node.style.width = width;
        node.style.height = height;
        node.style.backgroundColor = color;

        return {

            update(opts){
                console.log('update', opts);
                node.style.width = opts.width;
                node.style.height = opts.height;
            },
            destroy(){
                console.log('destory!!!');
            }
        }

    }
</script>

<button on:click={() => toggle = !toggle}>Toggle</button>
<button
    on:click={() => {
        width += 10;
        height += 10;
    }}
>SizeUp</button>
<button
    on:click={() => {
        width -= 10;
        height -= 10;
    }}
>Size Down
</button>

{#if toggle}
    <div use:divControlFn={{
        width:`${width}px`,
        height:`${height}px`,
        color:'blue'
    }}></div>
{/if}


<Zoom  {scale} />
