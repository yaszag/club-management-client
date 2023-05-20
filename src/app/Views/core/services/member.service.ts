import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private _memberes$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getAllMemberes(): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get<any>(`http://localhost:8080/members`)
        .subscribe((res: any[]) => {

          this._memberes$.next(res);
          resolve(res);
        });
    });
  }
  addMember(member: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/members`, member);
  }
  updateMember(memberId: string, member: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/members/${memberId}`,
      member
    );
  }
  deleteMember(memberId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/members/${memberId}`);
  }

  get memberes$() {
    return this._memberes$.asObservable();
  }
}
