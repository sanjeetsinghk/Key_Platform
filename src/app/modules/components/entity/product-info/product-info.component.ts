import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';
import { EntityInfoModel } from 'src/app/modules/models/entity-info.model';
import { IEntityTypeModel } from 'src/app/modules/models/entity-type.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { EntityTypeService } from 'src/app/modules/service/entity-type.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  providers:[DialogService,MessageService]
})
export class ProductInfoComponent {
  productForm:FormGroup;
  entityTypeList:IEntityTypeModel[];
  
  constructor(private authService:AuthService,private entityInfoService:EntityInfoService,private entityTypeService:EntityTypeService,private formBuilder: FormBuilder){
    let data:ISelectedCompanyDto={
      CompanyId:this.authService.getSelectedCompany(),
      UserId:this.authService.getUserId()
    }
    this.entityTypeService.getEntityList(data).subscribe({
      next:(resp)=>{
        this.entityTypeList=resp.resultData;
      }
    })
  }
  labels:any;
  productTypeList:IEntityTypeModel[]=[];
  submitted:boolean=false;
  ngOnInit(){
    this.productForm=this.formBuilder.group({
      productType:['',[Validators.required]],
      productName:['',[Validators.required]],
      baseCode:[''],
      description:[]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  saveProduct(){
    if(this.productForm.valid)
    {
      let value=this.productForm.value;
      let data:EntityInfoModel={
        id:0,
        companyId:this.authService.getSelectedCompany(),
        userid:this.authService.getUserId(),
        name:value.productName,
        labels:this.labels?this.labels.join(","):'',
        description:value.description,
        baseCode:value.baseCode,
        entityTypeId:value.productType.id,
        isBlocked:false
      }
      this.entityInfoService.saveEntityType(data).subscribe((res)=>{

      })
      console.log(data);
    }
  }
  cancel(){
    this.productForm.reset();
  }
}
