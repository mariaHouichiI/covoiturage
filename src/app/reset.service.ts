import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  private apiUrl = 'http://localhost/api/auth/Reset/reset.php'; 

  constructor(private http: HttpClient) { }
  
  resetPassword(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    return this.http.post<any>(this.apiUrl, body.toString(), { headers, withCredentials: true });
  }
  
  

}