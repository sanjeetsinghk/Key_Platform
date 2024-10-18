import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { IEntityNodeTypCustomFieldsModel } from 'src/app/modules/models/entity-node-type-fields.mode';
import { IEntityNodeTypeModel } from 'src/app/modules/models/entity-node-type.model';

import { AuthService } from 'src/app/modules/service/auth.service';
import { EntityNodeTypeService } from 'src/app/modules/service/entity-node-type.service';


@Component({
  selector: 'app-entity-node-type-details', 
  templateUrl: './entity-node-type-details.component.html',
  styleUrl: './entity-node-type-details.component.scss',
  providers:[DialogService,MessageService]
})
export class EntityNodeTypeDetailsComponent {
  isResetDone:boolean=false;
  form: FormGroup;
  submitted:boolean=false;
  labels:string[] | undefined;
  customField:IEntityNodeTypCustomFieldsModel[]=[];
  constructor(private entityTypeService:EntityNodeTypeService, private authService:AuthService,private formBuilder: FormBuilder, public dialogService: DialogService, private messageService: MessageService){}
  ngOnInit(){
   
    let data=this.entityTypeService.selectedEntityModel;
    this.bindForm(data);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  bindForm(data:IEntityNodeTypeModel){
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
    let data:IEntityNodeTypeModel={
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
      entityNodeTypeFields:this.customField,
    }
    if(value.id==0 || value.id==null){
      data.id=0;
      this.entityTypeService.saveEntityType(data).subscribe((resp)=>{
        this.form.reset();
        this.labels=[];
      });
    }
    else
    {
      this.entityTypeService.updateEntityType(data).subscribe((resp)=>{
        this.form.reset();
        this.labels=[];
      });
    }
  }
}

addItem(data:IEntityNodeTypCustomFieldsModel[]){
  this.customField=data;
}
cancel(){}
}
