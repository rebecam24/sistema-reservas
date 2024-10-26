import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroments';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: NotificationService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password, environment.mockData)
        .then(response => {
          this.router.navigate(['/dashboard']);
          this.toastr.showSuccess('Login exitoso', 'Exito');
        })
        .catch(error => {
          let errorMessage = 'Error inesperado';
          if (error.error && error.message && error.error.data.error) {
            errorMessage = error.error.data.error;
          } else if (error.message) {
            errorMessage = error.message;
          }
            this.toastr.showError(errorMessage, 'Error');
        });
    } else {
      this.toastr.showError('Formulario no valido', 'Error');
    }
  }
}