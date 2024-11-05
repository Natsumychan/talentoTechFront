import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/country.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {

  countryId: string | null = null;
  countryForm: FormGroup;

  constructor(
    private countryService:CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ){
    this.countryForm = this.formBuilder.group({
      country_id: ['', this.countryId ? Validators.required : null],
      country_name: ['', Validators.required],
      continent_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    if(this.countryId){
      this.getCountry();
    }
  }

  getCountry() {
    this.countryService.getCountry(Number(this.countryId)).subscribe({
      next: (response) => {
        console.log('GET request successful!', response);
        this.countryForm.patchValue(response);
      },
      error: (error) => {
        console.error('There was an error with the GET request!', error);
      }
    });
  }

  updateCountry() {
    const id = Number(this.countryId);
    const body = this.countryForm.value;

    this.countryService.updateCountry(id, body).subscribe({
      next: (response) => {
        console.log('PATCH request successful!', response);
        this.toastr.success('Actualización exitosa', 'Éxito')
        this.toastShow();
        this.handleToastVisibility();
        setTimeout(() => {
          this.router.navigate(['/countries']);
        }, 1400);
      },
      error: (error) => {
        console.error('There was an error with the PATCH request!', error);
        this.toastr.error('Hubo un error en el registro', 'Error');
        this.toastShow();
        this.handleToastVisibility();
      }
    });
  }

  createCountry() {
    const body = this.countryForm.value;
    this.countryService.createCountry(body).subscribe({
      next: (response) => {
        console.log('POST request successful!', response);
        this.toastr.success('Registro exitoso', 'Éxito')
        this.toastShow();
        this.handleToastVisibility();
      },
      error: (error) => {
        console.error('There was an error with the POST request!', error);
        this.toastr.error('Hubo un error en el registro', 'Error');
        this.toastShow();
        this.handleToastVisibility();
      }
    })
  }

  onSubmit() {
    if(this.countryId){
      this.updateCountry();
    } else {
      this.createCountry();
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
      }, 1200);
  }
}
