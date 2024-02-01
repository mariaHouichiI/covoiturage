import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  apiUrl = 'http://localhost/api/user/index.php';
   
  constructor(private http: HttpClient) { }
  getUser(token: any ): Observable<any> {
    const formData = new FormData();
    formData.append('token', `${token}`);

    return this.http.post(this.apiUrl, formData).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError('user recuperé faild');
        }),
        tap((response: any) => {
            if (response.success) {
                console.log('user recuperé successful');
            }
        })
    );
  }
}
