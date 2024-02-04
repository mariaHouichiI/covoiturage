import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { HomeComponent } from './home/home.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminComponent } from './admin/admin.component';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { ParametreComponent } from './parametre/parametre.component';
import { AuthGuard } from './auth.guard';
import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  { path: '', component: HomeComponent },  
  {path : "home" , component:HomeComponent},
  {path: "logo" , component:LogoComponent},
  {path: "admin" , component:AdminComponent  ,canActivate: [AuthGuard]},
  {path: "profil" , component:ProfilComponent,canActivate: [AuthGuard] },
  {path: "parametre" , component:ParametreComponent  ,canActivate: [AuthGuard]},
  {path: "login", component:LoginComponent },
  {path: "signup", component:SingupComponent},
  {path : "home" , component:HomeComponent},
  {path:"chauffeur",component:ChauffeurComponent, canActivate: [AuthGuard]},
  {path:"utilisateur",component:GestionUserComponent ,canActivate: [AuthGuard]},
  {path:"sidebar",component:SidebarComponent ,canActivate: [AuthGuard]},
  {path:"reset",component:ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

