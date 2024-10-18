export interface RolePermissionDto{
    name:string;
    permissionId:number;
    platformAdmin:boolean;
    companyAdmin:boolean;
    entityUser:boolean;
    entityDeveloper:boolean;
}