<script>
    import { onMount } from 'svelte';
    import Sortable from 'sortablejs';
    
    import CreateCard from '@components/CreateCard.svelte';
    import ListTitle from '@components/ListTitle.svelte';
    import Card from '@components/Card.svelte';
    import { cards} from '@store/list';

    export let sortableLists;
    let sortableCards;
    let cardsEl;

    export let list;

    /**
     * 리스트, 카드 정렬기능 활성화, 비활성화 
     * @param event
     */
    const disableSortable = (event) => {
        const is = event.detail;
        console.log('disableSortable():', is);
        sortableLists.option('disabled', is);
        sortableCards.option('disabled', is);
    };

    onMount(()=>{
        sortableCards = new Sortable(cardsEl, {
            group: "My Cards",
            handle: '.card',
            delay: 50,
            animation: 0,
            forceFallback: true,
            onEnd(event){
                console.log(event);
                cards.reorder({
                    fromListId:event.from.dataset.listId,
                    toListId: event.to.dataset.listId,
                    oldIndex:event.oldIndex,
                    newIndex:event.newIndex,
                });
            }
        })
    });


</script>

<div class="list">
    <div class="list__inner">
        <div class="list__heading">
            <ListTitle {list} on:editMode={disableSortable}/>
            <p>{list.cards.length} cards</p>
        </div>
        <div class="list__cards" 
            bind:this={cardsEl}
            data-list-id={list.id}
        >
            <!-- {list.id} -->
            {#each list.cards as card (card.id)}
                <Card {card} listId={list.id} on:editMode={disableSortable}/>
            {/each}
        </div>
        <CreateCard listId={list.id} on:editMode={disableSortable}/>
    </div>
</div>

<style lang="scss">

    .list{
        display: inline-block;
        font-size: 1rem;
        white-space: normal;
        
        width: 290px;
        height: 100%;
        box-sizing:  border-box;
        margin: 0 4px;
        line-height: 20px;

        // 전역설정
        //&.sortable-ghost{
        :global(&.sortable-ghost){
            position: relative;
            opacity: 0.2;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                border-radius: 4px;
            }
        }
        :global(&.sortable-chosen){
            cursor: move;
        }


        .list__inner{

            display: flex;
            flex-direction: column;
            max-height: 100%;
            padding: 10px 8px;
            box-sizing: border-box;
            background-color: #ebecf0;
            border-radius: 4px;

            .list__heading{
                margin-bottom: 10px;
                p{
                    color: #566c84;
                    padding: 0 8px;
                }
            }

            .list_cards{
                margin-bottom: 10px;
                overflow-x: hidden;
                overflow-y: auto;
            }
        }
    }
</style>
