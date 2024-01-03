import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  //baseUrl = 'http://localhost/api';
  constructor(private http: HttpClient) { }

 /* getAll() {
    return this.http.get(`${this.baseUrl}/liste_trajet`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }*/
}
