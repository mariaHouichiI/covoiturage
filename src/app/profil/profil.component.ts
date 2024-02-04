import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { UtilisateurService } from '../utilisateur.service';
import { Router } from '@angular/router';
import { GetUserService } from '../get-user.service';
import { AuthService } from '../auth.service';
import { Utilisateur } from '../utilisateur';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProfilComponent {
utilisateur: any;
  constructor(private fb: FormBuilder ,private confirmationService: ConfirmationService,private messageService:MessageService, private utilisateurService: UtilisateurService,private router: Router,private getUserservice :GetUserService,private authService: AuthService) { 
                                                                                                                                 
  }
  token = localStorage.getItem('token');
  error = '';
  success = '';
  addForm!: FormGroup;
editForm: any;
formGroup!: FormGroup;
message!: string;
messages: Message[] = [];

//  currentUser!: Utilisateur;
//editUtilisateur!: Utilisateur;
 /* ngOnInit(): void {
    this.getUserservice.getUser(this.token).subscribe(
      (data: Utilisateur) => {
        this.currentUser = data;
        console.log('user', this.currentUser);
        this.success = 'successful retrieval of the list';

      
        this.getUserservice.getUserById(this.currentUser?.id).subscribe(
          (userData: Utilisateur) => {
            this.editUtilisateur = { ...userData };
          },
          (error) => {
            console.error('Error retrieving user by ID:', error);
          }
        );
      },
      (error) => {
        console.error('Error retrieving user:', error);
      }
    );
  }
  ngOnInit(): void {
   
    this.getUserservice.getUser(this.token).subscribe(
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
  public onUpdateUser(utilisateur: Utilisateur): void {
    console.log('Données envoyées au serveur :', utilisateur);
    this.getUserservice.updateUser(utilisateur).subscribe(
      (response) => {
        console.log(response);
      
       const message = `Modification de   ${utilisateur.nom} ${utilisateur.prenom}   avec succés  `;
        this.messageService.add({ severity: 'info', summary: 'Confirmation', detail: message });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 
  public onUpdateUser1(utilisateur: Utilisateur): void {
    if (this.editUtilisateur) {
      this.editUtilisateur.id = this.currentUser?.id; // Assurez-vous que l'ID est correctement défini
      this.getUserservice.updateUser(this.editUtilisateur).subscribe(
        (response) => {
          console.log(response);
          this.utilisateurService.getAll();
          const message = `Modification de ${this.editUtilisateur?.nom} ${this.editUtilisateur?.prenom} avec succès`;
          this.messageService.add({ severity: 'info', summary: 'Confirmation', detail: message });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    
  }*/

  
  currentUser: Utilisateur | null = null;
  editUtilisateur!: Utilisateur;
  userId: number  | null = null;

  ngOnInit(): void {
    this.getUserservice.getUser(this.token).subscribe(
      (data: Utilisateur) => {
        this.currentUser = data;
        this.userId = this.currentUser?.id; // Enregistrez l'ID de l'utilisateur courant
        console.log("user", this.currentUser);
        this.success = 'successful retrieval of the list';

        // Utilisez l'ID pour récupérer l'utilisateur complet
        if (this.userId) {
          this.getUserservice.getUserById(this.userId).subscribe(
            (userData: Utilisateur) => {
              this.editUtilisateur = { ...userData };
            },
            (error) => {
              console.error('Error retrieving user by ID:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error retrieving user:', error);
      }
    );
  }


  
public onUpdateUser(utilisateur: Utilisateur): void {
   console.log(utilisateur)
  //  const isAdmin = utilisateur.admin === true;
    this.getUserservice.updateUser(utilisateur).subscribe(
      response => {
        console.log(response);
        if (response.success) {

          this.messages = [
            { severity: 'success', summary: 'Success', detail: `your informations was updated successfull` }]  
           
       // utilisateur.admin = isAdmin;
        console.log(response);
        this.utilisateurService.getAll();
       } else {

       this.messages = [
          { severity: 'error', summary: 'Error', detail: 'failed to update your  account informations, retry again' },
        ]
          // Échec : affichez le message d'erreur
          console.error(response.message);
      }
     
  },
  error => {
    console.error(error);
    this.messages = [
      { severity: 'error', summary: 'Error', detail: 'verifier vos information , and try again' },
    ];
 }
);
}


initEditUser(utilisateur: any) {
    this.editUtilisateur = { ...utilisateur }; 
 }
  logout() {
    this.authService.logout();
  }
}
