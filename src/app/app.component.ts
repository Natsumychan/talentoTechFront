import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UsuariosService } from './service/users.service';

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
    private router : Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated=> {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
