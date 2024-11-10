import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { IEntityTypeModel } from 'src/app/modules/models/entity-type.model';
import { EntityTypeService } from '../../service/entity-type.service';
import { AuthService } from '../../service/auth.service';
import { ISelectedCompanyDto } from '../../models/company-selection.model';
import { IEntityTypCustomFieldsModel } from '../../models/entity-type-custom-fields.model';
import { AuthState } from '../../service/auth.state';
import { RolePermission } from '../../constants/role-permission';

@Component({
  selector: 'app-entity-type',
 
  templateUrl: './entity-type.component.html',
  styleUrl: './entity-type.component.scss',
  providers:[MessageService,DialogService]
})
export class EntityTypeComponent {
  productDialog: boolean = false;
  canManageEntityType:boolean=false;
  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  entityList: IEntityTypeModel[] = [];

  product: IEntityTypeModel = {} as IEntityTypeModel;

  selectedProducts: IEntityTypeModel[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  ref: DynamicDialogRef | undefined;

    
  constructor(private router:Router,public dialogService: DialogService,
     private messageService: MessageService,
     private entityService:EntityTypeService,private authService:AuthService,private authState:AuthState) { 
      this.canManageEntityType=this.authState.GetUserPermission(RolePermission.manageEntityType);
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
    return data.map((x)=>x.fieldName).join("|")
  }
  openNew() {
    this.entityService.selectedEntityModel=null;
    this.router.navigate(['entitytype/details']);
  }
  addEditCompany(request){
    // this.ref = this.dialogService.open(AddUsersComponent,  {
    //   data: {user:request,companyList:this.companiesList},
    //   header: 'Invite user to your company',
    //   width: '50vw',
    //   modal:true,
    //   styleClass:'add-company',
    //   breakpoints: {
    //       '960px': '75vw',
    //       '640px': '90vw'
    //   },
    // });
    // this.ref.onClose.subscribe((product: any) => {
    //   if (product) {
    //       this.messageService.add({ severity: 'info', summary: 'Company Added', detail: product.name });
    //       this.getCompanies();
    //   }
    // });
  }
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: IEntityTypeModel) {
      this.product = { ...product };      
      this.entityService.selectedEntityModel=product;
      this.router.navigate(['entitytype/details/'+product.id]);
      console.log(this.product)
    
  }

  deleteProduct(product: IEntityTypeModel) {
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
      this.product = {} as IEntityTypeModel;
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  updateCompany(entity:IEntityTypeModel[]){   
    this.entityService.deleteEntityType(entity).subscribe((resp)=>{
      this.getEntities();
    })
  }
}