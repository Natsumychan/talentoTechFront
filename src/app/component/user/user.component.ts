import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../service/users.service';
import { ToastrService } from 'ngx-toastr';

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
    'Invitado': 1,
    'Usuario': 2
  };

  private defaultRole: number = this.roleMapping['Usuario'];

  constructor (
    private userServicio : UsuariosService,
    private toastr: ToastrService,
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

    this.userServicio.getUser(Number(this.id)).subscribe ({
      next: (response) => {
        const userData = {
          role : "Invitado",
          users : response
        }
        console.log('Get request successfull', userData);
        this.userForm.patchValue(userData);
        this.userForm.get('role')?.enable();
      },
      error: (error) => {
        console.error('There was error with the GET request', error);
      }
    })
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
    this.userServicio.updateUser(id, body).subscribe({
      next: (response)=> {
        console.log('PATCH request successful', response);
        this.toastr.success('Registro exitoso', 'Éxito')
        this.toastShow();
        this.handleToastVisibility();
        setTimeout(() => {
          this.router.navigate(['/usuarios']);
        }, 1400);
      },
      error: (error) => {
        console.log('There was an error with tha PATCH request', error)
        this.toastr.error('Hubo un error en el registro', 'Error');
        this.toastShow();
        this.handleToastVisibility();
      }
    })
  }

  createUser() {
    const body = this.userForm.value;

    const roleAsNumber = this.roleMapping[body.role] !== undefined ? this.roleMapping[body.role] : null;

    if (roleAsNumber === null) {
      console.error('Rol inválido, por favor ingrese "Administrador", "Usuario" o "Invitado"');
      return;
    }

    body.role = roleAsNumber;

    this.userServicio.createUser(body).subscribe ({
      next: (response) => {
        console.log('POST request successful', response);
        this.toastr.success('Registro exitoso', 'Éxito')
        this.toastShow();
        this.handleToastVisibility();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1400);
      },
      error: (error) => {
        console.error('There was an error with the POST request', error);
        this.toastr.error('Hubo un error en el registro', 'Error');
        this.toastShow();
        this.handleToastVisibility();
      }
    })
  }

  onSubmit() {
    if (this.id) {
      this.updateUser();
    } else {
      this.createUser();
    }
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
