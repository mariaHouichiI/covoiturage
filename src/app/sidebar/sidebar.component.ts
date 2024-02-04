import { Component } from '@angular/core';
import { TrajetService } from '../trajet.service';
import { Route, Router } from '@angular/router';
import { GetUserService } from '../get-user.service';
import { Utilisateur } from '../utilisateur';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible!: boolean;
  topSidebarVisible!:boolean;
  currentUser: Utilisateur | null = null;

  token = localStorage.getItem('token');
  error = '';
success = '';
  constructor(private trajetService: TrajetService, private router : Router,private getUser :GetUserService) { }
  ngOnInit() {
   this.sidebarVisible= true;

    this.getUser.getUser(this.token).subscribe(
      (data: Utilisateur) => {
        this.currentUser = data;
        console.log("user", this.currentUser);
        this.success = 'successful retrieval of the list';
      },
      (error) => {
        console.error('Error retrieving user:', error);
      }
    );
  
 }
  onSidebarShow() {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the sidebar is open
  }

  onSidebarHide() {
    document.body.style.overflow = ''; // Allow scrolling when the sidebar is closed
  }
  GoToGestionUser() {
    this.router.navigate(['/utilisateur']);
  }
  GoToGestionParametre() {
    this.router.navigate(['/parametre']);
  }

  onListeTrajetsClick(): void {
    this.router.navigate(['/chauffeur']);
    this.trajetService.getAll().subscribe(
      (data) => {
        // Traitement des données ici
        console.log(data);
      },
      (error) => {
        // Gestion des erreurs ici
        console.error(error);
      }
    );
    
  }
  goToListeTrajet(){
    this.router.navigate(["/client"])
  }
  goToMesTrajet(){
    this.router.navigate(["/chauffeur"])
  }

 
}
