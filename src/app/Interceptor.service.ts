// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor {
/*
  implements HttpInterceptor 

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials:true
      });
      console.log('Request:', req);
      console.log('Token added to request:', token);
      return next.handle(authReq);
    }
    return next.handle(req);
  }*/
}
