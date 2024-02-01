import { Component } from '@angular/core';
import { TrajetService } from '../trajet.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible!: boolean;
  topSidebarVisible!:boolean;

  constructor(private trajetService: TrajetService) { }
  ngOnInit() {
   this.sidebarVisible= true;
 }
  onSidebarShow() {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the sidebar is open
  }

  onSidebarHide() {
    document.body.style.overflow = ''; // Allow scrolling when the sidebar is closed
  }
  

  onListeTrajetsClick(): void {
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

 
}
