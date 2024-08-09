import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { PublicprofileComponent } from './publicprofile/publicprofile.component';
import { ConfirmloginComponent } from './confirmlogin/confirmlogin.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfilesettingsComponent } from './profilesettings/profilesettings.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { DataAssetComponent } from './data-asset/data-asset.component';
import { CiroftrustComponent } from './ciroftrust/ciroftrust.component';
import { MultistepComponent } from './multistep/multistep.component';
import { DataAssetsComponent } from './data-assets/data-assets.component';
import { ViewFilesComponent } from './view-files/view-files.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActionsComponent } from './actions/actions.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ReceiveComponent } from './receive/receive.component';
import { SharedComponent } from './shared/shared.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'login',component:LoginpageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    PublicprofileComponent,
    ConfirmloginComponent,
    ProfileNavComponent,
    PersonalInfoComponent,
    ProfilesettingsComponent,
    SecuritySettingsComponent,
    DataAssetComponent,
    CiroftrustComponent,
    MultistepComponent,
    DataAssetsComponent,
    ViewFilesComponent,
    DashboardComponent,
    ActionsComponent,
    CreateAccountComponent,
    ReceiveComponent,
    SharedComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule ,
    HttpClientModule,
    AngularFileUploaderModule,
    Ng2SearchPipeModule,
    NgbModule
  ],
  providers: [AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
