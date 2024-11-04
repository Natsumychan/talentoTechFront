import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnergyProducedService } from '../../service/energy-produced.service';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../service/country.service';
import { EnergyService } from '../../service/energy.service';

@Component({
  selector: 'app-energy-produced',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
    private route: ActivatedRoute,
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
      },
      error: (error) => {
        console.error('There was an error with the PATCH request!', error);
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
      },
      error: (error) => {
        console.error('There was an error with the POST request!', error);
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

}

      // "countryId": 5,
      // "energyId": 2,
      // "energyProduced": {
      //   "quantity_produced": 2000.54321,
      //   "production_date": "2000"
      // }