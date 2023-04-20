import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('accessToken') != null) return true;
    this.router.navigateByUrl('login');
    return false;
  }
}
