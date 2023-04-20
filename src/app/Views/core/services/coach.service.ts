import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoachService {
  private _coaches$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getAllCoaches(): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get<any>(`http://localhost:8080/coaches`)
        .subscribe((res: any[]) => {
          this._coaches$.next(res);
          resolve(res);
        });
    });
  }
  addCoach(coach: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/coaches`, coach);
  }
  updateCoach(coachId: string, coach: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/coaches/${coachId}`,
      coach
    );
  }
  deleteCoach(coachId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/coaches/${coachId}`);
  }

  get coaches$() {
    return this._coaches$.asObservable();
  }
}
