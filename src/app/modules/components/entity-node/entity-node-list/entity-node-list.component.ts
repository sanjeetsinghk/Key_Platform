import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { RolePermission } from 'src/app/modules/constants/role-permission';
import { CloneDetails } from 'src/app/modules/models/cloneDetails.model';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';
import { IEntityListModel } from 'src/app/modules/models/entity-list.model';

import { AuthService } from 'src/app/modules/service/auth.service';
import { AuthState } from 'src/app/modules/service/auth.state';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { EntityNodeTypeService } from 'src/app/modules/service/entity-node-type.service';

@Component({
  selector: 'app-entity-node-list', 
  templateUrl: './entity-node-list.component.html',
  styleUrl: './entity-node-list.component.scss',
  providers:[DialogService,MessageService]
})
export class EntityNodeListComponent {
  productDialog: boolean = false;
  canManageEntityNode:boolean=false;
  deleteEntityNode:boolean=false;
  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  entityList: IEntityListModel[] = [];

  product: IEntityListModel = {} as IEntityListModel;

  selectedProducts: IEntityListModel[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  ref: DynamicDialogRef | undefined;

    
  constructor(private router:Router,public dialogService: DialogService,
     private messageService: MessageService,
     private entityService:EntityNodeTypeService,private authService:AuthService,private authState:AuthState) {
      this.canManageEntityNode=this.authState.GetUserPermission(RolePermission.createEntityandEntityNode);
      this.deleteEntityNode=this.authState.GetUserPermission(RolePermission.deleteEntityNode);
  }

  ngOnInit() {
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'entityTypeName', header: 'Type' },
        { field: 'labels', header: 'Labels' },
        { field: 'isBlocked', header: 'State' },
    ];
    
    this.getEntities();     
  }

  
  getEntities(){
    let details:ISelectedCompanyDto={
      CompanyId:this.authService.getSelectedCompany(),
      UserId:this.authService.getUserId()
    }
    this.entityService.getEntityNodeLists(details).subscribe({
      next:(data) => {
       
        this.entityService.getEntityList(details).subscribe({
          next:(resp)=>{
            this.entityService.entityTypesModel=resp.resultData;
            data?.resultData?.forEach((x)=>{
              x.entityTypeName=this.getEntityType(x.entityTypeId);
            });
            this.entityList = data.resultData;
          }
        })
      }
    }
    );
  }
 getEntityType(entityTypeId:number){
  console.log(entityTypeId)
  let name=this.entityService.entityTypesModel.filter((x)=>x.id==entityTypeId)[0]?.name;
  return name;
 }
  openNew() {
   
    this.router.navigate(['entitynode/details']);
  }
  addEditCompany(request){
  }
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: IEntityListModel) {
      this.product = { ...product };      
      
      this.router.navigate(['entitynode/details/'+product.id]);
      console.log(this.product)
    
  }

  deleteProduct(product: IEntityListModel) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }
  getSeverity(status: boolean) {
    switch (status) {
        case true:
            return 'warning';
        case false:
            return 'success';
        default :
            return 'warning';
    }
  }
  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.selectedProducts.forEach((x)=>x.isBlocked=!x.isBlocked)
      console.log(this.selectedProducts);
      this.updateCompany(this.selectedProducts);
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.product.isBlocked=!this.product.isBlocked;
      this.updateCompany([this.product]);    
      this.product = {} as IEntityListModel;
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  updateCompany(entity:IEntityListModel[]){   
    this.entityService.deleteEntityNode(entity).subscribe((resp)=>{
      this.getEntities();
    })
  }
  cloneEntity(product:any){
    console.log(product)
    let data:CloneDetails={
      id:product.id
    }
    this.entityService.cloneEntity(data).subscribe({
      next:(resp)=>{
        this.getEntities();
      }
    })
  }
}
