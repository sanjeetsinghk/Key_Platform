import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICompany } from 'src/app/modules/models/company.model';
import { IUser } from 'src/app/modules/models/user.model';
import { CompanyService } from 'src/app/modules/service/company.service';
import { CountryService } from 'src/app/modules/service/country.service';

@Component({
  selector: 'app-add-company',
 
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss'
})
export class AddCompanyComponent {
  form: FormGroup;
  valCheck: string[] = ['remember'];
  submitted = false;
  password!: string;
  data:ICompany;
  countries:any[]=[];
  isLoaded=false;
  constructor(
      private formBuilder: FormBuilder,    
      private companyService: CompanyService,
      private dialogService: DialogService, private ref: DynamicDialogRef,
      private dialogConfig: DynamicDialogConfig,
      private _countryService:CountryService
      ) { }
  ngOnInit(){
    console.log(this.dialogConfig.data)
    this.data=this.dialogConfig.data;
    this._countryService.getCountries().subscribe((resp)=>{
      console.log(resp);
      this.countries=resp;
      this.form = this.formBuilder.group(
        {
          id:[this.data?this.data.id:0],
          company_name: [this.data?this.data.name:'', [Validators.required]],  
          company_email: [this.data?this.data.email:'', [Validators.required, Validators.email]],
          description:[this.data?this.data.description:''],
          country:[this.data?this.getCountryCode(this.data.countryCode):''],
          externalId:[this.data?this.data.externalId:''],
          isBlocked:[this.data?this.data.isBlocked:false],
          isOrganizer:[this.data?this.data.isOrganizer:false]
        });
        this.isLoaded=true;
    })
      
  }
  get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
  }
  getCountryCode(countryCode:string){
    let option=this.countries.filter((x)=>x.code==countryCode);
    return option[0];
  }
  save() {
    this.submitted=true;
    if(this.form.invalid)
      return false;
    let data=this.form.value;
    let company:ICompany={
      id:this.data.id,
      name:data.company_name,      
      email:data.company_email,     
      isOrganizer:data.isOrganizer,      
      isBlocked:data.isBlocked,
      description:data.description,
      countryCode:data.country ?data.country.code:'',
      externalId:data.externalId,
      isSelected:false
    }
    if(this.data){
      this.companyService.updateCompany([company]).subscribe((resp)=>{
        this.ref.close();
      })
    }
    else
    {
      this.companyService.saveCompany(company).subscribe((resp)=>{
        this.ref.close();
      })
    }
    return true;    

  }
  cancel() {
    this.ref.close(false);
  }
}
