import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    if (user && user.userType === 'regularType') {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
