import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';

import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';

import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

import { InputGroupModule } from 'primeng/inputgroup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';

import { ScenarioComponent } from '../scenario/scenario.component';
import { ScenarioRoutingModule } from './scenario-routing.module';
import { ScenarioTreeComponent } from '../scenario-tree/scenario-tree.component';
import { ScenarioInfoComponent } from '../scenario-info/scenario-info.component';
import { ScenarioListComponent } from '../scenario-list/scenario-list.component';
import { ScenarioPerformanceIndicatorComponent } from '../scenario-performance-indicator/scenario-performance-indicator.component';
import { ContextMenuModule } from 'primeng/contextmenu';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,        
        ToastModule,
        ToolbarModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        DynamicDialogModule,
        CheckboxModule,
        ReactiveFormsModule,
        TagModule,
        ChipsModule,
        DividerModule,
        TabViewModule,
        PanelModule,
        ScenarioRoutingModule,
        TreeModule,
		TreeTableModule,
        InputGroupModule,
        AutoCompleteModule,
        CardModule,
        ContextMenuModule
    ],
    declarations: [ScenarioComponent,ScenarioTreeComponent,
        ScenarioInfoComponent,
        ScenarioListComponent,
        ScenarioPerformanceIndicatorComponent,
        ScenarioComponent
    ]
})
export class ScenarioModule { }
