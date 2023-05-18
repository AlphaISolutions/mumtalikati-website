import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import { PropertyfulldisplayComponent } from './propertyfulldisplay/propertyfulldisplay.component';
import { UnitscategoryComponent } from './unitscategory/unitscategory.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FaqComponent } from './faq/faq.component';
const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'propertyfulldisplay', component: PropertyfulldisplayComponent },
  { path: 'Unitscategory', component: UnitscategoryComponent },
  { path: 'propertydetails', component: PropertydetailsComponent },
  { path: '', component: HomeComponent,data:{
    title: 'Title for Home Component',
    descrption: 'Description of Home Component',robots: 'noindex, nofollow'}
  },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
  exports: [RouterModule]

})
export class AppRoutingModule { }
