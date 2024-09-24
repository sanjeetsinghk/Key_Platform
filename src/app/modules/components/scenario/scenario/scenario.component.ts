import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';

import { EntityInfoModel } from 'src/app/modules/models/entity-info.model';
import { IEntityNodeTypeModel } from 'src/app/modules/models/entity-node-type.model';
import { EntityTreeModel } from 'src/app/modules/models/entity-tree.model';
import { IEntityTypeModel } from 'src/app/modules/models/entity-type.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { EntityNodeTypeService } from 'src/app/modules/service/entity-node-type.service';
import { EntityTypeService } from 'src/app/modules/service/entity-type.service';
import { ScenarioService } from 'src/app/modules/service/scenario.service';

@Component({
  selector: 'app-scenario', 
  templateUrl: './scenario.component.html',
  styleUrl: './scenario.component.scss'
})
export class ScenarioComponent {
 entityNodeTypeList:IEntityNodeTypeModel[];
  selectedProduct:EntityInfoModel;
  entityId:number;
  entityTypeList:IEntityTypeModel[];
  entityTreeData:EntityTreeModel;
  constructor(
    private entityTypeService:EntityTypeService,
    private authService:AuthService,
    private entityNodeTypeService:EntityNodeTypeService,
    private entityInfoService:ScenarioService,
    private router:Router,private activeRouter:ActivatedRoute){
    this.activeRouter.params.subscribe(result =>
      {          
        this.entityId=result["id"];
        console.log(this.entityId)
        this.getEntityTypes();
        let data:ISelectedCompanyDto={
          CompanyId:this.authService.getSelectedCompany(),
          UserId:this.authService.getUserId()
        }
        this.entityNodeTypeService.getEntityList(data).subscribe({
          next:(resp)=>{
            this.entityNodeTypeList=resp.resultData;
          }
        })
    });
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
        this.entityTypeList=resp.resultData;
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
