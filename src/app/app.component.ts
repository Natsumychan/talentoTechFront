import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UsuariosService } from './service/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'DataVerde ';

  isAuthenticated : boolean = false;

    constructor (
    private authService: UsuariosService,
    private toastr: ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated=> {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Finalizó la sesión', 'Adiós')
        this.toastShow();
        this.handleToastVisibility();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1400);
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
