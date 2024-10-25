import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    if (user && user.userType === 'adminType') { // Verifica si el usuario está autenticado
      return true;
    } else {
      // Redirige al login si no está autenticado
      return this.router.createUrlTree(['/login']);
    }
  }
}