import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { PlaceService } from '../../services/place/place.service';
import { environment } from '../../../enviroments/enviroments';
import { IReservation } from '../../interfaces/reservation';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-reservations.component.html',
  styleUrl: './user-reservations.component.scss',
})
export class UserReservationsComponent {
  reservations: IReservation[] = [];
  selectedReservation: any = null;
  reservationForm: FormGroup;
  loading: boolean = false; 

  constructor(
    private reservationService: PlaceService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.reservationForm = this.fb.group({
      placeId: [''],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
      eventName: [''],
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser();
    this.loadReservations();
  }

  // Cargar todas las reservaciones del usuario
  loadReservations() {
    this.loading = true;
    this.reservationService
      .getUserReservation()
      .then((reservations) => {
        this.reservations = reservations;
        this.loading = false;
      })
      .catch((error) => {
        this.notificationService.showError(
          error.message || 'Error al cargar las reservaciones',
          'Error'
        );
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
  }

  // Seleccionar una reservación para modificar
  selectReservation(reservation: any) {
    this.selectedReservation = reservation;
    this.reservationForm.patchValue({
      placeId: reservation.placeId,
      startDate: reservation.startDate.slice(0, 10),
      endDate: reservation.endDate.slice(0, 10),
      eventName: reservation.eventName,
      startTime: reservation.startTime.slice(0, 5),
      endTime: reservation.endTime.slice(0, 5),
      
    });
  }

  // Guardar cambios en la reservación seleccionada
  saveChanges() {
    if (this.selectedReservation && this.reservationForm.valid) {
      this.reservationService
        .updateReservation(
          this.selectedReservation.id,
          this.reservationForm.value
        )
        .then(() => {
          this.notificationService.showSuccess(
            'Reservación modificada exitosamente',
            'Éxito'
          );
          this.loadReservations(); 
          this.clearSelection();
        })
        .catch((error) => {
          this.notificationService.showError(
            'Error al modificar la reservación',
            'Error'
          );
        });
    }
  }

  // Cancelar la reservación seleccionada
  async cancelReservation(reservationId: number) {
    await this.reservationService
      .cancelReservation(reservationId)
      .then(() => {
        this.notificationService.showSuccess(
          'Reservación cancelada exitosamente',
          'Éxito'
        );
        this.loadReservations();
        this.clearSelection();
      })
      .catch((error) => {
        this.notificationService.showError(
          `Error al cancelar la reservación, ${error.error.message} `,
          'Error'
        );
      });
  }

  // Limpiar la selección de reservación
  clearSelection() {
    this.selectedReservation = null;
    this.reservationForm.reset();
  }
}
