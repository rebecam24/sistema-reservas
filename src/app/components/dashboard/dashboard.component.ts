import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouteDeclare } from '../../interfaces/routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isAdmin: boolean;
  listRoutes: RouteDeclare[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.getCurrentUser()?.userType === 'adminType';
    if (this.isAdmin) {
      this.listRoutes = this.getURLAdmin();
    } else {
      this.listRoutes = this.getURLUser();
    }
  }

  logout() {
    this.authService.logout();
  }

  getURLAdmin(): RouteDeclare[] {
    return [
      {
        url: '/dashboard',
        name: 'Dashboard',
        icon: 'list',
      },
      {
        url: '/dashboard/places/create',
        name: 'Crear Espacio',
        icon: 'list',
      },
      {
        url: '/dashboard/places/all/',
        name: 'Todos los Espacios',
        icon: 'list',
      },
    ];
  }

  getURLUser(): RouteDeclare[] {
    return [
      {
        url: '/dashboard/places/all/',
        name: 'Todos los Espacios',
        icon: 'list',
      },
      {
        url: '/dashboard/reservations',
        name: 'Reservaciones',
        icon: 'list',
      },
    ];
  }
}
