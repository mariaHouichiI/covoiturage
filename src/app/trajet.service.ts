import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Trajet } from './trajet';


@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  apiUrl = 'http://localhost/bddcouvoiturage/api';
  apiUrll = 'http://localhost/bddcouvoiturage/api/trajet/index.php';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trajet/liste_trajet.php`);
  }
  addTrajet(newTrajet: Trajet): Observable<any> {
    const formData = new FormData();
    formData.append('chauffeur', `${newTrajet.chauffeur}`);
    formData.append('heure_depart', `${newTrajet.heure_depart}`);
    formData.append('date_depart', `${newTrajet.date_depart}`);
    formData.append('commune_arrive', `${newTrajet.commune_depart}`);
    formData.append('commune_depart', `${newTrajet.commune_depart}`);
    formData.append('nbr_place', `${newTrajet.nbr_place}`);
    formData.append('hebdomadaire', `${newTrajet.hebdomadaire}`);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });

    return this.http.post(this.apiUrll, formData).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError('ajout faild');
        }),
        tap((response: any) => {
            if (response.success) {
                console.log('ajout successful');
            }
        })
    );
  }
}
