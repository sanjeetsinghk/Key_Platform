import { ICompanyUsers } from "./company-users.model";

export interface ICompany{
    id?:number;
    name?:string;
    description?:string;
    email?:string;
    countryCode?:string;
    isOrganizer:boolean;
    externalId?:string;
    isBlocked:boolean;
    isSelected:boolean;
    companyUsers?:ICompanyUsers
}