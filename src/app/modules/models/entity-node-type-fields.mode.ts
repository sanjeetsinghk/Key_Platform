export interface IEntityNodeTypCustomFieldsModel{
    id:number;
	entityNodeTypeId:number;
	fieldName:string;
	fieldType:string;
	fieldConstraint:string;
	fieldConstraintValue:string;
	isVisibility:boolean;
	isBlocked:boolean;
    groupName?:string;
	sequence:number;
}