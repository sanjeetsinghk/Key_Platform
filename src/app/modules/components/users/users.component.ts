import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ICompany } from '../../models/company.model';
import { AddUsersComponent } from './add-users/add-users.component';
import { UserService } from '../../service/user.service';
import { UserDto } from '../../models/userDto.model';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-users', 
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers:[MessageService,DialogService]
})
export class UsersComponent {
  productDialog: boolean = false;
  companiesList:ICompany[]=[];
  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  companies: UserDto[] = [];

  product: UserDto = {} as UserDto;

  selectedProducts: UserDto[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  ref: DynamicDialogRef | undefined;

    
  constructor(private companyService: CompanyService, private userService: UserService,public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit() {
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'email', header: 'Email' },
        { field: 'roleName', header: 'Role' },
        { field: 'isBlocked', header: 'Blocked' },
        { field: 'externalId', header: 'ExternalId' }
       
    ];
    this.getUsers();
    this.getCompanies();     
  }

  getUsers(){
    this.userService.GetUserList().subscribe(data => this.companies = data.resultData);
  }
  getCompanies(){
    this.companyService.getCompanies().subscribe(data => this.companiesList = data.resultData);
  }
  openNew() {
    this.addEditCompany(null)
  }
  addEditCompany(request){
    this.ref = this.dialogService.open(AddUsersComponent,  {
      data: {user:request,companyList:this.companiesList},
      header: 'Invite user to your company',
      width: '50vw',
      modal:true,
      styleClass:'add-company',
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });
    this.ref.onClose.subscribe((product: any) => {
      if (product) {
          this.messageService.add({ severity: 'info', summary: 'User has been invited/updated successfully', detail: product.name });
          this.getCompanies();
      }
    });
  }
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: UserDto) {
      this.product = { ...product };
      this.productDialog = true;
      console.log(this.product)
    this.addEditCompany(this.product)
  }

  deleteProduct(product: UserDto) {
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
      this.updateCompany(this.selectedProducts);
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;     
      this.updateCompany([this.product]);    
      this.product = {} as UserDto;
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  updateCompany(users:UserDto[]){
    users.forEach((x)=>{
      x.isBlocked=!x.isBlocked
    })
    this.userService.DeleteUser(users).subscribe((resp)=>{
      this.getUsers();
    })
  }
}
