<script>
    import { tick, createEventDispatcher } from 'svelte';
    import { ActionAutoFocus } from '@actions/autoFocus'
    import { lists } from '@store/list';
    
    export let list;
    let isEditMode = false;
    let title = list.title;
    let taElement;
    const dispatch = createEventDispatcher();


    const saveTitle = () => {
        if(title.trim()){
            lists.edit({
                listId : list.id,
                title : title,
            })
        }
        offEditMode();
    };
    const removeList = () => {
        lists.remove({
            listId: list.id
        })
        offEditMode()
    }

    const onEditMode = async() =>{
        isEditMode = true;
        title = list.title;
        dispatch('editMode', isEditMode);
        await tick();
        taElement && taElement.focus();
    }
    const offEditMode = () => {
        isEditMode = false;
        dispatch('editMode', isEditMode);
    }
    const onTitleKeydown = (e) => {
        e.key === 'Enter' && saveTitle();
        e.key === 'Escape' && offEditMode();
        e.key === 'Esc' && offEditMode();
    }
    
</script>

{#if isEditMode}
    <div 
        class="edit-mode"
        use:ActionAutoFocus={offEditMode}
        >
        <textarea 
            placeholder="Enter a title ..."
            bind:value={title} 
            bind:this={taElement}
            on:keydown={(e)=>{ onTitleKeydown(e)}}
        />
        <div class="actions">
            <div class="btn success"
                on:click={saveTitle}
            >Save</div>
            <div class="btn" on:click={offEditMode}>Cancel</div>
            <div class="btn danger" on:click={removeList}>Delete</div>
        </div>
    </div>
{:else}
    <h2 class="title">
        {list.title}
        <div id="edit-title-btn" class="btn small "
            on:click={onEditMode}
        >
            Edit
        </div>
    </h2>

{/if}

<style lang="scss">

    h2.title{
        font-weight: 700;
        padding: 4px 8px;
        cursor: pointer;
        position: relative;

        .btn{
            position: absolute;
            top: 0;
            right: 0;
            display: none;
        }
    }

    :global(.list__inner:hover #edit-title-btn){
        display: block;
    }

</style>

