import { Routes } from '@angular/router';
import { PlaceComponent } from './components/place/place.component';
import { PlaceViewComponent } from './components/place-view/place-view.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardEmptyComponent } from './components/dashboard-empty/dashboard-empty.component';
import { PlacesAllComponent } from './components/places-all/places-all.component';
import { PlaceReservationComponent } from './components/place-reservation/place-reservation.component';
import { UserGuard } from './guards/user.guard';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { LoggedGuard } from './guards/logged.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardEmptyComponent },
      { path: 'places/create', component: PlaceComponent, canActivate: [AdminGuard] },
      { path: 'places/all', component: PlacesAllComponent, canActivate: [LoggedGuard] },
      { path: 'places/edit/:id', component: PlaceComponent, canActivate: [AdminGuard] },
      { path: 'places/view/:id', component: PlaceViewComponent, canActivate: [LoggedGuard] },
      { path: 'reservations', component: UserReservationsComponent, canActivate: [LoggedGuard] },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'login' }
];
