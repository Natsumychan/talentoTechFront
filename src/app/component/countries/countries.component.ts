import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/country.service';
import { Country } from '../../class/country';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
    country:Country[]=[]

  constructor(private countryService:CountryService){}

  ngOnInit(): void {
    this.countryList()
  }

  countryList(){
    this.countryService.getCountryList().subscribe(
      data =>{
        this.country=data
        console.log(this.country)
      }
    )
  }

    deleteCountry(id:number){
    const countryId = Number(id);
    this.countryService.deleteCountry(countryId).subscribe(
      data => {
        console.log(data)
        this.countryList()
      }
    )
  }

}
