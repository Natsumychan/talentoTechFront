import { Component, OnInit } from '@angular/core';
import { Country } from '../../class/country';
import { CountryService } from '../../service/country.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {

  countryId: string | null = null;
  countryForm: FormGroup;

  constructor(
    private countryService:CountryService,
    private route: ActivatedRoute,
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
      },
      error: (error) => {
        console.error('There was an error with the PATCH request!', error);
      }
    });
  }

  createCountry() {
    const body = this.countryForm.value;
    this.countryService.createCountry(body).subscribe({
      next: (response) => {
        console.log('POST request successful!', response);
      },
      error: (error) => {
        console.error('There was an error with the POST request!', error);
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
}
