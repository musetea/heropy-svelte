export const  ActionAutoFocus = (node, focusOutListener) => { 
    
    const focusInListerner = (event) => {
        event.stopPropagation();
    }

    setTimeout(() => {
        node.addEventListener('click', focusInListerner);
        window.addEventListener('click', focusOutListener);
    }, 0);

    return {
        update(){

        },
        destroy(){
            node.removeEventListener('click', focusInListerner);
            window.removeEventListener('click', focusOutListener);
        }
    }
}