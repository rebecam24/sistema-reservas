import { Component, EventEmitter, Output } from '@angular/core';
import { PlaceService } from '../../services/place/place.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-places',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './filter-places.component.html',
  styleUrl: './filter-places.component.scss'
})
export class FilterPlacesComponent {
  @Output() filtersApplied = new EventEmitter<any>();

  filters = {
    type: '',
    capacity: null,
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: ''
  };

  filteredPlaces: any[] = [];

    
    constructor(private placeService: PlaceService, private router: Router, private toastr: NotificationService) { }

  applyFilter() {
    const filters = {
      type: this.filters.type,
      capacity: this.filters.capacity,
      start_date: this.filters.start_date,
      end_date: this.filters.end_date,
      start_time: this.filters.start_time,
      end_time: this.filters.end_time,
    };
  
    this.filtersApplied.emit(filters);
  }
  
}
