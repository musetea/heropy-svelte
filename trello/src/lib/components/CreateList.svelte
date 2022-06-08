<script>
    import { lists } from '@store/list';
    import { onMount, tick} from 'svelte';
    import { ActionAutoFocus } from '@actions/autoFocus'

    let title= '';
    let isEditMode = false;
    let taElement;

    const onEditMode = async() => {
        isEditMode = true;
        await tick();
        taElement && taElement.focus();
    }
    const offEditMode = () => {
        isEditMode = false;
        title = '';
    }
    const addList = () =>{
        if(!title.trim()) return;
                
        lists.add({title})
        offEditMode()
    };

    const onkeydown = (e) => {
        e.key === 'Enter' && addList();
        e.key === 'Escape' && offEditMode();
        e.key === 'Esc' && offEditMode();
    }

    onMount(()=>{
        console.log(taElement);
    })

    // 
    

</script>

<div class="create-list">
    {#if isEditMode}
    <div class="edit-mode" 
        use:ActionAutoFocus={offEditMode}
        >
        <textarea
            bind:value={title}
            bind:this={taElement}
            placeholder="Enter a title for this list ..."
            on:keydown={(e) => onkeydown(e)}
        ></textarea>
        <div class="actions">
            <button class="btn success"
                on:click={addList}
            >Add</button>
            <button class="btn"
                on:click={offEditMode}
                >Cancle</button>
        </div>
    </div>
    {:else}
    <div
        on:click={onEditMode}
        >
        + Add List 
    </div>
    {/if}
</div>





<style lang="scss">

    .create-list{
        display: inline-block;
        font-size: 1rem;
        white-space: normal;

        width: 290px;
        padding: 10px 8px;
        box-sizing: border-box;  
        vertical-align: top;

        background: rgba($color: #ebecf0, $alpha: 0.6);
        border-radius: 4px;
        margin: 0 4px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
            background: rgba($color: #ebecf0, $alpha: 1);
        }
    }
</style>