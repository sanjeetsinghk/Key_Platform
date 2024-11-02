import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

import { SuggestionLists } from 'src/app/modules/constants/suggestions-list';
import { EntityInfoModel } from 'src/app/modules/models/entity-info.model';
import { IEntityNodeTypeModel } from 'src/app/modules/models/entity-node-type.model';
import { EntityTreeModel } from 'src/app/modules/models/entity-tree.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { ScenarioService } from 'src/app/modules/service/scenario.service';
import { Utility } from 'src/app/modules/utility/utility';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-scenario-tree',  
  templateUrl: './scenario-tree.component.html',
  styleUrl: './scenario-tree.component.scss',
  providers:[MessageService]
})
export class ScenarioTreeComponent {
  items: any[] | undefined;
  selectedItem: any;
  suggestions:any[] | undefined=["sasa","sasa"];
  selectedItems: any[] | undefined;
  
  productForm:FormGroup;
  calculatedForm:FormGroup;
  files: TreeNode[] = [];
  selectedFiles3: TreeNode = {};
  @Input() selectedProduct:EntityInfoModel;
  @Input() entityNodeTypeList:IEntityNodeTypeModel[];
  @Output() onSavedEntityTreeEvent = new EventEmitter<EntityTreeModel>();
  selectedNodeType:IEntityNodeTypeModel;
  fields:any[]=[];
  calculatedProductDialog:boolean=false;
  showForm:boolean=false;
  nodeId:any;
  dim1val:any;
  dim2val:any;
  dim3val:any;
  dim4val:any;
  dim5val:any;
  entityId:number=0;
  entityTreeId:number=0;
  performanceMetrics:any[]=[];
  menuItems!: MenuItem[];
  downloadJsonHref:any;
  suggestItems:MenuItem[]=[];
  constructor(private sanitizer:DomSanitizer,
    private authService:AuthService,
    private entityInfoService:ScenarioService,
    private activeRouter:ActivatedRoute,
    private cdr:ChangeDetectorRef,
    private utility:Utility,
    private formBuilder:FormBuilder,
    private messageService:MessageService){    
  }
  ngOnInit(){
    this.bindEntityForm(null);
   
  }
  ngAfterViewInit(){
    if(this.entityId==0){
      this.activeRouter.params.subscribe(result =>
        {          
          this.entityId=result["id"];
          if(!isNaN(this.entityId)){
            this.entityInfoService.getScenarioTreeDetails(this.entityId).subscribe({
              next:(resp)=>{
                console.log(resp.resultData)
                if(resp.resultData){
                  let data=resp.resultData;
                  this.onSavedEntityTreeEvent.emit(resp.resultData);
                  this.entityTreeId=data.id;
                  this.files=[JSON.parse(data.treeNode)];
                  this.expandAll();
                  this.bindPerformanceMetrics();
                  this.generateDownloadJsonUri();
                }
              }
            })
          }
          else
          {
            this.bindEntityForm(null); 
          }
        })
        this.menuItems = [        
          { label: 'Remove Node', icon: 'pi pi-times', command: (event) => this.unselectFile() }
        ];
    }
  }
  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.files);
    console.log(theJSON)
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }
  unselectFile() {
    console.log(this.selectedFiles3);
    if(this.files[0]==this.selectedFiles3.key)
    {
      this.files=[];
    }
    else{
      this.deleteAndInsertNode(this.files[0])
    }
  }
  deleteAndInsertNode(data:TreeNode){
    try{
      if(data.children.filter((x)=>x.key==this.selectedFiles3.key.toString()).length>0){
        data.children=data.children.filter((x)=>x.key!==this.selectedFiles3.key.toString());        
        return;
      }
      else
      {
        data.children.forEach((x)=>{
          this.deleteAndInsertNode(x)
        })
      
      }
    }
    catch(err){
      console.log(err)
    }
  }
  bindEntityForm(data:IEntityNodeTypeModel){
    this.productForm=this.formBuilder.group({
      companyId:[data?.companyId],
      dimension1:[data?.defaultCostFormula? data?.defaultCostFormula:undefined],
      dimension1Value:[data?.dimension1Value],
      dimension2:[data?.defaultLeadTimeFormula?data?.defaultLeadTimeFormula:undefined],
      dimension2Value:[data?.dimension3Value],
      dimension3:[data?.dimension3?data?.dimension3:undefined],
      dimension3Value:[data?.dimension3Value],
      dimension4:[data?.dimension4?data?.dimension4:undefined],
      dimension4Value:[data?.dimension4Value],
      dimension5:[data?.dimension5?data?.dimension5:undefined],
      dimension5Value:[data?.dimension5Value],
      description:[data?.description],
      id:[data?.id],
      isBlocked:[data?.isBlocked],
      labels:[data?.labels],
      name:[data?.name],
      userid:[data?.userid],
      groupArr:this.formBuilder.array([])
    })
    if(data && data!=null){
      let fieldsType=data?.entityNodeTypeFields || data?.entityNodeInfoDetailsList ||  data?.entityInfoDetailsList
      const orderPriority = fieldsType
      .map(o => o.groupName)
      .reduce((map, category, idx) => {
        if (map[category] == null) {
          map[category] = idx;
        }
        return map;
      }, {}); 
      let sortedArray=  fieldsType.sort((a, b) => orderPriority[a.groupName] - orderPriority[b.groupName]);
      this.sortingArrangements(sortedArray);
    }
  }
  sortingArrangements(sortedArray:any[]){
    try{
        // Now implement the sort based on the priorty map we created:
      this.fields=[];
        let unique = [...new Set(sortedArray.map((x)=>x.groupName))];
        console.log(event);
        console.log(sortedArray);
        console.log(unique)
        unique.forEach((item,index)=>{
          this.addGroupArrList(item);
          let items=sortedArray.filter((x:any)=>x.groupName==item);
          items.forEach((x)=>{
            this.fields.push(x.fieldName);
            this.addGroupArrItemsList(x,index);
          });
        });
        console.log(this.productForm.controls);
        console.log(this.groupArrList().controls);
        // sortedArray.forEach((x)=>{
        //   this.addGroupArrList(x);
        // })
    }
    catch(err){
      console.log(err)
    }
  }
  groupArrList():FormArray {
    try{
      return this.productForm.controls["groupArr"] as FormArray;
    }
    catch(err){
      console.log(err);
      return null;
    }
  }
  groupArrItemsList(index:number):FormArray {
    try{
      return this.groupArrList().at(index).get('groupArrItems') as FormArray;
    }
    catch(err){
      console.log(err);
      return null;
    }
  }
  addGroupArrItemsList(data:any,index:number) {
    try{
      let elementType=JSON.parse(data.fieldType).name;
      let attributeType=this.utility.isContainJson(data.fieldConstraint)?JSON.parse(data.fieldConstraint).name:null;
      let attributeValues=attributeType=='Required'
        ?'required': attributeType=='Range'
        ?this.utility.getRange(data.fieldConstraintValue):this.utility.getDDLists(data.fieldConstraintValue)
        console.log(attributeValues)
      this.groupArrItemsList(index).push(this.formBuilder.group({
        id:[data.id],      
        entityNodeTypeId:[data.entityNodeTypeId],
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
        selectedValue:[data.selectedValue?this.utility.isContainJson(data.selectedValue)?JSON.parse(data.selectedValue):data.selectedValue:'',attributeType=='required'?Validators.required:null]
      }));
    }
    catch(err){
      console.log(err)
    }
  }
  addGroupArrList(data:any) {
    try{
      const constraintValueForm = this.productForm.controls.groupArr as FormArray;
      constraintValueForm.push(this.formBuilder.group({
        name:[data],
        groupArrItems:this.formBuilder.array([])
      }));
    }
    catch(err){
      console.log(err)
    }
  }
  addedNode(){
    if(Object.keys(this.selectedFiles3).length === 0){
      this.messageService.add({ severity: 'error', summary: 'Please select node to add the node type', detail: null });
    }
    else
    {
      this.findAndInsertNode(this.files[0]);
     // this.bindEntityForm(this.selectedNodeType)
      //this.expandAll();
      //this.cdr.detectChanges();
    }
  }
  findAndInsertNode(data:TreeNode){
    try{
      if(data.key==this.selectedFiles3.key){
        let isChildrenAlreadyAdded=data.children.filter((x)=>x.key==this.selectedNodeType.id.toString()).length>0;
        if(isChildrenAlreadyAdded){
          data.children=[...data.children.map((x)=>{
            if(x.key==this.selectedNodeType.id.toString()){
                x.data={
                  qty:(x.data.qty+1),
                  totalValue:x.data.totalValue,
                  obj:x.data.obj,
                  customlabel:x.data?.customlabel,
                  performanceIndicators:x.data?.performanceIndicators
              }
            }
            return x;
          })]
        }
        else{
          data.children.push({
            "key": this.selectedNodeType.id.toString()+Math.random(),
            "label": this.selectedNodeType.name,
            "data": {
              qty:1,
              totalValue:0,
              obj:JSON.stringify(this.selectedNodeType),
              performanceIndicators:null,
              customlabel:this.selectedNodeType.name
            },
            "icon": "pi pi-fw pi-cog",        
            "children":[]
          })
        }
      }
      else
      {
        data.children.forEach((x)=>{
          this.findAndInsertNode(x)
        })
      
      }
    }
    catch(err){
      console.log(err)
    }
  }
  onEntityNodeTypeSelect(event:any){
    console.log(this.selectedFiles3)
    this.selectedNodeType=event
  }
  ngOnChanges(){
    if(this.selectedProduct && this.entityTreeId==0){
      console.log(this.selectedProduct)
      this.files = [{
        label: this.selectedProduct.name,
        key:this.selectedProduct.id.toString(),
        data:{
          qty:1,
          totalValue:0,
          obj:JSON.stringify(this.selectedProduct),
          performanceIndicators:null,
          customlabel:this.selectedProduct.name
        },
        children:  []
      }];
      this.expandAll();
    }    
  }
  expandAll() {
    this.files.forEach((node) => {
        this.expandRecursive(node, true);
    });
}

