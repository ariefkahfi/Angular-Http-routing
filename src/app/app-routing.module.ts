import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormComponent} from "./form-component/form.component";
import {ListComponent} from "./list-component/list.component";



const appRoutes : Routes = [
  {path : "form",component  : FormComponent},
  {path : "list",component : ListComponent},
  {path : "**" , redirectTo : "/"}
];

@NgModule({
  imports : [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule{}
