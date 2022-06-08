#
##
### 
- 반응성 구문의 이해
- 반응성 구문 패턴 정리 - 반응성 구문 (tick)
### 클래스와 스타일
- 클래스와 스타일 속성 바인딩
- 클래스 바인딩 패턴 정리 (class 지시어)
- 스타일 유효범위(Hash) 와 전역화(Global)
    - svelte-hash
    - `:global`(.fruits) {}
    - @keyframes `-global-`zoom {}
### 요소바인딩
- 일반요소바인딩(this)
```html
    <input bind:this={element}>
```
- 입력요소 바인딩(Properties, group) 패턴정리
```html
    <input type="number" bind:value={value} />
    <input type="range" bind:value={value} />
    <input type="checkbox" bind:checked={value} />
    <input type="checkbox" value={value} bind:group={value[]} />
    <input type="radio" bind:group={value} />
    <textarea bind:value={value} />
    <!-- 단일선택 -->
    <select bind:value={value}>
        <option disabled value="">Please select</option>
        <option>item</option>
    </select>
    <!-- 다중선택 양방향바인딩(배열) -->
    <select multiple bnd:value={value[]}>
        <option disabled value="">Please!!</option>
        <option>item</option>
    </select>
```
- `contenteditable`: 편집가능여부를 나타내는 속성 
- 'true' : contenteditable 
- 'false': 편집할수 없음을 의미
- 'inherit': 부모의 편집가능여부를 상속받음.
```
    bind:innerHTML={inner}
    bind:textContext={content}
```
### 조건과 반복과 키 
- 조건 블록 패턴 정리
- 반복 블록의 key 사용
- 반복 블록 패턴 정리
    - Object.entries() as [key, value] (key)
- 키 블록 
    - {#key reset } {/key} -> 블록을 다시 렌더링 
- 구조분해 
### 비동기
- 비동기 처리의 이해와 사용패턴 정리
    - callback
    - promise
    - async, await
- 대기(pending): 이행 하거나 거부 되지 않은 초기상태
- 이행(fulfilled): 연산이 성공적으로 완료됨
- 거부(rejected): 연산이 실패함.

### 컴포넌트 
- bind:this={}
- {} 객체 구조분해, { ...user }, 전개연산자
- 양방향 데이터 바인딩 (Props)  -- 조심해서 사용해야 함, 복작한 구조일경우에는 스토어 사용
- 자식->부모로 이벤트(_Dispatcher_)
- 자식에서 발생한 이벤트를 부모로 올라감 (이벤트 포워딩) (on:click)
- 커스텀 이벤트 포워딩: 자식에서 발생한 이벤트는 부모로 전달되는데 부모에서 그 이벤트를 처리하지 않으면,
    부모위로 계속 올라감. (버블링)
- setContext(), getContext() : 부모에서 자식으로만 가능함.
- 모듈 Context:  전역화된 데이터 사용 
- $$props => {...$$props}
- $$restProps => {...$$restProps }

### SLOT
- slot 이 작성된 슬롯 순서대로 화면에 표시됨.
- slot 으로 작성된 컨텐츠는  컨텐트를 작성한 그 컴포넌트에서 스타일을 정의 해야 한다.
- slot 포워딩: 자식으로 전달된 slot 을 그 다음 자식에게 전달 가능하다.
- $$slot : 슬롯에 이름을 부여했을때 슬롯을 부여되었는지를 나타냄

## 스토어 
- writable(1, 2)
    1) ()=>{} : 초기화
    2) ()=>{} : 첫번째 구독일때 
    2-1) return ()=>{} : 구독자가 아무도 없을때 
- subscribe(()=>{})
- update(()=>{ return})
- set("")
1) 읽기전용스토어
- readable
    1) subsribe(()=>{})
    2) readable(value, (set) => {  set(value)  }) : 구독자가 1명 이상일때 최초로 실행, 최초 설정가능.
2) 계산된스토어
- 2개 이상 스토어를 계산가능 
- 연결된 스토어가 변경되면 그 스토어가 변경되면 모든 이벤트를 2번째 함수로 반응한다.
- 구독을 취소하고, 재구독하는 구조
- derived
    - derived(store, ($s)=>{ return $s })
    - subscribe(()=>{}) : 읽기전용만 
    - derived([_c_,_d_], ([_$c_,_$d_])=>{ __return__ $c+$d})
    - derived([_c_,_d_], ([_$c_,_$d_], set)=>{ set($c+$d) }) : 값을 반환하지 않고, set으로 값을 설정 
3) 스토어값얻기
- get(store) : 스토어의 데이터를 구독을 하지않고 가져오기

## 액션
- <div use:function> </div> : div 태그를 function(node, options) 에서 매칭해서 사용가능

## 컴포넌트
- svelte:self:  컴포넌트 재귀호출
- svelte:component:
- svelte:window
- svelte:head : `document.head`
- svelte:body : `document.body` 
- svelte:options immutable={true} : === 동등비교, 메모리위치.
- svelte:options accessors : 외부에서 자식 컴포넌트의 속성을 접근할수 있도록....

