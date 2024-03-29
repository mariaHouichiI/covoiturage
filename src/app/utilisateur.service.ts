import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Trajet } from './trajet';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  apiUrl = 'http://localhost';
  apiUrll = 'http://localhost/api/trajet/index.php';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/utilisateur/liste_utilisateur.php`);

  }
  addTrajet(newTrajet: Trajet): Observable<any> {
    const formData = new FormData();
    formData.append('chauffeur', `${newTrajet.Chauffeur}`);
    formData.append('heure_depart', `${newTrajet.Heure_depart}`);
    formData.append('date_depart', `${newTrajet.Date_depart}`);
    formData.append('commune_arrive', `${newTrajet.Lieu_depart}`);
    formData.append('commune_depart', `${newTrajet.Lieu_arrive}`);
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
