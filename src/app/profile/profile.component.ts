import { Component, NgModule } from '@angular/core';
import { GetUserService } from '../get-user.service';
import { WilayaCommuneService } from '../wilaya-commune.service';
import { TrajetService } from '../trajet.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { switchMap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms'; 
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { UtilisateurService } from '../utilisateur.service';
import { InsererService } from '../inserer.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ConfirmationService, MessageService],
 
})

export class ProfileComponent {
  currentUser: Utilisateur | null = null;
  token = localStorage.getItem('token');
  error = '';
success = '';
addForm: FormGroup;
editForm: any;
formGroup!: FormGroup;
message!: string;
messages: Message[] = [];
utilisateur: any;

  constructor( private fb: FormBuilder ,private confirmationService: ConfirmationService,private messageService:MessageService, private utilisateurService: UtilisateurService, private insererService : InsererService,private router: Router,private getUser :GetUserService,private datePipe: DatePipe, private authService: AuthService,private trajetService: TrajetService, private commune_wilayaServive: WilayaCommuneService,private deleteUserService : GetUserService) { 
                                                                                                                                 
     
    this.addForm = this.fb.group({
      date: [null, Validators.required],
      heure: [null, Validators.required],
    });
  }
  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null)
  });
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
  public editUtilisateur: any;
  updateProfile(addForm: NgForm): void {
    addForm.value.nom = this.datePipe.transform(addForm.value.heure, 'HH.mm.ss');
  }

  public onUpdateUser(utilisateur: Utilisateur): void {
    this.insererService.inscrireUtilisateur(utilisateur).subscribe(
      (response) => {
        console.log(response);
    
        const message = `Modification de   ${utilisateur.nom} ${utilisateur.prenom}   avec succés  `;
        this.messageService.add({ severity: 'info', summary: 'Confirmation', detail: message });
    
      },
    )
  }
  getUserCurrent(): void {
  
     this.getUser.getUser(this.token).subscribe(
      (data: Utilisateur) => {
        this.currentUser = data;
       
        console.log("useeeeeeeeeeer",this.currentUser)
        this.success = 'successful retrieval of the list';
      },
     
    );
  }
  
  
  
}