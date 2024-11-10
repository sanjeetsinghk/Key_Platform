import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

import { EntityTypeService } from '../../service/entity-type.service';
import { AuthService } from '../../service/auth.service';
import { ISelectedCompanyDto } from '../../models/company-selection.model';
import { IEntityTypCustomFieldsModel } from '../../models/entity-type-custom-fields.model';
import { IEntityNodeTypeModel } from '../../models/entity-node-type.model';
import { EntityNodeTypeService } from '../../service/entity-node-type.service';
import { AuthState } from '../../service/auth.state';
import { RolePermission } from '../../constants/role-permission';

@Component({
  selector: 'app-entity-node-type',
 
  templateUrl: './entity-node-type.component.html',
  styleUrl: './entity-node-type.component.scss',
  providers:[MessageService,DialogService]
})
export class EntityNodeTypeComponent {
  canManageEntityNodeType:boolean=false;
  productDialog: boolean = false;
  
  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  entityList: IEntityNodeTypeModel[] = [];

  product: IEntityNodeTypeModel = {} as IEntityNodeTypeModel;

  selectedProducts: IEntityNodeTypeModel[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  ref: DynamicDialogRef | undefined;

    
  constructor(private router:Router,public dialogService: DialogService,
     private messageService: MessageService,
     private entityService:EntityNodeTypeService,private authService:AuthService,private authState:AuthState) {
      this.canManageEntityNodeType=this.authState.GetUserPermission(RolePermission.manageEntityNodeType);
  }

  ngOnInit() {
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Type Name' },
        { field: 'fields', header: 'Fields' },
        { field: 'description', header: 'Description' },
        { field: 'isBlocked', header: 'Blocked' },
    ];
    
    this.getEntities();     
  }

  
  getEntities(){
    let data:ISelectedCompanyDto={
      CompanyId:this.authService.getSelectedCompany(),
      UserId:this.authService.getUserId()
    }
    this.entityService.getEntityList(data).subscribe(data => this.entityList = data.resultData);
  }
  getFields(data:IEntityTypCustomFieldsModel[]){
    if(data && data !== undefined){
      return data.map((x)=>x.fieldName).join(" | ")
    }
    return '';
  }
  openNew() {
    this.entityService.selectedEntityModel=null;
    this.router.navigate(['entitynodetype/details']);
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: IEntityNodeTypeModel) {
      this.product = { ...product };      
      this.entityService.selectedEntityModel=product;

      this.router.navigate(['entitynodetype/details/'+product.id]);
      console.log(this.product)
    
  }

  deleteProduct(product: IEntityNodeTypeModel) {
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
      this.product = {} as IEntityNodeTypeModel;
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  updateCompany(entity:IEntityNodeTypeModel[]){   
    this.entityService.deleteEntityType(entity).subscribe((resp)=>{
      this.getEntities();
    })
  }
}