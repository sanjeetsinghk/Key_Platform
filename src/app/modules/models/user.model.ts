
// everything basic about the user
export interface IUser {
   
    email: string;
    roles:Roles[]
}
export interface Roles{
    id:number;
    userId:number;
    roleId:number
}