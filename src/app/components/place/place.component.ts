import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceService } from '../../services/place/place.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../services/notification/notification.service';
import { IPlace } from '../../interfaces/place';


@Component({
  selector: 'app-place',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {
  placeForm: FormGroup;

  placeId: number | null = null;
  daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  today: string;
  loading: boolean = false;
  imageUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private toastr: NotificationService,
    private router: Router
  ) {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      images: this.fb.array([]),
      capacity: [0, Validators.required],
      available_from: ['', Validators.required],
      available_to: ['', Validators.required],
      type: ['', Validators.required],
      active: [1, Validators.required],
      default_hours: ['', Validators.required],
      default_days: this.fb.array([], Validators.required),
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
    });

    this.today = new Date().toISOString().split('T')[0];
  }

  get imagesArray(): FormArray {
    return this.placeForm.get('images') as FormArray;
  }
  
  onFileChange(event: any): void {
    const files = event.target.files;
    const imagesArray = this.imagesArray;
  
    imagesArray.clear();
  
    for (let file of files) {
      imagesArray.push(this.fb.control(file));
    }  
  }
  
  ngOnInit(): void {
    this.loading = true;

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.placeId = +params['id'];
        this.placeService.getPlaceById(this.placeId)
          .then((place) => {
            this.populateForm(place);
          })
          .catch((error) => {
            console.error('Error al obtener el lugar', error);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });

    
    this.placeForm.valueChanges.subscribe(() => {
      const startTime = this.placeForm.get('startTime')?.value;
      const endTime = this.placeForm.get('endTime')?.value;
      const combinedValue = `${startTime}-${endTime}`;
      this.placeForm.get('default_hours')?.setValue(combinedValue, { emitEvent: false });
    });
  }

  loadPlaceIfExist(): void {
    this.loading = true;

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.placeId = +params['id'];
        this.placeService.getPlaceById(this.placeId)
          .then((place) => {
            this.populateForm(place);
          })
          .catch((error) => {
            console.error('Error al obtener el lugar', error);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  }
  populateForm(place: IPlace): void {
    const starTime = place.default_hours.split('-')[0];
    const endTime = place.default_hours.split('-')[1];
    this.imageUrls = place.images
    this.placeForm.patchValue({
      name: place.name,
      description: place.description,
      capacity: place.capacity,
      available_from: place.available_from,
      available_to: place.available_to,
      startTime: starTime,
      endTime: endTime,
      default_hours: place.default_hours,
      type: place.type,
      active: place.active,
      images: place.images,      
    });

    const defaultDaysArray = this.placeForm.get('default_days') as FormArray;
    defaultDaysArray.clear();

    place.default_days.forEach((day: string) => {
      if (this.daysOfWeek.includes(day)) {
        (this.placeForm.get('default_days') as FormArray).push(this.fb.control(day));
        // defaultDaysArray.push(this.fb.control(day));
      }
    });
  }

  get defaultDays(): FormArray {
    return this.placeForm.get('default_days') as FormArray;
  }

  setDefaultDays(selectedDays: string[]): void {
    const defaultDaysArray = this.placeForm.get('default_days') as FormArray;
    selectedDays.forEach((day) => {
      defaultDaysArray.push(this.fb.control(day));
    });
  }

  isDaySelected(day: string): boolean {
    const defaultDaysArray = this.placeForm.get('default_days') as FormArray;
    return defaultDaysArray.value.includes(day);
  }

  onDayChange(day: string, event: any): void {
    const isChecked = event.target.checked;
    const defaultDaysArray = this.placeForm.get('default_days') as FormArray;

    if (isChecked) {
      defaultDaysArray.push(this.fb.control(day));
    } else {
      const index = defaultDaysArray.controls.findIndex((x) => x.value === day);
      if (index !== -1) {
        defaultDaysArray.removeAt(index);
      }
    }
  }
  
  private prepareFormData(): FormData {
    const formData = new FormData();
  
    Object.keys(this.placeForm.controls).forEach(key => {
      const value = this.placeForm.get(key)?.value;
  
      if (key === 'default_days' && Array.isArray(value)) {
        value.forEach((day: string, index: number) => {
          formData.append(`default_days[${index}]`, day); 
        });
      } 
      else if (key !== 'images') {
        formData.append(key, value);
      }
    });
  
    const imagesArray = this.imagesArray.value;
    imagesArray.forEach((file: File, index: number) => {
      formData.append(`images[${index}]`, file);
    });
  
    return formData;
  }
  submitForm(): void {
    if (this.placeForm.valid) {
      const formData = this.prepareFormData();
      if (this.placeId) {
        this.loading = true;
        this.placeService.updatePlace(this.placeId, this.placeForm.value).then(() => {
          this.router.navigate(['/dashboard/places/all']);
          this.placeForm.reset();
        });
      } else {
        this.placeService.createPlace(formData).then(() => {
          this.router.navigate(['/dashboard/places/all']);          
          this.placeForm.reset();
        });
      }

      this.toastr.showSuccess('Formulario enviado', 'Información');
    } else {
      this.toastr.showError('Formulario no válido', 'Error');
    }
  }
}


