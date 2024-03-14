import { ref } from 'vue'
import usePagination from './usePagenation'

const useTable = <T>(
  api: (params: any) => Promise<any>,
  options: {
    params,
    updateParams?: (params: any) => void,
    immediate?: boolean
  } = {
    params: {},
    immediate: false
  }
) => {
  const { params, immediate, updateParams } = options
  const { pagination } = usePagination(() => refresh())
  const data = ref<T>()
  const loading = ref(false)

  const refresh = async () => {
    loading.value = true
    const res = await api(params)
    data.value = res
    loading.value = false
  }

  pagination.onPageChange = () => {
    updateParams && updateParams(pagination)
  }

  const updatePageParams = (params) => {
    Object.assign(params, pagination)
  }

  if (immediate) refresh()

  return {
    data, refresh, loading, pagination, updatePageParams
  }
}

export default useTable
