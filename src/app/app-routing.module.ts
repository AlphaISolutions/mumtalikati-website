import { HomeComponent } from './home/home.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import { PropertyfulldisplayComponent } from './propertyfulldisplay/propertyfulldisplay.component';
import { UnitscategoryComponent } from './unitscategory/unitscategory.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  {path:'contactus', component:ContactusComponent},
  {path:'propertyfulldisplay', component:PropertyfulldisplayComponent},
  {path:'Unitscategory', component:UnitscategoryComponent},
  { path: 'propertydetails', component: PropertydetailsComponent },
  { path: '', component: HomeComponent },
  {path:'**', component:EmptyRouteComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{provide:APP_BASE_HREF,useValue:'/'}],
})
export class AppRoutingModule { }
