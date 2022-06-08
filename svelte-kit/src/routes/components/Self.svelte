<script>
    import Address from './Address.svelte';
    export let index;
    let address = {
        lable: '대한민국',
        children:[
            {
                lable: '경기도',
                children: [
                    {
                        lable: '수원',
                    },
                    {
                        lable: '성남',
                    }
                    
                ],
            },
            {
                lable: '전라북도',
                children:[
                    {
                        lable: '익산시',
                    },
                    {
                        lable: '전주시'
                    }
                ]
            },
            {
                lable: '강원도',
                children:[
                    {
                        lable: '동해시',
                    },
                    {
                        lable: '속초시'
                    }
                ]
            }
            

        ]
    }
</script>
<h1>{index}. svelte:self</h1>

<Address {address} />

