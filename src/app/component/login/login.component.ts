import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UsuariosService } from '../../service/users.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private router: Router
    ) {}

  login() {
    this.authService.login(this.documentId, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.authService.handleLoginSuccess(response.token);
         this.toastr.success('Inicio de sesión exitoso', 'Bienvenido')
        this.toastShow();
        this.handleToastVisibility();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrecta. Intente de nuevo.';
        this.toastr.error('Hubo un error en el registro', 'Error');
        this.toastShow();
        this.handleToastVisibility();
        console.error(error);
      },
    });
  }


  toastShow(){
    const toastrContainer = document.querySelector('.toast-top-right') as HTMLElement;
    setTimeout(() =>{
      toastrContainer.style.backgroundColor = 'white';
      toastrContainer.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    }, 0)
  }

  handleToastVisibility() {
    const toastrContainer = document.querySelector('.toast-top-right') as HTMLElement;
      setTimeout(() => {
        toastrContainer.style.backgroundColor = 'transparent';
        toastrContainer.style.boxShadow = 'none';
      }, 1200); // Ajusta el tiempo si es necesario
  }
}
