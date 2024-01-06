import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { HomeComponent } from './home/home.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { CardModule } from 'primeng/card';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms'; 
<<<<<<< HEAD
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Interceptor.service';
import { MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 922d35dd99c384ca4b9614c6c9c9a6742ed96fea
@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    LoginComponent,
    SingupComponent,
    HomeComponent,
    ChauffeurComponent,
    SidebarComponent,
    ResetPasswordComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    InputTextModule,
    HttpClientModule,
    AppRoutingModule,
    CalendarModule,
    CardModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    DropdownModule,
    FormsModule,
    MessagesModule,
    MessageModule
    
   
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, 
     
  MessageService],
  bootstrap: [AppComponent]
})

export class AppModule { }