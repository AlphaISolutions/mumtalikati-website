import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShortdisplayComponent } from './shortdisplay/shortdisplay.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { PropertyfulldisplayComponent } from './propertyfulldisplay/propertyfulldisplay.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { UnitscategoryComponent } from './unitscategory/unitscategory.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ToastrModule } from "ngx-toastr";
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MarkdownModule } from 'ngx-markdown';
import { PlotdetailsComponent } from './plotdetails/plotdetails.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { UnitcategorylistComponent } from './unitcategorylist/unitcategorylist.component';
import { BreadcrumbpropertyfulldisplayComponent } from './breadcrumbpropertyfulldisplay/breadcrumbpropertyfulldisplay.component';
import { PropertyfulldisplaylistComponent } from './propertyfulldisplaylist/propertyfulldisplaylist.component';
import { FaqComponent } from './faq/faq.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { LoginComponent } from './sign-up/login/login.component';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { SigninComponent } from './sign-up/signin/signin.component';
import { SignupComponent } from './sign-up/signup/signup.component';
import { SelectRoleComponent } from './sign-up/select-role/select-role.component';
import { PhoneNumberComponent } from './sign-up/phone-number/phone-number.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SignUpFormComponent } from './sign-up/sign-up-form/sign-up-form.component';
import { SetYouPasswordComponent } from './sign-up/set-you-password/set-you-password.component';
import { ForgotpasswordComponent } from './sign-up/lost-password/forgotpassword/forgotpassword.component';
import { OtpVerificationComponent } from './sign-up/otp-verification/otp-verification.component';
import { SetyouPasswordComponent } from './sign-up/setyou-password/setyou-password.component';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    FooterComponent,
    ShortdisplayComponent,
    PropertydetailsComponent,
    PropertyfulldisplayComponent,
    UnitscategoryComponent,
    ContactusComponent,
    AboutusComponent,
    PlotdetailsComponent,
    BreadcrumbComponent,
    UnitcategorylistComponent,
    BreadcrumbpropertyfulldisplayComponent,
    PropertyfulldisplaylistComponent,
    FaqComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    SelectRoleComponent,
    PhoneNumberComponent,
    SignUpFormComponent,
  
    SetYouPasswordComponent,
    ForgotpasswordComponent,
    OtpVerificationComponent,
    SetyouPasswordComponent,

  ],
  imports: [
    LazyLoadImageModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    NgbModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width'
    }),
    MatListModule,
    MatGridListModule,
    NgxSliderModule,
    MatCarouselModule.forRoot(),
    MarkdownModule.forRoot(),
    MatDialogModule,
    CdkAccordionModule,
    NgxMatIntlTelInputComponent,
    NgOtpInputModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }, RxFormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
