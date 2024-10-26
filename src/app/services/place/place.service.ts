import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { allDataPlaces, dataPlace } from '../../components/place/mockdata';
import { IApiResponsePlaces, IPlace, ISchedule } from '../../interfaces/place';
import { Booking, IReservation, IResponseAPIReservation } from '../../interfaces/reservation';
import { environment } from '../../../enviroments/enviroments';
import { AuthService } from '../auth/auth.service';
import { IAuth } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private apiUrl = `${environment.apiUrl}/places`;
  private apiUrlReservation = `${environment.apiUrl}/bookings`;
  currentUser: IAuth | null = null;

  constructor(private http: HttpClient, private authService: AuthService,) { 
    this.currentUser=  this.authService.getCurrentUser();

  }

  getPlaceById(id: number, isMock = false): Promise<IPlace> {
    let headers = new HttpHeaders();
    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);
    }
  
    return new Promise((resolve, reject) => {
      this.http.get<IApiResponsePlaces>(`${this.apiUrl}/${id}`, { headers }).subscribe(
        (data) => {
          if (Array.isArray(data.data.places)) {
            resolve(data.data.places[0]);
          } else {
            resolve(data.data.places);
          }
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
  
  getAllPlaces(isMock = false): Promise<IPlace[]> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();

      if (this.currentUser && this.currentUser.token) {
        headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);
      }

      this.http.get<IApiResponsePlaces>(this.apiUrl, { headers }).subscribe(
        (data) => {
          const places = Array.isArray(data.data.places) ? data.data.places : [data.data.places];
          resolve(places);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createPlace(data: any, ismock = false): Promise<any> {
    let headers = new HttpHeaders();

      if (this.currentUser && this.currentUser.token) {
        headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
      }
    return new Promise((resolve, reject) => {
      return this.http.post(this.apiUrl, data, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updatePlace(id: number | null, data: any, ismock = false): Promise<any> {
    let headers = new HttpHeaders();

    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);
    }
    return new Promise((resolve, reject) => {
      return this.http.put(`${this.apiUrl}/${id}`, data, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deletePlace(id: number, ismock = false): Promise<any> {
    let headers = new HttpHeaders();

    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
    }
    return new Promise((resolve, reject) => {
      return this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  filterPlaces(filters: any): Promise<IPlace[]> {
    let headers = new HttpHeaders();

    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
    }
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
  
      Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (value) {
          params = params.set(key, value);
        }
      });
  
      this.http.get<IApiResponsePlaces>(`${environment.apiUrl}/filter-places`, { params, headers } ).subscribe(
        (data) => {
          const places = Array.isArray(data.data.places) ? data.data.places : [data.data.places];
          resolve(places);
        },
        (error) => {
          console.error('Error fetching filtered places:', error);
          reject(error); 
        }
      );
    });
  }
  
//------------------------------------------------------------->RESERVATION
  createReservation(data: any, ismock = false): Promise<any> {
    let headers = new HttpHeaders();

    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
    }
    const mapperSendData: any = {
      place_id: data.placeId,
      start_date: data.startDate,
      end_date: data.endDate,
      start_time: data.startTime,
      end_time: data.endTime,
      event_name: data.eventName
    }

    return new Promise((resolve, reject) => {
      return this.http.post(`${this.apiUrlReservation}`, mapperSendData, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getUserReservation(): Promise<IReservation[]> {
    let headers = new HttpHeaders();

    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
    }
    return new Promise((resolve, reject) => {
      this.http.get<IResponseAPIReservation>(`${this.apiUrlReservation}`, { headers }).subscribe(
        (data) => {

          const reservations: IReservation[] = data.data.bookings.map((booking: Booking) => ({
          id: booking.id,
          placeId: booking.place_id,
          startDate: booking.start_date,
          endDate: booking.end_date,
          startTime: booking.start_time,
          endTime: booking.end_time,
          eventName: booking.event_name,
          placeName: booking.place?.name
        }));
        resolve(reservations);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateReservation(id: number, data: any, ismock = false): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();

      if (this.currentUser && this.currentUser.token) {
        headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
      }
      const reservations: Booking = { 
        id: data.id,
        place_id: data.placeId,
        start_date: data.startDate,
        end_date: data.endDate,
        start_time: data.startTime,
        end_time: data.endTime,
        event_name: data.eventName
      }
      return this.http.put(`${this.apiUrlReservation}/${id}`, reservations, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getBookedSchedule(placeId: number): Promise<ISchedule> {
    let headers = new HttpHeaders();

    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
    }
    return new Promise((resolve, reject) => {
      this.http.get<ISchedule>(`${this.apiUrl}/${placeId}/booked-schedule`, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    })
  }

  cancelReservation(id: number): Promise<any> {
    let headers = new HttpHeaders();

    if (this.currentUser && this.currentUser.token) {
      headers = headers.append('Authorization', `Bearer ${this.currentUser.token}`);        
    }
    return new Promise((resolve, reject) => {
      this.http.put(`${this.apiUrlReservation}/${id}/cancel`,{}, { headers }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
