import { Component, OnInit } from '@angular/core';
import { skip, Observable } from 'rxjs';
import { MemberService } from '../../core/services/member.service';
import { getWeekNumber } from '../../core/helpers/week-number.helper';
import { CoachService } from '../../core/services/coach.service';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards = [5, 4, 3, 30];
  memberes: any[] = [];
  choaches$!: Observable<any[]>;
  totalMembers: number = 0;
  totalPrice: number = 0;
  selectedPeriod: 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly' = 'all';

  constructor(
    public _membersService: MemberService,
    public _coachesService: CoachService,
    private _dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this._membersService.getAllMemberes();
    this._coachesService.getAllCoaches();
    this.choaches$ = this._coachesService.coaches$;
    this._membersService.memberes$.pipe(skip(1)).subscribe((memberes) => {
      this.memberes = memberes;
      this.getAlltotalPrice(memberes);
    });
  }
  getAlltotalPrice(memberes: any[]): void {
    this.selectedPeriod = 'all';
    this.totalMembers = memberes.length;
    this.totalPrice = this._dashboardService.getAlltotalPrice(memberes);
  }

  calculateTotalByPeriode(
    entries: any[],
    period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  ): void {
    this.selectedPeriod = period;

    this.totalMembers = this._dashboardService.calculateTotalByPeriode(
      entries,
      period,
      'member'
    );

    this.totalPrice = this._dashboardService.calculateTotalByPeriode(
      entries,
      period,
      'price'
    );
  }
}
