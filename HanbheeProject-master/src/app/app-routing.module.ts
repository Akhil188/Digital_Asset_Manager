import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import {PublicprofileComponent} from './publicprofile/publicprofile.component';
import {ConfirmloginComponent} from './confirmlogin/confirmlogin.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfilesettingsComponent } from './profilesettings/profilesettings.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';
import { CiroftrustComponent } from './ciroftrust/ciroftrust.component';
import { MultistepComponent } from './multistep/multistep.component';
import { AuthGuard } from './auth.guard';
import { DataAssetComponent } from './data-asset/data-asset.component';
import { DataAssetsComponent } from './data-assets/data-assets.component';
import { ViewFilesComponent } from './view-files/view-files.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActionsComponent } from './actions/actions.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SharedComponent } from './shared/shared.component';
import { ReceiveComponent } from './receive/receive.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'login', component:LoginpageComponent},
  {path:'', component: HomeComponent},
  {path: 'confirm', component:ConfirmloginComponent},
  {path: 'action',component:ActionsComponent},
  {path: 'view',component:ViewFilesComponent},
  {path: 'dataAsset', component:DataAssetComponent},
  {path: 'createacc',component:CreateAccountComponent},
  
  
  {path: 'multistep',component:MultistepComponent},
  {path: 'dashboard',
  component:DashboardComponent,
  children: 
  [
    {path:'shared',component: SharedComponent},
    {path: 'action',component:ActionsComponent},
    {path: 'receive',component:ReceiveComponent}

  ]
  },
  {path: 'profnav',
  component:ProfileNavComponent,
  children: [
    {
      path: 'profile', 
      component: PublicprofileComponent,
      //canActivate: [AuthGuard]
    }, 
    {
      path: 'persinfo',
      component:PersonalInfoComponent
    },
    {path:'profset',component:ProfilesettingsComponent},
    {path:'security',component:SecuritySettingsComponent},
    {path: 'asset',component:DataAssetsComponent},
    {path: 'cot',component:CiroftrustComponent},
    
    ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
