import { Component, OnInit } from '@angular/core';
import { Energy } from '../../class/energy';
import { EnergyService } from '../../service/energy.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-energies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './energies.component.html',
  styleUrl: './energies.component.css'
})
export class EnergiesComponent implements OnInit {

  energy:Energy[]=[]

  constructor(private energyService:EnergyService){}
  ngOnInit(): void {
    this.energyList()
  }

  energyList(){
    this.energyService.getEnergyList().subscribe(
      data=>{
        this.energy=data
        console.log(this.energy)
      }
    )
  }

}
