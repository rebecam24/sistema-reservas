import { Component } from '@angular/core';
import { PlaceService } from '../../services/place/place.service';
import { IApiResponsePlaces, IPlace } from '../../interfaces/place';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroments';
import { NotificationService } from '../../services/notification/notification.service';
import { AuthService } from '../../services/auth/auth.service';
import { IAuth } from '../../interfaces/auth';
import { FilterPlacesComponent } from "../filter-places/filter-places.component";

@Component({
  selector: 'app-places-all',
  standalone: true,
  imports: [CommonModule, FilterPlacesComponent],
  templateUrl: './places-all.component.html',
  styleUrl: './places-all.component.scss',
})
export class PlacesAllComponent {
  listPlaces: IPlace[] = [];
  user: IAuth | null = null;
  loading: boolean = false;
  filteredPlaces: IPlace[] = [];

  constructor(
    private placeService: PlaceService,
    private authService: AuthService,
    private router: Router,
    private toastr: NotificationService
  ) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadPlaces(); 
  }

  loadPlaces(): void {
    this.loading = true; 
    this.placeService
      .getAllPlaces()
      .then((places) => {
        this.listPlaces = places;
      })
      .catch((error) => {
        console.error('Error al obtener los lugares', error);
        this.toastr.showError('Error al obtener los lugares', 'Error');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  showDetails(place: IPlace) {
    this.router.navigate([`dashboard/places/view/${place.id}`]);
  }

  editPlace(place: IPlace) {
    this.router.navigate([`dashboard/places/edit/${place.id}`]);
  }

  onFiltersApplied(filters: any) {
    this.loading = true;
    this.placeService.filterPlaces(filters).then(places => {
      this.listPlaces = places;
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }
}
