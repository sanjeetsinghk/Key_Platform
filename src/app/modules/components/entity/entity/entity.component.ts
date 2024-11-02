import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermission } from 'src/app/modules/constants/role-permission';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';

import { EntityInfoModel } from 'src/app/modules/models/entity-info.model';
import { IEntityNodeTypeModel } from 'src/app/modules/models/entity-node-type.model';
import { EntityTreeModel } from 'src/app/modules/models/entity-tree.model';
import { IEntityTypeModel } from 'src/app/modules/models/entity-type.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { AuthState } from 'src/app/modules/service/auth.state';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { EntityNodeTypeService } from 'src/app/modules/service/entity-node-type.service';
import { EntityTypeService } from 'src/app/modules/service/entity-type.service';

@Component({
  selector: 'app-entity', 
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent {
 entityNodeTypeList:IEntityNodeTypeModel[];
  selectedProduct:EntityInfoModel;
  entityId:number;
  entityTypeList:IEntityTypeModel[];
  entityTreeData:EntityTreeModel;
  canManageEntityNode:boolean=false;
  constructor(private authState:AuthState,private entityTypeService:EntityTypeService,private authService:AuthService,private entityNodeTypeService:EntityNodeTypeService,private entityInfoService:EntityInfoService,private router:Router,private activeRouter:ActivatedRoute){
    this.activeRouter.params.subscribe(result =>
      {          
        this.entityId=result["id"];
        console.log(this.entityId)
        this.getEntityTypes();
        let data:ISelectedCompanyDto={
          CompanyId:this.authService.getSelectedCompany(),
          UserId:this.authService.getUserId()
        }
        this.entityNodeTypeService.getEntityNodeLists(data).subscribe({
          next:(resp)=>{
            this.entityNodeTypeList=resp.resultData.filter((x)=>!x.isBlocked);
          }
        })
    });
    this.canManageEntityNode=this.authState.GetUserPermission(RolePermission.manageEntityAndEntityNodeFormula);
  }
  ngOnInit(){
    
  }
  getEntityTypes(){
    let data:ISelectedCompanyDto={
      CompanyId:this.authService.getSelectedCompany(),
      UserId:this.authService.getUserId()
    }
    this.entityTypeService.getEntityList(data).subscribe({
      next:(resp)=>{
        this.entityTypeList=resp.resultData.filter((x)=>!x.isBlocked);
        if(this.entityId){
          this.entityInfoService.getEntityInfo(this.entityId).subscribe({
            next:(resp)=>{
              if(resp.success && resp.resultData){
                this.selectedProduct=resp.resultData;
               
              }
            }
          });
        }
      }
    })
  }
  onSavedProduct(event:EntityInfoModel){
    this.selectedProduct=event;
  }
  onSavedEntityTreeEvent(data:EntityTreeModel){
    console.log(data);
    this.entityTreeData=data;
  }
}
