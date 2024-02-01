import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsererService {
  private apiUrl = ' http://localhost/bddcouvoiturage/api/auth/signup/index.php';

 

  constructor(private http: HttpClient) {}

 inscrireUtilisateur(utilisateurData: any): Observable<any> {
    // Utilisation de HttpHeaders pour définir le type de contenu
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    // Utilisation de HttpParams pour construire les paramètres du formulaire
    const body = new URLSearchParams();
    body.set('firstname', utilisateurData.nom) // Assurez-vous que les noms correspondent à ceux attendus par le script PHP
    body.set('lastname', utilisateurData.prenom)
    body.set('email', utilisateurData.email)
    body.set('password', utilisateurData.psw)
    body.set('telephone', utilisateurData.tlf)
    body.set('admin', utilisateurData.admin);
    body.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  
    // Envoi de la requête POST
    return this.http.post(this.apiUrl, body.toString(), { headers, withCredentials: true });}
    
    /*inscrireUtilisateur(utilisateurData: any): Observable<any> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
      });
  
      let params = new HttpParams()
          .set('firstname', utilisateurData.nom)
          .set('lastname', utilisateurData.prenom)
          .set('email', utilisateurData.email)
          .set('password', utilisateurData.psw)
          .set('telephone', utilisateurData.tlf)
         // .set('admin', utilisateurData.admin.toString()); // Convertir la valeur de admin en chaîne
          .set('admin', (utilisateurData.admin === 'true').toString());

      // Envoi de la requête POST
      return this.http.post(this.apiUrl, params.toString(), { headers, withCredentials: true });
  }*/
  
  }
  