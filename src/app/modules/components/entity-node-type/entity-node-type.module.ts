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
import { EntityNodeTypeComponent } from './entity-node-type.component';
import { EntityNodeTypeDetailsComponent } from '../entity-node-type_details/entity-node-type-details/entity-node-type-details.component';
import { EntityNodeTypeRoutingModule } from './entity-node-type-routing.module';
import { EntityNodeTypeCustomFieldsComponent } from '../entity-node-type_details/entity-node-type-custom-fields/entity-node-type-custom-fields.component';
import { TwoDigitDecimaNumberDirective } from '../../directives/decima-number.directive';


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
        EntityNodeTypeRoutingModule
    ],
    declarations: [EntityNodeTypeComponent,EntityNodeTypeDetailsComponent,EntityNodeTypeCustomFieldsComponent]
})
export class EntityNodeTypeModule { }
