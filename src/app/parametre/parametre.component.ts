import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilisateurService } from '../utilisateur.service';
import { WilayaCommuneService } from '../wilaya-commune.service';
import { TrajetService } from '../trajet.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent {

  addForm: any;
  constructor(private router : Router , private fb: FormBuilder ,private authService : AuthService,private confirmationService: ConfirmationService,private messageService:MessageService, private utilisateurService: UtilisateurService, private commune_wilayaServive: WilayaCommuneService,private trajet : TrajetService) {
    this.addForm = this.fb.group({
      date: [null, Validators.required],
      heure: [null, Validators.required],
     
    });
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
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  logout() {
    this.authService.logout();
  }
}
