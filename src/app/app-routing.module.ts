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
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      title: 'Discover the property solutions in Oman with Mumtalikati',
      descrption:
        ' Explore our FAQ section to uncover comprehensive property queries & solutions in Oman to effortlessly rent, buy, or sell properties with Mumtalikati.',
    },
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    data: {
      title: 'Seamlessly discover properties in Oman through Mumtalikati',
      descrption:
        "Thinking to rent, buy or sell a property in Oman's real estate market? Try Mumtalikati which connects you to the perfect solution.",
    },
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    data: {
      title: 'Your Real Estate Partner in Oman | Mumtalikati',
      descrption:
        "Reach out to Mumtalikati for expert insights and assistance in achieving your real estate goals. We're here to help you buy, rent, or sell properties in Oman.",
    },
  },
  {
    path: 'propertyfulldisplay',
    component: PropertyfulldisplayComponent,
    data: {
      title: 'Find Your Ideal Rental Property in Oman with Mumtalikati ',
      descrption:
        'Looking for a rental property in Oman? Mumtalikati has you covered. Explore our extensive listings and find your ideal home. Begin your search now.',
    },
  },
  {
    path: 'Unitscategory',
    component: UnitscategoryComponent,
  },
  {
    path: 'propertydetails',
    component: PropertydetailsComponent,
    data: {
      title: 'Property Listings',
      descrption: '',
    },
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Ultimate Destination for Renting, Buying, and Selling Properties',
      descrption:
        'Explore a wide range of rental, buying, and selling options in Oman with Mumtalikati. Our real estate listing portal simplifies your property search.',
    },
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
