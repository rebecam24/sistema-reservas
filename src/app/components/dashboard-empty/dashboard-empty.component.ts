import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IAuth } from '../../interfaces/auth';
import { PlacesAllComponent } from "../places-all/places-all.component";

@Component({
  selector: 'app-dashboard-empty',
  standalone: true,
  imports: [PlacesAllComponent],
  templateUrl: './dashboard-empty.component.html',
  styleUrl: './dashboard-empty.component.scss'
})
export class DashboardEmptyComponent {
  user: IAuth | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
}
