import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { RolePermission } from 'src/app/modules/constants/role-permission';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';
import { IEntityTypCustomFieldsModel } from 'src/app/modules/models/entity-type-custom-fields.model';
import { IEntityTypeModel } from 'src/app/modules/models/entity-type.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { AuthState } from 'src/app/modules/service/auth.state';
import { EntityTypeService } from 'src/app/modules/service/entity-type.service';

@Component({
  selector: 'app-entity-type-details', 
  templateUrl: './entity-type-details.component.html',
  styleUrl: './entity-type-details.component.scss',
  providers:[DialogService,MessageService]
})
export class EntityTypeDetailsComponent {
  isResetDone:boolean=false;
  form: FormGroup;
  submitted:boolean=false;
  labels:string[] | undefined;
  customField:IEntityTypCustomFieldsModel[]=[];
  canManageEntityType:boolean=false;
  entityId:number=0;
  showForm:boolean=false;
  constructor(private router:Router,private activeRouter:ActivatedRoute,private entityTypeService:EntityTypeService, private authService:AuthService,private formBuilder: FormBuilder, public dialogService: DialogService, private messageService: MessageService,private authState:AuthState){}
  ngOnInit(){   
    this.bindForm(null);
    this.canManageEntityType=this.authState.GetUserPermission(RolePermission.manageEntityType);
    this.activeRouter.params.subscribe(result =>
      {          
        this.entityId=result["id"];
        if(this.entityId>0){
          this.getSelectedEntityDetails();
        }
        else
        {
         // let data=this.entityTypeService.selectedEntityModel;
          this.bindForm(null);
          this.showForm=true;
        }
      });  
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getSelectedEntityDetails(){
    let details:ISelectedCompanyDto={
      CompanyId:this.authService.getSelectedCompany(),
      UserId:this.authService.getUserId(),
      Id:this.entityId
    }
    this.showForm=false;
    this.entityTypeService.getEntityTypeById(details).subscribe({
      next:(resp)=>{    
        this.entityTypeService.selectedEntityModel =resp.resultData; 
        this.customField=this.entityTypeService.selectedEntityModel.entityCustomFields;
        this.bindForm(resp.resultData);
        this.showForm=true;
      }
    })
  }
  bindForm(data:IEntityTypeModel){
    this.form=this.formBuilder.group(
      {
        id:[data ? data.id:0],
        name: [data? data.name:'', [Validators.required]],  
        description:[data?data.description:''],
        costFormula:[data?data.defaultCostFormula:''],
        leadTimeFormula:[data?data.defaultLeadTimeFormula:''],
        dimension3:[data?data.dimension3:''],
        dimension4:[data?data.dimension4:''],
        dimension5:[data?data.dimension5:'']
      });
    if(data && data.labels){
      this.labels=data.labels.split(",")
    }
  }
save(){ 
  this.submitted=true;   
  console.log(this.form.value)
  if(this.form.valid){
    let value=this.form.value;
    let data:IEntityTypeModel={
      id:value ?value.id:0,
      companyId:this.authService.getSelectedCompany(),
      name:value.name,
      description:value.description || "",
      defaultCostFormula:value.costFormula || "",
      defaultLeadTimeFormula:value.leadTimeFormula || "",
      dimension3:value.dimension3 || "",
      dimension4:value.dimension4 || "",
      dimension5:value.dimension5 || "",
      labels:this.labels?this.labels.join(','):'',
      userid:this.authService.getUserId(),
      isBlocked:false,
      entityCustomFields:this.customField,
    }
    if(value.id==0 || value.id==null){
      data.id=0;
      this.entityTypeService.saveEntityType(data).subscribe((resp)=>{
        //this.bindForm(resp.resultData)
        console.log(resp)
        this.entityId=resp.resultData.id;
        this.getSelectedEntityDetails();
      });
    }
    else
    {
      this.entityTypeService.updateEntityType(data).subscribe((resp)=>{
        //this.bindForm(resp.resultData)
        this.entityId=resp.resultData.id;
        this.getSelectedEntityDetails();
      });
    }
  }
}

addItem(data:IEntityTypCustomFieldsModel[]){
  this.customField=data;
}
cancel(){
  this.router.navigate(['entitytype']);
}
}
