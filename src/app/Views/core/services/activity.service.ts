import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private _activities$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getAllactivities(): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get<any>(`http://localhost:8080/activities`)
        .subscribe((res: any[]) => {
          this._activities$.next(res);
          resolve(res);
        });
    });
  }
  addActivity(activity: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/activities`, activity);
  }
  updateActivity(activityId: string, activity: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/activities/${activityId}`,
      activity
    );
  }
  deleteActivity(activityId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/activities/${activityId}`);
  }

  get activities$() {
    return this._activities$.asObservable();
  }
}
