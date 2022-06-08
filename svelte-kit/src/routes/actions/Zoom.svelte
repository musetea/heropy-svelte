<script>
    export let scale = 1.0;

    function zoomCtrlFn(node, scale=1.2){
        
        node.style.transition = '0.8s';
        
        function zoomIn(){
            console.log('mouse enter', scale)
            node.style.transform = `scale(${scale})`
        }
        function zoomOut(){
            console.log('mouse leave')
            node.style.transform = `scale(1)`
        }

        node.addEventListener('mouseenter', zoomIn);
        node.addEventListener('mouseleave', zoomOut);

        return {
            destroy(){
                node.removeEventListener('mouseenter', zoomIn);
                node.removeEventListener('mouseleave', zoomOut);
            }
        }


    }
</script>

<div use:zoomCtrlFn={scale}></div>

<style>
    div{
        width: 100px;
        height: 100px;
        margin: 1rem;
        background-color: aqua;
    }
</style>