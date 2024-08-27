
// everything basic about the user
export interface IUser {
   
    email: string;
    roles:Roles[];
    companyIds:string;
    expiration:string;
    selectedCompany:number;
    companyName:string;
}
export interface Roles{
    id:number;
    userId:number;
    roleId:number
}