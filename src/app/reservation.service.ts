import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost/reservation/ajouter_reservation.php';
  apiUrll = 'http://localhost';

  ajouterRes(idtrajet: number, passagere: number): Observable<any> {
    const url = this.apiUrl; // Assuming the apiUrl already contains the endpoint
    const body = { id: idtrajet, passagere: passagere };
    
    return this.http.post<any>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('ajout res failed');
      }),
      tap((response: any) => {
        if (response.success) {
          console.log('ajout res successful');
        }
      })
    );
  }
  deleteRes(idTrajet: number, passagere: number): Observable<any> {
    const url = `${this.apiUrll}/reservation/supprimer_reservation.php?id=${idTrajet}&passagere=${passagere}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        console.error('Erreur lors de la suppression du trajet :', error);
        throw error;  // Propagez l'erreur pour la gestion côté composant
      })
    );
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrll}/reservation/liste_reservation.php`);
  }
  
}
