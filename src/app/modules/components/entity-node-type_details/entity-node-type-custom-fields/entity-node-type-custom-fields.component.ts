import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl,FormControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomFieldConstraintList } from 'src/app/modules/constants/custom-field-constraint-list';
import { CustomFieldTypeList } from 'src/app/modules/constants/custom-field-type-list';
import { IEntityNodeTypCustomFieldsModel } from 'src/app/modules/models/entity-node-type-fields.mode';
import { EntityNodeTypeService } from 'src/app/modules/service/entity-node-type.service';

@Component({
  selector: 'app-entity-node-type-custom-fields', 
  templateUrl: './entity-node-type-custom-fields.component.html',
  styleUrl: './entity-node-type-custom-fields.component.scss',
  providers:[DialogService,MessageService]
})
export class EntityNodeTypeCustomFieldsComponent {
  formCustom: FormGroup;
  submitted:boolean=false;
  labels:string[] | undefined;
  fieldTypeList:any[]=CustomFieldTypeList;
  fieldConstraintList:any[]=CustomFieldConstraintList;
  contraintType:any;
  customFields:any[]=[];
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  product:any;
  @Input() isResetDone:boolean=false;
  @Output() newItemEvent = new EventEmitter<IEntityNodeTypCustomFieldsModel[]>();
  constructor(private entityService:EntityNodeTypeService, private formBuilder: FormBuilder, public dialogService: DialogService, private messageService: MessageService){}
  ngOnInit(){
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'groupName', header: 'Group Name' },
      { field: 'sequence', header: 'Sequence' },
      { field: 'type', header: 'Type' },
      { field: 'constraint', header: 'Constraint' }
  ];
    this.bindFormGroup(null);
    let data=this.entityService.selectedEntityModel;
    data?.entityNodeTypeFields.forEach((x)=>{
      this.customFields.push({
        name:x.fieldName,
        type: JSON.parse(x.fieldType).name,
        constraint:JSON.parse(x.fieldConstraint).name,
        ...x
      })
    })
  }
  bindFormGroup(data){
    this.formCustom=this.formBuilder.group(
      {
        id:[data?data.id:0],
        entityNodeTypeId:[data?data.entityNodeTypeId:0],
        name: [data ? data.name:'', [Validators.required]],  
        type:[data? JSON.parse(data.fieldType):'',[Validators.required]],
        constraint:[data ? JSON.parse(data.fieldConstraint):'',[Validators.required]],
        constraintValue:[data ? data.constraintValue:''],
        constraintValueList:this.formBuilder.array([]),
        group_name:[data ? data.groupName:''],
	      sequence:[data ? data.sequence:'']
      });
      if(data && data.constraint){
        this.onConstraintChange(JSON.parse(data.fieldConstraint));
        this.clearFormArray(this.constraintValueList);
        if(JSON.parse(data.fieldConstraint).code!=1){
          let list=JSON.parse(data.fieldConstraintValue);
          console.log(list)
          list.forEach((x)=>{
            this.addConstraintValueList(x);
          })
        }
      }
  }
  get constraintValueList() {
    return this.formCustom.controls["constraintValueList"] as FormArray;
  }
  addConstraintValueList(data:any) {
    const constraintValueForm = this.formCustom.controls.constraintValueList as FormArray;
    constraintValueForm.push(this.formBuilder.group({
      id:[],
      name: [data ?data.name:'', Validators.required],
      value: [data? data.value:'', Validators.required]
  }));
   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formCustom.controls;
  }
  fi(index:number,name:string):boolean {
    return  (<FormArray>this.formCustom.get('constraintValueList')).controls[index].get(name).invalid;
  }
  onConstraintChange(event:any){
    this.contraintType=null;    
    this.clearFormArray(this.constraintValueList);
    let value=event && event.code ?event.code:0;
    console.log(event,value)
    if(value==1)//required
    {
      this.formCustom.get("constraintValue").setValue(true);
    }
    else if(value==2)//Dropdown
    {      
      if(this.constraintValueList.length==0){
       
        this.addConstraintValueList(null);       
      }
      this.contraintType=2;
    }
    else {
      this.contraintType=3;     
      this.addConstraintValueList(null); 
    }
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
save(){ 
  this.submitted=true;   
  if(this.formCustom.valid){
    let formValue=this.formCustom.value;
    let isNameExist=false;
    let isSequenceExist=false;
    let updateExitingfield=false;
    if(formValue.id==0 || formValue.id==null){//for new
      updateExitingfield=this.customFields.filter(
        (x)=>x.name.toLowerCase()==formValue.name.toLowerCase() && x.id==formValue.id
       ).length>0
      isNameExist=this.customFields.filter(
        (x)=>x.name.toLowerCase()==formValue.name.toLowerCase() && x.id!=formValue.id).length>0;
      isSequenceExist=this.customFields.filter((x)=>x.sequence==formValue.sequence&& x.id!=formValue.id).length>0;
    }
    else if(formValue.id>0 ){// for update
      isNameExist=this.customFields.filter((x)=>x.name.toLowerCase()==formValue.name.toLowerCase() && x.id!=formValue.id).length>0;
      isSequenceExist=this.customFields.filter((x)=> x.id!=formValue.id && x.sequence==formValue.sequence).length>0;
    }
    if(isNameExist || isSequenceExist)
    {
      if(isNameExist)
        this.messageService.add({ severity: 'error', summary: 'Field Name already exist please choose another', detail: null });
      if(isSequenceExist)
        this.messageService.add({ severity: 'error', summary: 'Sequence is already define, please change the sequence', detail: null });
    }
    else
    {
      if(formValue.constraint?.code==2 || formValue.constraint?.code==3){
        formValue.constraintValueList=JSON.stringify(formValue.constraintValueList);
      }
      else if(formValue.constraint?.code==1){
        formValue.constraintValueList='required'
      }
      let constraintValueList=formValue.constraintValueList;
      let data:IEntityNodeTypCustomFieldsModel={
        id:formValue.id?formValue.id:0,
        entityNodeTypeId:formValue.entityNodeTypeId?formValue.entityNodeTypeId:0,
        fieldName:formValue.name,
        fieldType:JSON.stringify(formValue.type),
        fieldConstraint:JSON.stringify(formValue.constraint),
        fieldConstraintValue:formValue.constraintValueList,
        groupName:formValue.group_name,
        sequence:formValue.sequence ?formValue.sequence :0,
        isVisibility:true,
        isBlocked:false,
      }
      if(formValue.id>0)
      {
        let fields=this.customFields;
        this.customFields.forEach((x,index)=>{
          if(x.id==formValue.id){
            fields[index]={...data}
          }
        })
        this.customFields=fields;
        console.log(this.customFields)
      }
      else{
        if(updateExitingfield){
          this.customFields=this.customFields.map((x)=>{
            if(x.name==this.product.name){
              x={
                name:formValue.name,
                type:formValue.type.name,
                constraint:formValue.constraint.name,
                ...data
              }
            }
            return x;
          });
        }
        else{
          this.customFields.push({
            name:formValue.name,
            type:formValue.type.name,
            constraint:formValue.constraint.name,
            ...data
          });
        }
      }
      
      this.newItemEvent.emit(this.customFields);
      this.formCustom.reset();
      this.submitted=false;
      this.contraintType=null; 
    }
  }
}
editProduct(product: any) {
  this.product = { ...product };
  this.bindFormGroup(this.product)
  console.log(this.product)

}

deleteProduct(product: any) {  
  this.product = { ...product };
  if(this.product.id==0 || this.product.id==null)
  {
    this.customFields=this.customFields.filter((x)=>x.name!=this.product.name);
  }
  else{
    this.customFields.forEach(element => {
      if(element.name==product.name){
        element.isBlocked=true;
      }
    });
  }
  
  this.newItemEvent.emit(this.customFields);
}
cancel(){
  this.formCustom.reset();
}
ngOnChanges(){
  if(this.isResetDone){
    this.formCustom.reset();
    this.customFields=[];
    this.clearFormArray(this.constraintValueList);
  }
}
}
