import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { RolePermission } from 'src/app/modules/constants/role-permission';
import { CloneDetails } from 'src/app/modules/models/cloneDetails.model';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';

import { AuthService } from 'src/app/modules/service/auth.service';
import { AuthState } from 'src/app/modules/service/auth.state';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { IEntityNodeComponentModel } from '../../models/entity-node-component.model';


@Component({
  selector: 'app-entity-node-component', 
  templateUrl: './entity-node-component.component.html',
  styleUrl: './entity-node-component.component.scss',
  providers:[DialogService,MessageService]
})
export class EntityNodeComponent {
  productDialog: boolean = false;
  canManageEntityNode:boolean=false;
  canDeleteEntity:boolean=false;
  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  entityList: IEntityNodeComponentModel[] = [];

  product: IEntityNodeComponentModel = {} as IEntityNodeComponentModel;

  selectedProducts: IEntityNodeComponentModel[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  ref: DynamicDialogRef | undefined;

    
  constructor(private router:Router,public dialogService: DialogService,
     private messageService: MessageService,
     private entityService:EntityInfoService,private authService:AuthService,private authState:AuthState) { 
      this.canManageEntityNode=this.authState.GetUserPermission(RolePermission.manageEntityAndEntityNodeFormula);
      this.canDeleteEntity=this.authState.GetUserPermission(RolePermission.deleteEntity);
     }

  ngOnInit() {
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'nodeName', header: 'Name' },
        { field: 'isBlocked', header: 'State' },
    ];
    
    this.getEntities();     
  }

  
  getEntities(){
    let data:ISelectedCompanyDto={
      CompanyId:this.authService.getSelectedCompany(),
      UserId:this.authService.getUserId()
    }
    this.entityService.getEntityNodeComponnet().subscribe(data => this.entityList = data.resultData);
  }
 
  openNew() {
   
    this.router.navigate(['entity/details']);
  }
  addEditCompany(request){
  }
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: IEntityNodeComponentModel) {
      this.product = { ...product };      
      
      this.router.navigate(['entity/details/'+product.id]);
      console.log(this.product)
    
  }

  deleteProduct(product: IEntityNodeComponentModel) {
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
      this.deleteProductDialog = false;
    
      this.updateCompany(this.selectedProducts);
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
     
      this.updateCompany([this.product]);    
      this.product = {} as IEntityNodeComponentModel;
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  updateCompany(entity:IEntityNodeComponentModel[]){  
    entity.forEach((x)=>{
      x.isBlocked=!x.isBlocked
    });
    this.entityService.updateEntityNodeComponent(entity).subscribe((resp)=>{
      this.getEntities();
    });
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
