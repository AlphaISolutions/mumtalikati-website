import { HomeComponent } from './home/home.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import { PropertyfulldisplayComponent } from './propertyfulldisplay/propertyfulldisplay.component';
import { UnitscategoryComponent } from './unitscategory/unitscategory.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  { path: 'aboutus', component: AboutusComponent},
  { path: 'contactus', component: ContactusComponent },
  { path: 'propertyfulldisplay', component: PropertyfulldisplayComponent},
  { path: 'Unitscategory', component: UnitscategoryComponent},
  { path: 'propertydetails', component: PropertydetailsComponent},
  { path: '', component: HomeComponent},
  { path: '**', component: EmptyRouteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
