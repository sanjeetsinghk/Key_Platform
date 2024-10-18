import { IEntityNodeInfoDetails } from "./entity-node-info-details.model";

export interface EntityNodeInfoModel{
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
    allowProductCloning:boolean;
    entityNodeInfoDetailsList?:IEntityNodeInfoDetails[];
    entityInfoDetailsList?:IEntityNodeInfoDetails[];
}
