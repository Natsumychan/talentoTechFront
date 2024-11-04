import { Component } from '@angular/core';
import { Usuarios } from '../../class/users';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../service/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
    usuario : Usuarios[] = []

  constructor (private userService:UsuariosService) {}

  ngOnInit(): void {
    this.listUsers();
    //throw new Error('Method not implemented.');
  }

  listUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.usuario = data;
        console.log(this.usuario);
      }
    )
  }

}
