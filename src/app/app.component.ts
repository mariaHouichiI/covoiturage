import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  message1: Message[]=[];
  constructor( private router: Router,private authService:AuthService,private messageService: MessageService) {}
  ngOnInit(): void {
    this.message1 = [
     
      { severity: 'success', summary: 'Success', detail: 'Message Content' },
      { severity: 'error', summary: 'Error', detail: 'Message Content' },
  ];

   
  }

  title = 'covoiturage';
  
}
