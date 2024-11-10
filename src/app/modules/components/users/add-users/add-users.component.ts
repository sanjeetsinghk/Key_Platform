import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleTypeList } from 'src/app/modules/constants/roleEnum';
import { ICompany } from 'src/app/modules/models/company.model';
import { IUser } from 'src/app/modules/models/user.model';
import { UserDto } from 'src/app/modules/models/userDto.model';
import { CompanyService } from 'src/app/modules/service/company.service';
import { CountryService } from 'src/app/modules/service/country.service';
import { UserService } from 'src/app/modules/service/user.service';

@Component({
  selector: 'app-add-users',
 
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss'
})
export class AddUsersComponent {
  form: FormGroup;
  valCheck: string[] = ['remember'];
  submitted = false;
  password!: string;
  data:UserDto;
  companyList:any[]=[];
  roleTypeList:any[]=RoleTypeList;
  countries:any[]=[];
  isLoaded=false;
  constructor(
      private formBuilder: FormBuilder,    
      private companyService: CompanyService,
      private dialogService: DialogService, private ref: DynamicDialogRef,
      private dialogConfig: DynamicDialogConfig,
      private _countryService:CountryService,
      private userService:UserService
      ) { }
  ngOnInit(){
    console.log(this.dialogConfig.data)
    this.data=this.dialogConfig.data.user;
    this.companyList=this.dialogConfig.data.companyList.map((x)=>{
      return {name:x.name,code:x.id}
    })
    this._countryService.getCountries().subscribe((resp)=>{
      console.log(resp);
      this.countries=resp;
      let company="";
      let role="";
      if(this.data){
        company=this.companyList.filter((x)=>x.code==this.data.companyId)[0];
        role=this.roleTypeList.filter((x)=>x.code==this.data.roleId)[0];
      }
      this.form = this.formBuilder.group(
        {
          id:[this.data?this.data.id:0],
          company_name: [this.data?company:'', [Validators.required]],  
          user_email: [this.data?this.data.email:'', [Validators.required, Validators.email]],         
          role:[this.data?role:null,[Validators.required]],
          externalId:[this.data?this.data.externalId:''],         
          isBlocked:[this.data?this.data.isBlocked:false]
        });
      this.isLoaded=true;
      if(this.data){
        // this.form.get('company_name').disable();
        // this.form.get('role').disable();
        this.form.get('user_email').disable(); 
      }
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
    console.log(data);
    let company:UserDto={
      id:this.data?.id?this.data.id:0,
      companyId:data.company_name.code,      
      companyName:data.company_name.name,
      email:this.data ?this.data.email:data.user_email,      
      isBlocked:data.isBlocked,      
      externalId:data.externalId,
      roleId:data.role.code,
      isInvited:true
    }
    if(this.data){
      this.userService.DeleteUser([company]).subscribe((resp)=>{
        this.ref.close(true);
      })
    }
    else
    {
      this.companyService.inviteUserToCompany(company).subscribe((resp)=>{
        this.ref.close();
      })
    }
    return true;    

  }
  cancel() {
    this.ref.close(false);
  }
}
