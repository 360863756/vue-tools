import { ref, type Ref } from "vue"
import type { IRquestReturn } from "@/types/request"

export interface useFetchReturn {
    data: Ref< IRquestReturn | null>;
    error: Ref<any>
}

export function useFetch(url: RequestInfo | URL, params: RequestInit = {}):useFetchReturn {
    
    const data = ref(null)
    const error = ref(null)

    fetch(url, params).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(req => {
        data.value = req
    })
    .catch(err => {
        error.value = err
    });

    const shell: useFetchReturn ={
        data,
        error
    }
    return shell
}