import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WilayaCommuneService {
  apiUrl = 'http://localhost';

  constructor(private http: HttpClient) { }
  getAllCommune(): Observable<any> {
    return this.http.get(`${this.apiUrl}/liste_commune.php`);  }
  getAllWilaya(): Observable<any> {
    return this.http.get( `${this.apiUrl}/liste_wilaya.php`);  }
}
