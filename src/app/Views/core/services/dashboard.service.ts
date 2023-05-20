import { Injectable } from '@angular/core';
import { getWeekNumber } from '../helpers/week-number.helper';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor() {}
  getAlltotalPrice(entries: any[]): number {
    const totalPrice = entries.reduce((accumulator: any, entry: any) => {
      const subscriptionPrice = entry.subscription.subscriptionDetails.price;
      return accumulator + subscriptionPrice;
    }, 0);

    return totalPrice;
  }
  calculateTotalByPeriode(
    entries: any[],
    period: 'daily' | 'weekly' | 'monthly' | 'yearly',
    type: 'price' | 'member'
  ): number {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentWeek = getWeekNumber(currentDate);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const totalPrice = entries.reduce((accumulator, entry) => {
      const { startDate, subscriptionDetails } = entry.subscription;
      const subscriptionStart = new Date(startDate);
      const subscriptionStartDay = subscriptionStart.getDate();
      const subscriptionStartWeek = getWeekNumber(subscriptionStart);
      const subscriptionStartMonth = subscriptionStart.getMonth();
      const subscriptionStartYear = subscriptionStart.getFullYear();

      const isSameYear = currentYear === subscriptionStartYear;
      const isSameMonth = isSameYear && currentMonth === subscriptionStartMonth;

      switch (period) {
        case 'daily':
          if (isSameMonth && currentDay === subscriptionStartDay) {
            return (
              accumulator +
              this.getAccumulatorAddition(subscriptionDetails, type)
            );
          }
          break;
        case 'weekly':
          if (isSameMonth && currentWeek === subscriptionStartWeek) {
            return (
              accumulator +
              this.getAccumulatorAddition(subscriptionDetails, type)
            );
          }
          break;
        case 'monthly':
          if (isSameMonth) {
            return (
              accumulator +
              this.getAccumulatorAddition(subscriptionDetails, type)
            );
          }
          break;
        case 'yearly':
          if (isSameYear) {
            return (
              accumulator +
              this.getAccumulatorAddition(subscriptionDetails, type)
            );
          }
          break;
      }

      return accumulator;
    }, 0);

    return totalPrice;
  }

  private getAccumulatorAddition(
    subscriptionDetails: any,
    type: 'price' | 'member'
  ): number {
    return type == 'price' ? subscriptionDetails.price : 1;
  }
}
