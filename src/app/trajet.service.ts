import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Trajet } from './trajet';

 const httpOptions = {
      Headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text' as 'json'
    };
@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  apiUrl = 'http://localhost/api';
  apiUrll = 'http://localhost/api/trajet/index.php';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trajet/liste_trajet.php`);
  }
  addTrajet(newTrajet: Trajet): Observable<any> {
   
    const formData = new FormData();
    formData.append('chauffeur', `${newTrajet.Chauffeur}`);
    formData.append('heure_depart', `${newTrajet.Heure_depart}`);
    formData.append('date_depart', `${newTrajet.Date_depart}`);
    formData.append('commune_arrive', `${newTrajet.Lieu_arrive}`);
    formData.append('commune_depart', `${newTrajet.Lieu_depart}`);
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
  getNombrePlaces(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/trajet/getNbplace.php`);
  }
 /* updateNombrePlaces(nbr_place: number): Observable<any> {
    const formData = new FormData();
    formData.append('nbr_place', `${nbr_place}`);
    return this.http.post(`${this.apiUrl}/trajet/nbr_place.php`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la mise à jour côté client : ', error);
        return throwError('Mise à jour du nombre de places échouée');
      }),
      tap((response: any) => {
        console.log('Réponse du service :', response);
        if (response && !response.success) {
          console.error('Erreur côté serveur :', response);
        }
      })
    );
  }*/
  updateNombrePlaces(nbr_place: number): Observable<any> {
    const formData = new FormData();
    formData.append('nbr_place', `${nbr_place}`);
    
    return this.http.post(`${this.apiUrl}/trajet/nbr_place.php`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la mise à jour côté client : ', error);
  
        let errorMessage = 'Mise à jour du nombre de places échouée';
  
        // Vérifiez si la réponse est au format JSON
        if (error.error instanceof ErrorEvent) {
          console.error('Erreur côté client :', error.error.message);
        } else if (error.status === 0) {
          errorMessage = 'Impossible de se connecter au serveur';
        } else if (error.status === 500 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
  
        return throwError(errorMessage);
      }),
      tap((response: any) => {
        console.log('Réponse du service :', response);
        if (response && response.success) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          console.log('Mise à jour réussie');
        }
      })
    );
  }
  public updateTrajet (trajet:Trajet): Observable<any>{
    return this.http.put<Trajet>(this.apiUrll,trajet,httpOptions);
  }
  
  deleteTrajet(idUser: number, trajetId: number): Observable<any> {
    const url = `${this.apiUrll}?id=${idUser}&idT=${trajetId}`;
    return this.http.delete<any>(url).pipe(
      catchError((error: any) => {
        console.error('Erreur lors de la suppression du trajet :', error);
        throw error;  // Propagez l'erreur pour la gestion côté composant
      })
    );
  }
  
}
