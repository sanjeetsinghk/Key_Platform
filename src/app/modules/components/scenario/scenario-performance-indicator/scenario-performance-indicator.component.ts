import { Component, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FilterService, MenuItem, SelectItemGroup, TreeNode } from 'primeng/api';
import { SuggestionLists } from 'src/app/modules/constants/suggestions-list';
import { EntityTreeModel } from 'src/app/modules/models/entity-tree.model';
import { EntityInfoService } from 'src/app/modules/service/entity-info.service';
import { ScenarioService } from 'src/app/modules/service/scenario.service';
import { Utility } from 'src/app/modules/utility/utility';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-scenario-performance-indicator', 
  templateUrl: './scenario-performance-indicator.component.html',
  styleUrl: './scenario-performance-indicator.component.scss'
})
export class ScenarioPerformanceIndicatorComponent {
  @Input() entityTreeData:EntityTreeModel;
  suggestionList:SelectItemGroup[]|undefined;
  filteredGroups: any[] | undefined;
  files: TreeNode[] = [];
  selectedFiles3: TreeNode = {};
  productForm:FormGroup;
  fields:any[]=[];
  menuItems!: MenuItem[];
  downloadJsonHref:any;
  dimensionList:{ label?: string; icon?: string; separator?: boolean }[]=[];
  constructor(
    private router:Router,
    private sanitizer:DomSanitizer,
    private entityInfoService:ScenarioService,
    private formBuilder:FormBuilder,
    private utility:Utility,
    private filterService: FilterService){}

