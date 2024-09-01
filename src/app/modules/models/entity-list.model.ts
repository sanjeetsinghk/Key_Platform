import { EntityInfoModel } from "./entity-info.model";
export interface IEntityListModel{
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
    entityTypeName:string;
}