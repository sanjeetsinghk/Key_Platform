export interface RolePermissionDto{
    name:string;
    permissionId:number;
    platformAdmin:boolean;
    companyAdmin:boolean;
    entityUser:boolean;
    entityDeveloper:boolean;
}
export interface RolePermissionSavedDto{
    permissionId:number;
    roleId:number;
    isAllowed:boolean;
    permissionName:string;
}