  ngOnInit(){
   this.bindProductForm(null);
   this.menuItems = [        
    { label: 'Remove Node', icon: 'pi pi-times', command: (event) => this.unselectFile() }
  ];
  }
  bindProductForm(data:any){
    this.productForm=this.formBuilder.group({
      groupArr:this.formBuilder.array([])
    })
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
  addNewMetrics(){
    this.addGroupArrList(null,this.utility.generateGuid());
  }
  deleteMetrics(index:number){
    let data=this.groupArrList() 
    data.removeAt(index);
  }
  addGroupArrList(item:any,key:string) {
    try{
      const constraintValueForm = this.productForm.controls.groupArr as FormArray;
      constraintValueForm.push(this.formBuilder.group({
        key:[key],
        name:[item?.name],
        customName:[item?.customName],
        itemValue:[item?.totalValue],
        calculation:[item?.calculation 
          ? item.calculation
          : undefined],
        value:[item?.value 
          ? item.value
        : ''],
        precesion:[item?.precesion
          ? item.precesion
          : ''
        ]
      }));
    }
    catch(err){
      console.log(err)
    }
  }
  ngOnChanges(changes:SimpleChanges){   
    if(this.entityTreeData){
      let treeNode=JSON.parse(this.entityTreeData.treeNode);
      console.log(treeNode)
      this.files=[JSON.parse(this.entityTreeData.treeNode)];
      this.files[0].data?.performanceIndicators?.groupArr?.forEach((item:TreeNode)=>{
        this.addGroupArrList(item,item.key);
      })
      this.generateDownloadJsonUri();
    }
  }
  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.files);
    console.log(theJSON)
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }
  nodeSelect(event:any){    
    if(event.node?.data?.obj && event.node.data.obj)
    {
      let obj=JSON.parse(event.node.data.obj);  
      let children=this.getSelectedNodeChildren(obj.entityNodeTypeFields || obj.entityInfoDetailsList,event.node )
      let items=[
        {label:'dimension1',value:event.node.key+'<==>'+'dimension1',calculatedValue:this.checkForTextandQuotes(obj?.dimension1Value),nodeName:event.node.data.customlabel},
        {label:'dimension2',value:event.node.key+'<==>'+'dimension2',calculatedValue:this.checkForTextandQuotes(obj?.dimension2Value),nodeName:event.node.data.customlabel},
        {label:'dimension3',value:event.node.key+'<==>'+'dimension3',calculatedValue:this.checkForTextandQuotes(obj?.dimension3Value),nodeName:event.node.data.customlabel},
        {label:'dimension4',value:event.node.key+'<==>'+'dimension4',calculatedValue:this.checkForTextandQuotes(obj?.dimension4Value),nodeName:event.node.data.customlabel},
        {label:'dimension5',value:event.node.key+'<==>'+'dimension5',calculatedValue:this.checkForTextandQuotes(obj?.dimension5Value),nodeName:event.node.data.customlabel},
        ...children
      ]
      this.fields=items;
      console.log(event.node)  
      console.log(obj);
      this.bindDimensionsList(obj);
    }  
  }
  checkForTextandQuotes(value:any){   
    if(typeof(value) ==='object'){
      value=value?.value;
    }
    if(isNaN(value))
      return "'"+value+"'";
    else
      return value;
  }
  getSelectedNodeChildren(children:any[],node:any ){
    let items=[];
    children.forEach((item:any)=>{
      items.push({
        label:item.fieldName,
        value:node.key+'<==>'+item.fieldName,
        calculatedValue:this.checkForTextandQuotes(item.selectedValue),
        nodeName:node.data.customlabel})
    })
    return items;
  }
  saveProduct(){
    console.log(this.productForm.value);
    let formValue=this.productForm.value.groupArr;
    formValue.forEach((item:any,index:number)=>{
     let calValue= this.calculateNodesValue(item.calculation);
     console.log(calValue);
     try{
      calValue=this.utility.toFixed(eval(calValue));
     }
     catch(err){
      console.log("try converting the parse float",calValue)
     }
     try{
      item.value=item.precesion?parseFloat(calValue).toPrecision(item.precesion):parseFloat(calValue);
      this.groupArrList().at(index).get("value").setValue(item.value)
     }
     catch(err){
      item.value=err;
      this.groupArrList().at(index).get("value").setValue(item.value)
     }
     
    });
    console.log(this.productForm.value);
    this.files[0].data.performanceIndicators=this.productForm.value
    // this.files.forEach((item:TreeNode)=>{
    //   item.children.forEach((item:TreeNode)=>{
    //     let filteredNode=formValue.filter((x)=>x.key==item.key)[0];
    //     if(filteredNode && typeof(filteredNode)=='object'){
    //       item.data.performanceIndicators=filteredNode;
    //     }
    //   })
    // });
    console.log(this.files)
    let saveData:EntityTreeModel={
      id:this.entityTreeData.id, 
      entityId :this.entityTreeData.entityId,
      userId:this.entityTreeData.userId,
      companyId:this.entityTreeData.companyId,
      treeNode:JSON.stringify(this.files[0]),
      isBlocked:false
    }
    this.entityInfoService.updateScenarioTree(saveData).subscribe({
      next:(resp)=>{
       
      }
    });
  }
  calculateNodesValue(item:any[]){
    let concatVal="";
    item.forEach(x=>{
      if(typeof(x.calculatedValue)=='object'|| this.utility.isContainJson(x.calculatedValue)){
       concatVal+=JSON.parse(x.calculatedValue).value;
      }
      else{
        if(x.calculatedValue=='++')
          concatVal+='+1';
        else if(x.calculatedValue=='--')
          concatVal+='-1';
        else
        concatVal+=x.calculatedValue;
      }
    });
    return concatVal;
  }
  getNodeListById(){

  }
  bindDimensionsList(obj:any){
    this.dimensionList=[
      {
        label:"Dimension 1 : "+(obj.dimension1Value ? obj.dimension1Value :0)
      },
      {
        label:"Dimension 2 : "+(obj.dimension2Value ?+obj.dimension2Value:0)
      },
      {
        label:"Dimension 3 : "+(obj.dimension3Value ? obj.dimension3Value:0)
      },
      {
        label:"Dimension 4 : "+(obj.dimension4Value ? obj.dimension4Value:0)
      },
      {
        label:"Dimension 5 : "+(obj.dimension5Value ? obj.dimension5Value:0)
      }
    ]
  }
  search(event: AutoCompleteCompleteEvent) {
    console.log(event)
    let suggestionLoist=SuggestionLists.map((x)=>{return {label:x,value:x,calculatedValue:x,nodeName:null}})   
    this.suggestionList =[... [...this.fields,...suggestionLoist,{label:event.query,value:event.query,calculatedValue:event.query,nodeName:null}].filter((x)=>x.label.toLowerCase().indexOf(event.query.toLowerCase())!=-1)];
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
  cancel(){
    this.router.navigate(['scenario']);
  }
  getSelectedNodesList(value:any[]){
    let list=[]
    if(value && value.length)
    {
      value.forEach((item)=>{
        list.push({key:item?.nodeName,value:item?.label})
      })
    }
    return list;
  }
}
