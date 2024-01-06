import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetService } from '../reset.service';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})   
export class ResetPasswordComponent implements OnInit {
  formGroup!: FormGroup;
  message!: string;

  messages: Message[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private resetService: ResetService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  Gotologin(): void {
    this.router.navigate(['/login']);
  }

  resetPassword1(): void {
    console.log('Inside resetPassword()'); // Ajoutez cette ligne

    if (this.formGroup.valid) {
      console.log('Form is valid'); // Ajoutez cette ligne
      const email = this.formGroup.get('email')?.value;
      const password = this.formGroup.get('password')?.value;

      this.resetService.resetPassword(email, password)
        .subscribe(response => {
          if (response.success) {
            this.message = 'Password reset successful';
            this.formGroup.reset();
          } else {
            this.message = 'Password reset failed';
          }
        }, error => {
          console.error(error);
          this.message = 'An error occurred';
        });
    }
  }
  resetPassword(): void {
    if (this.formGroup.valid) {
      const email = this.formGroup.get('email')?.value;
      const password = this.formGroup.get('password')?.value;
  
      this.resetService.resetPassword(email, password)
        .subscribe(response => {
          if (response.success) {
            this.messages = [
              { severity: 'success', summary: 'Success', detail: 'The password is changed successfull, Login Now' }]
            this.formGroup.reset(); // Réinitialiser le formulaire
          } else {
            this.messages = [
              { severity: 'error', summary: 'Error', detail: 'failed to change the password, retry again' },
            ]
          }
        }, error => {
          console.error(error);
          this.messages = [
            { severity: 'error', summary: 'Error', detail: 'Email does not exist ' },
          ]
        });
    }
  }
}
