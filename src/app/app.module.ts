import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PanelComponent} from "./panel-component/panel.component";
import {AppRoutingModule} from "./app-routing.module";
import {FormComponent} from "./form-component/form.component";
import {ListComponent} from "./list-component/list.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ConnectorComponentService} from "./connector-service/connector-component.service";
import {HttpService} from "./http-service/http-service.service";

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ConnectorComponentService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
