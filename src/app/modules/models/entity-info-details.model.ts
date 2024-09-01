export interface IEntityInfoDetails{
    id:number;
    entityTypeFieldId:number;
    entityTypeId:number;
    productInfoId:number;
    fieldName?:string;
    fieldType?:string;
    fieldConstraint?:string;
    fieldConstraintValue?:string;
    groupName?:string;        
    sequence:number;
    selectedValue:number;
    visibility:boolean;
    isBlocked:boolean;
}