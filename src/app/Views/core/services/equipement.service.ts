import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipementService {
  private _equipements$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getAllEquipements(): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get<any>(`http://localhost:8080/equipments`)
        .subscribe((res: any[]) => {
          this._equipements$.next(res);
          resolve(res);
        });
    });
  }
  addEquipement(equipement: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/equipments`, equipement);
  }
  updateEquipement(equipementId: string, equipement: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/equipments/${equipementId}`,
      equipement
    );
  }
  deleteEquipement(equipementId: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/equipments/${equipementId}`
    );
  }

  get equipements$() {
    return this._equipements$.asObservable();
  }
}
