import { Component, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { EntityInfoModel } from 'src/app/modules/models/entity-info.model';
import { IEntityNodeTypeModel } from 'src/app/modules/models/entity-node-type.model';

@Component({
  selector: 'app-entity-tree',  
  templateUrl: './entity-tree.component.html',
  styleUrl: './entity-tree.component.scss'
})
export class EntityTreeComponent {
  files3: TreeNode[] = [];
  selectedFiles3: TreeNode = {};
  @Input() selectedProduct:EntityInfoModel;
  @Input() entityNodeTypeList:IEntityNodeTypeModel[];
  constructor(){
    
  }
  ngOnInit(){
   
  }
  onEntityNodeTypeSelect(Event:any){

  }
  ngOnChanges(){
    if(this.selectedProduct){
    this.files3 = [{
      label: this.selectedProduct.name,
      children:  [
        {
            "key": "0",
            "label": "Documents",
            "data": "Documents Folder",
            "icon": "pi pi-fw pi-inbox",
            "children": [{
                "key": "0-0",
                "label": "Work",
                "data": "Work Folder",
                "icon": "pi pi-fw pi-cog",
                "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
            },
            {
                "key": "0-1",
                "label": "Home",
                "data": "Home Folder",
                "icon": "pi pi-fw pi-home",
                "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
            }]
        }]
    }];
  }
  }
}
