

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api/auth/login/index.php';
                  

  constructor(private http: HttpClient, private router : Router) {}
  private isLoggedInVar = false;
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
                console.log('Token:', response.token); 
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
   logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.isLoggedInVar = false;
  }
  isLoggedIn(): boolean {
    this.isLoggedInVar = true;
    const token = this.getToken();
   // return token !== null && token !== undefined;
      return this.isLoggedInVar;
  }


}


