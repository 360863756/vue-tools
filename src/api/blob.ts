import request from '@/utils/request'

export const getBlobList = (params: {
    current: number
    size: number
}) => {
    return request.get("/api/getPromissionList", params)
}