export interface EntityInfoModel{
    id:number;
    companyId:number;
    entityTypeId:string;
    name:string;
    description?:string;
    baseCode?:string;
    identificationCode?:string;
    labels?:string;
    userid:number;
    isBlocked:boolean;
}