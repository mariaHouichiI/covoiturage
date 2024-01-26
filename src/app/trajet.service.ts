import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trajet } from './trajet';
const httpOptions = {
  Headers: new HttpHeaders({'Content-Type': 'application/json'}),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  apiUrl = 'http://localhost/liste_trajet.php';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/liste_trajet.php`);
  }
  public addTrajet (trjet:Trajet): Observable<Trajet>{
    return this.http.post<Trajet>(`${this.apiUrl}/api/trajet/index.php`,trjet,httpOptions);
  }
}
