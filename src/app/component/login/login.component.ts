import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UsuariosService } from '../../service/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  documentId: string = '';
  password: string = '';
  errorMessage: string = '';
  isAuthenticated : boolean = false;

  constructor(
    private authService: UsuariosService,
    private router: Router
    ) {}

  login() {
    this.authService.login(this.documentId, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.authService.handleLoginSuccess(response.token);
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrecta. Intente de nuevo.';
        console.error(error);
      },
    });
  }
}
