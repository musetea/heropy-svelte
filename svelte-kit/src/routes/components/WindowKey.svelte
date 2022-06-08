<script>
    let key = '';
    let innerWidth;
    let innerHeight;
    let outerWidth;
    let outerHeight;
    let online;
    let scrollX;
    let scrollY;

    // <!--<svelte:body> on:mousemove={e => console.log(e.clientX, e.clientY)} />-->  
    // window.addEventListener('keydown', e => {
    //     key = e.key;
    // });
</script>

<svelte:window  on:keydown={e => key = e.key} 
    bind:innerWidth
    bind:innerHeight
    bind:outerWidth
    bind:outerHeight
    bind:online
    bind:scrollX
    bind:scrollY
/>

<h1>{key}</h1>
<h2>읽기전용</h2>
<h3>뷰포트</h3>
<p>innerWidth: {innerWidth}</p>
<p>innerHeight: {innerHeight}</p>
<h3>원도우전체크기</h3>
<p>outerWidth: {outerWidth}</p>
<p>outerHeight: {outerHeight}</p>
<p>online: {online}</p>
<h2>쓰기가능</h2>
<input type="number" bind:value="{scrollX}">
<input type="number" bind:value="{scrollY}">

<svelte:body  
   
    on:mousedown={e => console.log(e.clientX, e.clientY)} />

<div class="canvas"></div>


<style>
    .canvas {
        height: 2000px;
    }
</style>