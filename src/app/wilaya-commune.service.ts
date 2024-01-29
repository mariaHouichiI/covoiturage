import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WilayaCommuneService {
  apiUrl = 'http://localhost/bddcouvoiturage/api';

  constructor(private http: HttpClient) { }
  getAllCommune(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commune/liste_commune.php`);  }
  getAllWilaya(): Observable<any> {
    return this.http.get( `${this.apiUrl}/wilaya/liste_wilaya.php`);  }
}
