import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCompanyComponent } from './add-company/add-company/add-company.component';
import { CompanyService } from '../../service/company.service';
import { ICompany } from '../../models/company.model';

@Component({
  selector: 'app-company', 
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  providers:[MessageService,DialogService]
})
export class CompanyComponent {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  companies: ICompany[] = [];

  product: ICompany = {} as ICompany;

  selectedProducts: ICompany[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  ref: DynamicDialogRef | undefined;

    
  constructor( private companyService: CompanyService,public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit() {
    this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'countryCode', header: 'Country' },
        { field: 'email', header: 'Email' },
        { field: 'externalId', header: 'ExternalId' },
        { field: 'isBlocked', header: 'Blocked' },
        { field: 'isOrganizer', header: 'Organizer' }
    ];
    this.getCompanies();     
  }

  getCompanies(){
    this.companyService.getCompanies().subscribe(data => this.companies = data.resultData);
  }
  openNew() {
    this.addEditCompany(null)
  }
  addEditCompany(request){
    this.ref = this.dialogService.open(AddCompanyComponent,  {
      data: request,
      header: 'Invite a Company',
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
          this.messageService.add({ severity: 'info', summary: 'Company Added', detail: product.name });
          this.getCompanies();
      }
    });
  }
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: ICompany) {
      this.product = { ...product };
      this.productDialog = true;
      console.log(this.product)
    this.addEditCompany(this.product)
  }

  deleteProduct(product: ICompany) {
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
      this.product = {} as ICompany;
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  updateCompany(company:ICompany[]){
    this.companyService.updateCompany(company).subscribe((resp)=>{
      this.getCompanies();
    })
  }
}
