import { IEntityInfoDetails } from "./entity-info-details.model";

export interface EntityInfoModel{
    id:number;
    companyId:number;
    entityTypeId:string;
    name:string;
    description?:string;
    defaultCostFormula?:string;
    defaultLeadTimeFormula?:string;
    dimension3?:string;
    dimension4?:string;
    dimension5?:string;
    baseCode?:string;
    identificationCode?:string;
    labels?:string;
    userid:number;
    isBlocked:boolean;
    entityInfoDetailsList?:IEntityInfoDetails[]
}