import { IEntityNodeTypCustomFieldsModel } from "./entity-node-type-fields.mode";

export interface IEntityNodeTypeModel{
    id:number;
	companyId:number;
    name:string;
	description:string;
	defaultCostFormula:string;
	defaultLeadTimeFormula:string;
    dimension3:string;
    dimension4:string;
    dimension5:string;
	labels:string;
	userid:number;
	isBlocked:boolean;
    entityNodeTypeFields:IEntityNodeTypCustomFieldsModel[];
}