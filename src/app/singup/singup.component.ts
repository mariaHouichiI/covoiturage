import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsererService } from 'src/app/inserer.service';
import { Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit{

  formGroup!: FormGroup;
  message!: string;

  messages: Message[] = [];
  utilisateurData = {
    mat: '',
    nom: '',
    prenom: '',
    email: '',
    psw: '',
    tlf: '',
    admin: false 
  };
  confirmpass: string | undefined;

  constructor(private router: Router, private insererService: InsererService, private formBuilder: FormBuilder, private messageService : MessageService) {}
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  inscrireUtilisateur(): void {
    if (this.utilisateurData.psw !== this.confirmpass) {
      this.messages = [
        { severity: 'error', summary: 'Error', detail: 'password is not matched' }]
     
        console.log('Les mots de passe ne correspondent pas');
        return;
    }

    this.insererService.inscrireUtilisateur(this.utilisateurData).subscribe(
        response => {
            console.log(response);
            if (response.success) {
              this.messages = [
                { severity: 'success', summary: 'Success', detail: 'The account was  created successfull' }]  
                // Succès : redirigez ou effectuez d'autres actions nécessaires
                this.router.navigate(['/chauffeur']); // Redirection vers la page d'accueil, ajustez si nécessaire
            } else {
              this.messages = [
                { severity: 'error', summary: 'Error', detail: 'failed to created an account, retry again' },
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
Gotologin() {
  this.router.navigate(["/login"])}
}
