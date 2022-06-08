<script>
    import { onMount } from 'svelte';
    import { lists } from '@store/list';
    import List from '@components/List.svelte';
    import CreateList from '@components/CreateList.svelte';
    import Sortable from 'sortablejs';
    
    let sortableLists;
    let listsEl;

    onMount(()=>{
        sortableLists = new Sortable(listsEl, {
            group: 'My Lists',
            handle: '.list',
            delay: 50,
            animation: 0,
            forceFallback: true,
            onEnd(event){
                //console.log(event);
                lists.reorder({
                    oldIndex : event.oldIndex,
                    newIndex: event.newIndex,
                })
            },
        });
    })
    
</script>

<div class="list-container">
    <div
        bind:this={listsEl} 
        class="lists">
        {#each $lists as list }
            <List {list} {sortableLists}/>
        {/each}
    </div>
    <CreateList />
</div>


<style lang="scss">
    .list-container{
        
        width: 100vw;
        height: calc(100vh - 40px);
        box-sizing: border-box;
        padding: 30px;
        overflow-x: auto;
        overflow-y: hidden;

        font-size: 0;
        white-space: nowrap;

        .lists {
            display: inline-block;
            // display: flex;
            height: 100%;
            white-space: nowrap; // 수평으로 리스트를 출력
            font-size: 0;
        }
    }
</style>