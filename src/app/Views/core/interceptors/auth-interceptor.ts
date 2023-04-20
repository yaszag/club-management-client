import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        
        if (error.status === 401) {
          this.authService.logout()
        } else {
          console.error(error);
        }
        return throwError(error);
      })
    );
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('accessToken');

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
