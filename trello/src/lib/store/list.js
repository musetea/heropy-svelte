import { writable} from 'svelte/store';
import { v4 as uuid  } from "uuid";
import { browser } from '$app/env';
import { find as _find, remove as _remove, cloneDeep as _cloneDeep } from 'lodash-es'

const KEY_LIST = "lists";
const ID_LENGTH = 10;


// 로컬스토리지에서 데이터가져오기
const jonslists = browser && window.localStorage.getItem(KEY_LIST);
const repo = JSON.parse(jonslists) || [];

const _lists = writable(repo);
// 자동구독 
_lists.subscribe(($lists) => {

    // 변경되면 스토리지에 저장 
    browser && window.localStorage.setItem(KEY_LIST,JSON.stringify($lists));
});

const getGenernalId = () => {
    return uuid()
}

/**
 * 리스트 ID로 찾은 반환 
 * @param {*} lists 
 * @param {*} listId 
 * @returns 
 */
const getFindById = (lists,listId) => {
    return _find(lists, {id : listId});
}
/**
 * 리스트 ID 로 삭제
 * @param {*} lists 
 * @param {*} listId 
 * @returns 
 */
const removeById = (lists, listId) => {
    return _remove(lists, { id : listId });
};

/**
 * 깊은복사
 * @param {*} list 
 * @returns 
 */
const cloneDeep = (list) => {
    return _cloneDeep(list);
};



export const lists = {
    subscribe: _lists.subscribe,  // 할당

    add: (payload) => {
        const {title } = payload;
        _lists.update(($lists)=>{
            $lists.push({
                id:getGenernalId(),
                title,
                cards:[]
            })
            return $lists; // 반환, 반영
        })
    },
    /**
     * EDIT
     * @param {*} payload 
     */
    edit: (payload) => {
        const  { listId, title} = payload;
        _lists.update($lists => {

            // const foundList = $lists.find((l) => {
            //     return l.id === listId; 
            // })
            const foundList = getFindById($lists, listId);
            foundList.title = title;
            return $lists;
        })
        
    },
    /**
     * REMOVE
     * @param {*} payload 
     */
    remove: (payload) => {
        const {listId} = payload;
        _lists.update($lists => {
            removeById($lists, listId);
            return $lists;
        });
    },
    /**
     * RE ORDER 
     * @param {*} payload 
     */
    reorder: (payload) => {
        const { oldIndex, newIdex } = payload;
        _lists.update(($lists)=>{

            const origin = cloneDeep($lists[oldIndex]);
            console.log(origin);
            $lists.splice(oldIndex, 1);
            $lists.splice(newIdex, 0 , origin);
            console.log($lists);
            return $lists;
        });
    },
};

/**
 * CARD'S
 */

/**
 * 카드목록에서 아이디로 카드 반환 
 * @param {*} cards 
 * @param {*} cardId 
 * @returns 
 */
const getFindCardById = (cards,cardId) => {
    return _find(cards, {id : cardId});
};

/**
 * 
 * @param {*} cards 
 * @param {*} cardId 
 * @returns 
 */
const removeCardById = (cards, cardId) => {
    return _remove(cards, { id : cardId });
};

export const cards = {
    add: (payload) => {
        const { listId, title } = payload;

        _lists.update(($lists) => {
            
            const foundList = getFindById($lists, listId)
            if(!foundList) return;

            foundList.cards.push({
                id:getGenernalId(),
                title
            });
            
            return $lists;
        })
    },
    edit: (payload) => {
        const { listId, cardId, title } = payload;
        _lists.update(($lists) => {

            const foundList = getFindById($lists, listId)
            if(!foundList) return;

            const foundCard = getFindCardById(foundList.cards, cardId);
            foundCard.title = title;

            return $lists;
        });
    },
    remove: (payload) => {
        const { listId, cardId } = payload;
        console.log(listId, cardId);

        _lists.update(($lists) => {

            const foundList = getFindById($lists, listId)
            if(!foundList) return;

            console.log(foundList.cards);
            removeCardById(foundList.cards, cardId);
            console.log(foundList.cards);
            
            return $lists;
        });
    },

    /**
     * 카즈정렬 
     * @param {*} payload 
     */
    reorder: (payload) => {
        const {fromListId, toListId, oldIndex, newIndex } = payload;
        console.log(fromListId, toListId, oldIndex, newIndex);

        _lists.update(($lists) => {
            const fromList = getFindById($lists, fromListId);
            const toList = fromListId === toListId 
                ? fromList
                : getFindById($lists, toListId);

            // 이동할 카드객체 보관 
            const cloneCard = _cloneDeep(fromList.cards[oldIndex]);
            console.log(cloneCard);

            fromList.cards.splice(oldIndex, 1);             // 배열에서 이동객체 삭제
            console.log(fromList);

            toList.cards.splice(newIndex, 0, cloneCard);    // 복사객체 
            console.log(toList);

            return $lists;
        });
    }
}