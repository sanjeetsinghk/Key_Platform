import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EntityTreeModel } from 'src/app/modules/models/entity-tree.model';
import { ScenarioList } from 'src/app/modules/models/scenario-list.model';
import { ScenarioDto } from 'src/app/modules/models/scenarioDto';
import { ScenarioService } from 'src/app/modules/service/scenario.service';

@Component({
  selector: 'app-scenario', 
  templateUrl: './scenario.component.html',
  styleUrl: './scenario.component.scss',
  providers:[MessageService]
})
export class ScenarioComponent {
  @Input() entityTreeData:EntityTreeModel;
  Id:number=0;
  EntityTreeId:number=0;
  EntityName:string;
  Code:string;
  cols: any[] = [];
  entityList: ScenarioList[] = [];
  selectedProducts: ScenarioList[] = [];
  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  constructor(
    private scenarioService:ScenarioService,
    private messageService:MessageService,
    private router:Router
  ){}

  ngOnInit(){
    this.cols = [
      { field: 'id', header: 'Id' },
      { field:'ReferenceId',header:'reference'},
      { field: 'code', header: 'Code' },
      { field: 'productName', header: 'Product' },
      { field: 'status', header: 'Status' },
      { field: 'sP_Status', header: 'SP Status' },
      { field: 'productName', header: 'ProductName' },
      { field: 'labels', header: 'Labels' },
    ];
    this.getScenariosList();
  }
  ngOnChanges(changes:SimpleChanges){   
    if(this.entityTreeData){
      let treeNode=JSON.parse(this.entityTreeData.treeNode);
      this.EntityTreeId=this.entityTreeData.id;      
      this.Id=this.entityTreeData.entityId;
      this.EntityName=treeNode.label;
      console.log(this.entityTreeData);     
    }
  }
  saveScenario(){
    if(this.Code ==null || this.EntityTreeId==0 || this.Id==0)
    {
      this.messageService.add({ severity: 'error', summary: 'Please select entity to create scenarios', detail: null });
    }
    else
    {
      let scenarioDto:ScenarioDto={
        entityId:this.Id,
        entityTreeId:this.EntityTreeId,
        Name:this.EntityName,
        Code:this.Code
      }
      this.scenarioService.saveScenario(scenarioDto).subscribe({
        next:(resp)=>{
          this.getScenariosList();
        }
      })
    }
  }
  getScenariosList(){
    this.scenarioService.getScenarioList().subscribe({
      next:(resp)=>{
        this.entityList=resp.resultData;
      }
    })
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  onScenarioDetails(product:any){
    this.router.navigate(['scenario/details/'+product.entityId]);
    console.log(product)
  }
  onEntityDetails(product:any){
    this.router.navigate(['entity/details/'+product.referenceId]);
    console.log(product)
  }
}
