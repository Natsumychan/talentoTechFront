import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnergyService } from '../../service/energy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-energy',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './energy.component.html',
  styleUrl: './energy.component.css'
})
export class EnergyComponent implements OnInit {
  energyId: string | null = null;
  energyForm: FormGroup;

   constructor(
    private energyService:EnergyService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    this.energyForm = this.formBuilder.group({
      type_energy_id: ['', this.energyId ? Validators.required : null],
      energy_name: ['', Validators.required],
    });
  }

   ngOnInit(): void {
    this.energyId = this.route.snapshot.paramMap.get('energyId');
    if(this.energyId){
      this.getEnergy();
    }
  }

  getEnergy() {
    this.energyService.getEnergy(Number(this.energyId)).subscribe({
      next: (response) => {
        console.log('GET request successful!', response);
        this.energyForm.patchValue(response);
      },
      error: (error) => {
        console.error('There was an error with the GET request!', error);
      }
    });
  }

  updateEnergy() {
    const id = Number(this.energyId);
    const body = this.energyForm.value;

    this.energyService.updateEnergy(id, body).subscribe({
      next: (response) => {
        console.log('PATCH request successful!', response);
      },
      error: (error) => {
        console.error('There was an error with the PATCH request!', error);
      }
    });
  }

  createEnergy() {
    const body = this.energyForm.value;
    this.energyService.createEnergy(body).subscribe({
      next: (response) => {
        console.log('POST request successful!', response);
      },
      error: (error) => {
        console.error('There was an error with the POST request!', error);
      }
    })
  }

  onSubmit() {
    if(this.energyId){
      this.updateEnergy();
    } else {
      this.createEnergy();
    }
  }

}
