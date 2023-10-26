import { getPermCodeListData } from "@/api/promission"
import type { IPromission, IPromissionList } from "@/types/promission"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const usePromission = defineStore('promission',()=>{
    const permCodeList = ref<IPromission[]>([])
    const getPermCodeList = computed(()=>{
        return permCodeList
    })
    function setPermCodeList(codeList:IPromission[]){
        permCodeList.value = codeList
    }

    async function changePermCode(){
        const response = await getPermCodeListData();
        const data: IPromissionList = response.data;
        console.log(data)
        setPermCodeList(data.promissionList);
    }

    return {
        getPermCodeList,
        changePermCode
    }
})