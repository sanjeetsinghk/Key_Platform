import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';
import { IEntityListModel } from 'src/app/modules/models/entity-list.model';

import { AuthService } from 'src/app/modules/service/auth.service';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';

@Component({
  selector: 'app-entity-list', 
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss',
  providers:[DialogService,MessageService]
})
export class EntityListComponent {
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
     private entityService:EntityInfoService,private authService:AuthService) { }

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
    this.entityService.getEntityList().subscribe(data => this.entityList = data.resultData);
  }
 
  openNew() {
   
    this.router.navigate(['entity/details']);
  }
  addEditCompany(request){
  }
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: IEntityListModel) {
      this.product = { ...product };      
      
      this.router.navigate(['entity/details/'+product.id]);
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
}
