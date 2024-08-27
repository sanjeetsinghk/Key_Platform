import { IEntityTypCustomFieldsModel } from "./entity-type-custom-fields.model";

export interface IEntityTypeModel{
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
    entityCustomFields:IEntityTypCustomFieldsModel[];
}