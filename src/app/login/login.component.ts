/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  passwordFieldType = 'password';
  passwordVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    if (this.formGroup.valid) {
      const email = this.formGroup.get('email')?.value;
      const password = this.formGroup.get('password')?.value;

      this.authService.login(email, password).subscribe(response => {
        if (response['success']) {
          console.log('Login successful');
          // Afficher le token dans la console
          console.log('Token:', response['body']['token']);
          
          // Enregistrer le token dans le stockage local
          this.authService.setTokenInLocalStorage(response['body']['token']);

          // Utiliser le token pour les futures requêtes
          const headers = this.authService.includeTokenInHeaders();
          
          // Rediriger
          this.router.navigate(['/chauffeur']);
        } else {
          console.error('Login failed');
        }
      });
    }
  }
}*/
// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
reset(){
this.router.navigate(["/reset"])} 


  formGroup!: FormGroup;
  passwordFieldType = 'password';
  passwordVisible: boolean = false;
  messages: Message[] = [];

  constructor(private router: Router, private authService: AuthService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  signup() {
    this.router.navigate(["/signup"])}
  login(): void {

      if (this.formGroup.valid) {
        const email = this.formGroup.get('email')?.value;
        const password = this.formGroup.get('password')?.value;

        if (email === '' || password === '') {
          this.messages.push({ severity: 'error', summary: 'error', detail: 'you should enter you password '});
            if (email === '') {
              this.messages.push({ severity: 'error', summary: 'error', detail: 'you should enter your mail' });
            }
            if (password === '') {

              this.messages.push({ severity: 'error', summary: 'error', detail: 'you should enter your password' });
              
            }
            return;
        }

      this.authService.login(email, password).subscribe(response => {
        if (response['success']) {
          this.messageService.add({ severity: 'succes', summary: 'success', detail: 'Login successfull' });
         
          console.log('Login successful');
          const token = response['token'];
          this.authService.setToken(token); // Stocker le token dans le stockage local
          this.router.navigate(['/chauffeur']);
        } else {
          console.error('Login failed');
        }
      });
    }
  }
}

/*if (this.formGroup.valid) {
  const email = this.formGroup.get('email')?.value;
  const password = this.formGroup.get('password')?.value;
  if (email === '' || password === '') {
    if (email === '') {
     
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir le nom d\'utilisateur' });
    }
    if (password === '') {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir le mot de passe' });
    }
    return;
  }
*/