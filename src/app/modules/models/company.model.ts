export interface ICompany{
    id?:number;
    name?:string;
    description?:string;
    email?:string;
    countryCode?:string;
    isOrganizer:boolean;
    externalId?:string;
    isBlocked:boolean;
}