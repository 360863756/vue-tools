import type { IPromissionList } from "@/types/promission";
import request from "@/util/request";


export function getPermCodeListData(){
   return request.get<IPromissionList>("/api/getPromissionList")
}