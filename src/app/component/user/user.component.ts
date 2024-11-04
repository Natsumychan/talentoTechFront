import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../service/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
   id : string |  null = null;
  userForm : FormGroup;

  private roleMapping: Record<string, number> = {
    'Administrador': 0,
    'Usuario': 1,
    'Invitado': 2
  };

  private defaultRole: number = this.roleMapping['Usuario'];

  constructor (
    private userServicio : UsuariosService,
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router
  ) {
    const today = new Date().toISOString().split('T')[0];

    this.userForm = this.formBuilder.group ({
      role : ['Invitado', Validators.required],
      users : this.formBuilder.group({
        documentId : ['', Validators.required],
        userName: ['', Validators.required],
        userLastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        createAcounteDate: [{value: today, disabled:false}, Validators.required]
      })
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get ('id');
    if(this.id) {
      this.getUser();
    }
    //throw new Error('Method not implemented.');
  }

  getUser() {

    this.userServicio.getUser(Number(this.id)).subscribe (
      (      response: { roleId: { roleName: any; }; }) => {
        const userData = {
          role : response.roleId.roleName,
          users : response
        }
        console.log('Get request successfull', userData);
        this.userForm.patchValue(userData);
        this.userForm.get('role')?.enable();
      },
      (      error: any) => {
        console.error('There was error with the GET request', error);
      }
    )
  }

  updateUser() {
    const id = Number(this.id);
    const body = this.userForm.value;

    const roleAsNumber = this.roleMapping[body.role] !== undefined ? this.roleMapping[body.role] : null;

    if (roleAsNumber === null) {
      console.error('Rol inválido, por favor ingrese "Administrador", "Usuario" o "Invitado"');
      return;
    }

    body.role = roleAsNumber;

    //console.log(id, body);
    this.userServicio.updateUser(id, body).subscribe(
      (      response: any) => {
        console.log('PATCH request successful', response);
      },
      (      error: any) => {
        console.log('There was an error with tha PATCH request', error)
      }
    )
  }

  createUser() {
    const body = this.userForm.value;

    const roleAsNumber = this.roleMapping[body.role] !== undefined ? this.roleMapping[body.role] : null;

    if (roleAsNumber === null) {
      console.error('Rol inválido, por favor ingrese "Administrador", "Usuario" o "Invitado"');
      return;
    }

    body.role = roleAsNumber;

    this.userServicio.createUser(body).subscribe (
      (      response: any) => {
        console.log('POST request successful', response);
        this.router.navigate(['/'])
      },
      (      error: any) => {
        console.error('There was an error with the POST request', error);
      }
    )
  }

  onSubmit() {
    if (this.id) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
}
