import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './modules/components/notfound/notfound.component';
import { ProductService } from './modules/service/product.service';
import { CountryService } from './modules/service/country.service';
import { CustomerService } from './modules/service/customer.service';
import { EventService } from './modules/service/event.service';
import { IconService } from './modules/service/icon.service';
import { NodeService } from './modules/service/node.service';
import { PhotoService } from './modules/service/photo.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './modules/intercept/request.interceptor';
import { ResponsetInterceptor } from './modules/intercept/response.interceptor';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandlerService } from './modules/service/global-error-handler.service';
import { TwoDigitDecimaNumberDirective } from './modules/directives/decima-number.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [AppComponent, NotfoundComponent,TwoDigitDecimaNumberDirective],
    imports: [BrowserModule,BrowserAnimationsModule,CommonModule,AppRoutingModule, AppLayoutModule,ToastModule,ReactiveFormsModule],
    exports:[TwoDigitDecimaNumberDirective],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {provide:HTTP_INTERCEPTORS,useClass:RequestInterceptor,multi:true},
        {provide:HTTP_INTERCEPTORS,useClass:ResponsetInterceptor,multi:true},
        {provide:ErrorHandler,useClass:GlobalErrorHandlerService},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
