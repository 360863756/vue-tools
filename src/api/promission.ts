import type { IPromissionList } from "@/types/promission";
import request from "~/src/utils/request";


export function getPermCodeListData(){
   return request.get<IPromissionList>("/api/getPromissionList")
}