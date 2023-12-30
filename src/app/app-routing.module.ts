import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: "logo" , component:LogoComponent},
  {path: "login", component:LoginComponent},
  {path: "singup", component:SingupComponent},
  {path : "home " , component:HomeComponent},
  
  

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

