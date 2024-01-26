

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/bddcouvoiturage/api/auth/login/index.php';
                  

  constructor(private http: HttpClient) {}

  /*login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(this.apiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Login failed');
      })
    );
  }*/
  // auth.service.ts
login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(this.apiUrl, formData).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError('Login failed');
        }),
        tap((response: any) => {
            if (response.success) {
                console.log('Login successful');
                console.log('Token:', response.token); // Affiche le token dans la console
            }
        })
    );
}


  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  /*

  // Fonction pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  // Fonction pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
  }

  // Fonction pour récupérer les détails de l'utilisateur depuis le token
  getUserDetails(): any {
    const token = localStorage.getItem('token');
    if (token) {
      // Utilisez la bibliothèque jsonwebtoken pour décoder le token
      return jwt_decode(token);
    }
    return null;
  }*/
}
