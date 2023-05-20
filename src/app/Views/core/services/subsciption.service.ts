import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private _subscriptions$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getAllsubscriptions(): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get<any>(`http://localhost:8080/api/subscriptions_details`)
        .subscribe((res: any[]) => {
          this._subscriptions$.next(res);
          resolve(res);
        });
    });
  }
 

  get subscriptions$() {
    return this._subscriptions$.asObservable();
  }
}
