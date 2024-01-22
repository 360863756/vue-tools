
export interface IRquestReturnData{
    [key: string]: any;
}
export interface IRquestReturn{
    data: IRquestReturnData | IRquestReturnData[];
    code: number
}
