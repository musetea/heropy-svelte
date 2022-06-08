<script>
    import { tick, createEventDispatcher } from 'svelte';
    import { ActionAutoFocus } from '@actions/autoFocus';
    import { cards} from '@store/list';

    export let listId;
    export let card;
    

    let isEditMode = false;
    let title = '';
    let textAreaEl;

    const dispatch = createEventDispatcher();

    /**
     * ON EDIT MODE
     */
    const onEditMode = async() => {
        isEditMode = true;
        title = card.title;
        dispatch('editMode', isEditMode);
        await tick();
        textAreaEl && textAreaEl.focus();
    }
    /**
     * OFF EDIT MODE
     */
    const offEditMode = () => {
        isEditMode = false;
        dispatch('editMode', isEditMode);
    }
    /**
     * SAVE CARD
     */
    const saveCard = () => {
        if(!title.trim()) return;

        cards.edit({
            listId,
            cardId: card.id,
            title,
        })
        offEditMode();
    }
    /**
     * REMOVE CARD
     */
    const removeCard = () => {
        cards.remove({
            listId,
            cardId: card.id,
        });

        offEditMode();
    }
    
    /**
     * 
     * @param event
     */
    const onTextAreaKeyDown = (event) => {
        event.key === "Enter" && saveCard();
        event.key === "Escape" && offEditMode();
        event.key === "Esc" && offEditMode();
    };


</script>

<div class="card">
    {#if isEditMode}
        <div class="edit-mode" use:ActionAutoFocus={offEditMode}>
            <textarea bind:value={title}
                bind:this={textAreaEl}
                placeholder="Enter a title for card..."
                on:keydown={onTextAreaKeyDown}
            ></textarea>
            <div class="actions">
                <div class="btn success" on:click={saveCard}>Save</div>
                <div class="btn" on:click={offEditMode}>Cancel</div>
                <div class="btn danger" on:click={removeCard}>Delete</div>
            </div>
        </div>
    {:else}
        <div class="title">
            {card.title}
            <div class="btn small"
                on:click={onEditMode}
            >
                Edit
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .card  {
        margin-bottom: 8px;
        &:last-child {
            margin-bottom: 1px;
        }

        :global(&.sortable-ghost){

            position: relative;
            opacity: 0.1;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: #000;
                border-radius: 4px;

            }
        }
        :global(&.sortable-chosen){
            cursor: move;
        }

        .title {
            position: relative;
            background: #fff;
            padding: 6px 8px;
            border-radius: 4px;
            box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
            line-height: 20px;

            &:hover {
                background: #f5f5f5;
            }

            .btn {
                position: absolute;
                top: 6px;
                right: 8px;
                display: none;
            }
            &:hover .btn{
                display: block;
            }

        }

    }
</style>