collapseAll() {
    this.files.forEach((node) => {
        this.expandRecursive(node, false);
    });
}
saveProduct(){
  console.log(this.productForm.value);
  if(this.productForm.valid){
    let totalValue=this.reCalculateFields();
    this.productForm.get("dimension1Value").setValue(this.dim1val);
    this.productForm.get("dimension2Value").setValue(this.dim2val);
    this.productForm.get("dimension3Value").setValue(this.dim3val);
    this.productForm.get("dimension4Value").setValue(this.dim4val);
    this.productForm.get("dimension5Value").setValue(this.dim5val);
    this.rebindNodeAfterCalculations(totalValue);
  }
}
reCalculateFields(){
  this.dim1val="";this.dim2val="";this.dim3val="";this.dim4val="";this.dim5val="";
    let value =this.productForm.value;
    let totalValue=0;
    this.getAllNodesCalculatedFields();
    if(value.dimension1){
      try{
        let dim1=typeof(value.dimension1) =='object'? eval(this.getDimensionsValue(value.dimension1)):value.dimension1;
        console.log(dim1);
        this.dim1val=dim1;
        totalValue+=dim1;
      }
      catch(error){
        this.dim1val=error
      }
    }
    if(value.dimension2){
      try{
        let dim1=typeof(value.dimension2) =='object'? eval(this.getDimensionsValue(value.dimension2)):value.dimension2;
        console.log(dim1);
        this.dim2val=dim1;
        totalValue+=dim1;
      }
      catch(err){
        this.dim2val=err;
      }
    }
    if(value.dimension3){
      try{
        let dim1=typeof(value.dimension3) =='object'? eval(this.getDimensionsValue(value.dimension3)):value.dimension3;
        console.log(dim1);
        this.dim3val=dim1;
        totalValue+=dim1;
      }
      catch(err){
        this.dim3val=err;
      }
    }
    if(value.dimension4){
      try{
        let dim1=typeof(value.dimension4) =='object'? eval(this.getDimensionsValue(value.dimension4)):value.dimension4;
        console.log(dim1);
        this.dim4val=dim1;
        totalValue+=dim1;
      }
      catch(err){
        this.dim4val=err;
      }
    }
    if(value.dimension5){
      try{
        let dim1=typeof(value.dimension5) =='object'? eval(this.getDimensionsValue(value.dimension5)):value.dimension5;
        console.log(dim1);
        this.dim5val=dim1;
        totalValue+=dim1;
      }
      catch(err){
        this.dim5val=err;
      }
    }
    return totalValue;
}
rebindNodeAfterCalculations(total:any){
  let data=this.productForm.value;
  let nodeFields=[];
  data.groupArr.forEach((item)=>{
    item.groupArrItems.forEach((x)=>{
      nodeFields.push(x);
    })
  })
  let obj={
    companyId:data.companyId,
    defaultCostFormula: data.dimension1,
    dimension1Value:data.dimension1Value,
    defaultLeadTimeFormula:data.dimension2,
    dimension2Value:data.dimension2Value,
    dimension3:data.dimension3,
    dimension3Value:data.dimension3Value,
    dimension4:data.dimension4,
    dimension4Value:data.dimension4Value,
    dimension5:data.dimension5,
    dimension5Value:data.dimension5Value,
    description:data.description,
    entityNodeTypeFields:nodeFields,
    id:data.id,
    isBlocked:data.isBlocked,
    labels:data.labels,
    name:data.name,
    userid:data.userid,
  }
  this.findAndUpdateNode(this.files[0],obj,total);
  this.bindPerformanceMetrics();
  this.cdr.detectChanges();
  console.log(this.files[0]);

  let saveData:EntityTreeModel={
    id:this.entityTreeId, 
    entityId :this.entityId,
    userId:this.authService.getUserId(),
    companyId:this.authService.getSelectedCompany(),
    treeNode:JSON.stringify(this.files[0]),
    isBlocked:false
  }
  
  this.entityInfoService.updateScenarioTree(saveData).subscribe({
    next:(resp)=>{
      this.entityTreeId=resp.resultData.id;
      this.onSavedEntityTreeEvent.emit(saveData);
    }
  });
}
bindPerformanceMetrics(){
  this.performanceMetrics=[];
  this.files[0].children.forEach((item)=>{
    this.performanceMetrics.push({
      name:item.label,
      value:item.data.totalValue
    })
  });
}
findAndUpdateNode(data:TreeNode,obj:any,totalVal:any){
  if(data.key==this.nodeId){
    data.data={
      qty:
      (data.data.qty),
      totalValue:(totalVal* data.data.qty),
      obj:JSON.stringify(obj),
      performanceIndicators:data.data?.performanceIndicators,
      customlabel:data.data?.customlabel
    }
  }
  else
  {
    data.children.forEach((x)=>{
      this.findAndUpdateNode(x,obj,totalVal)
    })
   
  }
}
getDimensionsValue(dimension:any[]){
  let traverseVal="";
  dimension.forEach((x)=>{
    if(this.nodes.filter((element)=>element.name==x).length>0)
      {
        let val=this.nodes.filter((element)=>element.name==x)[0].value;
        traverseVal+=val;
      }
      else
      {
        let selectedValue=this.getFieldsValue(x);
        if(selectedValue){
          if(this.utility.isContainJson(selectedValue) && Object.keys(selectedValue).length>0)
            traverseVal+=selectedValue?.value;
          else
            traverseVal+=selectedValue;
        }
        else
        {
          if(x=='++')
            traverseVal+='+1';
          else if(x=='--')
            traverseVal+='-1';
          else
            traverseVal+=x;
        }
      }
  });
  return traverseVal;
}
getFieldsValue(fieldName:string){ 
  let selectedValue:any;
  this.productForm.value.groupArr.forEach((item)=>{
    item.groupArrItems.forEach((x)=>{
      if(x.fieldName.toLowerCase()== fieldName.toLowerCase()){
        if(typeof(x.selectedValue)==='object')
          selectedValue= x.selectedValue.value;// drop down calulcation to get value
        else
          selectedValue= x.selectedValue;
      }
    });
  });
  return selectedValue;
}
cancel(){

}
private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
        node.children.forEach((childNode) => {
            this.expandRecursive(childNode, isExpand);
        });
    }
}
clearFormArray = (formArray: FormArray) => {
  while (formArray.length !== 0) {
    formArray.removeAt(0)
  }
}
nodeSelect(event:any){
  this.showForm=false;
  if(event.node?.data?.obj && event.node.data.obj)
  {
    this.selectedItem=event.node;
    let obj=JSON.parse(event.node.data.obj);    
    this.clearFormArray(this.groupArrList());
    this.productForm.reset();
        
    this.bindEntityForm(obj);
    this.showForm=true;
    console.log(JSON.parse(event.node.data.obj));
    this.nodeId=event.node.key;
    this.reCalculateFields();
    this.suggestions= Array.from([...this.nodes.map((x)=>x.name),...this.fields]);
    
  }  
}

