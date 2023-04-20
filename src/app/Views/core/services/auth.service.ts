import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userCredentials: any): Observable<any> {
    return this.http
      .post<any>(`http://localhost:8080/api/auth/signin`, userCredentials)
      .pipe(
        tap((res) => {
          localStorage.setItem('accessToken', res.accessToken);
        })
      );
  }
  register(userCredentials: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/api/auth/signup`,
      userCredentials
    );
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
  }
}
