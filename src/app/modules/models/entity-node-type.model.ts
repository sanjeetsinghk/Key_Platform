import { IEntityNodeTypCustomFieldsModel } from "./entity-node-type-fields.mode";

export interface IEntityNodeTypeModel{
    id:number;
	companyId:number;
    name:string;
	description:string;
	defaultCostFormula:string;
	dimension1Value?:any;
	defaultLeadTimeFormula:string;
	dimension2Value?:any;
    dimension3:string;
	dimension3Value?:any;
    dimension4:string;
	dimension4Value?:any;
    dimension5:string;
	dimension5Value?:any;
	labels:string;
	userid:number;
	isBlocked:boolean;
    entityNodeTypeFields:IEntityNodeTypCustomFieldsModel[];
	entityInfoDetailsList?:IEntityNodeTypCustomFieldsModel[];
}