search(event: AutoCompleteCompleteEvent) {
  console.log(event)
  //this.suggestions = Array.from([...this.fields,...SuggestionLists])
 // return this.suggestions=[... this.suggestions = Array.from(this.brands)];
  this.suggestions =[... [...this.fields,...SuggestionLists,event.query].filter((x)=>x.toLowerCase().indexOf(event.query.toLowerCase())!=-1)];
}
nodes:any[]=[];
focusElement:string;
getAllNodesCalculatedFields(){
  this.getRecursiveNodes(this.files);
  this.bindAllNodesList(this.files);
}
focusFunction(focusElement:string){
  console.log(focusElement);
  this.focusElement=focusElement;
}
addToDimension(event:any,label:string){
  console.log(event);
  console.log(label);
  console.log(this.focusElement);
  if(this.focusElement!==undefined){
    let _selectedValue=this.productForm.get(this.focusElement).value;
    if(_selectedValue && typeof(_selectedValue)==='object')
      _selectedValue.push(label);
    else
    _selectedValue=[label]
    this.productForm.get(this.focusElement).setValue(_selectedValue);
  }
  
}
getChildrenNodes(node:TreeNode[]){
  let nodes=[];
  node.forEach(element => {
    nodes.push({
      label: element.label, icon: 'pi pi-plus', command: (event) => this.addToDimension(event,element.label),
      items:this.getChildrenNodes(element.children)
    })
  });
  return nodes
}
bindAllNodesList(node:TreeNode[]){
  this.suggestItems=[];
  node.forEach((x)=>{
    this.suggestItems.push(
      { 
        label: x.label, icon: 'pi pi-plus', command: (event) => this.addToDimension(event,x.label),
        items:x.children && x.children.length>0?this.getChildrenNodes(x.children):[]
      }
    )
  });
}
getRecursiveNodes(node:TreeNode[]){   
  node.forEach((x)=>{
    this.nodes.push({
      name:x?.label,
      value:x?.data?.totalValue
    });
    if(x.children && x.children.length>0){
      this.getRecursiveNodes(x.children)
    }
    
  })
 
  console.log(this.nodes)
}
saveCalculation(){}
}
