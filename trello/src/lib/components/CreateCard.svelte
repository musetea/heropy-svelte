<script>
    import { tick, createEventDispatcher } from 'svelte';
    import { ActionAutoFocus } from '@actions/autoFocus';
    import { cards } from '@store/list';

    const dispatch = createEventDispatcher();
    
    export let listId;

    let isEditMode = false;
    let title = '';
    let textareaEl;

    /**
     * ON EDIT MODE 
     */
    const onEditMode = async() => {
        isEditMode = true;
        title = "";
        dispatch('editMode', isEditMode);
        await tick()
        textareaEl && textareaEl.focus();
    }
    /**
     * OFF EDIT MODE
     */
    const offEditMode = () => {
        isEditMode =false;
        dispatch('editMode', isEditMode);
    }

    /**
     * 
     */
    const addCrad = () => {
        if(!title.trim()) return;

        cards.add({
            listId,
            title,
        });

        offEditMode();
    }
    ///
    /**
     * KEY DOWN
     * @param event
     */
    const onTextAreaKeyDown = (event) => {
        event.key === 'Enter' && addCrad();
        event.key === 'Escape' && offEditMode();
        event.key === 'Esc' && offEditMode();
    }
</script>

{#if isEditMode}
    <div class="edit-mode" use:ActionAutoFocus={offEditMode}>
        <textarea bind:value={title}
            bind:this={textareaEl}
            placeholder="Enter a title this card..."
            on:keydown={onTextAreaKeyDown}
        ></textarea>
        <div class="actions">
            <div class="btn success" on:click={addCrad}>Add Card</div>
            <div class="btn" on:click={offEditMode}>Cancel</div>
            <!-- <div class="btn danger" on:click={removeCrad}>Delete Card</div> -->
        </div>
    </div>
{:else}
    <div class="add-card"
        on:click={onEditMode}
    >
        + Add Card
    </div>
{/if}

<style lang="scss">
    .add-card{
        padding: 4px 8px;
        font-size: 14px;
        color: #5e6c84;
        border-radius: 4px;

        &:hover {
            background: rgba(9, 30, 66, 0.08);
            color: #172b4d;
        }
    }
</style>