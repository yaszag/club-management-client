import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs';
import { MemberService } from '../../core/services/member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards = [5, 4, 3, 30];
  memberes: any = [];
  constructor(public _membersService: MemberService) {}

  ngOnInit(): void {
    this._membersService.getAllMemberes();
    this._membersService.memberes$.pipe(skip(1)).subscribe((memberes) => {
      this.memberes = memberes;
      const period = 'monthly'; // Change the period as per your requirement

      const totalPrice = this.calculateTotalPriceh(memberes, period);
      console.log('Total Price:', totalPrice);
    });

   
  }
  calculateTotalPrice(): number {
    const totalPrice = this.memberes.reduce((accumulator: any, entry: any) => {
      const subscriptionPrice = entry.subscription.subscriptionDetails.price;
      return accumulator + subscriptionPrice;
    }, 0);

    return totalPrice;
  }

  // Define the Angular method to calculate the total price
  calculateTotalPriceh(entries: any[], period: 'daily' | 'weekly' | 'monthly' | 'yearly'): number {
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Current day of the month
    const currentWeek = this.getWeekNumber(currentDate); // Current week number
    const currentMonth = currentDate.getMonth(); // Month index starts from 0 (0 - 11)
    const currentYear = currentDate.getFullYear();
  
    const totalPrice = entries.reduce((accumulator, entry) => {
      const { startDate, subscriptionDetails } = entry.subscription;
      const subscriptionStart = new Date(startDate);
      const subscriptionStartDay = subscriptionStart.getDate(); // Start day of the month
      const subscriptionStartWeek = this.getWeekNumber(subscriptionStart); // Start week number
      const subscriptionStartMonth = subscriptionStart.getMonth(); // Month index starts from 0 (0 - 11)
      const subscriptionStartYear = subscriptionStart.getFullYear();
  
      const isSameYear = currentYear === subscriptionStartYear;
      const isSameMonth = isSameYear && currentMonth === subscriptionStartMonth;
  
      switch (period) {
        case 'daily':
          if (isSameMonth && currentDay === subscriptionStartDay) {
            return accumulator + subscriptionDetails.price;
          }
          break;
        case 'weekly':
          if (isSameMonth && currentWeek === subscriptionStartWeek) {
            return accumulator + subscriptionDetails.price;
          }
          break;
        case 'monthly':
          if (isSameMonth) {
            return accumulator + subscriptionDetails.price;
          }
          break;
        case 'yearly':
          if (isSameYear) {
            return accumulator + subscriptionDetails.price;
          }
          break;
      }
  
      return accumulator;
    }, 0);
  
    return totalPrice;
  }
  

  // Helper method to get the week number of a given date
  getWeekNumber(date: Date): number {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  }
}
