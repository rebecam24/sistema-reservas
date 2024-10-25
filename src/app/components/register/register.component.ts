import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder , private authService: AuthService, private router: Router, private toastr: NotificationService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    const { name, email, password } = this.registerForm.value;
    if (this.registerForm.valid) {
      this.loading = true;
      this.authService.register(name, email, password)
      .then(response => {
        this.router.navigate(['/dashboard']);
        this.toastr.showSuccess('Registro exitoso', 'Exito');
        this.loading = false;
      })
      .catch(error => {
        let errorMessage = 'Error inesperado';
        if (error.error && error.message && error.error.data.error) {
          errorMessage = error.error.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
          this.toastr.showError(errorMessage, 'Error');
      })
      .finally(() => {
        this.registerForm.reset();
        this.loading = false;
      });

    } else {
      this.toastr.showError('Formulario no válido', 'Error');
    }
  }

}
