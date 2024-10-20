import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoleType } from 'src/app/modules/constants/roleEnum';
import { RolePermissionModel } from 'src/app/modules/models/role-permission.model';
import { RolePermissionDto, RolePermissionSavedDto } from 'src/app/modules/models/role-permissionDto.model';
import { RolesService } from 'src/app/modules/service/roles.service';

@Component({
  selector: 'app-roles', 
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  roles: RolePermissionDto[] = [];
  rolePermissionList:RolePermissionModel[]=[];
  product: any = {} as any;
  selectedProducts: any[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  productForm:FormGroup;
  constructor(private rolesService:RolesService,private formBuilder:FormBuilder){
    this.bindProductForm(null);
    this.rolesService.getRoles().subscribe({
      next:(resp)=>{
        this.rolePermissionList=resp.resultData;
        let uniquePermission=this.rolePermissionList.map((x)=>{
          return {permissionId:x.permissionId,title:x.title}
        });
        const arrayUniqueByKey = [...new Map(this.rolePermissionList.map(item =>
          [item['title'], item])).values()];
        console.log(arrayUniqueByKey)
        arrayUniqueByKey.forEach((item,index)=>{
          this.roles.push({
            name:item.title,
            permissionId:item.permissionId,
            platformAdmin:true,
            companyAdmin:true,
            entityUser:this.getRoleValue(item.permissionId,RoleType.EntityUser),
            entityDeveloper:this.getRoleValue(item.permissionId,RoleType.EntityDeveloper),
          });
          
          this.addGroupArrList(this.roles[index]);
          
        })
        console.log(this.roles);
       
      }
    })
  }
  getRoleValue(permissionId:number,roleType:RoleType){
      let isAllowed=this.rolePermissionList.filter((x)=>x.permissionId==permissionId && x.roleId==roleType && x.isAllowed).length>0;
      return isAllowed;
  }
  ngOnInit() {
    this.cols = [
        { field: 'name', header: 'Name' },
        {field:'permissionId',header:''},
        { field: 'platformAdmin', header: 'Platform admin' },
        { field: 'companyAdmin', header: 'Company Admin' },
        { field: 'entityUser', header: 'Entity User' },
        { field: 'entityDeveloper', header: 'Entity Developer' }
    ];      
  }
  bindProductForm(data:any){
    this.productForm=this.formBuilder.group({
      rolesArr:this.formBuilder.array([])
    })
  }
  groupArrList():FormArray {
    try{
      return this.productForm.controls["rolesArr"] as FormArray;
    }
    catch(err){
      console.log(err);
      return null;
    }
  }
  
  addGroupArrList(item:any) {
    try{
      const constraintValueForm = this.productForm.controls.rolesArr as FormArray;
      constraintValueForm.push(this.formBuilder.group({
        name:[item.name],
        permissionId:item.permissionId,
        platformAdmin:item.platformAdmin,
        companyAdmin:item.companyAdmin,
        entityUser:item.entityUser,
        entityDeveloper:item.entityDeveloper
      }));
    }
    catch(err){
      console.log(err)
    }
  }
  saveRoles(){
    console.log(this.productForm.value)
    let rolesArr=this.productForm.value.rolesArr;
    let modelList:RolePermissionSavedDto[]=[];
    rolesArr.forEach((item)=>{
      modelList.push({
        permissionName:item.name,
        permissionId:item.permissionId,
        roleId:RoleType.PlatformAdmin,
        isAllowed:item['platformAdmin']
      });
      modelList.push({
        permissionName:item.name,
        permissionId:item.permissionId,
        roleId:RoleType.CompanyAdmin,
        isAllowed:item['companyAdmin']
      });
      modelList.push({
        permissionName:item.name,
        permissionId:item.permissionId,
        roleId:RoleType.EntityUser,
        isAllowed:item['entityUser']
      });
      modelList.push({
        permissionName:item.name,
        permissionId:item.permissionId,
        roleId:RoleType.EntityDeveloper,
        isAllowed:item['entityDeveloper']
      });
    });
    console.log(modelList)
    this.rolesService.saveRoles(modelList).subscribe({
      next:(resp)=>{

      }
    })
  }
  cancel(){}
}
