import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path:"chauffeur",component:ChauffeurComponent},
  {path:"sidebar",component:SidebarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
