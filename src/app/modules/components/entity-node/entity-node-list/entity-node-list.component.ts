import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { CloneDetails } from 'src/app/modules/models/cloneDetails.model';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';
import { IEntityListModel } from 'src/app/modules/models/entity-list.model';

import { AuthService } from 'src/app/modules/service/auth.service';
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
     private entityService:EntityNodeTypeService,private authService:AuthService) { }

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
    let data:ISelectedCompanyDto={
      CompanyId:this.authService.getSelectedCompany(),
      UserId:this.authService.getUserId()
    }
    this.entityService.getEntityNodeLists(data).subscribe(data => this.entityList = data.resultData);
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
      this.selectedProducts.forEach((x)=>x.isBlocked=true)
      console.log(this.selectedProducts);
      this.updateCompany(this.selectedProducts);
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.product.isBlocked=true;
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
    entity.forEach((x)=>{
      x.isBlocked=true;
    })
    // this.entityService.deleteEntityType(entity).subscribe((resp)=>{
    //   this.getEntities();
    // })
  }
  cloneEntity(product:any){
    console.log(product)
    // let data:CloneDetails={
    //   id:product.id
    // }
    // this.entityService.cloneEntity(data).subscribe({

    // })
  }
}
