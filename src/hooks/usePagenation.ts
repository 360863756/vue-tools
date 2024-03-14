import { reactive } from 'vue'

const usePagination = (cb: any, sizeOption: Array<number> = [10, 20, 50, 100]) => {
  const pagination = reactive({
    current: 1,
    total: 0,
    sizeOption,
    size: sizeOption[0],
    onPageChange: (page: number) => {
      pagination.current = page
      return cb()
    },
    onSizeChange: (size: number) => {
      pagination.current = 1
      pagination.size = size
      return cb()
    },
    setTotal: (total: number) => {
      pagination.total = total
    },
    reset() {
      pagination.current = 1
      pagination.total = 0
      pagination.size = pagination.sizeOption[0]
    }
  })

  return {
    pagination,
    setTotal: pagination.setTotal
  }
}
export default usePagination
