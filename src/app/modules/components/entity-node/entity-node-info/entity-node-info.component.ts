import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { RolePermission } from 'src/app/modules/constants/role-permission';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';
import { IEntityInfoDetails } from 'src/app/modules/models/entity-info-details.model';
import { EntityInfoModel } from 'src/app/modules/models/entity-info.model';
import { IEntityNodeTypeModel } from 'src/app/modules/models/entity-node-type.model';
import { EntityNodeInfoModel } from 'src/app/modules/models/entity-node.model';
import { IEntityTypeModel } from 'src/app/modules/models/entity-type.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { AuthState } from 'src/app/modules/service/auth.state';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { EntityNodeTypeService } from 'src/app/modules/service/entity-node-type.service';
import { EntityTypeService } from 'src/app/modules/service/entity-type.service';
import { Utility } from 'src/app/modules/utility/utility';

@Component({
  selector: 'app-entity-node-info',
  templateUrl: './entity-node-info.component.html',
  styleUrl: './entity-node-info.component.scss',
  providers:[DialogService,MessageService]
})
export class EntityNodeInfoComponent {
  productForm:FormGroup;
  productFormArr:FormGroup;
  createEntityandEntityNode:boolean=false;
  @Input() entityNodeTypeList:IEntityTypeModel[];
  @Output() savedProductEvent = new EventEmitter<EntityInfoModel>();
  @Input() selectedProduct:EntityInfoModel;
  constructor(private router:Router,private messageService:MessageService,private cdr:ChangeDetectorRef,private utility:Utility,private authService:AuthService,private entityInfoService:EntityInfoService,private entityNodeTypeService:EntityNodeTypeService,private formBuilder: FormBuilder,private authState:AuthState){
    this.createEntityandEntityNode=this.authState.GetUserPermission(RolePermission.createEntityandEntityNode);
  }
  labels:any;
  productTypeList:IEntityTypeModel[]=[];
  submitted:boolean=false;
  ngOnInit(){
   this.bindEntityForm(null);
   
  }
  bindEntityForm(data:EntityNodeInfoModel){
    let entityType;
    if(data && data!=null)
      entityType=this.entityNodeTypeList.filter((x)=>x.id==parseInt(data.entityTypeId))[0]
    this.productForm=this.formBuilder.group({
      id:[data?.id || 0],
      productType:[entityType,[Validators.required]],
      productName:[data?.name,[Validators.required]],
      baseCode:[data?.baseCode],
      description:[data?.description],
      allowProductCloning:[ data !=null ? data?.allowProductCloning: true],
      groupArr:this.formBuilder.array([])
    })
    if(data?.id){
      this.productForm.get("productType").disable();
    }
    if(data && data!=null){
      const orderPriority =(data.entityNodeInfoDetailsList || data.entityInfoDetailsList)
      .map(o => o.groupName)
      .reduce((map, category, idx) => {
        if (map[category] == null) {
          map[category] = idx;
        }
        return map;
      }, {}); 
      let sortedArray=  (data.entityNodeInfoDetailsList || data.entityInfoDetailsList).sort((a, b) => orderPriority[a.groupName] - orderPriority[b.groupName]);
      this.sortingArrangements(sortedArray);
    }
  }
  fi(index:number,name:string):boolean {
    return  (<FormArray>this.productForm.get('groupArr')).controls[index].get(name).invalid;
  }
  fiItems(pIndex:number,cIndex:number,name:string):boolean {
    let pControls=(<FormArray>this.productForm.get('groupArr')).controls[pIndex];
    return (<FormArray>pControls.get("groupArrItems")).controls[cIndex].get(name).invalid;
  }
  groupArrList():FormArray {
    return this.productForm.controls["groupArr"] as FormArray;
  }
  addGroupArrList(data:any) {
    const constraintValueForm = this.productForm.controls.groupArr as FormArray;
    constraintValueForm.push(this.formBuilder.group({
      name:[data],
      groupArrItems:this.formBuilder.array([])
    }));
  }
  groupArrItemsList(index:number):FormArray {
    return this.groupArrList().at(index).get('groupArrItems') as FormArray;
  }
  addGroupArrItemsList(data:any,index:number) {
    let elementType=JSON.parse(data.fieldType).name;
    let attributeType=this.utility.isContainJson(data.fieldConstraint)?JSON.parse(data.fieldConstraint).name:null;
    let attributeValues=attributeType=='Required'
      ?'required': attributeType=='Range'
      ?this.utility.getRange(data.fieldConstraintValue):this.utility.getDDLists(data.fieldConstraintValue)
      console.log(attributeValues)
    this.groupArrItemsList(index).push(this.formBuilder.group({
      id:[data.id],
      entityTypeFieldId:[this.selectedProduct?data.entityTypeFieldId: data.id],
      entityTypeId:[data.entityTypeId || data.entityNodeTypeId],
      fieldConstraint:[data.fieldConstraint],
      fieldConstraintValue:[data.fieldConstraintValue],
      fieldName: [data.fieldName],
      fieldType: [data.fieldType],
      groupName:[data.groupName],
      isBlocked:[data.isBlocked],
      isVisibility:[data.isVisibility],
      sequence:[data.sequence],
      elementType:[elementType],
      attributeType:[attributeType],
      attributeValues:[attributeValues],
      selectedValue:[this.utility.isContainJson(data.selectedValue)?JSON.parse(data.selectedValue):data.selectedValue,attributeType=='Required'?[Validators.required]:elementType=='Number' && attributeType =='Range'? [Validators.min(attributeValues.min),Validators.max(attributeValues.max)]:[]]
    }));
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  fields:any[]=[]
  onEntityTypeSelect(event:IEntityNodeTypeModel){
    //this.productForm.reset();
    this.groupArrList().clear();
    this.fields=[];
    const orderPriority = event.entityNodeTypeFields.filter((x)=>!x.isBlocked)
      .map(o => o.groupName)
      .reduce((map, category, idx) => {
        if (map[category] == null) {
          map[category] = idx;
        }
        return map;
      }, {});  
      let sortedArray=  event.entityNodeTypeFields.filter((x)=>!x.isBlocked).sort((a, b) => orderPriority[a.groupName] - orderPriority[b.groupName]);
      this.sortingArrangements(sortedArray);
  }
  sortingArrangements(sortedArray:any[]){
    // Now implement the sort based on the priorty map we created:
   
    let unique = [...new Set(sortedArray.map((x)=>x.groupName))];
    console.log(event);
    console.log(sortedArray);
    console.log(unique)
    unique.forEach((item,index)=>{
      this.addGroupArrList(item);
      let items=sortedArray.filter((x:any)=>x.groupName==item);
      items.forEach((x:any)=>{
        this.fields.push(x.fieldName);
        this.addGroupArrItemsList(x,index);
      });
    });
    console.log(this.productForm.controls);
    // sortedArray.forEach((x)=>{
    //   this.addGroupArrList(x);
    // })
  }
  saveProduct(){
    this.submitted=true;
    if(this.productForm.valid)
    {
      let value=this.productForm.value;
      console.log(value)
      let groupArrItems:IEntityInfoDetails[]=[];
      value.groupArr.forEach((x)=>{
        x.groupArrItems.forEach((item)=>{
          groupArrItems.push({
            id:this.selectedProduct ?item.id : 0,
            entityTypeFieldId:item.entityTypeFieldId,
            entityTypeId:item.entityTypeId,
            productInfoId:value.id,
            fieldName:item.fieldName,
            fieldType:item.fieldType,
            fieldConstraint:item.fieldConstraint,
            fieldConstraintValue:item.fieldConstraintValue,
            groupName:item.groupName,
            sequence:item.sequence,
            selectedValue:typeof(item.selectedValue)=='object'?JSON.stringify(item.selectedValue):item.selectedValue.toString(),
            visibility:true,
            isBlocked:false
          })
        })
      });
      let data:EntityNodeInfoModel={
        id:value.id ||0,
        companyId:this.authService.getSelectedCompany(),
        userid:this.authService.getUserId(),
        name:value.productName,
        labels:this.labels?this.labels.join(","):'',
        description:value.description,
        defaultCostFormula:value?.defaultCostFormula,
        defaultLeadTimeFormula:value?.defaultLeadTimeFormula,
        dimension3:value?.dimension3,
        dimension4:value?.dimension4,
        dimension5:value?.dimension5,
        baseCode:value.baseCode,
        entityTypeId:this.selectedProduct ?this.selectedProduct.entityTypeId:value.productType.id,
        isBlocked:false,
        allowProductCloning:value.allowProductCloning,
        entityNodeInfoDetailsList:groupArrItems
      }
      if(this.selectedProduct){
        this.entityNodeTypeService.updateEntityNode(data).subscribe({
          next:(resp)=>{
              this.savedProductEvent.emit(resp.resultData)
          }
        })
      }
      else
      {
        this.entityNodeTypeService.saveEntityNode(data).subscribe({
          next:(resp)=>{
              this.savedProductEvent.emit(resp.resultData)
          }
        })
      }
      console.log(data);
    }
    else
    {
      this.messageService.add({ severity: 'error', summary: 'Please fill or select the mandatory fields', detail: null });
    }
  }
  ngOnChanges(){
    if(this.selectedProduct){
      this.bindEntityForm(this.selectedProduct);
      this.labels=this.selectedProduct.labels.split(",")
      this.cdr.detectChanges();
    }
  }
  cancel(){
    this.router.navigate(['entitynode']);
  }
}
