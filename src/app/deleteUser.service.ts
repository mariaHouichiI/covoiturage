
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class deleteUserService {
  private apiUrl = 'http://localhost/Utilisateur/supp_utilisateur.php'; 

  constructor(private http: HttpClient) { }

  DeleteUser(id: number): Observable<any> {
    return this.http.get (`${this.apiUrl}?id=${id}`);
   
  }
}
 