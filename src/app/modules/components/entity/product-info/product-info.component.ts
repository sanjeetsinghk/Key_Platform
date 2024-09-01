import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ISelectedCompanyDto } from 'src/app/modules/models/company-selection.model';
import { IEntityInfoDetails } from 'src/app/modules/models/entity-info-details.model';
import { EntityInfoModel } from 'src/app/modules/models/entity-info.model';
import { IEntityTypeModel } from 'src/app/modules/models/entity-type.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { EntityTypeService } from 'src/app/modules/service/entity-type.service';
import { Utility } from 'src/app/modules/utility/utility';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  providers:[DialogService,MessageService]
})
export class ProductInfoComponent {
  productForm:FormGroup;
  productFormArr:FormGroup;
  @Input() entityTypeList:IEntityTypeModel[];
  @Output() savedProductEvent = new EventEmitter<EntityInfoModel>();
  @Input() selectedProduct:EntityInfoModel;
  constructor(private cdr:ChangeDetectorRef,private utility:Utility,private authService:AuthService,private entityInfoService:EntityInfoService,private entityTypeService:EntityTypeService,private formBuilder: FormBuilder){
    
  }
  labels:any;
  productTypeList:IEntityTypeModel[]=[];
  submitted:boolean=false;
  ngOnInit(){
   this.bindEntityForm(null);
   
  }
  bindEntityForm(data:EntityInfoModel){
    let entityType;
    if(data && data!=null)
      entityType=this.entityTypeList.filter((x)=>x.id==parseInt(data.entityTypeId))[0]
    this.productForm=this.formBuilder.group({
      id:[data?.id || 0],
      productType:[entityType,[Validators.required]],
      productName:[data?.name,[Validators.required]],
      baseCode:[data?.baseCode],
      description:[data?.description],
      groupArr:this.formBuilder.array([])
    })
    if(data && data!=null){
      const orderPriority = data.entityInfoDetailsList
      .map(o => o.groupName)
      .reduce((map, category, idx) => {
        if (map[category] == null) {
          map[category] = idx;
        }
        return map;
      }, {}); 
      let sortedArray=  data.entityInfoDetailsList.sort((a, b) => orderPriority[a.groupName] - orderPriority[b.groupName]);
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
      entityTypeId:[data.entityTypeId],
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
      selectedValue:[this.utility.isContainJson(data.selectedValue)?JSON.parse(data.selectedValue):data.selectedValue,attributeType=='required'?Validators.required:null]
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
  onEntityTypeSelect(event:IEntityTypeModel){
    //this.productForm.reset();
    this.groupArrList().clear();
    
    const orderPriority = event.entityCustomFields
      .map(o => o.groupName)
      .reduce((map, category, idx) => {
        if (map[category] == null) {
          map[category] = idx;
        }
        return map;
      }, {});  
      let sortedArray=  event.entityCustomFields.sort((a, b) => orderPriority[a.groupName] - orderPriority[b.groupName]);
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
      items.forEach((x)=>{
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
            id:x.id || 0,
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
      let data:EntityInfoModel={
        id:value.id ||0,
        companyId:this.authService.getSelectedCompany(),
        userid:this.authService.getUserId(),
        name:value.productName,
        labels:this.labels?this.labels.join(","):'',
        description:value.description,
        baseCode:value.baseCode,
        entityTypeId:value.productType.id,
        isBlocked:false,
        entityInfoDetailsList:groupArrItems
      }
      if(this.selectedProduct){
        this.entityInfoService.updateEntityType(data).subscribe({
          next:(resp)=>{
              this.savedProductEvent.emit(resp.resultData)
          }
        })
      }
      else
      {
        this.entityInfoService.saveEntityType(data).subscribe({
          next:(resp)=>{
              this.savedProductEvent.emit(resp.resultData)
          }
        })
      }
      console.log(data);
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
    this.productForm.reset();
  }
}
