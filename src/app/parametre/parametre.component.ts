import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { UtilisateurService } from '../utilisateur.service';
import { WilayaCommuneService } from '../wilaya-commune.service';
import { TrajetService } from '../trajet.service';
import { AuthService } from '../auth.service';
import { Trajet } from '../trajet';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ParametreComponent {
  trajets: Trajet[]=[];
  nouveauNombre!: number;
  nombrePlacesActuel!: number;
  constructor(private router : Router ,private trajetService : TrajetService, private fb: FormBuilder ,private authService : AuthService,private confirmationService: ConfirmationService,private messageService:MessageService, private utilisateurService: UtilisateurService) {
  }
  styleOBJ = {
    'margin-right': '3em',
    'margin-bottom': '0.5em',
   ' margin-left' :' 10em',
    borderRadius: '5px',
    
    border: '0.5px solid #DDD',
    background: '#FBFBFB',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    'margin-left': '10em',
    //'margin-right': '3%',
  };
  ngOnInit(): void {
    this.trajetService.getNombrePlaces().subscribe(
      (nombre: number) => {
        this.nombrePlacesActuel = nombre;
      },
      error => {
        console.error('Erreur lors de la récupération du nombre de places : ', error);
      }
    );
  }
  goToProfile() {
    this.router.navigate(['/profil']);
  }
  logout() {
    this.authService.logout();
  }

  nbr_place!: number;
  message!: string;
  messages: Message[] = [];
  mettreAJourNombrePlaces(): void {
    console.log('Valeur avant mise à jour :', this.nombrePlacesActuel);
    this.trajetService.updateNombrePlaces(this.nbr_place).subscribe(
      response => {
        this.messages = [
          { severity: 'success', summary: 'Success', detail: `Le nombre de places autorisé est maintenant ${this.nbr_place}.` }]  
         
        console.log('Réponse du service :', response);
      },
      error => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    );
  }
  
}