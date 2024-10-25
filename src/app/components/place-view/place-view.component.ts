import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../services/place/place.service';
import { IApiResponsePlaces, IPlace } from '../../interfaces/place';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments';
import { PlaceReservationComponent } from '../place-reservation/place-reservation.component';
import { AuthService } from '../../services/auth/auth.service';
import { IAuth } from '../../interfaces/auth';

@Component({
  selector: 'app-place-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PlaceReservationComponent],
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.scss'],
})
export class PlaceViewComponent implements OnInit {
  placeId: number | null = null;
  place: IPlace | null = null;
  user: IAuth | null = null;
  schedules: any[] = [];

  loading:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private authService: AuthService
  ) {
    this.user = this.authService.getCurrentUser();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this.placeId = id ? +id : null;
      if (this.placeId) {
        await this.loadLocal(this.placeId);
      }
    });
  }

  async loadLocal(id: number) {
    this.loading = true;
    this.place = await this.placeService.getPlaceById(id, environment.mockData);
    const schedules = await this.placeService.getBookedSchedule(id);

    this.loading = false;
    this.schedules = schedules.booked_schedule;
  }
}
