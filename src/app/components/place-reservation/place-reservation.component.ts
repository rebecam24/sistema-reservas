import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { IAuth } from '../../interfaces/auth';
import { NotificationService } from '../../services/notification/notification.service';
import { PlaceService } from '../../services/place/place.service';

@Component({
  selector: 'app-place-reservation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './place-reservation.component.html',
  styleUrl: './place-reservation.component.scss'
})
export class PlaceReservationComponent {
  reservationForm: FormGroup;
  user: IAuth | null = null;
  loading: boolean = false;
  @Input() placeId!: number | null;

  constructor(private fb: FormBuilder, private auth: AuthService, private toastr: NotificationService, private PlaceService: PlaceService) {
    this.user = this.auth.getCurrentUser();
    this.reservationForm = this.fb.group({
      placeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      eventName: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('Place ID:', this.placeId);
  }
  onSubmit() {
    this.reservationForm.setValue({
      ...this.reservationForm.value,
      placeId: this.placeId
    })
    if (this.reservationForm.valid) {
      this.toastr.showSuccess('Verificando reserva', 'Información');      
        this.loading = true;
        this.PlaceService.createReservation(this.reservationForm.value).then(() => {
          this.loading = false;
          this.reservationForm.reset();
          this.toastr.showSuccess('Reserva exitosa', 'Información');
        }).catch((error) => {
          this.loading = false;
          if (error.error && error.error.message) {
            this.toastr.showError(error.error.message, 'Error');
          }
        }).finally(() => {
          this.loading = false;
        })
      
    } else {
      console.log('Formulario no válido', this.reservationForm.value);
      this.toastr.showError('Formulario no valido', 'Error');
    }
  }
}
