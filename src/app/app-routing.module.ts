import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { HomeComponent } from './home/home.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ClientComponent } from './client/client.component';


const routes: Routes = [
  { path: '', component: HomeComponent },  
  {path : "home" , component:HomeComponent},
  {path: "logo" , component:LogoComponent},

  {path: "client", component:ClientComponent},

  {path: "login", component:LoginComponent},
  {path: "signup", component:SingupComponent},
  {path : "home" , component:HomeComponent},
  {path:"chauffeur",component:ChauffeurComponent},
  {path:"sidebar",component:SidebarComponent},
  {path:"reset",component:ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

