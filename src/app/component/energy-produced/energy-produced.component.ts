import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnergyProducedService } from '../../service/energy-produced.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountryService } from '../../service/country.service';
import { EnergyService } from '../../service/energy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-energy-produced',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './energy-produced.component.html',
  styleUrl: './energy-produced.component.css'
})
export class EnergyProducedComponent implements OnInit {

  energyPId: string | null=null;

  energyPForm:FormGroup;

  countries: any[] = [];
  energies: any[] = [];

  constructor(
    private energyProduceService: EnergyProducedService,
    private countryService: CountryService,
    private energyService: EnergyService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.energyPForm = this.formBuilder.group({
      production_id: ['', this.energyPId ? Validators.required : null],
      countryId: ['', Validators.required],
      energyId: ['', Validators.required],
      quantity_produced: ['', Validators.required],
      production_date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.energyPId = this.route.snapshot.paramMap.get('energyPId');
    this.loadCountries();
    this.loadEnergies();
    if(this.energyPId){
      this.getEnergyProduced();
    }
  }

  getEnergyProduced(){
    this.energyProduceService.getEnergyProduced(Number(this.energyPId)).subscribe({
      next: (response) =>{
        console.log('Get request succesful!', response);
        this.energyPForm.patchValue({
        production_id:response.production_id,
        countryId: response.country.country_id,
        energyId: response.energy.type_energy_id,
        quantity_produced: response.quantity_produced,
        production_date: response.production_date
      });
      },
      error: (error) =>{
        console.log('There was an error with the GET request!', error)
      }
    })
  }

  loadCountries(): void {
    this.countryService.getCountryList().subscribe(data => {
      this.countries = data;
    });
  }

  loadEnergies(): void {
    this.energyService.getEnergyList().subscribe(data => {
      this.energies = data;
    });
  }

    updateEnergyProduced() {
    const id = Number(this.energyPId);
    const body = {
      countryId: this.energyPForm.get('countryId')?.value,
      energyId: this.energyPForm.get('energyId')?.value,
      energyProduced: {
        quantity_produced: this.energyPForm.get('quantity_produced')?.value,
        production_date: this.energyPForm.get('production_date')?.value
      }
    };

    this.energyProduceService.updateEnergyProduced(id, body).subscribe({
      next: (response) => {
        console.log('PATCH request successful!', response);
        this.toastr.success('Actualización exitosa', 'Éxito')
        this.toastShow();
        this.handleToastVisibility();
        setTimeout(() => {
          this.router.navigate(['/energiesProduced']);
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

    createEnergyProduced() {
    const body = {
    countryId: this.energyPForm.get('countryId')?.value,
    energyId: this.energyPForm.get('energyId')?.value,
    energyProduced: {
      quantity_produced: this.energyPForm.get('quantity_produced')?.value,
      production_date: this.energyPForm.get('production_date')?.value
    }
  };
    this.energyProduceService.createEnergyProduced(body).subscribe({
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
    if(this.energyPId){
      this.updateEnergyProduced();
    } else {
      this.createEnergyProduced();
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
