
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { GetUserService } from '../get-user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  messages!: Message[] | [];
  message!: string;
  formGroup!: FormGroup;
 
  passwordFieldType = 'password';
  passwordVisible: boolean = false;

  constructor(private router: Router,private getUserCurrent : GetUserService, private formBuilder: FormBuilder ,private authService: AuthService,private messageService : MessageService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    //this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  reset()  {
    this.router.navigate(["/reset"])} 

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
          this.messages = [
            { severity: 'error', summary: 'error', detail: 'You should enter your email and password' }];
          if (email === '') {
            this.messages.push({ severity: 'error', summary: 'error', detail: 'You should enter your email' });
          }
          if (password === '') {
            this.messages.push({ severity: 'error', summary: 'error', detail: 'You should enter your password' });
          }
          return;
        }
    
        this.authService.login(email, password).subscribe(response => {
          // Si la requête est réussie (200 OK) avec un succès de l'API
          if (response['success']) {
            this.messages = [
              { severity: 'success', summary: 'Success', detail: 'Login successful' }];
            console.log('Login successful');
            const token = response['token'];
            this.getUserCurrent.getUser(token);
            this.authService.setToken(token); // Stocker le token dans le stockage local
            this.router.navigate(['/chauffeur']);
          } else {
            // Si la requête est réussie (200 OK) mais l'API signale une erreur
            this.messages = [
              { severity: 'error', summary: 'Error', detail: 'Login failed, check your email and password' }];
            console.error('Login failed', response);
          }
        }, error => {
          // Si la requête échoue (erreur HTTP différente de 200 OK)
          this.messages = [
            { severity: 'error', summary: 'Error', detail: 'Login failed,  email or password incorrect' }];
          console.error('Login failed', error);
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