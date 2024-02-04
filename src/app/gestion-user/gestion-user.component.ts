import { Component } from '@angular/core';
import { Utilisateur } from '../utilisateur';
import { FieldsetModule } from 'primeng/fieldset';
import { wilaya } from '../wilaya';
import { Commune } from '../commune';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms'; 
import { UtilisateurService } from '../utilisateur.service';
import { Trajet } from '../trajet';
import { WilayaCommuneService } from '../wilaya-commune.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { InsererService } from '../inserer.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { deleteUserService } from '../deleteUser.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { GetUserService } from '../get-user.service';
import { User1 } from '../user1';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class GestionUserComponent {

  
  token = localStorage.getItem('token');
  error = '';
  success = '';
  addForm: FormGroup;
  editForm: any;
  formGroup!: FormGroup;
  message!: string;
  messages: Message[] = [];
  utilisateur: any;
  public editUtilisateur: any;
  public editUser: any;
  isChecked: boolean = false;
  currentUser: Utilisateur | null = null;

  userId: number  | null = null;
  utilisateurNew = {
      
        admin: false, 
      };
  
    
      // ...
    
      
    constructor(private getUserservice :GetUserService,private authService : AuthService,private router : Router , private fb: FormBuilder ,private confirmationService: ConfirmationService,private messageService:MessageService, private utilisateurService: UtilisateurService, private commune_wilayaServive: WilayaCommuneService,private insererService : InsererService,private deleteUserService : deleteUserService) {
      this.addForm = this.fb.group({
        date: [null, Validators.required],
        heure: [null, Validators.required],
       
      });
    }
    logout() {
      this.authService.logout();
    }
    admin(Newutilisateur: Utilisateur): void {
   
      this.utilisateurNew.admin = !this.utilisateurNew.admin;
  }
  initAddUser() {
    this.addForm.reset(); 
  }
 initEditUser(utilisateur: any) {
      this.editUser = { ...utilisateur }; 
   }
 /*  initEditUser(utilisateur: any) {
    this.editUtilisateur = { ...utilisateur };
    this.editForm.patchValue({ 
      id: this.editUtilisateur.id,
      firstname: this.editUtilisateur.nom,
      lastname: this.editUtilisateur.prenom,
      email: this.editUtilisateur.email,
      telephone: this.editUtilisateur.telephone,
      password: this.editUtilisateur.password,
      
    });
  }*/
  /*initEditUser(utilisateur: any) {
    this.editUtilisateur = { ...utilisateur };
    this.editForm.reset(); // Réinitialisez le formulaire de mise à jour
    this.editForm.patchValue({
      id: this.editUtilisateur.id,
      nom: this.editUtilisateur.nom,
      prenom: this.editUtilisateur.prenom,
      email: this.editUtilisateur.email,
      telephone: this.editUtilisateur.telephone,
      password: this.editUtilisateur.password,
    });
  }*/
      utilisateurs : User1[] = [];
     
    
      
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
    
    styledown = {'margin-bottom': '15%'}; 
  //  isChecked: boolean = false;
    toggleAdmin() {
      this.utilisateurNew.admin = !this.utilisateurNew.admin;
    }
    goToProfile() {
      this.router.navigate(['/profil']);
    }
      showConfirmation() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Are you sure that you want to delete this user account?',
            accept: () => {
                // Logique pour supprimer l'utilisateur
                console.log('User deleted');
            }
        });
    }
    confirm(id: number) {
      this.confirmationService.confirm({
          header: 'Are you sure?',
          message: 'That you want to delete this user ',
          accept: () => {
              this.DeleteUser(id);
              this.messages = [
                { severity: 'info', summary: 'Confirmed', detail: `The account of Drive N° ${id} was  deleted successfull` ,life: 3000}]     
                 // utilisateur.admin = isAdmin;
                  this.utilisateurService.getAll();
                  setTimeout(() => {
                    location.reload();
                  }, 3000);
          },
          reject: () => {
            this.messages = [
              { severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 }]  
            
          }
      });
  }
    
      ngOnInit() {
      this.getUsers()
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
                this.editUser = { ...userData };
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
     getUsers(): void {
        this.utilisateurService.getAll().subscribe(
          (data: User1[]) => {
            console.log(data);
            this.utilisateurs = data;
            for (const trajet of this.utilisateurs) {
            //  this.departs.push(trajet.Lieu_depart.Nom_Commune);
                  }
            console.log(this.utilisateurs)
            this.success = 'successful retrieval of the list';
          },
         
        );
      }
      utilisateursFiltres: any[] = []; // Ajoutez cette ligne pour déclarer utilisateursFiltres

      value: string = '';
  
      public searchUtilisateurs(key: string): void {
        console.log(key);
        const results: User1[] = [];
      
        for (const utilisateur of this.utilisateurs) {
          if (utilisateur.Nom.toLowerCase().includes(key.toLowerCase()) ||
              utilisateur.Prenom.toLowerCase().includes(key.toLowerCase()) ||
              utilisateur.Email.toLowerCase().includes(key.toLowerCase()) ||
              utilisateur.Telephone.toLowerCase().includes(key.toLowerCase())) {
            results.push(utilisateur);
          }
        }
        if (!key || results.length === 0) {
          this.utilisateurService.getAll().subscribe(
            (data: User1[]) => {
              this.utilisateurs = data;
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.utilisateurs = results;
        }
      }
    
      
  public onAddUser(utilisateur: Utilisateur): void {
        //  const isAdmin = utilisateur.admin === true;
          this.insererService.inscrireUtilisateur(utilisateur).subscribe(
            response => {
              console.log(response);
              if (response.success) {
                this.messages = [
                  { severity: 'success', summary: 'Success', detail: `The account was created successfull` }]  
                 
             // utilisateur.admin = isAdmin;
              console.log(response);
              this.utilisateurService.getAll();
             } else {

             this.messages = [
                { severity: 'error', summary: 'Error', detail: 'failed to created an account, retry again' },
              ]
                // Échec : affichez le message d'erreur
                console.error(response.message);
            }
            const modalElement = document.getElementById('addUserModal');
      if (modalElement) {
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (modalBackdrop) {
          modalBackdrop.parentNode?.removeChild(modalBackdrop);
        }
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
utilisateurIdToDelete: number | null = null; // Variable pour stocker l'ID de l'utilisateur à supprimer
  deleteUserModalVisible = false; // Variable pour contrôler la visibilité du modal


  openDeleteUserModal(id: number): void {
    this.utilisateurIdToDelete = id;
    this.deleteUserModalVisible = true;
  }
  closeDeleteUserModal() {
    this.utilisateurIdToDelete = null;
    this.deleteUserModalVisible = false;
  }
  DeleteUser(id: number): void {
  console.log(`Deleting user with ID: ${id}`);
  this.deleteUserService.DeleteUser(id).subscribe(
    response => {
      console.log(response);
      if (response.success) {
      console.log(response);
      this.utilisateurService.getAll();
      location.reload();
     } else {
        console.error(response.message);
    }
},
error => {
  console.error(error);
 
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
           { severity: 'success', summary: 'Success', detail: `${utilisateur.nom}  ${utilisateur.prenom}'s information was updated successfully` }]  
          
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
     const modalElement = document.getElementById('addUserModal');
     if (modalElement) {
       modalElement.classList.remove('show');
       modalElement.style.display = 'none';
       document.body.classList.remove('modal-open');
       const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
       if (modalBackdrop) {
         modalBackdrop.parentNode?.removeChild(modalBackdrop);
       }
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




}
    
    
    

